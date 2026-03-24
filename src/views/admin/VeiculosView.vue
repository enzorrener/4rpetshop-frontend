<template>
  <div class="admin-layout">
    <AdminSidebar v-model:open="sidebarOpen" />

    <main class="main-content">
      <header class="top-bar">
        <div class="top-bar-left">
          <button class="btn-menu-mobile" @click="sidebarOpen = !sidebarOpen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h1 class="page-title">Veiculos</h1>
        </div>
        <div class="top-bar-right">
          <button class="btn-secondary" @click="sincronizar" :disabled="isSyncing">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: isSyncing }">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
            </svg>
            Sincronizar
          </button>
          <router-link to="/admin/veiculos/novo" class="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Novo Veiculo
          </router-link>
        </div>
      </header>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon total"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg></div>
          <div class="stat-info"><span class="stat-value">{{ veiculos.length }}</span><span class="stat-label">Total</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ativo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="stat-info"><span class="stat-value">{{ veiculos.filter(v => v.ativo).length }}</span><span class="stat-label">Ativos</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon inativo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
          <div class="stat-info"><span class="stat-value">{{ veiculos.filter(v => !v.ativo).length }}</span><span class="stat-label">Inativos</span></div>
        </div>
      </div>

      <div v-if="isLoading" class="loading-section">
        <span class="loading-spinner"></span>
        <p>Carregando veiculos...</p>
      </div>

      <div v-else-if="veiculos.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
          <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
        </svg>
        <h3>Nenhum veiculo cadastrado</h3>
        <p>Adicione um novo veiculo ou sincronize com a API</p>
        <router-link to="/admin/veiculos/novo" class="btn-primary">Adicionar Veiculo</router-link>
      </div>

      <div v-else class="veiculos-grid">
        <div v-for="veiculo in veiculos" :key="veiculo.id" class="veiculo-card" @click="$router.push(`/admin/veiculos/${veiculo.id}`)">
          <div class="veiculo-header">
            <div class="veiculo-icon" :class="{ ativo: veiculo.ativo }">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
                <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
              </svg>
            </div>
            <span class="veiculo-status" :class="{ ativo: veiculo.ativo, inativo: !veiculo.ativo }">
              {{ veiculo.ativo ? 'Ativo' : 'Inativo' }}
            </span>
          </div>
          <div class="veiculo-body">
            <h3 class="veiculo-placa">{{ veiculo.placa }}</h3>
            <p class="veiculo-modelo">{{ veiculo.identificacao || veiculo.modelo || 'Sem identificacao' }}</p>
            <div class="veiculo-tipo">
              <span class="tipo-badge">{{ veiculo.tipo === 'proprio' ? 'Proprio' : 'Terceiro' }}</span>
            </div>
          </div>
          <div class="veiculo-footer" v-if="veiculo.rastreador_id">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <span>Rastreador: {{ veiculo.rastreador_id }}</span>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router = useRouter()
const isLoading = ref(true)
const isSyncing = ref(false)
const sidebarOpen = ref(false)
const veiculos = ref([])

const token = localStorage.getItem('funcionario_token')

const fetchVeiculos = async () => {
  try {
    const response = await api.get('/veiculos', { headers: { 'Authorization': `Bearer ${token}` } })
    veiculos.value = response.data.data || response.data || []
  } catch (error) {
    console.error('Erro ao buscar veiculos:', error)
  }
}

const sincronizar = async () => {
  isSyncing.value = true
  try {
    await api.post('/veiculos/sincronizar', {}, { headers: { 'Authorization': `Bearer ${token}` } })
    Swal.fire({ icon: 'success', title: 'Sincronizado!', text: 'Veiculos atualizados com sucesso.', confirmButtonColor: '#0A3080' })
    await fetchVeiculos()
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Falha ao sincronizar veiculos.', confirmButtonColor: '#EF4444' })
  } finally {
    isSyncing.value = false
  }
}

onMounted(async () => {
  if (!token) { router.push('/login/funcionario'); return }
  isLoading.value = true
  await fetchVeiculos()
  isLoading.value = false
})
</script>

<style scoped>
@import '@/assets/variables.css';

.admin-layout { display: flex; min-height: 100vh; background: #F5F7FA; }

.main-content { flex: 1; margin-left: 240px; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
.top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.top-bar-left { display: flex; align-items: center; gap: 16px; }
.top-bar-right { display: flex; gap: 12px; }
.btn-menu-mobile { display: none; background: none; border: none; cursor: pointer; color: var(--text-primary); }
.page-title { font-size: 24px; font-weight: 700; color: var(--text-primary); }
.btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #0A3080; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 500; text-decoration: none; cursor: pointer; }
.btn-primary:hover { background: #071D5E; }
.btn-secondary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: white; color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; }
.btn-secondary:hover { border-color: #0A3080; color: #0A3080; }
.btn-secondary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-secondary svg.spinning { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.stat-card { background: white; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.stat-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
.stat-icon.total { background: linear-gradient(135deg, #0A3080 0%, #4A4E8C 100%); color: white; }
.stat-icon.ativo { background: linear-gradient(135deg, #10B981 0%, #34D399 100%); color: white; }
.stat-icon.inativo { background: linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%); color: white; }
.stat-info { display: flex; flex-direction: column; gap: 4px; }
.stat-value { font-size: 28px; font-weight: 700; color: var(--text-primary); }
.stat-label { font-size: 13px; color: var(--text-muted); }

.loading-section { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 60px; color: var(--text-muted); }
.loading-spinner { width: 40px; height: 40px; border: 3px solid var(--border-color); border-top-color: #0A3080; border-radius: 50%; animation: spin 0.8s linear infinite; }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 60px; text-align: center; color: var(--text-muted); }
.empty-state h3 { color: var(--text-primary); font-size: 18px; margin: 0; }
.empty-state p { margin: 0; }

.veiculos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.veiculo-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); cursor: pointer; transition: all 0.2s; }
.veiculo-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.veiculo-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.veiculo-icon { width: 52px; height: 52px; border-radius: 14px; background: #E5E7EB; color: #6B7280; display: flex; align-items: center; justify-content: center; }
.veiculo-icon.ativo { background: #D1FAE5; color: #059669; }
.veiculo-status { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
.veiculo-status.ativo { background: #D1FAE5; color: #059669; }
.veiculo-status.inativo { background: #F3F4F6; color: #6B7280; }
.veiculo-body { margin-bottom: 16px; }
.veiculo-placa { font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px 0; }
.veiculo-modelo { font-size: 14px; color: var(--text-secondary); margin: 0 0 12px 0; }
.tipo-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; background: #EEF2FF; color: #4F46E5; border-radius: 6px; }
.veiculo-footer { display: flex; align-items: center; gap: 6px; padding-top: 16px; border-top: 1px solid var(--border-color); font-size: 12px; color: var(--text-muted); }

@media (max-width: 1024px) { .stats-row { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .main-content { margin-left: 0; padding: 16px; }
  .btn-menu-mobile { display: block; }
  .top-bar-right { display: none; }
  .stats-row { grid-template-columns: 1fr; }
  .veiculos-grid { grid-template-columns: 1fr; }
}
</style>
