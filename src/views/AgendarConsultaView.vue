<template>
  <div class="agendar-container">
    <div class="agendar-content">
      <!-- Header -->
      <div class="header-bar">
        <button class="back-btn" @click="$router.push('/dashboard')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Title -->
      <div class="title-section">
        <h1 class="page-title">Agendar Consulta</h1>
        <p class="page-subtitle">Selecione o pet para o atendimento</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-container">
        <span class="loading-spinner"></span>
        <p>Carregando pets...</p>
      </div>

      <!-- Pet List -->
      <div v-else class="pet-list">
        <div
          v-for="pet in pets"
          :key="pet.id"
          class="pet-card"
        >
          <div class="pet-info">
            <div class="pet-avatar">
              <img v-if="pet.foto_url" :src="pet.foto_url" :alt="pet.nome" class="pet-avatar-img" />
              <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <circle cx="9" cy="9" r="1.5"/>
                <circle cx="15" cy="9" r="1.5"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              </svg>
            </div>
            <div class="pet-details">
              <span class="pet-name">{{ pet.nome_pet }}</span>
            </div>
          </div>
          <button
            class="btn-selecionar"
            :class="{ selecionado: petSelecionado?.id === pet.id }"
            @click="selecionarPet(pet)"
          >
            <svg v-if="petSelecionado?.id === pet.id" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>{{ petSelecionado?.id === pet.id ? 'Selecionado' : 'Selecionar' }}</span>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="!loading && pets.length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <circle cx="9" cy="9" r="1.5"/>
            <circle cx="15" cy="9" r="1.5"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          </svg>
          <p>Nenhum pet cadastrado.</p>
          <router-link to="/cadastroPet" class="btn-cadastrar-pet">Cadastrar Pet</router-link>
        </div>
      </div>

      <!-- Seguir Para Consulta -->
      <Transition name="slide-up">
        <div v-if="petSelecionado" class="seguir-bar">
          <div class="seguir-info">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{{ petSelecionado.nome_pet }}</span>
          </div>
          <button class="btn-seguir" @click="$router.push('/dashboard')">
            Seguir Para Consulta
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </Transition>

      <!-- Bottom Nav -->
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
@import '@/assets/variables.css';

.agendar-container {
  min-height: 100vh;
  width: 100%;
  background: var(--bg-primary);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.agendar-content {
  width: 100%;
  max-width: var(--max-width-sm);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: var(--spacing-lg) var(--spacing-md);
  padding-bottom: 100px;
}

/* Header */
.header-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-sm);
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  padding: 0;
}

/* Title */
.title-section {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--border-color);
  border-top-color: #F07020;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Pet List */
.pet-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.pet-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-md);
  transition: box-shadow var(--transition-fast);
}

.pet-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.pet-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.pet-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pet-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pet-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.pet-breed {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.btn-selecionar {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #F07020;
  color: #fff;
  border: none;
  border-radius: var(--border-radius-lg);
  padding: 10px 20px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
  flex-shrink: 0;
  min-width: 110px;
  justify-content: center;
}

.btn-selecionar:hover {
  background: #D4600A;
  transform: translateY(-1px);
}

.btn-selecionar:active {
  transform: translateY(0);
}

.btn-selecionar.selecionado {
  background: var(--primary-color);
  box-shadow: 0 2px 10px rgba(17, 85, 204, 0.35);
}

.btn-selecionar.selecionado:hover {
  background: var(--primary-dark);
}

/* Seguir Bar — mobile: fixed acima da bottom-nav */
.seguir-bar {
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  z-index: calc(var(--z-fixed) - 1);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
}

/* Desktop: dentro do fluxo do conteúdo */
@media (min-width: 768px) {
  .seguir-bar {
    position: sticky;
    bottom: 0;
    left: auto;
    right: auto;
    margin-top: var(--spacing-lg);
    border-top: 1px solid var(--border-color);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-md);
    z-index: 1;
  }
}

.seguir-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  min-width: 0;
}

.seguir-info span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-seguir {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: var(--border-radius-full);
  padding: 0.7rem 1.4rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn-seguir:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(17, 85, 204, 0.4);
}

/* Transição slide-up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(16px);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  color: var(--text-secondary);
  text-align: center;
}

.btn-cadastrar-pet {
  background: #F07020;
  color: #fff;
  border: none;
  border-radius: var(--border-radius-lg);
  padding: 10px 24px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.btn-cadastrar-pet:hover {
  background: #D4600A;
}

/* Bottom Nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 var(--spacing-sm);
  z-index: var(--z-fixed);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.nav-item.active {
  color: #1155CC;
}

.nav-center {
  margin-top: -20px;
}

.nav-add-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1155CC 0%, #8BAF8B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(107, 142, 107, 0.4);
  text-decoration: none;
}

/* Responsive - iPhone SE */
@media (max-width: 375px) {
  .agendar-content {
    padding: var(--spacing-md) var(--spacing-sm);
    padding-bottom: 100px;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }

  .btn-selecionar {
    padding: 8px 14px;
    font-size: var(--font-size-xs, 12px);
  }
}

/* Responsive - Android/iPhone Pro Max */
@media (min-width: 428px) {
  .agendar-content {
    max-width: var(--max-width-md);
  }
}

/* Tablet */
@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }

  .agendar-container {
    background: var(--bg-page);
    align-items: center;
  }

  .agendar-content {
    background-color: var(--bg-primary);
    padding: var(--spacing-2xl);
    padding-bottom: 100px;
    border-radius: var(--border-radius-2xl);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 480px;
    min-height: auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .agendar-container {
    background: var(--bg-page-gradient);
    padding: var(--spacing-3xl);
  }

  .agendar-content {
    max-width: 520px;
    padding: var(--spacing-2xl) var(--spacing-3xl);
    padding-bottom: 100px;
    border-radius: 20px;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.08),
      0 2px 10px rgba(0, 0, 0, 0.04);
  }
}

/* Desktop Large */
@media (min-width: 1440px) {
  .agendar-content {
    max-width: 560px;
    padding: var(--spacing-3xl);
    padding-bottom: 100px;
  }
}
</style>
