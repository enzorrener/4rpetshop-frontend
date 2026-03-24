<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <AdminSidebar v-model:open="sidebarOpen" />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Header -->
      <header class="top-header">
        <button class="menu-btn" @click="sidebarOpen = true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h1 class="page-title">Detalhes do Trajeto</h1>
        <div class="header-actions">
          <button
            v-if="trajeto && trajeto.status !== 'concluido' && trajeto.status !== 'cancelado'"
            type="button"
            class="btn-cancel-header"
            @click="cancelarTrajeto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <span>Cancelar</span>
          </button>
          <button type="button" class="btn-back" @click="$router.push('/admin/trajetos')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/>
              <path d="M12 19l-7-7 7-7"/>
            </svg>
            <span>Voltar</span>
          </button>
        </div>
      </header>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Loading -->
        <div v-if="isLoading" class="loading-section">
          <span class="loading-spinner-lg"></span>
          <p>Carregando trajeto...</p>
        </div>

        <template v-else-if="trajeto">
          <div class="details-grid">
            <!-- Left Column -->
            <div class="left-column">
              <!-- Status Banner -->
              <div class="status-banner" :class="trajeto.status">
                <span class="status-icon">{{ getStatusIcon(trajeto.status) }}</span>
                <div class="status-info">
                  <span class="status-label">{{ getStatusLabel(trajeto.status) }}</span>
                  <span class="status-time" v-if="trajeto.status === 'em_andamento'">
                    Iniciado {{ formatTimeAgo(trajeto.data_hora_inicio) }}
                  </span>
                  <span class="status-time" v-else-if="trajeto.status === 'concluido'">
                    Concluido em {{ formatDate(trajeto.data_hora_fim) }}
                  </span>
                </div>
              </div>

              <!-- Info Cards -->
              <div class="info-section">
                <h2 class="section-title">Informacoes</h2>
                <div class="info-grid">
                  <div class="info-card">
                    <span class="info-icon">{{ getTipoIcon(trajeto.tipo_servico) }}</span>
                    <div class="info-text">
                      <span class="info-label">Servico</span>
                      <span class="info-value">{{ getTipoServicoLabel(trajeto.tipo_servico) }}</span>
                    </div>
                  </div>
                  <div class="info-card">
                    <span class="info-icon">🚗</span>
                    <div class="info-text">
                      <span class="info-label">Veiculo</span>
                      <span class="info-value">{{ trajeto.veiculo?.placa || 'N/A' }}</span>
                    </div>
                  </div>
                  <div class="info-card">
                    <span class="info-icon">👤</span>
                    <div class="info-text">
                      <span class="info-label">Cliente</span>
                      <span class="info-value">{{ trajeto.cliente?.nome || trajeto.cliente?.primeiro_nome || 'N/A' }}</span>
                    </div>
                  </div>
                  <div class="info-card" v-if="trajeto.pet">
                    <span class="info-icon">🐾</span>
                    <div class="info-text">
                      <span class="info-label">Pet</span>
                      <span class="info-value">{{ trajeto.pet?.nome_pet || 'N/A' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Data Agendada -->
              <div class="schedule-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Agendado para {{ formatDate(trajeto.data_hora_agendada) }}</span>
              </div>

              <!-- Observacoes -->
              <div class="obs-section" v-if="trajeto.observacoes">
                <h2 class="section-title">Observacoes</h2>
                <p class="obs-text">{{ trajeto.observacoes }}</p>
              </div>
            </div>

            <!-- Right Column -->
            <div class="right-column">
              <!-- Acoes -->
              <div class="actions-section" v-if="trajeto.status !== 'concluido' && trajeto.status !== 'cancelado'">
                <h2 class="section-title">Acoes</h2>

                <!-- Botao Iniciar -->
                <button
                  v-if="trajeto.status === 'agendado'"
                  class="btn-action-main iniciar"
                  @click="iniciarTrajeto"
                  :disabled="isProcessing"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  <span>Iniciar Trajeto</span>
                </button>

                <!-- Botoes de Eventos -->
                <div v-if="trajeto.status === 'em_andamento'" class="eventos-buttons">
                  <button
                    v-for="evento in eventosDisponiveis"
                    :key="evento.tipo"
                    class="btn-evento"
                    :class="{ done: isEventoDone(evento.tipo) }"
                    :disabled="!canRegisterEvento(evento.tipo) || isProcessing"
                    @click="registrarEvento(evento.tipo)"
                  >
                    <span class="evento-icon">{{ evento.icon }}</span>
                    <span class="evento-label">{{ evento.label }}</span>
                    <svg v-if="isEventoDone(evento.tipo)" class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                </div>

                <!-- Botao Finalizar -->
                <button
                  v-if="trajeto.status === 'em_andamento' && canFinalize"
                  class="btn-action-main finalizar"
                  @click="finalizarTrajeto"
                  :disabled="isProcessing"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>Finalizar Trajeto</span>
                </button>
              </div>

              <!-- Timeline de Eventos -->
              <div class="timeline-section">
                <h2 class="section-title">Timeline</h2>
                <div class="timeline" v-if="trajeto.eventos && trajeto.eventos.length > 0">
                  <div
                    v-for="(evento, index) in trajeto.eventos"
                    :key="evento.id"
                    class="timeline-item"
                    :class="{ last: index === trajeto.eventos.length - 1 }"
                  >
                    <div class="timeline-marker">
                      <span class="marker-icon">{{ getEventoIcon(evento.tipo_evento) }}</span>
                    </div>
                    <div class="timeline-content">
                      <span class="timeline-title">{{ getEventoLabel(evento.tipo_evento) }}</span>
                      <span class="timeline-time">{{ formatDate(evento.data_hora_evento) }}</span>
                      <span class="timeline-location" v-if="evento.endereco">{{ evento.endereco }}</span>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-timeline">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <p>Nenhum evento registrado ainda.</p>
                </div>
              </div>
            </div>
          </div>
        </template>
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
const isProcessing = ref(false)
const trajeto = ref(null)
const sidebarOpen = ref(false)

const token = localStorage.getItem('funcionario_token')
const trajetoId = computed(() => route.params.id)

const eventosDisponiveis = [
  { tipo: 'saiu_empresa', label: 'Saiu da Empresa', icon: '🏢' },
  { tipo: 'chegou_cliente', label: 'Chegou no Cliente', icon: '📍' },
  { tipo: 'saiu_cliente', label: 'Saiu do Cliente', icon: '🚗' },
  { tipo: 'chegou_empresa', label: 'Chegou na Empresa', icon: '🏁' }
]

const eventosRegistrados = computed(() => {
  if (!trajeto.value?.eventos) return []
  return trajeto.value.eventos.map(e => e.tipo_evento)
})

const canFinalize = computed(() => {
  return eventosRegistrados.value.includes('chegou_empresa')
})

const getStatusLabel = (status) => {
  const statuses = {
    'agendado': 'Agendado',
    'em_andamento': 'Em Andamento',
    'concluido': 'Concluido',
    'cancelado': 'Cancelado'
  }
  return statuses[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    'agendado': '📅',
    'em_andamento': '🚗',
    'concluido': '✅',
    'cancelado': '❌'
  }
  return icons[status] || '📍'
}

const getTipoServicoLabel = (tipo) => {
  const tipos = {
    'buscar_pet': 'Buscar Pet',
    'entregar_pet': 'Entregar Pet',
    'consulta': 'Consulta',
    'emergencia': 'Emergencia'
  }
  return tipos[tipo] || tipo
}

const getTipoIcon = (tipo) => {
  const icons = {
    'buscar_pet': '🐕',
    'entregar_pet': '🏠',
    'consulta': '🏥',
    'emergencia': '🚨'
  }
  return icons[tipo] || '📍'
}

const getEventoLabel = (tipo) => {
  const labels = {
    'saiu_empresa': 'Saiu da Empresa',
    'chegou_cliente': 'Chegou no Cliente',
    'saiu_cliente': 'Saiu do Cliente',
    'chegou_empresa': 'Chegou na Empresa'
  }
  return labels[tipo] || tipo
}

const getEventoIcon = (tipo) => {
  const icons = {
    'saiu_empresa': '🏢',
    'chegou_cliente': '📍',
    'saiu_cliente': '🚗',
    'chegou_empresa': '🏁'
  }
  return icons[tipo] || '📌'
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'agora'
  if (diffMins < 60) return `ha ${diffMins}min`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `ha ${diffHours}h`
  return formatDate(dateStr)
}

const isEventoDone = (tipo) => {
  return eventosRegistrados.value.includes(tipo)
}

const canRegisterEvento = (tipo) => {
  const order = ['saiu_empresa', 'chegou_cliente', 'saiu_cliente', 'chegou_empresa']
  const currentIndex = order.indexOf(tipo)

  if (isEventoDone(tipo)) return false
  if (currentIndex === 0) return true

  const previousEvento = order[currentIndex - 1]
  return isEventoDone(previousEvento)
}

const fetchTrajeto = async () => {
  try {
    const response = await api.get(`/trajetos/${trajetoId.value}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    trajeto.value = response.data.data || response.data
  } catch (error) {
    console.error('Erro ao buscar trajeto:', error)
    if (error.response?.status === 404) {
      await Swal.fire({
        icon: 'error',
        title: 'Trajeto nao encontrado',
        confirmButtonColor: '#0A3080'
      })
      router.push('/admin/trajetos')
    }
  }
}

const iniciarTrajeto = async () => {
  const result = await Swal.fire({
    icon: 'question',
    title: 'Iniciar Trajeto',
    text: 'Deseja iniciar este trajeto agora?',
    showCancelButton: true,
    confirmButtonColor: '#0A3080',
    cancelButtonColor: '#9CA3AF',
    confirmButtonText: 'Iniciar',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  isProcessing.value = true
  try {
    await api.post(`/trajetos/${trajetoId.value}/iniciar`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    await fetchTrajeto()
    Swal.fire({
      icon: 'success',
      title: 'Trajeto Iniciado!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Nao foi possivel iniciar o trajeto.',
      confirmButtonColor: '#EF4444'
    })
  } finally {
    isProcessing.value = false
  }
}

const registrarEvento = async (tipoEvento) => {
  isProcessing.value = true
  try {
    await api.post(`/trajetos/${trajetoId.value}/eventos`, {
      tipo_evento: tipoEvento
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    await fetchTrajeto()
    Swal.fire({
      icon: 'success',
      title: 'Evento Registrado!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Nao foi possivel registrar o evento.',
      confirmButtonColor: '#EF4444'
    })
  } finally {
    isProcessing.value = false
  }
}

const finalizarTrajeto = async () => {
  const result = await Swal.fire({
    icon: 'question',
    title: 'Finalizar Trajeto',
    text: 'Deseja finalizar este trajeto?',
    showCancelButton: true,
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#9CA3AF',
    confirmButtonText: 'Finalizar',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  isProcessing.value = true
  try {
    await api.post(`/trajetos/${trajetoId.value}/finalizar`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    await fetchTrajeto()
    Swal.fire({
      icon: 'success',
      title: 'Trajeto Finalizado!',
      text: 'O trajeto foi concluido com sucesso.',
      confirmButtonColor: '#10B981'
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Nao foi possivel finalizar o trajeto.',
      confirmButtonColor: '#EF4444'
    })
  } finally {
    isProcessing.value = false
  }
}

const cancelarTrajeto = async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Cancelar Trajeto',
    text: 'Tem certeza que deseja cancelar este trajeto?',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#9CA3AF',
    confirmButtonText: 'Sim, Cancelar',
    cancelButtonText: 'Nao'
  })

  if (!result.isConfirmed) return

  isProcessing.value = true
  try {
    await api.post(`/trajetos/${trajetoId.value}/cancelar`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    await fetchTrajeto()
    Swal.fire({
      icon: 'info',
      title: 'Trajeto Cancelado',
      confirmButtonColor: '#0A3080'
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Nao foi possivel cancelar o trajeto.',
      confirmButtonColor: '#EF4444'
    })
  } finally {
    isProcessing.value = false
  }
}

onMounted(async () => {
  if (!token) {
    router.push('/login')
    return
  }

  isLoading.value = true
  await fetchTrajeto()
  isLoading.value = false
})
</script>

<style scoped>
/* Layout */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #F8F9FA;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

/* Top Header */
.top-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E5E7EB;
}

.menu-btn {
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
  padding: 4px;
}

@media (min-width: 1024px) {
  .menu-btn {
    display: none;
  }
}

.page-title {
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  color: #0A3080;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-cancel-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #FEE2E2;
  border: none;
  border-radius: 8px;
  color: #EF4444;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel-header:hover {
  background: #FECACA;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F3F4F6;
  border: none;
  border-radius: 8px;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-back:hover {
  background: #E5E7EB;
}

/* Content Area */
.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

/* Loading */
.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 0;
  color: #6B7280;
  font-size: 14px;
}

.loading-spinner-lg {
  width: 40px;
  height: 40px;
  border: 3px solid #E5E7EB;
  border-top-color: #0A3080;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .details-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Section Title */
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 12px 0;
}

/* Status Banner */
.status-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
}

.status-banner.agendado {
  background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
}

.status-banner.em_andamento {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
}

.status-banner.concluido {
  background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
}

.status-banner.cancelado {
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
}

.status-icon {
  font-size: 40px;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-label {
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
}

.status-time {
  font-size: 13px;
  color: #6B7280;
}

/* Info Section */
.info-section {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #F9FAFB;
  border-radius: 12px;
}

.info-icon {
  font-size: 28px;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.info-label {
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Schedule Card */
.schedule-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: white;
  border-radius: 12px;
  font-size: 14px;
  color: #6B7280;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.schedule-card svg {
  color: #0A3080;
  flex-shrink: 0;
}

/* Observacoes */
.obs-section {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.obs-text {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
}

/* Actions Section */
.actions-section {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.btn-action-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action-main.iniciar {
  background: linear-gradient(135deg, #0A3080 0%, #3D4290 100%);
}

.btn-action-main.finalizar {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
  margin-top: 16px;
}

.btn-action-main:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-action-main:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Eventos Buttons */
.eventos-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.btn-evento {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-evento:not(:disabled):hover {
  border-color: #0A3080;
  background: #EEEEF5;
}

.btn-evento:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-evento.done {
  border-color: #10B981;
  background: #D1FAE5;
}

.evento-icon {
  font-size: 28px;
}

.evento-label {
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-align: center;
}

.btn-evento.done .evento-label {
  color: #059669;
}

.check-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #10B981;
}

/* Timeline */
.timeline-section {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: 16px;
  padding-bottom: 20px;
  position: relative;
}

.timeline-item:not(.last)::before {
  content: '';
  position: absolute;
  left: 23px;
  top: 50px;
  bottom: 0;
  width: 2px;
  background: #E5E7EB;
}

.timeline-marker {
  width: 48px;
  height: 48px;
  background: #EEEEF5;
  border: 2px solid #0A3080;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.marker-icon {
  font-size: 20px;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
}

.timeline-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.timeline-time {
  font-size: 12px;
  color: #9CA3AF;
}

.timeline-location {
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
}

.empty-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px;
  color: #9CA3AF;
}

.empty-timeline svg {
  color: #D1D5DB;
}

.empty-timeline p {
  margin: 0;
  font-size: 14px;
}
</style>
