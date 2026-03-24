<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <AdminSidebar v-model:open="sidebarOpen" />

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-bar">
        <div class="top-bar-left">
          <button class="btn-menu-mobile" @click="sidebarOpen = !sidebarOpen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h1 class="page-title">Trajetos</h1>
        </div>
        <div class="top-bar-right">
          <router-link to="/admin/trajetos/novo" class="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Novo Trajeto
          </router-link>
        </div>
      </header>

      <!-- Filters -->
      <div class="filters-row">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-btn"
          :class="{ active: activeFilter === filter.value }"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
          <span class="filter-count">{{ filter.count }}</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="loading-section">
        <span class="loading-spinner"></span>
        <p>Carregando trajetos...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTrajetos.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <h3>Nenhum trajeto encontrado</h3>
        <p>Crie um novo trajeto para comecar</p>
        <router-link to="/admin/trajetos/novo" class="btn-primary">Criar Trajeto</router-link>
      </div>

      <!-- Trajetos Grid -->
      <div v-else class="trajetos-grid">
        <div
          v-for="trajeto in filteredTrajetos"
          :key="trajeto.id"
          class="trajeto-card"
          @click="$router.push(`/admin/trajetos/${trajeto.id}`)"
        >
          <div class="trajeto-header">
            <div class="trajeto-tipo">
              <span class="tipo-icon">{{ getTipoIcon(trajeto.tipo_servico) }}</span>
              <span class="tipo-label">{{ getTipoServicoLabel(trajeto.tipo_servico) }}</span>
            </div>
            <span class="trajeto-status" :class="trajeto.status">{{ getStatusLabel(trajeto.status) }}</span>
          </div>

          <div class="trajeto-body">
            <div class="info-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span>{{ trajeto.cliente?.primeiro_nome || trajeto.cliente?.nome || 'Cliente' }}</span>
            </div>
            <div class="info-row" v-if="trajeto.pet">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <span>{{ trajeto.pet?.nome_pet || 'Pet' }}</span>
            </div>
            <div class="info-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
                <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
              </svg>
              <span>{{ trajeto.veiculo?.placa || 'Veiculo' }}</span>
            </div>
          </div>

          <div class="trajeto-footer">
            <div class="trajeto-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{{ formatDate(trajeto.data_hora_agendada) }}</span>
            </div>
            <button v-if="trajeto.status === 'agendado'" class="btn-action primary" @click.stop="iniciarTrajeto(trajeto)">
              Iniciar
            </button>
            <button v-else-if="trajeto.status === 'em_andamento'" class="btn-action warning" @click.stop="$router.push(`/admin/trajetos/${trajeto.id}`)">
              Gerenciar
            </button>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router = useRouter()
const route = useRoute()
const isLoading = ref(true)
const sidebarOpen = ref(false)
const trajetos = ref([])
const activeFilter = ref('todos')

const token = localStorage.getItem('funcionario_token')

const filters = computed(() => [
  { label: 'Todos', value: 'todos', count: trajetos.value.length },
  { label: 'Agendados', value: 'agendado', count: trajetos.value.filter(t => t.status === 'agendado').length },
  { label: 'Em Andamento', value: 'em_andamento', count: trajetos.value.filter(t => t.status === 'em_andamento').length },
  { label: 'Concluidos', value: 'concluido', count: trajetos.value.filter(t => t.status === 'concluido').length },
  { label: 'Cancelados', value: 'cancelado', count: trajetos.value.filter(t => t.status === 'cancelado').length }
])

const filteredTrajetos = computed(() => {
  if (activeFilter.value === 'todos') return trajetos.value
  return trajetos.value.filter(t => t.status === activeFilter.value)
})

const getTipoServicoLabel = (tipo) => ({ 'buscar_pet': 'Buscar Pet', 'entregar_pet': 'Entregar Pet', 'consulta': 'Consulta', 'emergencia': 'Emergencia' }[tipo] || tipo)
const getTipoIcon = (tipo) => ({ 'buscar_pet': '🐕', 'entregar_pet': '🏠', 'consulta': '🏥', 'emergencia': '🚨' }[tipo] || '📍')
const getStatusLabel = (status) => ({ 'agendado': 'Agendado', 'em_andamento': 'Em Andamento', 'concluido': 'Concluido', 'cancelado': 'Cancelado' }[status] || status)

const formatDate = (dateStr) => {
  if (!dateStr) return 'Data nao informada'
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const fetchTrajetos = async () => {
  try {
    const response = await api.get('/trajetos', { headers: { 'Authorization': `Bearer ${token}` } })
    trajetos.value = response.data.data || response.data || []
  } catch (error) {
    console.error('Erro ao buscar trajetos:', error)
  }
}

const iniciarTrajeto = async (trajeto) => {
  const result = await Swal.fire({
    title: 'Iniciar Trajeto?',
    text: `Deseja iniciar o trajeto para ${trajeto.cliente?.primeiro_nome || 'o cliente'}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#0A3080',
    confirmButtonText: 'Iniciar',
    cancelButtonText: 'Cancelar'
  })
  if (!result.isConfirmed) return

  try {
    await api.post(`/trajetos/${trajeto.id}/iniciar`, {}, { headers: { 'Authorization': `Bearer ${token}` } })
    Swal.fire({ icon: 'success', title: 'Trajeto Iniciado!', confirmButtonColor: '#0A3080' })
    await fetchTrajetos()
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Nao foi possivel iniciar o trajeto.', confirmButtonColor: '#EF4444' })
  }
}

onMounted(async () => {
  if (!token) { router.push('/login/funcionario'); return }
  if (route.query.filtro) activeFilter.value = route.query.filtro
  isLoading.value = true
  await fetchTrajetos()
  isLoading.value = false
})
</script>

<style scoped>
@import '@/assets/variables.css';

.admin-layout { display: flex; min-height: 100vh; background: #F5F7FA; }

.main-content { flex: 1; margin-left: 240px; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
.top-bar { display: flex; justify-content: space-between; align-items: center; }
.top-bar-left { display: flex; align-items: center; gap: 16px; }
.btn-menu-mobile { display: none; background: none; border: none; cursor: pointer; color: var(--text-primary); }
.page-title { font-size: 24px; font-weight: 700; color: var(--text-primary); }
.btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #0A3080; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 500; text-decoration: none; cursor: pointer; transition: all 0.2s; }
.btn-primary:hover { background: #071D5E; }

.filters-row { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: white; border: 1px solid var(--border-color); border-radius: 20px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.filter-btn:hover { border-color: #0A3080; }
.filter-btn.active { background: #0A3080; border-color: #0A3080; color: white; }
.filter-count { background: rgba(0,0,0,0.1); padding: 2px 8px; border-radius: 10px; font-size: 11px; }
.filter-btn.active .filter-count { background: rgba(255,255,255,0.2); }

.loading-section { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 60px; color: var(--text-muted); }
.loading-spinner { width: 40px; height: 40px; border: 3px solid var(--border-color); border-top-color: #0A3080; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 60px; text-align: center; color: var(--text-muted); }
.empty-state h3 { color: var(--text-primary); font-size: 18px; margin: 0; }
.empty-state p { margin: 0; }

.trajetos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
.trajeto-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); cursor: pointer; transition: all 0.2s; }
.trajeto-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.trajeto-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.trajeto-tipo { display: flex; align-items: center; gap: 8px; }
.tipo-icon { font-size: 20px; }
.tipo-label { font-weight: 600; font-size: 15px; color: var(--text-primary); }
.trajeto-status { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
.trajeto-status.agendado { background: #DBEAFE; color: #1D4ED8; }
.trajeto-status.em_andamento { background: #FEF3C7; color: #D97706; }
.trajeto-status.concluido { background: #D1FAE5; color: #059669; }
.trajeto-status.cancelado { background: #FEE2E2; color: #DC2626; }
.trajeto-body { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.info-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-secondary); }
.info-row svg { color: var(--text-muted); flex-shrink: 0; }
.trajeto-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border-color); }
.trajeto-date { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }
.btn-action { padding: 8px 16px; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-action.primary { background: #0A3080; color: white; }
.btn-action.primary:hover { background: #071D5E; }
.btn-action.warning { background: #FEF3C7; color: #D97706; }

@media (max-width: 768px) {
  .main-content { margin-left: 0; padding: 16px; }
  .btn-menu-mobile { display: block; }
  .top-bar-right { display: none; }
  .trajetos-grid { grid-template-columns: 1fr; }
}
</style>
