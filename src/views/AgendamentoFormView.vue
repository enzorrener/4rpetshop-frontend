<template>
  <div class="agendar-page">

    <!-- Topbar Desktop -->
    <header class="agendar-topbar">
      <button class="topbar-back" @click="voltar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        <span>Voltar</span>
      </button>
      <h1 class="topbar-title">Agendar Consulta</h1>
      <div class="topbar-spacer"></div>
    </header>

    <!-- Layout Principal -->
    <div class="agendar-layout">

      <!-- Painel Esquerdo (desktop) -->
      <aside class="agendar-aside">
        <div class="aside-hero">
          <div class="aside-icon">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <path d="M9 16l2 2 4-4"/>
            </svg>
          </div>
          <h2 class="aside-title">Escolha a data e horário</h2>
          <p class="aside-subtitle">Selecione o serviço desejado e agende no melhor horário para você.</p>
        </div>

        <div class="aside-steps">
          <div class="step-item step-completed">
            <div class="step-num">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div class="step-text">
              <span class="step-label">Escolha o Pet</span>
              <span class="step-desc">{{ petNome || 'Pet selecionado' }}</span>
            </div>
          </div>
          <div class="step-connector step-connector-active"></div>
          <div class="step-item step-active">
            <div class="step-num">2</div>
            <div class="step-text">
              <span class="step-label">Data e Horário</span>
              <span class="step-desc">Escolha quando deseja ser atendido</span>
            </div>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-text">
              <span class="step-label">Confirmar</span>
              <span class="step-desc">Revise e confirme o agendamento</span>
            </div>
          </div>
        </div>

        <!-- Resumo da seleção -->
        <div v-if="servicoSelecionado || dataSelecionada" class="aside-resumo">
          <div class="resumo-title">Sua seleção</div>
          <div v-if="servicoSelecionado" class="resumo-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>{{ servicoSelecionado.nome }}</span>
          </div>
          <div v-if="dataSelecionada" class="resumo-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>{{ formatarData(dataSelecionada) }}</span>
          </div>
          <div v-if="horarioSelecionado" class="resumo-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{{ horarioSelecionado }}</span>
          </div>
        </div>

        <button
          v-if="podeConfirmar"
          class="btn-confirmar-desktop"
          @click="irParaConfirmacao"
        >
          Confirmar Agendamento
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </button>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="agendar-main">

        <!-- Header Mobile -->
        <div class="mobile-header">
          <button class="btn-back-mobile" @click="voltar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="mobile-title-block">
            <h1 class="mobile-title">Agendar Consulta</h1>
            <p class="mobile-subtitle">Passo 2 de 3 - Escolha data e horário</p>
          </div>
        </div>

        <!-- Pet selecionado (mobile) -->
        <div class="pet-badge-mobile">
          <div class="pet-badge-avatar">
            <svg width="16" height="16" viewBox="0 0 56 56" fill="none">
              <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.8"/>
              <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.8"/>
              <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="white" opacity="0.8"/>
            </svg>
          </div>
          <span class="pet-badge-nome">{{ petNome || 'Pet' }}</span>
          <button class="pet-badge-change" @click="voltar">Trocar</button>
        </div>

        <!-- Seção: Tipo de Serviço -->
        <section class="form-section">
          <div class="section-header-form">
            <h2 class="section-title-form">Tipo de Serviço</h2>
            <p class="section-desc">Selecione o serviço desejado</p>
          </div>

          <div class="servicos-grid">
            <div
              v-for="servico in servicos"
              :key="servico.id"
              class="servico-card"
              :class="{ 'servico-selected': servicoSelecionado?.id === servico.id }"
              @click="selecionarServico(servico)"
            >
              <div class="servico-icon" v-html="servico.icone"></div>
              <div class="servico-info">
                <span class="servico-nome">{{ servico.nome }}</span>
                <span class="servico-duracao">{{ servico.duracao }}</span>
              </div>
              <div class="servico-preco">R$ {{ servico.preco }}</div>
              <div class="servico-check">
                <div v-if="servicoSelecionado?.id === servico.id" class="check-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div v-else class="radio-circle"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Seção: Data -->
        <section v-if="servicoSelecionado" class="form-section">
          <div class="section-header-form">
            <h2 class="section-title-form">Data da Consulta</h2>
            <p class="section-desc">Escolha uma data disponível</p>
          </div>

          <div class="calendario-container">
            <div class="calendario-header">
              <button class="cal-nav" @click="mesAnterior">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <span class="cal-mes">{{ mesAtualNome }} {{ anoAtual }}</span>
              <button class="cal-nav" @click="proximoMes">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            <div class="calendario-dias-semana">
              <span v-for="dia in diasSemana" :key="dia">{{ dia }}</span>
            </div>

            <div class="calendario-grid">
              <button
                v-for="(dia, index) in diasDoMes"
                :key="index"
                class="cal-dia"
                :class="{
                  'cal-dia-vazio': !dia,
                  'cal-dia-passado': dia && isDiaPassado(dia),
                  'cal-dia-disponivel': dia && !isDiaPassado(dia),
                  'cal-dia-selected': dia && isDiaSelecionado(dia)
                }"
                :disabled="!dia || isDiaPassado(dia)"
                @click="dia && !isDiaPassado(dia) && selecionarData(dia)"
              >
                {{ dia || '' }}
              </button>
            </div>
          </div>
        </section>

        <!-- Seção: Horários -->
        <section v-if="dataSelecionada" class="form-section">
          <div class="section-header-form">
            <h2 class="section-title-form">Horário Disponível</h2>
            <p class="section-desc">{{ formatarData(dataSelecionada) }}</p>
          </div>

          <div v-if="loadingHorarios" class="loading-horarios">
            <span class="loading-spinner"></span>
            <span>Carregando horários...</span>
          </div>

          <div v-else class="horarios-grid">
            <button
              v-for="horario in horariosDisponiveis"
              :key="horario"
              class="horario-btn"
              :class="{ 'horario-selected': horarioSelecionado === horario }"
              @click="selecionarHorario(horario)"
            >
              {{ horario }}
            </button>
          </div>
        </section>

        <!-- Seção: Observações -->
        <section v-if="horarioSelecionado" class="form-section">
          <div class="section-header-form">
            <h2 class="section-title-form">Observações</h2>
            <p class="section-desc">Opcional - Descreva o motivo da consulta</p>
          </div>

          <textarea
            v-model="observacoes"
            class="observacoes-input"
            placeholder="Ex: Meu pet está com febre há 2 dias, não está comendo bem..."
            rows="4"
          ></textarea>
        </section>

        <!-- Barra Confirmar Mobile -->
        <Transition name="slide-up">
          <div v-if="podeConfirmar" class="confirmar-bar-mobile">
            <div class="confirmar-info">
              <span class="confirmar-label">Total</span>
              <span class="confirmar-preco">R$ {{ servicoSelecionado?.preco || '0,00' }}</span>
            </div>
            <button class="btn-seguir-mobile" @click="irParaConfirmacao">
              Confirmar
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </Transition>

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
      <router-link to="/meusPets" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/>
          <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 00-.42-3.31"/>
        </svg>
        <span>Pets</span>
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

// Dados do pet (vindos do passo anterior)
const petId = ref(null)
const petNome = ref('')

// Serviços mockados (futuramente virão da API)
const servicos = ref([
  {
    id: 1,
    nome: 'Consulta Geral',
    duracao: '30 min',
    preco: '120,00',
    icone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
  },
  {
    id: 2,
    nome: 'Vacinação',
    duracao: '15 min',
    preco: '80,00',
    icone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>'
  },
  {
    id: 3,
    nome: 'Banho e Tosa',
    duracao: '1h 30min',
    preco: '90,00',
    icone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2v2a2 2 0 002 2h8a2 2 0 002-2V2"/><path d="M4 8v11a2 2 0 002 2h12a2 2 0 002-2V8"/><path d="M10 12v4"/><path d="M14 12v4"/></svg>'
  },
  {
    id: 4,
    nome: 'Exames',
    duracao: '45 min',
    preco: '150,00',
    icone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
  }
])

// Seleções
const servicoSelecionado = ref(null)
const dataSelecionada = ref(null)
const horarioSelecionado = ref(null)
const observacoes = ref('')

// Calendário
const hoje = new Date()
const mesAtual = ref(hoje.getMonth())
const anoAtual = ref(hoje.getFullYear())
const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const mesAtualNome = computed(() => meses[mesAtual.value])

const diasDoMes = computed(() => {
  const primeiroDia = new Date(anoAtual.value, mesAtual.value, 1)
  const ultimoDia = new Date(anoAtual.value, mesAtual.value + 1, 0)

  const dias = []

  // Dias vazios antes do primeiro dia do mês
  for (let i = 0; i < primeiroDia.getDay(); i++) {
    dias.push(null)
  }

  // Dias do mês
  for (let i = 1; i <= ultimoDia.getDate(); i++) {
    dias.push(i)
  }

  return dias
})

// Horários
const loadingHorarios = ref(false)
const horariosDisponiveis = ref([])

// Computed
const podeConfirmar = computed(() => {
  return servicoSelecionado.value && dataSelecionada.value && horarioSelecionado.value
})

// Métodos
onMounted(() => {
  petId.value = localStorage.getItem('consultaPetId')
  petNome.value = localStorage.getItem('consultaPetNome')

  if (!petId.value) {
    router.push('/agendarConsulta')
  }
})

const voltar = () => {
  router.push('/agendarConsulta')
}

const selecionarServico = (servico) => {
  if (servicoSelecionado.value?.id === servico.id) {
    servicoSelecionado.value = null
  } else {
    servicoSelecionado.value = servico
  }
  // Resetar seleções dependentes
  dataSelecionada.value = null
  horarioSelecionado.value = null
}

const mesAnterior = () => {
  if (mesAtual.value === 0) {
    mesAtual.value = 11
    anoAtual.value--
  } else {
    mesAtual.value--
  }
}

const proximoMes = () => {
  if (mesAtual.value === 11) {
    mesAtual.value = 0
    anoAtual.value++
  } else {
    mesAtual.value++
  }
}

const isDiaPassado = (dia) => {
  const data = new Date(anoAtual.value, mesAtual.value, dia)
  const hojeZerado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  return data < hojeZerado
}

const isDiaSelecionado = (dia) => {
  if (!dataSelecionada.value) return false
  return (
    dataSelecionada.value.getDate() === dia &&
    dataSelecionada.value.getMonth() === mesAtual.value &&
    dataSelecionada.value.getFullYear() === anoAtual.value
  )
}

const selecionarData = (dia) => {
  dataSelecionada.value = new Date(anoAtual.value, mesAtual.value, dia)
  horarioSelecionado.value = null
  carregarHorarios()
}

const carregarHorarios = async () => {
  loadingHorarios.value = true

  // Simular chamada de API
  await new Promise(resolve => setTimeout(resolve, 500))

  // Horários mockados (futuramente virão da API)
  horariosDisponiveis.value = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30'
  ]

  loadingHorarios.value = false
}

const selecionarHorario = (horario) => {
  horarioSelecionado.value = horario
}

const formatarData = (data) => {
  if (!data) return ''
  const opcoes = { weekday: 'long', day: 'numeric', month: 'long' }
  return data.toLocaleDateString('pt-BR', opcoes)
}

const irParaConfirmacao = () => {
  // Salvar dados no localStorage para o próximo passo
  localStorage.setItem('consultaServico', JSON.stringify(servicoSelecionado.value))
  localStorage.setItem('consultaData', dataSelecionada.value.toISOString())
  localStorage.setItem('consultaHorario', horarioSelecionado.value)
  localStorage.setItem('consultaObservacoes', observacoes.value)

  // Navegar para confirmação (a ser criada)
  router.push('/agendamentoConfirmacao')
}
</script>

<style scoped>
/* ===== BASE ===== */
.agendar-page {
  min-height: 100vh;
  width: 100%;
  background: #F1F5F9;
  display: flex;
  flex-direction: column;
}

/* ===== TOPBAR DESKTOP ===== */
.agendar-topbar {
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

.topbar-spacer { width: 120px; }

/* ===== LAYOUT ===== */
.agendar-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ===== ASIDE (desktop) ===== */
.agendar-aside { display: none; }

/* ===== MAIN ===== */
.agendar-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1rem 140px;
  gap: 1.5rem;
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

.mobile-title-block { display: flex; flex-direction: column; gap: 2px; }
.mobile-title { font-size: 22px; font-weight: 800; color: #0A1F44; line-height: 1; }
.mobile-subtitle { font-size: 13px; color: #64748B; }

/* ===== PET BADGE MOBILE ===== */
.pet-badge-mobile {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #0A3080, #1155CC);
  border-radius: 12px;
  padding: 10px 14px;
}

.pet-badge-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-badge-nome {
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.pet-badge-change {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

/* ===== FORM SECTIONS ===== */
.form-section {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.section-header-form {
  margin-bottom: 1rem;
}

.section-title-form {
  font-size: 17px;
  font-weight: 700;
  color: #0A1F44;
  margin-bottom: 2px;
}

.section-desc {
  font-size: 13px;
  color: #64748B;
}

/* ===== SERVIÇOS GRID ===== */
.servicos-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.servico-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #F8FAFC;
  border: 2px solid #E8ECF0;
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.servico-card:hover {
  border-color: #1155CC;
  background: #F8FAFF;
}

.servico-selected {
  border-color: #1155CC;
  background: linear-gradient(135deg, #EFF6FF 0%, #F8FAFF 100%);
  box-shadow: 0 2px 12px rgba(17,85,204,0.15);
}

.servico-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, #E8ECF0, #F1F5F9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  flex-shrink: 0;
}

.servico-selected .servico-icon {
  background: linear-gradient(135deg, #1155CC, #0A3080);
  color: white;
}

.servico-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.servico-nome {
  font-size: 15px;
  font-weight: 700;
  color: #0A1F44;
}

.servico-duracao {
  font-size: 12px;
  color: #94A3B8;
}

.servico-preco {
  font-size: 15px;
  font-weight: 700;
  color: #1155CC;
  flex-shrink: 0;
}

.servico-check { flex-shrink: 0; }

.check-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(17,85,204,0.35);
}

.radio-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #CBD5E1;
}

.servico-card:hover .radio-circle { border-color: #1155CC; }

/* ===== CALENDÁRIO ===== */
.calendario-container {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 1rem;
}

.calendario-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.cal-mes {
  font-size: 16px;
  font-weight: 700;
  color: #0A1F44;
  text-transform: capitalize;
}

.cal-nav {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748B;
  transition: all 0.2s;
}

.cal-nav:hover {
  border-color: #1155CC;
  color: #1155CC;
}

.calendario-dias-semana {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.calendario-dias-semana span {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  padding: 4px 0;
}

.calendario-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.cal-dia {
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: #0A1F44;
}

.cal-dia-vazio {
  cursor: default;
}

.cal-dia-passado {
  color: #CBD5E1;
  cursor: not-allowed;
}

.cal-dia-disponivel:hover {
  background: #E0ECFF;
  color: #1155CC;
}

.cal-dia-selected {
  background: linear-gradient(135deg, #1155CC, #0A3080) !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(17,85,204,0.35);
}

/* ===== HORÁRIOS ===== */
.loading-horarios {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 2rem;
  color: #64748B;
  font-size: 14px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #E2E8F0;
  border-top-color: #F07020;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.horarios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.horario-btn {
  background: #F8FAFC;
  border: 2px solid #E8ECF0;
  border-radius: 10px;
  padding: 12px 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A1F44;
  cursor: pointer;
  transition: all 0.2s;
}

.horario-btn:hover {
  border-color: #1155CC;
  background: #F8FAFF;
}

.horario-selected {
  background: linear-gradient(135deg, #1155CC, #0A3080) !important;
  border-color: #1155CC !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(17,85,204,0.35);
}

/* ===== OBSERVAÇÕES ===== */
.observacoes-input {
  width: 100%;
  background: #F8FAFC;
  border: 2px solid #E8ECF0;
  border-radius: 12px;
  padding: 14px;
  font-size: 14px;
  color: #0A1F44;
  resize: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.observacoes-input:focus {
  outline: none;
  border-color: #1155CC;
}

.observacoes-input::placeholder {
  color: #94A3B8;
}

/* ===== CONFIRMAR BAR MOBILE ===== */
.confirmar-bar-mobile {
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #E2E8F0;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  z-index: 50;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
}

.confirmar-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.confirmar-label {
  font-size: 12px;
  color: #64748B;
}

.confirmar-preco {
  font-size: 18px;
  font-weight: 800;
  color: #0A1F44;
}

.btn-seguir-mobile {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #F07020, #D4600A);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 4px 14px rgba(240,112,32,0.4);
}

.btn-seguir-mobile:hover { opacity: 0.9; transform: translateY(-1px); }

/* ===== TRANSITION ===== */
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(16px);
  opacity: 0;
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
  .agendar-main { padding: 1.5rem 1.5rem 140px; }

  .servicos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .horarios-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 1024px) {
  .agendar-page { background: #F1F5F9; }

  /* Mostrar topbar desktop */
  .agendar-topbar { display: flex; }

  /* Layout horizontal */
  .agendar-layout {
    flex-direction: row;
    align-items: flex-start;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem 2rem;
    gap: 1.5rem;
  }

  /* Aside visível */
  .agendar-aside {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 300px;
    flex-shrink: 0;
    background: linear-gradient(160deg, #0A3080 0%, #1155CC 60%, #2563EB 100%);
    border-radius: 20px;
    padding: 2rem 1.5rem;
    color: white;
    position: sticky;
    top: 84px;
    overflow: hidden;
  }

  .agendar-aside::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    pointer-events: none;
  }

  .aside-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    gap: 12px;
  }

  .aside-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .aside-title {
    font-size: 18px;
    font-weight: 800;
    color: white;
    line-height: 1.3;
  }

  .aside-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.75);
    line-height: 1.5;
  }

  .aside-steps {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    gap: 0;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    margin-bottom: 1.25rem;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    opacity: 0.5;
  }

  .step-item.step-active,
  .step-item.step-completed { opacity: 1; }

  .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    color: white;
    flex-shrink: 0;
  }

  .step-item.step-active .step-num {
    background: #F07020;
    box-shadow: 0 2px 8px rgba(240,112,32,0.5);
  }

  .step-item.step-completed .step-num {
    background: #10B981;
    box-shadow: 0 2px 8px rgba(16,185,129,0.5);
  }

  .step-text { display: flex; flex-direction: column; gap: 2px; }
  .step-label { font-size: 14px; font-weight: 700; color: white; }
  .step-desc { font-size: 12px; color: rgba(255,255,255,0.7); }

  .step-connector {
    width: 2px;
    height: 20px;
    background: rgba(255,255,255,0.2);
    margin-left: 13px;
    margin: 4px 0 4px 13px;
  }

  .step-connector-active {
    background: rgba(255,255,255,0.5);
  }

  /* Resumo */
  .aside-resumo {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 1rem;
  }

  .resumo-title {
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .resumo-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: white;
    margin-bottom: 6px;
  }

  .resumo-item:last-child { margin-bottom: 0; }

  .resumo-item svg { opacity: 0.7; flex-shrink: 0; }

  .btn-confirmar-desktop {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: #F07020;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 20px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(240,112,32,0.4);
  }

  .btn-confirmar-desktop:hover {
    background: #D4600A;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(240,112,32,0.5);
  }

  /* Main content desktop */
  .agendar-main {
    flex: 1;
    background: white;
    border-radius: 20px;
    padding: 2rem;
    padding-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    min-height: 500px;
    gap: 2rem;
  }

  /* Ocultar mobile header */
  .mobile-header { display: none; }
  .pet-badge-mobile { display: none; }

  /* Form sections desktop */
  .form-section {
    background: #F8FAFC;
    border: 1px solid #E8ECF0;
  }

  .section-title-form { font-size: 18px; }

  /* Serviços grid desktop */
  .servicos-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  /* Calendário desktop */
  .calendario-container {
    max-width: 400px;
  }

  .cal-dia {
    font-size: 15px;
  }

  /* Horários desktop */
  .horarios-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }

  /* Ocultar elementos mobile */
  .confirmar-bar-mobile { display: none; }
  .bottom-nav { display: none; }
}

/* ===== DESKTOP LARGE ===== */
@media (min-width: 1280px) {
  .agendar-layout { padding: 2.5rem 3rem; }
  .agendar-aside { width: 320px; }

  .servicos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
