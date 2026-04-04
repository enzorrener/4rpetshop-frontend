<template>
  <div class="sucesso-page">

    <!-- Confetti Animation -->
    <div class="confetti-container">
      <div v-for="i in 50" :key="i" class="confetti" :style="confettiStyle(i)"></div>
    </div>

    <!-- Main Content -->
    <div class="sucesso-container">

      <!-- Success Icon -->
      <div class="sucesso-icon">
        <div class="sucesso-icon-inner">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="sucesso-icon-ring"></div>
      </div>

      <!-- Title -->
      <h1 class="sucesso-title">Agendamento Confirmado!</h1>
      <p class="sucesso-subtitle">Seu agendamento foi realizado com sucesso</p>

      <!-- Comprovante Card -->
      <div class="comprovante-card">
        <div class="comprovante-header">
          <div class="comprovante-logo">
            <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="logo-img" />
          </div>
          <div class="comprovante-info">
            <span class="comprovante-label">Comprovante de Agendamento</span>
            <span class="comprovante-numero">#{{ numeroAgendamento }}</span>
          </div>
        </div>

        <div class="comprovante-body">
          <div class="comprovante-row">
            <div class="comprovante-item">
              <span class="item-label">Pet</span>
              <span class="item-value">{{ petNome }}</span>
            </div>
            <div class="comprovante-item">
              <span class="item-label">Serviço</span>
              <span class="item-value">{{ servico?.nome }}</span>
            </div>
          </div>

          <div class="comprovante-row">
            <div class="comprovante-item">
              <span class="item-label">Data</span>
              <span class="item-value">{{ formatarData(dataConsulta) }}</span>
            </div>
            <div class="comprovante-item">
              <span class="item-label">Horário</span>
              <span class="item-value">{{ horario }}</span>
            </div>
          </div>

          <div class="comprovante-divider"></div>

          <div class="comprovante-total">
            <span class="total-label">Valor</span>
            <span class="total-value">R$ {{ servico?.preco }}</span>
          </div>
        </div>

        <div class="comprovante-footer">
          <div class="footer-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="footer-text">
            <span class="footer-title">4R Pet Clínica Veterinária</span>
            <span class="footer-address">Rua Example, 123 - Centro</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="sucesso-actions">
        <button class="btn-secondary" @click="compartilhar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Compartilhar
        </button>
        <button class="btn-secondary" @click="adicionarCalendario">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <line x1="12" y1="14" x2="12" y2="18"/>
            <line x1="10" y1="16" x2="14" y2="16"/>
          </svg>
          Adicionar ao Calendário
        </button>
      </div>

      <!-- Primary Actions -->
      <div class="sucesso-primary-actions">
        <router-link to="/minhasConsultas" class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          Ver Minhas Consultas
        </router-link>
        <router-link to="/dashboard" class="btn-link">
          Voltar ao Início
        </router-link>
      </div>

      <!-- WhatsApp Reminder -->
      <div class="whatsapp-reminder">
        <div class="reminder-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div class="reminder-content">
          <p class="reminder-text">Você receberá uma confirmação no WhatsApp</p>
          <p class="reminder-subtext">Lembrete: Chegue 10 minutos antes do horário</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dados do agendamento
const numeroAgendamento = ref('')
const petNome = ref('')
const servico = ref(null)
const dataConsulta = ref(null)
const horario = ref('')

onMounted(() => {
  // Carregar dados do localStorage
  numeroAgendamento.value = localStorage.getItem('consultaNumero') || 'AG00000000'
  petNome.value = localStorage.getItem('consultaPetNome') || ''

  const servicoStr = localStorage.getItem('consultaServico')
  if (servicoStr) {
    servico.value = JSON.parse(servicoStr)
  }

  const dataStr = localStorage.getItem('consultaData')
  if (dataStr) {
    dataConsulta.value = new Date(dataStr)
  }

  horario.value = localStorage.getItem('consultaHorario') || ''

  // Limpar dados do localStorage após exibir (opcional)
  // limparDadosAgendamento()
})

const formatarData = (data) => {
  if (!data) return ''
  const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return data.toLocaleDateString('pt-BR', opcoes)
}

const confettiStyle = (index) => {
  const colors = ['#1155CC', '#F07020', '#10B981', '#8B5CF6', '#EC4899']
  const color = colors[index % colors.length]
  const left = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 3 + Math.random() * 2
  const size = 8 + Math.random() * 8

  return {
    left: `${left}%`,
    backgroundColor: color,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`
  }
}

const compartilhar = async () => {
  const texto = `Agendamento confirmado na 4R Pet!\n\nPet: ${petNome.value}\nServiço: ${servico.value?.nome}\nData: ${formatarData(dataConsulta.value)}\nHorário: ${horario.value}\n\nNúmero: #${numeroAgendamento.value}`

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Agendamento 4R Pet',
        text: texto
      })
    } catch (err) {
      console.log('Erro ao compartilhar:', err)
    }
  } else {
    // Fallback: copiar para clipboard
    navigator.clipboard.writeText(texto)
    alert('Informações copiadas para a área de transferência!')
  }
}

const adicionarCalendario = () => {
  if (!dataConsulta.value || !horario.value) return

  const [horas, minutos] = horario.value.split(':')
  const dataEvento = new Date(dataConsulta.value)
  dataEvento.setHours(parseInt(horas), parseInt(minutos), 0, 0)

  const dataFim = new Date(dataEvento)
  dataFim.setMinutes(dataFim.getMinutes() + 30) // Duração padrão de 30min

  const formatarDataCalendario = (data) => {
    return data.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Consulta - 4R Pet')}&dates=${formatarDataCalendario(dataEvento)}/${formatarDataCalendario(dataFim)}&details=${encodeURIComponent(`Pet: ${petNome.value}\nServiço: ${servico.value?.nome}\nNúmero: #${numeroAgendamento.value}`)}&location=${encodeURIComponent('4R Pet Clínica Veterinária')}`

  window.open(url, '_blank')
}
</script>

<style scoped>
/* ===== BASE ===== */
.sucesso-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 50%, #F0FDF4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

/* ===== CONFETTI ===== */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.confetti {
  position: absolute;
  top: -20px;
  border-radius: 2px;
  animation: confettiFall linear forwards;
  opacity: 0.8;
}

@keyframes confettiFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

/* ===== CONTAINER ===== */
.sucesso-container {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}

/* ===== SUCCESS ICON ===== */
.sucesso-icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 1.5rem;
}

.sucesso-icon-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
  animation: scaleIn 0.5s ease-out;
}

.sucesso-icon-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #10B981;
  opacity: 0.3;
  animation: ringPulse 2s ease-out infinite;
}

@keyframes scaleIn {
  0% { transform: translate(-50%, -50%) scale(0); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

@keyframes ringPulse {
  0% { transform: scale(1); opacity: 0.3; }
  100% { transform: scale(1.3); opacity: 0; }
}

/* ===== TITLE ===== */
.sucesso-title {
  font-size: 26px;
  font-weight: 800;
  color: #0A1F44;
  margin-bottom: 8px;
  animation: fadeInUp 0.5s ease-out 0.2s both;
}

.sucesso-subtitle {
  font-size: 15px;
  color: #64748B;
  margin-bottom: 2rem;
  animation: fadeInUp 0.5s ease-out 0.3s both;
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ===== COMPROVANTE ===== */
.comprovante-card {
  width: 100%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  animation: fadeInUp 0.5s ease-out 0.4s both;
}

.comprovante-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 1.25rem;
  background: linear-gradient(135deg, #0A3080 0%, #1155CC 100%);
  color: white;
}

.comprovante-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: white;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.comprovante-info { flex: 1; text-align: left; }
.comprovante-label { font-size: 12px; opacity: 0.85; display: block; }
.comprovante-numero { font-size: 18px; font-weight: 700; }

.comprovante-body {
  padding: 1.25rem;
}

.comprovante-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.comprovante-row:last-of-type { margin-bottom: 0; }

.comprovante-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-label {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
}

.item-value {
  font-size: 15px;
  font-weight: 700;
  color: #0A1F44;
}

.comprovante-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #E2E8F0, transparent);
  margin: 1rem 0;
}

.comprovante-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.total-label {
  font-size: 14px;
  color: #64748B;
}

.total-value {
  font-size: 22px;
  font-weight: 800;
  color: #10B981;
}

.comprovante-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem 1.25rem;
  background: #F8FAFC;
  border-top: 1px solid #E8ECF0;
}

.footer-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #EFF6FF;
  color: #1155CC;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-text { text-align: left; }
.footer-title { font-size: 13px; font-weight: 600; color: #0A1F44; display: block; }
.footer-address { font-size: 12px; color: #64748B; }

/* ===== ACTIONS ===== */
.sucesso-actions {
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 1.5rem;
  animation: fadeInUp 0.5s ease-out 0.5s both;
}

.btn-secondary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #0A1F44;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #1155CC;
  color: #1155CC;
  background: #F8FAFF;
}

.sucesso-primary-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 1.25rem;
  animation: fadeInUp 0.5s ease-out 0.6s both;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(17, 85, 204, 0.35);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(17, 85, 204, 0.45);
}

.btn-link {
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  text-decoration: none;
  padding: 8px;
}

.btn-link:hover {
  color: #1155CC;
  text-decoration: underline;
}

/* ===== WHATSAPP REMINDER ===== */
.whatsapp-reminder {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: white;
  border: 1px solid #DCFCE7;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1.5rem;
  animation: fadeInUp 0.5s ease-out 0.7s both;
}

.reminder-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #DCFCE7;
  color: #16A34A;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reminder-content { text-align: left; }

.reminder-text {
  font-size: 14px;
  font-weight: 600;
  color: #0A1F44;
  margin: 0 0 2px;
}

.reminder-subtext {
  font-size: 12px;
  color: #64748B;
  margin: 0;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 640px) {
  .sucesso-page {
    padding: 3rem 2rem;
  }

  .sucesso-container {
    max-width: 500px;
  }

  .sucesso-title {
    font-size: 32px;
  }

  .comprovante-header {
    padding: 1.5rem;
  }

  .comprovante-body {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .sucesso-page {
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  }

  .sucesso-container {
    background: white;
    padding: 3rem;
    border-radius: 24px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
    max-width: 560px;
  }

  .comprovante-card {
    box-shadow: none;
    border: 1px solid #E8ECF0;
  }
}
</style>
