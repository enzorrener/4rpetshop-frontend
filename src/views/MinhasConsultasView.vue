<template>
  <div class="consultas-page">

    <!-- Topbar Desktop -->
    <header class="consultas-topbar">
      <button class="topbar-back" @click="$router.push('/dashboard')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        <span>Voltar</span>
      </button>
      <h1 class="topbar-title">Minhas Consultas</h1>
      <router-link to="/agendarConsulta" class="topbar-action">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        <span>Nova</span>
      </router-link>
    </header>

    <!-- Layout Principal -->
    <div class="consultas-layout">

      <!-- Sidebar Desktop -->
      <aside class="consultas-sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Consultas</h2>
          <p class="sidebar-subtitle">Gerencie seus agendamentos</p>
        </div>

        <div class="sidebar-stats">
          <div class="stat-card stat-agendadas">
            <div class="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ consultasAgendadas.length }}</span>
              <span class="stat-label">Agendadas</span>
            </div>
          </div>

          <div class="stat-card stat-concluidas">
            <div class="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ consultasConcluidas.length }}</span>
              <span class="stat-label">Concluídas</span>
            </div>
          </div>
        </div>

        <router-link to="/agendarConsulta" class="btn-nova-consulta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Agendar Nova Consulta
        </router-link>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="consultas-main">

        <!-- Header Mobile -->
        <div class="mobile-header">
          <button class="btn-back-mobile" @click="$router.push('/dashboard')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="mobile-title-block">
            <h1 class="mobile-title">Minhas Consultas</h1>
            <p class="mobile-subtitle">{{ totalConsultas }} consultas</p>
          </div>
          <router-link to="/agendarConsulta" class="btn-add-mobile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </router-link>
        </div>

        <!-- Tabs -->
        <div class="consultas-tabs">
          <button
            class="tab-btn"
            :class="{ 'tab-active': tabAtiva === 'agendadas' }"
            @click="tabAtiva = 'agendadas'"
          >
            Agendadas
            <span v-if="consultasAgendadas.length" class="tab-badge">{{ consultasAgendadas.length }}</span>
          </button>
          <button
            class="tab-btn"
            :class="{ 'tab-active': tabAtiva === 'historico' }"
            @click="tabAtiva = 'historico'"
          >
            Histórico
            <span v-if="consultasConcluidas.length" class="tab-badge tab-badge-gray">{{ consultasConcluidas.length }}</span>
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <span class="loading-spinner"></span>
          <p>Carregando consultas...</p>
        </div>

        <!-- Lista de Consultas Agendadas -->
        <div v-else-if="tabAtiva === 'agendadas'" class="consultas-list">
          <div v-if="consultasAgendadas.length === 0" class="empty-state">
            <div class="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 class="empty-title">Nenhuma consulta agendada</h3>
            <p class="empty-desc">Agende uma consulta para seu pet</p>
            <router-link to="/agendarConsulta" class="btn-agendar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Agendar Consulta
            </router-link>
          </div>

          <div
            v-for="consulta in consultasAgendadas"
            :key="consulta.id"
            class="consulta-card"
            :class="{ 'consulta-proxima': isProxima(consulta) }"
          >
            <div v-if="isProxima(consulta)" class="consulta-badge-proxima">Próxima</div>

            <div class="consulta-header">
              <div class="consulta-data">
                <span class="data-dia">{{ formatarDia(consulta.data) }}</span>
                <span class="data-mes">{{ formatarMes(consulta.data) }}</span>
              </div>
              <div class="consulta-info">
                <span class="consulta-servico">{{ consulta.servico }}</span>
                <span class="consulta-horario">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ consulta.horario }}
                </span>
              </div>
              <div class="consulta-status" :class="'status-' + consulta.status">
                {{ statusLabel(consulta.status) }}
              </div>
            </div>

            <div class="consulta-body">
              <div class="consulta-pet">
                <div class="pet-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/>
                    <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 00-.42-3.31"/>
                  </svg>
                </div>
                <span class="pet-nome">{{ consulta.petNome }}</span>
              </div>

              <div class="consulta-valor">
                R$ {{ consulta.valor }}
              </div>
            </div>

            <div class="consulta-actions">
              <button class="btn-action btn-cancelar" @click="cancelarConsulta(consulta)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Cancelar
              </button>
              <button class="btn-action btn-reagendar" @click="reagendarConsulta(consulta)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Reagendar
              </button>
            </div>
          </div>
        </div>

        <!-- Histórico -->
        <div v-else class="consultas-list">
          <div v-if="consultasConcluidas.length === 0" class="empty-state">
            <div class="empty-icon empty-icon-gray">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 class="empty-title">Nenhuma consulta realizada</h3>
            <p class="empty-desc">O histórico de consultas aparecerá aqui</p>
          </div>

          <div
            v-for="consulta in consultasConcluidas"
            :key="consulta.id"
            class="consulta-card consulta-concluida"
          >
            <div class="consulta-header">
              <div class="consulta-data">
                <span class="data-dia">{{ formatarDia(consulta.data) }}</span>
                <span class="data-mes">{{ formatarMes(consulta.data) }}</span>
              </div>
              <div class="consulta-info">
                <span class="consulta-servico">{{ consulta.servico }}</span>
                <span class="consulta-horario">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ consulta.horario }}
                </span>
              </div>
              <div class="consulta-status status-concluido">
                Concluída
              </div>
            </div>

            <div class="consulta-body">
              <div class="consulta-pet">
                <div class="pet-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/>
                    <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 00-.42-3.31"/>
                  </svg>
                </div>
                <span class="pet-nome">{{ consulta.petNome }}</span>
              </div>

              <div class="consulta-valor">
                R$ {{ consulta.valor }}
              </div>
            </div>

            <div class="consulta-actions">
              <button class="btn-action btn-agendar-novamente" @click="agendarNovamente(consulta)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Agendar Novamente
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- Bottom Nav (mobile) -->
    <nav class="bottom-nav">
      <router-link to="/dashboard" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Início</span>
      </router-link>
      <a href="#" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span>Loja</span>
      </a>
      <div class="nav-item nav-center">
        <router-link to="/cadastroPet" class="nav-add-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </router-link>
      </div>
      <router-link to="/minhasConsultas" class="nav-item router-link-active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>Consultas</span>
      </router-link>
      <router-link to="/editarPerfil" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Perfil</span>
      </router-link>
    </nav>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado
const loading = ref(true)
const tabAtiva = ref('agendadas')
const consultas = ref([])

// Computed
const consultasAgendadas = computed(() => {
  return consultas.value.filter(c => ['agendado', 'confirmado'].includes(c.status))
})

const consultasConcluidas = computed(() => {
  return consultas.value.filter(c => c.status === 'concluido')
})

const totalConsultas = computed(() => {
  return consultas.value.length
})

// Carregar dados
onMounted(async () => {
  try {
    // Simular chamada de API com dados mockados
    await new Promise(resolve => setTimeout(resolve, 800))

    // Dados mockados (futuramente virão da API)
    consultas.value = [
      {
        id: 1,
        petNome: 'Thor',
        servico: 'Consulta Geral',
        data: new Date(2026, 3, 8), // 8 de Abril
        horario: '09:30',
        valor: '120,00',
        status: 'agendado'
      },
      {
        id: 2,
        petNome: 'Luna',
        servico: 'Vacinação',
        data: new Date(2026, 3, 15), // 15 de Abril
        horario: '14:00',
        valor: '80,00',
        status: 'confirmado'
      },
      {
        id: 3,
        petNome: 'Thor',
        servico: 'Banho e Tosa',
        data: new Date(2026, 2, 20), // 20 de Março (passado)
        horario: '10:00',
        valor: '90,00',
        status: 'concluido'
      },
      {
        id: 4,
        petNome: 'Luna',
        servico: 'Consulta Geral',
        data: new Date(2026, 1, 10), // 10 de Fevereiro (passado)
        horario: '15:30',
        valor: '120,00',
        status: 'concluido'
      }
    ]
  } catch (error) {
    console.error('Erro ao carregar consultas:', error)
  } finally {
    loading.value = false
  }
})

// Métodos
const formatarDia = (data) => {
  return data.getDate().toString().padStart(2, '0')
}

const formatarMes = (data) => {
  const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
  return meses[data.getMonth()]
}

const isProxima = (consulta) => {
  const agora = new Date()
  const dataConsulta = new Date(consulta.data)

  // Retorna true se for a próxima consulta (mais próxima do momento atual)
  const consultasFuturas = consultasAgendadas.value
    .filter(c => new Date(c.data) >= agora)
    .sort((a, b) => new Date(a.data) - new Date(b.data))

  return consultasFuturas.length > 0 && consultasFuturas[0].id === consulta.id
}

const statusLabel = (status) => {
  const labels = {
    agendado: 'Agendado',
    confirmado: 'Confirmado',
    cancelado: 'Cancelado',
    concluido: 'Concluído'
  }
  return labels[status] || status
}

const cancelarConsulta = (consulta) => {
  if (confirm(`Deseja cancelar a consulta de ${consulta.petNome}?`)) {
    // Futuramente: chamar API para cancelar
    consultas.value = consultas.value.filter(c => c.id !== consulta.id)
    alert('Consulta cancelada com sucesso!')
  }
}

const reagendarConsulta = (consulta) => {
  localStorage.setItem('consultaPetId', '1') // ID mockado
  localStorage.setItem('consultaPetNome', consulta.petNome)
  router.push('/agendamentoForm')
}

const agendarNovamente = (consulta) => {
  localStorage.setItem('consultaPetId', '1') // ID mockado
  localStorage.setItem('consultaPetNome', consulta.petNome)
  router.push('/agendarConsulta')
}
</script>

<style scoped>
/* ===== BASE ===== */
.consultas-page {
  min-height: 100vh;
  width: 100%;
  background: #F1F5F9;
  display: flex;
  flex-direction: column;
}

/* ===== TOPBAR DESKTOP ===== */
.consultas-topbar {
  display: none;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 2rem;
  background: linear-gradient(135deg, #0A3080 0%, #1155CC 100%);
  position: sticky;
  top: 0;
  z-index: 20;
}

.topbar-back {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  color: white;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.topbar-back:hover { background: rgba(255,255,255,0.25); }

.topbar-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.3px;
}

.topbar-action {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F07020;
  color: white;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
}
.topbar-action:hover { background: #D4600A; }

/* ===== LAYOUT ===== */
.consultas-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ===== SIDEBAR (desktop) ===== */
.consultas-sidebar { display: none; }

/* ===== MAIN ===== */
.consultas-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1rem 90px;
  gap: 1rem;
}

/* ===== MOBILE HEADER ===== */
.mobile-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-back-mobile {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #0A1F44;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.mobile-title-block { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.mobile-title { font-size: 22px; font-weight: 800; color: #0A1F44; line-height: 1; }
.mobile-subtitle { font-size: 13px; color: #64748B; }

.btn-add-mobile {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #F07020, #D4600A);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(240,112,32,0.35);
}

/* ===== TABS ===== */
.consultas-tabs {
  display: flex;
  gap: 8px;
  background: white;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover { background: #F8FAFC; color: #0A1F44; }

.tab-active {
  background: linear-gradient(135deg, #1155CC, #0A3080) !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(17,85,204,0.35);
}

.tab-badge {
  background: rgba(255,255,255,0.25);
  color: inherit;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
}

.tab-btn:not(.tab-active) .tab-badge {
  background: #E8ECF0;
  color: #64748B;
}

.tab-badge-gray {
  background: #E8ECF0 !important;
  color: #64748B !important;
}

/* ===== LOADING ===== */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 60px 0;
  color: #94A3B8;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #E2E8F0;
  border-top-color: #F07020;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ===== EMPTY STATE ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #EFF6FF;
  color: #1155CC;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon-gray {
  background: #F1F5F9;
  color: #94A3B8;
}

.empty-title { font-size: 18px; font-weight: 700; color: #374151; margin: 0; }
.empty-desc { font-size: 14px; color: #94A3B8; margin: 0; }

.btn-agendar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #F07020, #D4600A);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(240,112,32,0.35);
}

.btn-agendar:hover { transform: translateY(-1px); }

/* ===== CONSULTA CARD ===== */
.consultas-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.consulta-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #E8ECF0;
  position: relative;
}

.consulta-proxima {
  border-color: #1155CC;
  box-shadow: 0 4px 16px rgba(17,85,204,0.12);
}

.consulta-badge-proxima {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.consulta-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 1rem;
  border-bottom: 1px solid #F1F5F9;
}

.consulta-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 48px;
  background: #F8FAFC;
  border-radius: 10px;
  padding: 8px 12px;
}

.data-dia {
  font-size: 20px;
  font-weight: 800;
  color: #0A1F44;
  line-height: 1;
}

.data-mes {
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
}

.consulta-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.consulta-servico {
  font-size: 16px;
  font-weight: 700;
  color: #0A1F44;
}

.consulta-horario {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748B;
}

.consulta-status {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-agendado {
  background: #FEF3C7;
  color: #D97706;
}

.status-confirmado {
  background: #DCFCE7;
  color: #16A34A;
}

.status-concluido {
  background: #F1F5F9;
  color: #64748B;
}

.consulta-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.consulta-pet {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pet-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #EFF6FF;
  color: #1155CC;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-nome {
  font-size: 14px;
  font-weight: 600;
  color: #0A1F44;
}

.consulta-valor {
  font-size: 16px;
  font-weight: 700;
  color: #10B981;
}

.consulta-actions {
  display: flex;
  gap: 8px;
  padding: 0 1rem 1rem;
}

.btn-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancelar {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
}

.btn-cancelar:hover {
  background: #FEE2E2;
}

.btn-reagendar {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1D4ED8;
}

.btn-reagendar:hover {
  background: #DBEAFE;
}

.btn-agendar-novamente {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  color: #0A1F44;
}

.btn-agendar-novamente:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}

.consulta-concluida {
  opacity: 0.85;
}

.consulta-concluida .consulta-data {
  background: #F1F5F9;
}

.consulta-concluida .data-dia,
.consulta-concluida .consulta-servico {
  color: #64748B;
}

.consulta-concluida .consulta-valor {
  color: #64748B;
}

/* ===== BOTTOM NAV ===== */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: white;
  border-top: 1px solid #E8ECF0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 8px;
  z-index: 40;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: #94A3B8;
  font-size: 10px;
  font-weight: 500;
}

.nav-item.router-link-active { color: #1155CC; }

.nav-center { margin-top: -20px; }

.nav-add-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1155CC 0%, #3D4290 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(17,85,204,0.4);
  text-decoration: none;
}

/* ===== TABLET ===== */
@media (min-width: 640px) {
  .consultas-main { padding: 1.5rem 1.5rem 100px; }

  .consultas-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .consulta-card {
    display: flex;
    flex-direction: column;
  }

  .consulta-actions {
    margin-top: auto;
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 1024px) {
  .consultas-page { background: #F1F5F9; }

  .consultas-topbar { display: flex; }

  .consultas-layout {
    flex-direction: row;
    align-items: flex-start;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem 2rem;
    gap: 1.5rem;
  }

  .consultas-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 280px;
    flex-shrink: 0;
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    position: sticky;
    top: 84px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .sidebar-header { margin-bottom: 0.5rem; }
  .sidebar-title { font-size: 18px; font-weight: 800; color: #0A1F44; margin: 0 0 4px; }
  .sidebar-subtitle { font-size: 13px; color: #64748B; margin: 0; }

  .sidebar-stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border-radius: 12px;
    background: #F8FAFC;
  }

  .stat-agendadas { background: #EFF6FF; }
  .stat-concluidas { background: #F0FDF4; }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-agendadas .stat-icon { background: #DBEAFE; color: #1D4ED8; }
  .stat-concluidas .stat-icon { background: #DCFCE7; color: #16A34A; }

  .stat-info { display: flex; flex-direction: column; gap: 2px; }
  .stat-value { font-size: 22px; font-weight: 800; color: #0A1F44; }
  .stat-label { font-size: 12px; color: #64748B; }

  .btn-nova-consulta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: linear-gradient(135deg, #F07020, #D4600A);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 20px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(240,112,32,0.35);
  }

  .btn-nova-consulta:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(240,112,32,0.45);
  }

  .consultas-main {
    flex: 1;
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    min-height: 500px;
  }

  .mobile-header { display: none; }

  .consultas-tabs {
    max-width: 320px;
    margin-bottom: 1rem;
  }

  .consultas-list {
    grid-template-columns: 1fr 1fr;
  }

  .bottom-nav { display: none; }
}

@media (min-width: 1280px) {
  .consultas-layout { padding: 2.5rem 3rem; }
  .consultas-sidebar { width: 300px; }

  .consultas-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
