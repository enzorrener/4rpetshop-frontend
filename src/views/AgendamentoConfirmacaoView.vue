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
      <h1 class="topbar-title">Confirmar Agendamento</h1>
      <div class="topbar-spacer"></div>
    </header>

    <!-- Layout Principal -->
    <div class="agendar-layout">

      <!-- Painel Esquerdo (desktop) -->
      <aside class="agendar-aside">
        <div class="aside-hero">
          <div class="aside-icon">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 class="aside-title">Quase lá!</h2>
          <p class="aside-subtitle">Revise os dados do agendamento e confirme para finalizar.</p>
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
              <span class="step-desc">{{ petNome }}</span>
            </div>
          </div>
          <div class="step-connector step-connector-active"></div>
          <div class="step-item step-completed">
            <div class="step-num">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div class="step-text">
              <span class="step-label">Data e Horário</span>
              <span class="step-desc">{{ formatarDataCurta(dataConsulta) }} às {{ horario }}</span>
            </div>
          </div>
          <div class="step-connector step-connector-active"></div>
          <div class="step-item step-active">
            <div class="step-num">3</div>
            <div class="step-text">
              <span class="step-label">Confirmar</span>
              <span class="step-desc">Revise e confirme</span>
            </div>
          </div>
        </div>

        <button
          class="btn-confirmar-desktop"
          :disabled="loading"
          @click="confirmarAgendamento"
        >
          <span v-if="loading" class="btn-loading">
            <span class="loading-spinner-btn"></span>
            Confirmando...
          </span>
          <span v-else class="btn-content">
            Confirmar Agendamento
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
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
            <h1 class="mobile-title">Confirmar</h1>
            <p class="mobile-subtitle">Passo 3 de 3 - Revise os dados</p>
          </div>
        </div>

        <!-- Card de Resumo -->
        <div class="resumo-card">
          <div class="resumo-header">
            <div class="resumo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div class="resumo-header-text">
              <h2 class="resumo-title">Resumo do Agendamento</h2>
              <p class="resumo-subtitle">Verifique se os dados estão corretos</p>
            </div>
          </div>

          <div class="resumo-body">
            <!-- Pet -->
            <div class="resumo-item">
              <div class="resumo-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/>
                  <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 00-.42-3.31"/>
                </svg>
              </div>
              <div class="resumo-item-content">
                <span class="resumo-item-label">Pet</span>
                <span class="resumo-item-value">{{ petNome }}</span>
              </div>
              <button class="resumo-item-edit" @click="editarPet">Alterar</button>
            </div>

            <!-- Serviço -->
            <div class="resumo-item">
              <div class="resumo-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div class="resumo-item-content">
                <span class="resumo-item-label">Serviço</span>
                <span class="resumo-item-value">{{ servico?.nome }}</span>
                <span class="resumo-item-extra">{{ servico?.duracao }}</span>
              </div>
              <button class="resumo-item-edit" @click="editarServico">Alterar</button>
            </div>

            <!-- Data e Horário -->
            <div class="resumo-item">
              <div class="resumo-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div class="resumo-item-content">
                <span class="resumo-item-label">Data e Horário</span>
                <span class="resumo-item-value">{{ formatarData(dataConsulta) }}</span>
                <span class="resumo-item-extra">às {{ horario }}</span>
              </div>
              <button class="resumo-item-edit" @click="editarServico">Alterar</button>
            </div>

            <!-- Observações -->
            <div v-if="observacoes" class="resumo-item resumo-item-obs">
              <div class="resumo-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div class="resumo-item-content">
                <span class="resumo-item-label">Observações</span>
                <span class="resumo-item-value resumo-obs-text">{{ observacoes }}</span>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="resumo-footer">
            <div class="resumo-total">
              <span class="total-label">Valor Total</span>
              <span class="total-value">R$ {{ servico?.preco }}</span>
            </div>
            <p class="resumo-aviso">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              O pagamento será realizado no local
            </p>
          </div>
        </div>

        <!-- Informações Adicionais -->
        <div class="info-cards">
          <div class="info-card">
            <div class="info-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="info-card-content">
              <span class="info-card-title">Local</span>
              <span class="info-card-text">4R Pet Clínica Veterinária</span>
              <span class="info-card-subtext">Rua Example, 123 - Centro</span>
            </div>
          </div>

          <div class="info-card">
            <div class="info-card-icon icon-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div class="info-card-content">
              <span class="info-card-title">Dúvidas?</span>
              <span class="info-card-text">Fale conosco pelo WhatsApp</span>
              <a href="https://wa.me/5512123456789" target="_blank" class="info-card-link">Enviar mensagem</a>
            </div>
          </div>
        </div>

        <!-- Barra Confirmar Mobile -->
        <div class="confirmar-bar-mobile">
          <div class="confirmar-info">
            <span class="confirmar-label">Total</span>
            <span class="confirmar-preco">R$ {{ servico?.preco }}</span>
          </div>
          <button
            class="btn-seguir-mobile"
            :disabled="loading"
            @click="confirmarAgendamento"
          >
            <span v-if="loading" class="btn-loading">
              <span class="loading-spinner-btn"></span>
            </span>
            <span v-else>
              Confirmar
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
          </button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dados do agendamento
const petId = ref(null)
const petNome = ref('')
const servico = ref(null)
const dataConsulta = ref(null)
const horario = ref('')
const observacoes = ref('')

// Estado
const loading = ref(false)

onMounted(() => {
  // Carregar dados do localStorage
  petId.value = localStorage.getItem('consultaPetId')
  petNome.value = localStorage.getItem('consultaPetNome')

  const servicoStr = localStorage.getItem('consultaServico')
  if (servicoStr) {
    servico.value = JSON.parse(servicoStr)
  }

  const dataStr = localStorage.getItem('consultaData')
  if (dataStr) {
    dataConsulta.value = new Date(dataStr)
  }

  horario.value = localStorage.getItem('consultaHorario') || ''
  observacoes.value = localStorage.getItem('consultaObservacoes') || ''

  // Verificar se tem todos os dados necessários
  if (!petId.value || !servico.value || !dataConsulta.value || !horario.value) {
    router.push('/agendarConsulta')
  }
})

const voltar = () => {
  router.push('/agendamentoForm')
}

const editarPet = () => {
  router.push('/agendarConsulta')
}

const editarServico = () => {
  router.push('/agendamentoForm')
}

const formatarData = (data) => {
  if (!data) return ''
  const opcoes = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return data.toLocaleDateString('pt-BR', opcoes)
}

const formatarDataCurta = (data) => {
  if (!data) return ''
  const opcoes = { day: '2-digit', month: '2-digit' }
  return data.toLocaleDateString('pt-BR', opcoes)
}

const confirmarAgendamento = async () => {
  loading.value = true

  try {
    // Simular chamada de API (futuramente será real)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Gerar número do agendamento (mockado)
    const numeroAgendamento = 'AG' + Date.now().toString().slice(-8)
    localStorage.setItem('consultaNumero', numeroAgendamento)

    // Navegar para sucesso
    router.push('/agendamentoSucesso')
  } catch (error) {
    console.error('Erro ao confirmar agendamento:', error)
    alert('Erro ao confirmar agendamento. Tente novamente.')
  } finally {
    loading.value = false
  }
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
  padding: 1.25rem 1rem 160px;
  gap: 1rem;
}

/* ===== MOBILE HEADER ===== */
.mobile-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0.5rem;
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

/* ===== RESUMO CARD ===== */
.resumo-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.resumo-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 1.25rem;
  background: linear-gradient(135deg, #0A3080 0%, #1155CC 100%);
  color: white;
}

.resumo-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.resumo-header-text { flex: 1; }
.resumo-title { font-size: 18px; font-weight: 700; margin-bottom: 2px; }
.resumo-subtitle { font-size: 13px; opacity: 0.85; }

.resumo-body {
  padding: 0.5rem 0;
}

.resumo-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #F1F5F9;
}

.resumo-item:last-child { border-bottom: none; }

.resumo-item-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  flex-shrink: 0;
}

.resumo-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.resumo-item-label {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
}

.resumo-item-value {
  font-size: 15px;
  font-weight: 700;
  color: #0A1F44;
}

.resumo-item-extra {
  font-size: 13px;
  color: #64748B;
}

.resumo-obs-text {
  font-weight: 500;
  line-height: 1.5;
}

.resumo-item-edit {
  background: none;
  border: none;
  color: #1155CC;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
  flex-shrink: 0;
}

.resumo-item-edit:hover {
  background: #EFF6FF;
}

.resumo-item-obs {
  background: #FAFBFC;
}

.resumo-footer {
  padding: 1.25rem;
  background: #F8FAFC;
  border-top: 1px solid #E8ECF0;
}

.resumo-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.total-label {
  font-size: 14px;
  color: #64748B;
  font-weight: 500;
}

.total-value {
  font-size: 24px;
  font-weight: 800;
  color: #0A1F44;
}

.resumo-aviso {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748B;
}

.resumo-aviso svg { flex-shrink: 0; opacity: 0.7; }

/* ===== INFO CARDS ===== */
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.info-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #EFF6FF;
  color: #1155CC;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-card-icon.icon-whatsapp {
  background: #DCFCE7;
  color: #16A34A;
}

.info-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-card-title {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
}

.info-card-text {
  font-size: 14px;
  font-weight: 600;
  color: #0A1F44;
}

.info-card-subtext {
  font-size: 13px;
  color: #64748B;
}

.info-card-link {
  font-size: 13px;
  color: #16A34A;
  font-weight: 600;
  text-decoration: none;
}

.info-card-link:hover { text-decoration: underline; }

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
  font-size: 20px;
  font-weight: 800;
  color: #0A1F44;
}

.btn-seguir-mobile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 4px 14px rgba(16,185,129,0.4);
  min-width: 140px;
}

.btn-seguir-mobile:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-seguir-mobile:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.btn-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading-spinner-btn {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

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
  .agendar-main { padding: 1.5rem 1.5rem 160px; }

  .info-cards {
    flex-direction: row;
  }

  .info-card { flex: 1; }
}

/* ===== DESKTOP ===== */
@media (min-width: 1024px) {
  .agendar-page { background: #F1F5F9; }

  .agendar-topbar { display: flex; }

  .agendar-layout {
    flex-direction: row;
    align-items: flex-start;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem 2rem;
    gap: 1.5rem;
  }

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

  .btn-confirmar-desktop {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 20px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(16,185,129,0.4);
  }

  .btn-confirmar-desktop:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(16,185,129,0.5);
  }

  .btn-confirmar-desktop:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .btn-confirmar-desktop .btn-content,
  .btn-confirmar-desktop .btn-loading {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .agendar-main {
    flex: 1;
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    min-height: 500px;
    gap: 1.5rem;
  }

  .mobile-header { display: none; }

  .resumo-card {
    border: 1px solid #E8ECF0;
  }

  .info-cards {
    flex-direction: row;
    gap: 14px;
  }

  .info-card {
    border: 1px solid #E8ECF0;
  }

  .confirmar-bar-mobile { display: none; }
  .bottom-nav { display: none; }
}

@media (min-width: 1280px) {
  .agendar-layout { padding: 2.5rem 3rem; }
  .agendar-aside { width: 320px; }
}
</style>
