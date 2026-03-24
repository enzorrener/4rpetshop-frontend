<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <AdminSidebar v-model:open="sidebarOpen" />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Bar -->
      <header class="top-bar">
        <div class="top-bar-left">
          <button class="btn-menu-mobile" @click="sidebarOpen = !sidebarOpen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h1 class="page-title">Dashboard</h1>
        </div>
        <div class="top-bar-right">
          <button class="btn-refresh" @click="refreshData" :disabled="isLoading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: isLoading }">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
            </svg>
            Atualizar
          </button>
        </div>
      </header>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-card" @click="$router.push('/admin/trajetos?filtro=hoje')">
          <div class="stat-icon hoje">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.trajetosHoje }}</span>
            <span class="stat-label">Trajetos Hoje</span>
          </div>
        </div>

        <div class="stat-card" @click="$router.push('/admin/trajetos?filtro=em_andamento')">
          <div class="stat-icon andamento">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.trajetosEmAndamento }}</span>
            <span class="stat-label">Em Andamento</span>
          </div>
        </div>

        <div class="stat-card" @click="$router.push('/admin/veiculos')">
          <div class="stat-icon veiculos">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
              <circle cx="6.5" cy="16.5" r="2.5"/>
              <circle cx="16.5" cy="16.5" r="2.5"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.veiculosAtivos }}</span>
            <span class="stat-label">Veiculos Ativos</span>
          </div>
        </div>

        <div class="stat-card" @click="$router.push('/admin/trajetos?filtro=agendado')">
          <div class="stat-icon agendado">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.trajetosAgendados }}</span>
            <span class="stat-label">Agendados</span>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Map Section -->
        <div class="map-section">
          <div class="section-header">
            <h2 class="section-title">Rastreamento em Tempo Real</h2>
            <div class="map-info">
              <span class="last-update" v-if="lastUpdate">
                Atualizado: {{ lastUpdate }}
              </span>
              <div class="map-legend">
                <span class="legend-item">
                  <span class="legend-dot ativo"></span> Ativo
                </span>
                <span class="legend-item">
                  <span class="legend-dot em-movimento"></span> Em Movimento
                </span>
              </div>
            </div>
          </div>
          <div class="map-container" ref="mapContainer">
            <div v-if="!mapReady" class="map-loading">
              <span class="loading-spinner-lg"></span>
              <p>Carregando mapa...</p>
            </div>
            <div id="map" class="map"></div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="right-panel">
          <!-- Todos os Veiculos Posicionados -->
          <div class="panel-section">
            <div class="section-header">
              <h2 class="section-title">Veiculos no Mapa</h2>
              <span class="badge">{{ veiculosPosicoes.length }}</span>
            </div>
            <div class="veiculos-list" v-if="veiculosPosicoes.length > 0">
              <div
                v-for="veiculo in veiculosPosicoes"
                :key="veiculo.vehicleId"
                class="veiculo-item"
                @click="focusOnVehicle(veiculo)"
              >
                <div class="veiculo-icon" :class="{ 'em-movimento': parseInt(veiculo.speed) > 0 || veiculo.ignition === 'ON' }">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
                    <circle cx="6.5" cy="16.5" r="2.5"/>
                    <circle cx="16.5" cy="16.5" r="2.5"/>
                  </svg>
                </div>
                <div class="veiculo-info">
                  <span class="veiculo-placa">{{ veiculo.plate || 'Sem placa' }}</span>
                  <span class="veiculo-modelo">{{ veiculo.label || veiculo.deviceModel || 'Veiculo' }}</span>
                </div>
                <div class="veiculo-status">
                  <span class="veiculo-speed">{{ veiculo.speed || 0 }} km/h</span>
                  <span class="veiculo-ignition" :class="{ 'ligada': veiculo.ignition === 'ON' }">
                    {{ veiculo.ignition === 'ON' ? 'Ligado' : 'Desligado' }}
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
                <circle cx="6.5" cy="16.5" r="2.5"/>
                <circle cx="16.5" cy="16.5" r="2.5"/>
              </svg>
              <p>Nenhum veiculo encontrado</p>
            </div>
          </div>

          <!-- Trajetos em Andamento -->
          <div class="panel-section">
            <div class="section-header">
              <h2 class="section-title">Trajetos Ativos</h2>
              <router-link to="/admin/trajetos?filtro=em_andamento" class="section-link">Ver todos</router-link>
            </div>
            <div class="trajetos-list" v-if="trajetosEmAndamento.length > 0">
              <div
                v-for="trajeto in trajetosEmAndamento.slice(0, 5)"
                :key="trajeto.id"
                class="trajeto-item"
                @click="$router.push(`/admin/trajetos/${trajeto.id}`)"
              >
                <div class="trajeto-status-indicator"></div>
                <div class="trajeto-content">
                  <div class="trajeto-header">
                    <span class="trajeto-tipo">{{ getTipoServicoLabel(trajeto.tipo_servico) }}</span>
                    <span class="trajeto-time">{{ formatTime(trajeto.data_inicio) }}</span>
                  </div>
                  <div class="trajeto-details">
                    <span>{{ trajeto.cliente?.primeiro_nome || 'Cliente' }}</span>
                    <span class="separator">•</span>
                    <span>{{ trajeto.veiculo?.placa || 'Veiculo' }}</span>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
            <div v-else class="empty-state small">
              <p>Nenhum trajeto em andamento</p>
            </div>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router = useRouter()
const isLoading = ref(false)
const sidebarOpen = ref(false)
const mapReady = ref(false)
const mapContainer = ref(null)

let map = null
let markers = {}
let refreshInterval = null
let isFirstLoad = true

const token = localStorage.getItem('funcionario_token')

const stats = ref({
  trajetosHoje: 0,
  trajetosEmAndamento: 0,
  veiculosAtivos: 0,
  trajetosAgendados: 0
})

const trajetosEmAndamento = ref([])
const veiculosEmMovimento = ref([])
const veiculosPosicoes = ref([])
const lastUpdate = ref('')

const getTipoServicoLabel = (tipo) => {
  const tipos = {
    'buscar_pet': 'Buscar Pet',
    'entregar_pet': 'Entregar Pet',
    'consulta': 'Consulta',
    'emergencia': 'Emergencia'
  }
  return tipos[tipo] || tipo
}

const formatTime = (dateString) => {
  if (!dateString) return '--:--'
  const date = new Date(dateString)
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

const initMap = async () => {
  await nextTick()

  // Default: Sao Paulo
  const defaultLat = -23.5505
  const defaultLng = -46.6333

  map = L.map('map').setView([defaultLat, defaultLng], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  mapReady.value = true

  // Load vehicle positions
  await fetchPosicoes()
}

const fetchPosicoes = async (usarCache = true) => {
  try {
    const response = await api.get(`/posicoes/tempo-real?cache=${usarCache}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    const posicoes = response.data.data || response.data || []

    if (posicoes.length > 0) {
      veiculosPosicoes.value = posicoes
      lastUpdate.value = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

      // Filter vehicles in movement (usando campos da API STC)
      veiculosEmMovimento.value = posicoes.filter(p =>
        parseInt(p.speed) > 0 || p.ignition === 'ON'
      )

      // Update map markers
      updateMapMarkers(posicoes)
    }
  } catch (error) {
    console.error('Erro ao buscar posicoes:', error)
  }
}

const updateMapMarkers = (posicoes) => {
  if (!map) return

  const bounds = []

  posicoes.forEach(pos => {
    if (!pos.latitude || !pos.longitude) return

    const lat = parseFloat(pos.latitude)
    const lng = parseFloat(pos.longitude)

    if (isNaN(lat) || isNaN(lng)) return

    bounds.push([lat, lng])

    const key = String(pos.vehicleId || pos.veiculo_id || pos.id)
    const isMoving = parseInt(pos.speed) > 0 || pos.ignition === 'ON'

    const iconHtml = `
      <div class="custom-marker ${isMoving ? 'moving' : 'stopped'}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
          <circle cx="6.5" cy="16.5" r="2.5"/>
          <circle cx="16.5" cy="16.5" r="2.5"/>
        </svg>
      </div>
    `

    const icon = L.divIcon({
      html: iconHtml,
      className: 'vehicle-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })

    if (markers[key]) {
      markers[key].setLatLng([lat, lng])
      markers[key].setIcon(icon)
    } else {
      markers[key] = L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`
          <strong>${pos.plate || pos.placa || 'Veiculo'}</strong><br>
          ${pos.label || pos.identificacao || ''}<br>
          Velocidade: ${pos.speed || 0} km/h<br>
          Ignicao: ${pos.ignition === 'ON' ? 'Ligada' : 'Desligada'}<br>
          ${pos.address || ''}
        `)
    }
  })

  // Centraliza o mapa para mostrar todos os veículos (apenas no primeiro carregamento)
  if (bounds.length > 0 && isFirstLoad) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    isFirstLoad = false
  }
}

const focusOnVehicle = (veiculo) => {
  if (!map) return

  // O veículo clicado já é o objeto completo da lista
  if (veiculo && veiculo.latitude && veiculo.longitude) {
    const lat = parseFloat(veiculo.latitude)
    const lng = parseFloat(veiculo.longitude)
    map.setView([lat, lng], 16)

    // Abre o popup do marcador correspondente
    const key = String(veiculo.vehicleId || veiculo.veiculo_id || veiculo.id)
    if (markers[key]) {
      markers[key].openPopup()
    }
  }
}

const fetchStats = async () => {
  try {
    const [hojeRes, andamentoRes, veiculosRes, todosRes] = await Promise.allSettled([
      api.get('/trajetos/hoje', { headers: { 'Authorization': `Bearer ${token}` } }),
      api.get('/trajetos/em-andamento', { headers: { 'Authorization': `Bearer ${token}` } }),
      api.get('/veiculos/ativos', { headers: { 'Authorization': `Bearer ${token}` } }),
      api.get('/trajetos', { headers: { 'Authorization': `Bearer ${token}` } })
    ])

    if (hojeRes.status === 'fulfilled') {
      const data = hojeRes.value.data.data || hojeRes.value.data || []
      stats.value.trajetosHoje = Array.isArray(data) ? data.length : 0
    }

    if (andamentoRes.status === 'fulfilled') {
      const data = andamentoRes.value.data.data || andamentoRes.value.data || []
      trajetosEmAndamento.value = Array.isArray(data) ? data : []
      stats.value.trajetosEmAndamento = trajetosEmAndamento.value.length
    }

    if (veiculosRes.status === 'fulfilled') {
      const data = veiculosRes.value.data.data || veiculosRes.value.data || []
      stats.value.veiculosAtivos = Array.isArray(data) ? data.length : 0
    }

    if (todosRes.status === 'fulfilled') {
      const data = todosRes.value.data.data || todosRes.value.data || []
      if (Array.isArray(data)) {
        stats.value.trajetosAgendados = data.filter(t => t.status === 'agendado').length
      }
    }
  } catch (error) {
    console.error('Erro ao buscar estatisticas:', error)
  }
}

const refreshData = async () => {
  isLoading.value = true
  // Força busca sem cache ao clicar em Atualizar
  await Promise.all([fetchStats(), fetchPosicoes(false)])
  isLoading.value = false
}

onMounted(async () => {
  if (!token) {
    router.push('/login/funcionario')
    return
  }

  isLoading.value = true
  await fetchStats()
  isLoading.value = false

  // Init map after stats
  await initMap()

  // Auto refresh every 60 seconds (respeitando rate limit da API STC: 1 req/min)
  refreshInterval = setInterval(() => {
    fetchPosicoes(false)
  }, 60000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
@import '@/assets/variables.css';

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #F5F7FA;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Top Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-menu-mobile {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.btn-refresh:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-refresh svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.hoje { background: linear-gradient(135deg, #0A3080 0%, #4A4E8C 100%); color: white; }
.stat-icon.andamento { background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%); color: white; }
.stat-icon.veiculos { background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%); color: white; }
.stat-icon.agendado { background: linear-gradient(135deg, #10B981 0%, #34D399 100%); color: white; }

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  flex: 1;
}

/* Map Section */
.map-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.map-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.last-update {
  font-size: 11px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 4px;
}

.map-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-dot.ativo { background: #3B82F6; }
.legend-dot.em-movimento { background: #10B981; }

.map-container {
  flex: 1;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #E5E7EB;
  z-index: 1;
}

.map {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

/* Garante que elementos do Leaflet fiquem abaixo do sidebar no mobile */
:deep(.leaflet-pane) {
  z-index: 1 !important;
}

:deep(.leaflet-top),
:deep(.leaflet-bottom) {
  z-index: 2 !important;
}

:deep(.leaflet-control) {
  z-index: 2 !important;
}

.map-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #F5F7FA;
  color: var(--text-muted);
  font-size: 14px;
  z-index: 10;
}

.loading-spinner-lg {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Right Panel */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.badge {
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.section-link {
  font-size: 13px;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.section-link:hover {
  text-decoration: underline;
}

/* Veiculos List */
.veiculos-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  max-height: 340px;
  overflow-y: auto;
  padding-right: 8px;
}

.veiculos-list::-webkit-scrollbar {
  width: 6px;
}

.veiculos-list::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.veiculos-list::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}

.veiculos-list::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

.veiculo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.veiculo-item:hover {
  background: #F3F4F6;
}

.veiculo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.veiculo-icon.em-movimento {
  background: #D1FAE5;
  color: #059669;
}

.veiculo-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.veiculo-placa {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.veiculo-modelo {
  font-size: 12px;
  color: var(--text-muted);
}

.veiculo-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.veiculo-speed {
  font-size: 13px;
  font-weight: 600;
  color: #059669;
}

.veiculo-ignition {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEE2E2;
  color: #DC2626;
}

.veiculo-ignition.ligada {
  background: #D1FAE5;
  color: #059669;
}

/* Trajetos List */
.trajetos-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.trajeto-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.trajeto-item:hover {
  background: #F3F4F6;
}

.trajeto-status-indicator {
  width: 8px;
  height: 8px;
  background: #F59E0B;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.trajeto-content {
  flex: 1;
}

.trajeto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.trajeto-tipo {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary);
}

.trajeto-time {
  font-size: 12px;
  color: var(--text-muted);
}

.trajeto-details {
  font-size: 12px;
  color: var(--text-muted);
}

.separator {
  margin: 0 6px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px;
  color: var(--text-muted);
}

.empty-state.small {
  padding: 24px;
}

.empty-state svg {
  opacity: 0.4;
}

.empty-state p {
  font-size: 13px;
}

/* Custom Marker */
:deep(.custom-marker) {
  width: 32px;
  height: 32px;
  background: #3B82F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.custom-marker.moving) {
  background: #10B981;
}

:deep(.custom-marker.stopped) {
  background: #6B7280;
}

:deep(.vehicle-marker) {
  background: transparent !important;
  border: none !important;
}

/* Responsive */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .right-panel {
    flex-direction: row;
  }

  .panel-section {
    flex: 1;
  }
}

@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
  }

  .btn-menu-mobile {
    display: block;
  }

  .right-panel {
    flex-direction: column;
  }

  .stats-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-icon {
    width: 44px;
    height: 44px;
  }

  .stat-value {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 18px;
  }

  .top-bar-right {
    display: none;
  }
}
</style>
