<template>
  <div class="agendar-page">

    <!-- Topbar Desktop -->
    <header class="agendar-topbar">
      <button class="topbar-back" @click="$router.push('/dashboard')">
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
              <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/>
              <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 00-.42-3.31"/>
            </svg>
          </div>
          <h2 class="aside-title">Cuidado especializado para seu pet</h2>
          <p class="aside-subtitle">Selecione o pet e agende uma consulta com nossos veterinários.</p>
        </div>

        <div class="aside-steps">
          <div class="step-item step-active">
            <div class="step-num">1</div>
            <div class="step-text">
              <span class="step-label">Escolha o Pet</span>
              <span class="step-desc">Selecione qual pet será atendido</span>
            </div>
          </div>
          <div class="step-connector"></div>
          <div class="step-item" :class="{ 'step-active': !!petSelecionado }">
            <div class="step-num">2</div>
            <div class="step-text">
              <span class="step-label">Data e Horário</span>
              <span class="step-desc">Escolha quando ser atendido</span>
            </div>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-text">
              <span class="step-label">Confirmar</span>
              <span class="step-desc">Revise e confirme</span>
            </div>
          </div>
        </div>

        <div v-if="petSelecionado" class="aside-selected">
          <div class="aside-selected-avatar">
            <img v-if="petSelecionado.foto_url" :src="petSelecionado.foto_url" :alt="petSelecionado.nome_pet" class="aside-avatar-img" />
            <svg v-else width="28" height="28" viewBox="0 0 56 56" fill="none">
              <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.8"/>
              <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.8"/>
              <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="white" opacity="0.8"/>
              <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="white" opacity="0.8"/>
              <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="white" opacity="0.8"/>
            </svg>
          </div>
          <div class="aside-selected-info">
            <span class="aside-selected-label">Pet selecionado</span>
            <span class="aside-selected-name">{{ petSelecionado.nome_pet }}</span>
          </div>
        </div>

        <button v-if="petSelecionado" class="btn-confirmar-desktop" @click="$router.push('/agendamentoForm')">
          Seguir Para Consulta
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </button>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="agendar-main">

        <!-- Header Mobile -->
        <div class="mobile-header">
          <button class="btn-back-mobile" @click="$router.push('/dashboard')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="mobile-title-block">
            <h1 class="mobile-title">Agendar Consulta</h1>
            <p class="mobile-subtitle">Selecione o pet para o atendimento</p>
          </div>
        </div>

        <!-- Título desktop dentro do main -->
        <div class="main-header">
          <h2 class="main-title">Selecione o Pet</h2>
          <p class="main-subtitle">Escolha qual pet será atendido na consulta</p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <span class="loading-spinner"></span>
          <p>Carregando pets...</p>
        </div>

        <!-- Lista de Pets -->
        <div v-else-if="pets.length > 0" class="pet-grid">
          <div
            v-for="pet in pets"
            :key="pet.id"
            class="pet-card"
            :class="{ 'pet-card-selected': petSelecionado?.id === pet.id }"
            @click="selecionarPet(pet)"
          >
            <div class="pet-card-avatar">
              <img v-if="pet.foto_url" :src="pet.foto_url" :alt="pet.nome_pet" class="pet-avatar-img" />
              <svg v-else width="36" height="36" viewBox="0 0 56 56" fill="none">
                <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="currentColor" opacity="0.6"/>
                <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="currentColor" opacity="0.6"/>
                <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="currentColor" opacity="0.6"/>
                <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="currentColor" opacity="0.6"/>
                <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
            <div class="pet-card-info">
              <span class="pet-card-name">{{ pet.nome_pet }}</span>
              <span v-if="pet.raca" class="pet-card-raca">{{ pet.raca }}</span>
              <span v-if="pet.especie" class="pet-card-especie">{{ pet.especie }}</span>
            </div>
            <div class="pet-card-action">
              <div v-if="petSelecionado?.id === pet.id" class="check-circle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div v-else class="radio-circle"></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <svg width="52" height="52" viewBox="0 0 56 56" fill="none">
              <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="#CBD5E1" opacity="0.8"/>
              <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="#CBD5E1" opacity="0.8"/>
              <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="#CBD5E1" opacity="0.8"/>
              <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="#CBD5E1" opacity="0.8"/>
              <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="#CBD5E1" opacity="0.8"/>
            </svg>
          </div>
          <p class="empty-title">Nenhum pet cadastrado</p>
          <p class="empty-desc">Cadastre seu pet para poder agendar consultas</p>
          <router-link to="/cadastroPet" class="btn-cadastrar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Cadastrar Pet
          </router-link>
        </div>

        <!-- Barra Confirmar Mobile -->
        <Transition name="slide-up">
          <div v-if="petSelecionado" class="confirmar-bar-mobile">
            <div class="confirmar-pet-info">
              <div class="confirmar-avatar">
                <img v-if="petSelecionado.foto_url" :src="petSelecionado.foto_url" :alt="petSelecionado.nome_pet" class="confirmar-avatar-img" />
                <svg v-else width="18" height="18" viewBox="0 0 56 56" fill="none">
                  <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.8"/>
                  <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.8"/>
                  <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="white" opacity="0.8"/>
                </svg>
              </div>
              <span class="confirmar-pet-nome">{{ petSelecionado.nome_pet }}</span>
            </div>
            <button class="btn-seguir-mobile" @click="$router.push('/agendamentoForm')">
              Seguir Para Consulta
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
import api from '@/services/api'
import { ref, onMounted } from 'vue'

const pets = ref([])
const loading = ref(true)
const petSelecionado = ref(null)

onMounted(async () => {
  try {
    const token = localStorage.getItem('cliente_token')
    const response = await api.get('/pets', {
      headers: { Authorization: `Bearer ${token}` }
    })
    pets.value = response.data
  } catch (error) {
    console.error('Erro ao carregar pets:', error)
  } finally {
    loading.value = false
  }
})

const selecionarPet = (pet) => {
  if (petSelecionado.value?.id === pet.id) {
    petSelecionado.value = null
    localStorage.removeItem('consultaPetId')
    localStorage.removeItem('consultaPetNome')
  } else {
    petSelecionado.value = pet
    localStorage.setItem('consultaPetId', pet.id)
    localStorage.setItem('consultaPetNome', pet.nome_pet)
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
  padding: 1.25rem 1rem 120px;
}

/* ===== MOBILE HEADER ===== */
.mobile-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;
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

/* Main header (desktop only) */
.main-header { display: none; }

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

/* ===== PET GRID ===== */
.pet-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pet-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  border: 2px solid #E8ECF0;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.pet-card:hover {
  border-color: #1155CC;
  box-shadow: 0 4px 16px rgba(17,85,204,0.12);
  transform: translateY(-1px);
}

.pet-card-selected {
  border-color: #1155CC;
  background: linear-gradient(135deg, #EFF6FF 0%, #F8FAFF 100%);
  box-shadow: 0 4px 20px rgba(17,85,204,0.18);
}

.pet-card-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E8ECF0, #F1F5F9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  color: #94A3B8;
}

.pet-card-selected .pet-card-avatar {
  background: linear-gradient(135deg, #DBEAFE, #E0ECFF);
  color: #1D4ED8;
}

.pet-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.pet-card-name {
  font-size: 16px;
  font-weight: 700;
  color: #0A1F44;
}

.pet-card-raca {
  font-size: 13px;
  color: #64748B;
}

.pet-card-especie {
  font-size: 12px;
  color: #94A3B8;
  text-transform: capitalize;
}

.pet-card-action { flex-shrink: 0; }

.check-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(17,85,204,0.35);
}

.radio-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #CBD5E1;
}

.pet-card:hover .radio-circle { border-color: #1155CC; }

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
  background: #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-title { font-size: 18px; font-weight: 700; color: #374151; }
.empty-desc { font-size: 14px; color: #94A3B8; }

.btn-cadastrar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #F07020;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s, transform 0.2s;
}

.btn-cadastrar:hover { background: #D4600A; transform: translateY(-1px); }

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

.confirmar-pet-info {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.confirmar-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0A3080, #1155CC);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.confirmar-avatar-img { width: 100%; height: 100%; object-fit: cover; }

.confirmar-pet-nome {
  font-size: 14px;
  font-weight: 700;
  color: #0A1F44;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-seguir-mobile {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #0A3080, #1155CC);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.2s;
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
  .agendar-main { padding: 1.5rem 1.5rem 120px; }

  .pet-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .pet-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 20px;
  }

  .pet-card-avatar { width: 64px; height: 64px; }

  .pet-card-action {
    align-self: flex-end;
    margin-top: auto;
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

  .step-item.step-active { opacity: 1; }

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

  .aside-selected {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 1rem;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .aside-selected-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  .aside-avatar-img { width: 100%; height: 100%; object-fit: cover; }

  .aside-selected-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .aside-selected-label { font-size: 11px; color: rgba(255,255,255,0.7); }
  .aside-selected-name { font-size: 15px; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

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
  }

  /* Ocultar mobile header, mostrar desktop header */
  .mobile-header { display: none; }

  .main-header {
    display: block;
    margin-bottom: 1.75rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #F1F5F9;
  }

  .main-title {
    font-size: 22px;
    font-weight: 800;
    color: #0A1F44;
    margin-bottom: 4px;
  }

  .main-subtitle { font-size: 14px; color: #64748B; }

  /* Grid de pets desktop */
  .pet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }

  .pet-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 14px;
    border-radius: 16px;
  }

  .pet-card-avatar { width: 68px; height: 68px; }

  .pet-card-action { align-self: flex-end; }

  /* Ocultar elementos mobile */
  .confirmar-bar-mobile { display: none; }
  .bottom-nav { display: none; }
}

/* ===== DESKTOP LARGE ===== */
@media (min-width: 1280px) {
  .agendar-layout { padding: 2.5rem 3rem; }
  .agendar-aside { width: 320px; }
}
</style>
