<template>
  <div class="pets-page">

    <!-- Topbar azul (desktop) -->
    <header class="pets-topbar">
      <button type="button" class="topbar-back" @click="$router.back()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        <span>Voltar</span>
      </button>
      <h1 class="topbar-title">Meus Pets</h1>
      <router-link to="/cadastroPet" class="topbar-add-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Adicionar Pet
      </router-link>
    </header>

    <div class="pets-wrapper">

      <!-- Header mobile -->
      <div class="page-header">
        <button type="button" class="btn-back" @click="$router.back()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title">Meus Pets</h1>
        <div style="width:32px"></div>
      </div>

      <!-- Hero banner (desktop) -->
      <div class="pets-hero">
        <div class="hero-left">
          <p class="hero-label">Gerenciamento</p>
          <h2 class="hero-title">Seus Pets</h2>
          <p class="hero-desc">Visualize e edite as informações dos seus pets</p>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-number">{{ pets.length }}</span>
            <span class="hero-stat-label">Pets cadastrados</span>
          </div>
          <router-link to="/cadastroPet" class="hero-stat hero-stat-add">
            <div class="hero-stat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span class="hero-stat-label">Novo Pet</span>
          </router-link>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="loading-section">
        <span class="loading-spinner-lg"></span>
        <p>Carregando seus pets...</p>
      </div>

      <template v-else>

        <!-- Empty State -->
        <div v-if="pets.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="#1155CC" opacity="0.4"/>
              <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="#1155CC" opacity="0.4"/>
              <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="#1155CC" opacity="0.4"/>
              <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="#1155CC" opacity="0.4"/>
              <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="#1155CC" opacity="0.4"/>
            </svg>
          </div>
          <h3>Nenhum pet cadastrado</h3>
          <p>Adicione seu primeiro amiguinho!</p>
          <router-link to="/cadastroPet" class="btn-empty-add">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Cadastrar Pet
          </router-link>
        </div>

        <!-- Grid de pets -->
        <div v-else class="pets-grid">
          <router-link
            v-for="pet in pets"
            :key="pet.id"
            :to="`/editarPet/${pet.id}`"
            class="pet-card"
          >
            <!-- Badges (mobile: inline no info; desktop: topo do card) -->
            <span class="pet-badge-top" :class="getBadgeClass(pet.especie)">{{ getEspecieLabel(pet.especie) }}</span>

            <div class="pet-avatar">
              <img v-if="pet.foto_url" :src="pet.foto_url" :alt="pet.nome_pet" class="pet-avatar-img" />
              <svg v-else width="40" height="40" viewBox="0 0 56 56" fill="none">
                <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="#1155CC" opacity="0.6"/>
                <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="#1155CC" opacity="0.6"/>
                <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="#1155CC" opacity="0.6"/>
                <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="#1155CC" opacity="0.6"/>
                <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="#1155CC" opacity="0.6"/>
              </svg>
            </div>

            <div class="pet-info">
              <div class="pet-info-top">
                <span class="pet-name">{{ pet.nome_pet }}</span>
                <span class="pet-badge-inline" :class="getBadgeClass(pet.especie)">{{ getEspecieLabel(pet.especie) }}</span>
              </div>
              <span class="pet-breed">{{ pet.raca }}</span>
              <span class="pet-age">{{ calcularIdade(pet.data_nascimento) }}</span>
            </div>

            <div class="pet-card-footer">
              <span class="pet-edit-label">Editar</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pet-chevron">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </router-link>

        </div>

        <!-- Add card mobile (quando há pets) -->
        <router-link v-if="pets.length > 0" to="/cadastroPet" class="add-card">
          <div class="add-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <div class="add-info">
            <span class="add-title">Adicionar Novo</span>
            <span class="add-subtitle">Cadastre um novo amiguinho</span>
          </div>
        </router-link>

      </template>
    </div>

    <!-- Bottom Navigation -->
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
      <router-link to="/meusPets" class="nav-item active">
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
import api from '@/services/api'

const router = useRouter()

const pets = ref([])
const isLoading = ref(true)

const token = computed(() => localStorage.getItem('cliente_token'))

const getEspecieLabel = (especie) => {
  const labels = { 1: 'CACHORRO', 2: 'GATO', 3: 'AVE', 4: 'OUTRO' }
  return labels[especie] || 'PET'
}

const getBadgeClass = (especie) => {
  const classes = { 1: 'badge-cachorro', 2: 'badge-gato', 3: 'badge-ave', 4: 'badge-outro' }
  return classes[especie] || 'badge-outro'
}

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return ''
  const nascimento = new Date(dataNascimento)
  const hoje = new Date()
  let anos = hoje.getFullYear() - nascimento.getFullYear()
  const meses = hoje.getMonth() - nascimento.getMonth()
  if (meses < 0 || (meses === 0 && hoje.getDate() < nascimento.getDate())) {
    anos--
  }
  if (anos < 1) {
    const totalMeses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 + hoje.getMonth() - nascimento.getMonth()
    return totalMeses <= 1 ? '1 mês' : `${totalMeses} meses`
  }
  return anos === 1 ? '1 ano' : `${anos} anos`
}

const fetchPets = async () => {
  if (!token.value) {
    router.push('/login')
    return
  }

  try {
    const response = await api.get('/pets', {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })
    pets.value = response.data.data || response.data || []
  } catch (error) {
    console.error('Erro ao buscar pets:', error)
    if (error.response?.status === 401) {
      localStorage.removeItem('cliente_token')
      localStorage.removeItem('cliente')
      router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPets()
})
</script>

<style scoped>
@import '@/assets/variables.css';

/* ===== Base (mobile) ===== */
.pets-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;
}

.pets-topbar { display: none; }
.pets-hero { display: none; }

.pets-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) var(--spacing-md);
  width: 100%;
  max-width: var(--max-width-sm);
  margin: 0 auto;
}

/* Header mobile */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
}

.btn-back {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  padding: var(--spacing-xs);
}

.page-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

/* ===== Loading ===== */
.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.loading-spinner-lg {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border-color);
  border-top-color: #1155CC;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* ===== Badges ===== */
.pet-badge-top { display: none; }

.pet-badge-inline {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.4px;
}

.badge-cachorro { background: #E8F0FB; color: #0A3080; }
.badge-gato     { background: #EDE8F0; color: #6B4A8E; }
.badge-ave      { background: #E8F5E9; color: #2E7D32; }
.badge-outro    { background: #FFF3E0; color: #E65100; }

/* ===== Grid de pets (mobile = lista) ===== */
.pets-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.pet-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border: 1.5px solid #E8ECF0;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: box-shadow 150ms, border-color 150ms, transform 150ms;
}

.pet-card:hover {
  box-shadow: 0 4px 16px rgba(17,85,204,0.1);
  border-color: #1155CC;
}

.pet-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #DDEEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #E8ECF0;
}

.pet-avatar-img { width: 100%; height: 100%; object-fit: cover; }

.pet-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.pet-info-top {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pet-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.pet-breed {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.pet-age {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.pet-card-footer {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.pet-edit-label { display: none; }

.pet-chevron { color: var(--text-muted); }

/* Card adicionar */
.pet-card-add { display: none; }

/* ===== Add Card (mobile) ===== */
.add-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border: 2px dashed #C8D4E8;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  color: inherit;
  transition: border-color 150ms;
}

.add-card:hover { border-color: #1155CC; }

.add-icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(17,85,204,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1155CC;
  flex-shrink: 0;
}

.add-info { display: flex; flex-direction: column; gap: 2px; }
.add-title { font-size: var(--font-size-base); font-weight: 700; color: var(--text-primary); }
.add-subtitle { font-size: var(--font-size-xs); color: var(--text-muted); }

/* ===== Empty State ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) var(--spacing-md);
  text-align: center;
}

.empty-icon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(17,85,204,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state h3 { font-size: var(--font-size-lg); font-weight: 700; color: var(--text-primary); }
.empty-state p  { font-size: var(--font-size-sm); color: var(--text-muted); }

.btn-empty-add {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F07020;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background 150ms, transform 150ms;
  box-shadow: 0 4px 14px rgba(240,112,32,0.3);
}

.btn-empty-add:hover { background: #c85a10; transform: translateY(-1px); }

/* ===== Bottom Nav ===== */
.bottom-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 70px;
  background: var(--bg-primary);
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
  transition: color 150ms;
}

.nav-item.active { color: #1155CC; }
.nav-center { margin-top: -20px; }

.nav-add-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1155CC 0%, #2E80E0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(17,85,204,0.4);
  text-decoration: none;
}

/* ===== Responsive SE ===== */
@media (max-width: 375px) {
  .pets-wrapper { padding: var(--spacing-md) var(--spacing-sm); }
  .pet-avatar, .add-icon-circle { width: 48px; height: 48px; }
}

/* ===== Tablet ===== */
@media (min-width: 768px) {
  .pets-page { background: #F0F2F5; padding-bottom: 0; }
  .pets-wrapper { max-width: 560px; padding: var(--spacing-xl); }
  .bottom-nav { display: none; }
}

/* ===== Desktop ===== */
@media (min-width: 1024px) {
  .pets-page { background: #F0F2F5; flex-direction: column; }

  /* Topbar azul */
  .pets-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 2.5rem;
    background: linear-gradient(90deg, #0A3080 0%, #1155CC 100%);
    position: sticky;
    top: 0;
    z-index: 100;
    flex-shrink: 0;
  }

  .topbar-back {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 150ms;
  }
  .topbar-back:hover { background: rgba(255,255,255,0.25); }

  .topbar-title { font-size: 1rem; font-weight: 700; color: #fff; }

  .topbar-add-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F07020;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 8px 18px;
    border-radius: 20px;
    text-decoration: none;
    transition: background 150ms, transform 150ms;
    box-shadow: 0 2px 8px rgba(240,112,32,0.4);
  }
  .topbar-add-btn:hover { background: #c85a10; transform: translateY(-1px); }

  /* Wrapper */
  .pets-wrapper {
    max-width: 1000px;
    padding: 2rem 2.5rem;
    gap: 1.5rem;
  }

  /* Oculta header mobile */
  .page-header { display: none; }

  /* Hero banner */
  .pets-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #0A3080 0%, #1155CC 55%, #1e6fd9 100%);
    border-radius: 20px;
    padding: 2rem 2.5rem;
    color: #fff;
    box-shadow: 0 8px 32px rgba(17,85,204,0.25);
  }

  .hero-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.6);
    margin-bottom: 6px;
  }

  .hero-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 6px;
  }

  .hero-desc {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.7);
  }

  .hero-stats {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-shrink: 0;
  }

  .hero-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 14px;
    padding: 1rem 1.5rem;
    text-decoration: none;
    transition: background 150ms;
    min-width: 110px;
  }

  .hero-stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }

  .hero-stat-label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.7);
    margin-top: 4px;
    text-align: center;
  }

  .hero-stat-add {
    background: rgba(240,112,32,0.25);
    border-color: rgba(240,112,32,0.4);
    cursor: pointer;
  }
  .hero-stat-add:hover { background: rgba(240,112,32,0.4); }

  .hero-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #F07020;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-bottom: 6px;
    box-shadow: 0 2px 8px rgba(240,112,32,0.5);
  }

  /* Grid de pets: 2 colunas grandes */
  .pets-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    flex-direction: unset;
  }

  .pet-card {
    flex-direction: column;
    align-items: center;
    padding: 2.5rem 2rem 1.5rem;
    border-radius: 24px;
    gap: 1.25rem;
    position: relative;
  }

  .pet-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(17,85,204,0.18);
  }

  /* Badge no topo do card (desktop) */
  .pet-badge-top {
    display: block;
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 11px;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 20px;
    letter-spacing: 0.4px;
  }

  /* Badge inline (oculto no desktop) */
  .pet-badge-inline { display: none; }

  .pet-avatar {
    width: 160px;
    height: 160px;
    border: 5px solid #E8ECF0;
    box-shadow: 0 8px 28px rgba(17,85,204,0.18);
  }

  .pet-card:hover .pet-avatar { border-color: #1155CC; }

  .pet-info {
    align-items: center;
    text-align: center;
    gap: 7px;
    width: 100%;
  }

  .pet-info-top { justify-content: center; }

  .pet-name { font-size: 1.35rem; }

  .pet-breed {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .pet-age {
    font-size: 0.875rem;
    color: var(--text-muted);
    background: #F5F5F7;
    padding: 4px 14px;
    border-radius: 20px;
    display: inline-block;
  }

  .pet-card-footer {
    width: 100%;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid #F0F2F5;
    margin-top: 0.25rem;
    gap: 6px;
  }

  .pet-edit-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1155CC;
  }

  .pet-chevron { color: #1155CC; }

  /* Oculta add-card mobile no desktop */
  .add-card { display: none; }

  /* Empty state no desktop */
  .empty-state { padding: 4rem 2rem; }
  .empty-icon { width: 120px; height: 120px; }
}

/* ===== Desktop Large ===== */
@media (min-width: 1440px) {
  .pets-wrapper { max-width: 1100px; }
  .pets-grid { grid-template-columns: repeat(3, 1fr); gap: 1.75rem; }
  .pet-avatar { width: 170px; height: 170px; }
  .pet-name { font-size: 1.5rem; }
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
