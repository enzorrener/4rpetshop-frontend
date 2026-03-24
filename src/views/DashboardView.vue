<template>
  <div class="dashboard-page">

    <!-- Barra superior desktop -->
    <header class="desktop-topbar">
      <div class="dt-search-wrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="dt-search-icon">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" v-model="searchQuery" placeholder="Buscar serviços, ração, brinquedos..." class="dt-search-input" />
      </div>
      <div class="dt-actions">
        <button type="button" class="dt-notif" @click="toggleNotifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span v-if="hasNotifications" class="dt-notif-dot"></span>
        </button>
        <router-link to="/editarPerfil" class="dt-avatar-btn">
          <img v-if="cliente?.foto_cliente" :src="getFotoUrl(cliente.foto_cliente)" alt="Foto" class="dt-avatar-img" />
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </router-link>
        <span class="dt-username">{{ clienteNome }}</span>
      </div>
    </header>

    <!-- Corpo desktop: conteúdo + sidebar direita -->
    <div class="dashboard-body">

      <!-- Conteúdo principal -->
      <div class="dashboard-content">
      <!-- Header -->
      <div class="dash-header">
        <div class="header-left">
          <span class="header-date">{{ formattedDate }}</span>
          <h1 class="header-greeting">Olá, {{ clienteNome }} <span class="greeting-emoji">🐾</span></h1>
        </div>
        <div class="header-right">
          <router-link to="/editarPerfil" class="btn-profile-desktop" title="Meu Perfil">
            <img v-if="cliente?.foto_cliente" :src="getFotoUrl(cliente.foto_cliente)" alt="Foto do perfil" class="profile-photo-desktop" />
            <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </router-link>
          <button type="button" class="btn-logout" @click="handleLogout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span class="logout-text">Sair</span>
          </button>
        </div>
      </div>

      <div class="search-section">
        <div class="search-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar ração, brinquedos, serviços..."
            class="search-input"
          />
        </div>
      </div>

      <div class="alert-section" v-if="nextAlert">
        <h2 class="section-title">Alerta Prioritário</h2>
        <div class="alert-card">
          <div class="alert-top">
            <div class="alert-pet-info">
              <div class="alert-pet-avatar">
                <img v-if="nextAlert.pet_foto" :src="nextAlert.pet_foto" :alt="nextAlert.pet_nome" class="alert-avatar-img" />
                <svg v-else width="32" height="32" viewBox="0 0 56 56" fill="none">
                  <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.7"/>
                  <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="white" opacity="0.7"/>
                  <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="white" opacity="0.7"/>
                  <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="white" opacity="0.7"/>
                  <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="white" opacity="0.7"/>
                </svg>
              </div>
              <div class="alert-pet-text">
                <span class="alert-pet-name">{{ nextAlert.pet_nome }}</span>
                <span class="alert-pet-type">{{ nextAlert.tipo }}</span>
              </div>
            </div>
            <span class="alert-badge">{{ nextAlert.dias_restantes }}</span>
          </div>
          <div class="alert-bottom">
            <div class="alert-detail">
              <h3 class="alert-title">{{ nextAlert.titulo }}</h3>
              <div class="alert-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ nextAlert.local }}</span>
              </div>
            </div>
            <button type="button" class="btn-schedule" @click="handleSchedule(nextAlert)">Agendar</button>
          </div>
        </div>
      </div>

      <div class="actions-section">
        <div class="actions-grid">
          <a href="#" class="action-item">
            <div class="action-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <span class="action-label">Loja</span>
          </a>
          <router-link to="/agendarConsulta" class="action-item">
            <div class="action-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span class="action-label">Marcar Consulta</span>
          </router-link>
          <a href="#" class="action-item">
            <div class="action-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <span class="action-label">Histórico</span>
          </a>
        </div>
      </div>

      <!-- Meus Pets -->
      <div class="pets-section">
        <div class="section-header">
          <h2 class="section-title">Meus Pets</h2>
          <router-link to="/meusPets" class="section-link">Ver Todos</router-link>
        </div>
        <div class="pets-scroll">
          <router-link
            v-for="pet in pets"
            :key="pet.id"
            :to="`/editarPet/${pet.id}`"
            class="pet-card"
          >
            <div class="pet-avatar">
              <img v-if="pet.foto_url" :src="pet.foto_url" :alt="pet.nome_pet" class="pet-avatar-img" />
              <svg v-else width="44" height="44" viewBox="0 0 56 56" fill="none">
                <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="#1155CC" opacity="0.6"/>
                <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="#1155CC" opacity="0.6"/>
                <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="#1155CC" opacity="0.6"/>
                <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="#1155CC" opacity="0.6"/>
                <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="#1155CC" opacity="0.6"/>
              </svg>
            </div>
            <span class="pet-name">{{ pet.nome_pet }}</span>
            <span class="pet-species">{{ pet.especie || 'Pet' }}</span>
          </router-link>
          <router-link to="/cadastroPet" class="pet-card pet-add">
            <div class="pet-add-circle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span class="pet-name">Adicionar</span>
            <span class="pet-species">Novo pet</span>
          </router-link>
        </div>
      </div>

      <!-- Últimas Compras -->
      <div class="compras-section">
        <div class="section-header">
          <h2 class="section-title">Últimas Compras</h2>
          <a href="#" class="section-link">Ver Histórico</a>
        </div>
        <div class="compras-grid">
          <!-- Produto 1 -->
          <div class="compra-card">
            <div class="compra-img compra-img-food">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <div class="compra-info">
              <span class="compra-nome">Ração Premium Adultos</span>
              <span class="compra-marca">Golden 15kg</span>
              <span class="compra-preco">R$ 189,90</span>
            </div>
            <button type="button" class="btn-repetir" @click="handleReorder({nome:'Ração Premium Adultos'})">Repetir</button>
          </div>
          <!-- Produto 2 -->
          <div class="compra-card">
            <div class="compra-img compra-img-med">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <div class="compra-info">
              <span class="compra-nome">Antipulgas Frontline</span>
              <span class="compra-marca">Pipeta Cães 10-20kg</span>
              <span class="compra-preco">R$ 49,90</span>
            </div>
            <button type="button" class="btn-repetir" @click="handleReorder({nome:'Antipulgas Frontline'})">Repetir</button>
          </div>
          <!-- Produto 3 -->
          <div class="compra-card">
            <div class="compra-img compra-img-toy">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <div class="compra-info">
              <span class="compra-nome">Brinquedo Kong Classic</span>
              <span class="compra-marca">Tamanho Médio</span>
              <span class="compra-preco">R$ 59,00</span>
            </div>
            <button type="button" class="btn-repetir" @click="handleReorder({nome:'Brinquedo Kong Classic'})">Repetir</button>
          </div>
        </div>
      </div>

      <!-- Últimas Notícias -->
      <div class="noticias-section">
        <div class="section-header">
          <h2 class="section-title">Últimas Notícias</h2>
        </div>

        <div v-if="loadingNoticias" class="noticias-loading">
          <span class="noticia-skeleton" v-for="i in 3" :key="i"></span>
        </div>

        <div v-else-if="noticias.length === 0" class="noticias-dash-empty">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <p>Em breve, novidades por aqui!</p>
        </div>

        <div v-else class="noticias-scroll">
          <div
            v-for="noticia in noticias"
            :key="noticia.id"
            class="noticia-card-dyn"
            @click="abrirNoticia(noticia)"
          >
            <div class="noticia-img-dyn" :style="{ background: getNoticiaGradient(noticia.categoria) }">
              <img v-if="noticia.foto_capa_url" :src="noticia.foto_capa_url" :alt="noticia.titulo" class="noticia-img-real" />
              <svg v-else width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" opacity="0.7">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div class="noticia-body-dyn">
              <span class="noticia-tag-dyn" :class="`tag-${noticia.categoria}`">{{ getNoticiaLabel(noticia.categoria) }}</span>
              <h3 class="noticia-titulo-dyn">{{ noticia.titulo }}</h3>
              <p class="noticia-desc-dyn">{{ noticia.subtitulo ? noticia.subtitulo.substring(0, 100) + '...' : '' }}</p>
              <span class="noticia-data-dyn">{{ formatNoticiaDate(noticia.publicado_em || noticia.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <router-link to="/dashboard" class="nav-item active">
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

      <!-- Sidebar direita (desktop) -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <router-link to="/dashboard" class="snav-item snav-active">
            <div class="snav-icon" style="background:rgba(17,85,204,0.1);color:#1155CC">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span>Dashboard</span>
          </router-link>
          <router-link to="/meusPets" class="snav-item">
            <div class="snav-icon" style="background:rgba(240,112,32,0.1);color:#F07020">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/>
                <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 00-.42-3.31"/>
              </svg>
            </div>
            <span>Meus Pets</span>
          </router-link>
          <router-link to="/agendarConsulta" class="snav-item">
            <div class="snav-icon" style="background:rgba(76,175,80,0.1);color:#4CAF50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <span>Consultas</span>
          </router-link>
          <router-link to="/editarPerfil" class="snav-item">
            <div class="snav-icon" style="background:rgba(156,39,176,0.1);color:#9C27B0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span>Perfil</span>
          </router-link>
        </nav>
        <button type="button" class="snav-logout" @click="handleLogout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sair
        </button>
      </aside>

    </div><!-- fim dashboard-body -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'

const router = useRouter()

const searchQuery = ref('')
const pets = ref([])
const favorites = ref([])
const hasNotifications = ref(false)
const nextAlert = ref(null)
const isLoading = ref(true)
const noticias = ref([])
const loadingNoticias = ref(false)

const noticiasCategorias = {
  noticia: 'Notícia', dica: 'Dica',
  curiosidade: 'Curiosidade', promocao: 'Promoção'
}

const getNoticiaLabel = (cat) => noticiasCategorias[cat] || cat

const getNoticiaGradient = (cat) => {
  const map = {
    noticia: 'linear-gradient(135deg,#1155CC,#0A3080)',
    dica: 'linear-gradient(135deg,#F07020,#c85a10)',
    curiosidade: 'linear-gradient(135deg,#4CAF50,#2e7d32)',
    promocao: 'linear-gradient(135deg,#E53935,#B71C1C)'
  }
  return map[cat] || 'linear-gradient(135deg,#607D8B,#37474F)'
}

const formatNoticiaDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const fetchNoticias = async () => {
  loadingNoticias.value = true
  try {
    const response = await api.get('/noticias')
    noticias.value = (response.data.data || response.data || []).slice(0, 6)
  } catch {
    noticias.value = []
  } finally {
    loadingNoticias.value = false
  }
}

const catBadgeStyle = {
  noticia:     'background:#DBEAFE;color:#1D4ED8',
  dica:        'background:#FEF3C7;color:#D97706',
  curiosidade: 'background:#DCFCE7;color:#16A34A',
  promocao:    'background:#FEE2E2;color:#DC2626'
}

const abrirNoticia = (noticia) => {
  const gradient = getNoticiaGradient(noticia.categoria)
  const badge    = catBadgeStyle[noticia.categoria] || 'background:#F1F5F9;color:#64748B'
  const label    = getNoticiaLabel(noticia.categoria)
  const dataFmt  = (noticia.publicado_em || noticia.created_at)
    ? new Date(noticia.publicado_em || noticia.created_at)
        .toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' })
    : ''

  const heroHtml = noticia.foto_capa_url
    ? `<div style="width:100%;height:240px;overflow:hidden;position:relative">
        <img src="${noticia.foto_capa_url}" alt="${noticia.titulo}"
          style="width:100%;height:100%;object-fit:cover;display:block"/>
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(10,31,68,0.65))"></div>
       </div>`
    : `<div style="width:100%;height:160px;background:${gradient};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
        <div style="position:absolute;inset:0;opacity:0.08;background:radial-gradient(circle at 70% 30%,white,transparent)"></div>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
       </div>`

  const paragrafos = (noticia.conteudo || '')
    .split('\n')
    .map(p => p.trim())
    .filter(p => p)
    .map(p => `<p style="margin:0 0 14px;line-height:1.8;color:#374151;font-size:15px">${p}</p>`)
    .join('')

  Swal.fire({
    html: `
      <div style="text-align:left;font-family:inherit">
        ${heroHtml}
        <div style="padding:22px 24px 8px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
            <span style="${badge};font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:0.07em">${label}</span>
            ${dataFmt ? `<span style="font-size:12px;color:#94A3B8;font-weight:500">${dataFmt}</span>` : ''}
          </div>
          <h2 style="font-size:20px;font-weight:800;color:#0A1F44;line-height:1.35;margin:0 0 10px">${noticia.titulo}</h2>
          ${noticia.subtitulo ? `<p style="font-size:14px;color:#64748B;line-height:1.65;margin:0 0 18px;padding:12px 14px;background:#F8FAFF;border-left:3px solid #1155CC;border-radius:0 8px 8px 0;font-style:italic">${noticia.subtitulo}</p>` : ''}
          <div style="max-height:38vh;overflow-y:auto;padding-right:6px;margin-top:2px">
            ${paragrafos || '<p style="color:#94A3B8;font-size:14px">Sem conteúdo disponível.</p>'}
          </div>
        </div>
      </div>`,
    showConfirmButton: true,
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#0A3080',
    width: '660px',
    padding: '0',
    background: '#fff',
    customClass: { popup: 'swal-noticia-popup', confirmButton: 'swal-noticia-btn' }
  })
}

const cliente = ref((() => {
  try { return JSON.parse(localStorage.getItem('cliente')) } catch { return null }
})())

const token = computed(() => localStorage.getItem('cliente_token'))

const clienteNome = computed(() => cliente.value?.primeiro_nome || 'Visitante')

const formattedDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

const checkAuth = () => {
  if (!cliente.value || !token.value) {
    router.push('/login')
    return false
  }
  return true
}

const getFotoUrl = (fotoPet) => {
  if (!fotoPet) return null
  if (fotoPet.startsWith('http')) return fotoPet
  return `https://4rpetshop.srv1211850.hstgr.cloud/storage/${fotoPet}`
}

const fetchPets = async () => {
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
  }
}

const fetchAlerts = async () => {
  try {
    const response = await api.get('/alertas', {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })
    const alertas = response.data.data || response.data || []
    if (alertas.length > 0) {
      nextAlert.value = alertas[0]
      hasNotifications.value = true
    }
  } catch {
  }
}

const fetchFavorites = async () => {
  try {
    const response = await api.get('/favoritos', {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })
    favorites.value = response.data.data || response.data || []
  } catch {
  }
}

const toggleNotifications = () => {
  Swal.fire({
    icon: 'info',
    title: 'Notificações',
    text: 'Em breve você poderá ver suas notificações aqui!',
    confirmButtonColor: '#1155CC'
  })
}

const handleLogout = async () => {
  const result = await Swal.fire({
    icon: 'question',
    title: 'Desconectar',
    text: 'Deseja realmente sair da sua conta?',
    showCancelButton: true,
    confirmButtonColor: '#E53935',
    cancelButtonColor: '#1155CC',
    confirmButtonText: 'Sair',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  try {
    await api.post('/logout', {}, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })
  } catch {
    // Mesmo se falhar no backend, limpa localmente
  }

  localStorage.removeItem('cliente_token')
  localStorage.removeItem('cliente')
  router.push('/login')
}

const handleSchedule = (alert) => {
  Swal.fire({
    icon: 'info',
    title: 'Agendamento',
    text: `Agendamento para "${alert.titulo}" será disponibilizado em breve!`,
    confirmButtonColor: '#1155CC'
  })
}

const handleReorder = (item) => {
  Swal.fire({
    icon: 'info',
    title: 'Repetir',
    text: `Repetir "${item.nome}" será disponibilizado em breve!`,
    confirmButtonColor: '#1155CC'
  })
}

onMounted(async () => {
  if (!checkAuth()) return

  // Atualiza foto_cliente do servidor (pode ter sido alterada após o login)
  try {
    const res = await api.get('/me', {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })
    if (res.data?.foto_cliente !== undefined) {
      const stored = JSON.parse(localStorage.getItem('cliente') || '{}')
      const updated = { ...stored, foto_cliente: res.data.foto_cliente }
      localStorage.setItem('cliente', JSON.stringify(updated))
      cliente.value = updated
    }
  } catch {}

  isLoading.value = true
  await Promise.allSettled([
    fetchPets(),
    fetchAlerts(),
    fetchFavorites(),
    fetchNoticias()
  ])
  isLoading.value = false
})
</script>

<style scoped>
@import '@/assets/variables.css';

.dashboard-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: var(--spacing-lg) var(--spacing-md);
  padding-bottom: 90px;
}

.dashboard-content {
  width: 100%;
  max-width: var(--max-width-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* ===== Header ===== */
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-date {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: var(--font-weight-medium);
}

.header-greeting {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.greeting-emoji {
  font-size: var(--font-size-lg);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.btn-admin {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.btn-admin:hover {
  opacity: 0.7;
}

.btn-notification {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
}

.notification-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--error-color);
}

/* Perfil — apenas tablet/desktop */
.btn-profile-desktop {
  display: none;
}

@media (min-width: 768px) {
  .btn-profile-desktop {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 1.5px solid var(--border-color);
    color: var(--text-primary);
    text-decoration: none;
    overflow: hidden;
    transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
    flex-shrink: 0;
  }

  .btn-profile-desktop:hover {
    background: rgba(17, 85, 204, 0.08);
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  .profile-photo-desktop {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--error-color);
  padding: var(--spacing-xs);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  transition: opacity var(--transition-fast);
}

.btn-logout:hover {
  opacity: 0.7;
}

.logout-text {
  font-size: var(--font-size-xs);
}

/* ===== Search ===== */
.search-section {
  width: 100%;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: var(--input-height-lg);
  padding: 0 var(--spacing-md) 0 calc(var(--spacing-md) + 28px);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  border-color: #1155CC;
  box-shadow: 0 0 0 3px rgba(17, 85, 204, 0.15);
}

/* ===== Section Titles ===== */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.section-link {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #F07020;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3px;
}

.section-link:hover {
  color: #c85a10;
  text-decoration: underline;
}

/* ===== Alert Card ===== */
.alert-section .section-title {
  margin-bottom: var(--spacing-sm);
}

.alert-card {
  background: linear-gradient(135deg, #0A3080 0%, #1155CC 100%);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-md);
  color: white;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.alert-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-pet-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.alert-pet-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.alert-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.alert-pet-text {
  display: flex;
  flex-direction: column;
}

.alert-pet-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.alert-pet-type {
  font-size: var(--font-size-xs);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.alert-badge {
  background-color: rgba(255, 255, 255, 0.25);
  padding: 4px 10px;
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.alert-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.alert-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.alert-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.alert-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  opacity: 0.85;
}

.btn-schedule {
  background-color: #F07020;
  color: #ffffff;
  border: none;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  white-space: nowrap;
}

.btn-schedule:hover {
  background-color: #c85a10;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(240,112,32,0.4);
}

/* ===== Quick Actions ===== */
.actions-grid {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.action-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  text-decoration: none;
  color: var(--text-secondary);
}

.action-icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: var(--border-radius-lg);
  background-color: #EBF5FF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0A3080;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.action-item:hover .action-icon-wrapper {
  background-color: #E0EBE0;
  transform: translateY(-2px);
}

.action-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

/* ===== My Pets ===== */
.pets-scroll {
  display: flex;
  gap: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-xs);
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.pets-scroll::-webkit-scrollbar {
  display: none;
}

.pet-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  min-width: 68px;
  text-decoration: none;
  color: var(--text-secondary);
}

.pet-add-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.pet-add:hover .pet-add-circle {
  border-color: #1155CC;
  color: #1155CC;
}

.pet-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #DDEEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid var(--border-color);
}

.pet-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-name {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  text-align: center;
  white-space: nowrap;
}

/* ===== Favorites ===== */
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.favorite-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background-color: var(--bg-primary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  transition: box-shadow var(--transition-fast);
}

.favorite-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.favorite-img-wrapper {
  width: 52px;
  height: 52px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  flex-shrink: 0;
}

.favorite-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-img-placeholder {
  width: 100%;
  height: 100%;
  background-color: #EBF5FF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1155CC;
}

.favorite-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.favorite-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.favorite-detail {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.btn-reorder {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: #EBF5FF;
  color: #1155CC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color var(--transition-fast);
}

.btn-reorder:hover {
  background-color: #E0EBE0;
}

.favorites-empty {
  text-align: center;
  padding: var(--spacing-lg) var(--spacing-md);
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

/* ===== Pet species label ===== */
.pet-species {
  font-size: 10px;
  color: var(--text-muted);
  text-align: center;
}

/* ===== Últimas Compras ===== */
.compras-section { width: 100%; }

.compras-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.compra-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-primary);
  border: 1.5px solid #E8ECF0;
  border-radius: var(--border-radius-lg);
  transition: box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.compra-card:hover {
  border-color: #F07020;
  box-shadow: 0 2px 12px rgba(240,112,32,0.1);
}

.compra-img {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.compra-img-food { background: rgba(17,85,204,0.1); color: #1155CC; }
.compra-img-med  { background: rgba(229,57,53,0.1); color: #E53935; }
.compra-img-toy  { background: rgba(240,112,32,0.1); color: #F07020; }

.compra-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.compra-nome {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.compra-marca {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.compra-preco {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: #1155CC;
}

.btn-repetir {
  background: #F07020;
  color: #fff;
  border: none;
  padding: 7px 16px;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.btn-repetir:hover {
  background: #c85a10;
  transform: translateY(-1px);
}

/* ===== Últimas Notícias dinâmicas ===== */
.noticias-dash-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 16px;
  color: #94A3B8;
  font-size: 13px;
  background: white;
  border-radius: 14px;
  border: 1.5px dashed #E8ECF0;
}

.noticias-loading {
  display: flex;
  gap: 12px;
  overflow: hidden;
}
.noticia-skeleton {
  flex: 0 0 260px;
  height: 220px;
  border-radius: 14px;
  background: linear-gradient(90deg, #E8ECF0 25%, #F1F5F9 50%, #E8ECF0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }

.noticias-scroll {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;
}
.noticias-scroll::-webkit-scrollbar { height: 4px; }
.noticias-scroll::-webkit-scrollbar-track { background: transparent; }
.noticias-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }

.noticia-card-dyn {
  flex: 0 0 300px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #E8ECF0;
  cursor: pointer;
  scroll-snap-align: start;
  transition: box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.noticia-card-dyn:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); transform: translateY(-3px); }

.noticia-img-dyn {
  width: 100%;
  height: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.noticia-img-real { width: 100%; height: 100%; object-fit: cover; }

.noticia-body-dyn {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.noticia-tag-dyn {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; padding: 3px 10px; border-radius: 20px; align-self: flex-start;
}
.tag-noticia   { color: #1D4ED8; background: #DBEAFE; }
.tag-dica      { color: #D97706; background: #FEF3C7; }
.tag-curiosidade { color: #16A34A; background: #DCFCE7; }
.tag-promocao  { color: #DC2626; background: #FEE2E2; }

.noticia-titulo-dyn {
  font-size: 15px; font-weight: 700; color: #0A1F44;
  line-height: 1.45;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.noticia-desc-dyn {
  font-size: 13px; color: #64748B; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.noticia-data-dyn { font-size: 12px; color: #94A3B8; margin-top: 2px; }

/* ===== Últimas Notícias (legado estático) ===== */
.noticias-section { width: 100%; }

.noticias-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.noticia-card {
  background: var(--bg-primary);
  border: 1.5px solid #E8ECF0;
  border-radius: 16px;
  overflow: hidden;
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}

.noticia-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.09);
  transform: translateY(-2px);
}

.noticia-img {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noticia-img-sm {
  height: 110px;
}

.noticia-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.noticia-body-sm {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.noticia-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #1155CC;
  background: rgba(17,85,204,0.08);
  padding: 2px 8px;
  border-radius: 20px;
  align-self: flex-start;
}

.noticia-tag-orange { color: #F07020; background: rgba(240,112,32,0.1); }
.noticia-tag-green  { color: #4CAF50; background: rgba(76,175,80,0.1); }
.noticia-tag-purple { color: #9C27B0; background: rgba(156,39,176,0.1); }

.noticia-titulo {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  line-height: 1.35;
}

.noticia-titulo-sm {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  line-height: 1.3;
}

.noticia-desc {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.noticia-link {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #1155CC;
  text-decoration: none;
  margin-top: 4px;
}

.noticia-link:hover { text-decoration: underline; }

.noticias-center {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.noticia-small {
  display: flex;
  flex-direction: row;
}

.noticia-small .noticia-img-sm {
  width: 110px;
  height: auto;
  min-height: 90px;
  flex-shrink: 0;
  border-radius: 0;
}

/* ===== Bottom Navigation ===== */
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
  background: linear-gradient(135deg, #1155CC 0%, #2E80E0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(17, 85, 204, 0.4);
  text-decoration: none;
}

/* ===== Responsive - iPhone SE ===== */
@media (max-width: 375px) {
  .dashboard-page {
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .header-greeting {
    font-size: var(--font-size-lg);
  }

  .action-icon-wrapper {
    width: 46px;
    height: 46px;
  }

  .pet-avatar,
  .pet-add-circle {
    width: 66px;
    height: 66px;
  }
}

/* Responsive - Android/iPhone Pro Max */
@media (min-width: 428px) {
  .dashboard-content {
    max-width: var(--max-width-md);
  }
}

/* ===== Desktop Topbar (oculto no mobile) ===== */
.desktop-topbar {
  display: none;
}

/* ===== Dashboard Body (mobile: fluxo normal) ===== */
.dashboard-body {
  display: contents;
}

/* ===== Sidebar (oculta no mobile) ===== */
.sidebar {
  display: none;
}

/* ===== Tablet ===== */
@media (min-width: 768px) {
  .dashboard-page {
    background: var(--bg-page);
    align-items: center;
    padding: var(--spacing-xl);
    padding-bottom: 0;
  }

  .dashboard-content {
    background-color: var(--bg-primary);
    padding: var(--spacing-2xl);
    border-radius: var(--border-radius-2xl);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 480px;
  }

  .bottom-nav {
    display: none;
  }
}

/* ===== Desktop ===== */
@media (min-width: 1024px) {
  /* Layout geral: coluna (topbar + body) */
  .dashboard-page {
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    background: #F0F2F5;
    min-height: 100vh;
  }

  /* ── Topbar ── */
  .desktop-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 2rem;
    background: linear-gradient(90deg, #0A3080 0%, #1155CC 100%);
    border-bottom: none;
    position: sticky;
    top: 0;
    z-index: 100;
    flex-shrink: 0;
    gap: 1rem;
  }

  .dt-search-wrap {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 380px;
  }

  .dt-search-icon {
    position: absolute;
    left: 12px;
    color: #9CA3AF;
    pointer-events: none;
  }

  .dt-search-input {
    width: 100%;
    height: 38px;
    padding: 0 16px 0 40px;
    font-size: 0.875rem;
    color: #1F2937;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 20px;
    outline: none;
    color: #fff;
    transition: border-color 150ms, background 150ms;
  }

  .dt-search-input::placeholder { color: rgba(255,255,255,0.6); }

  .dt-search-input:focus {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.6);
  }

  .dt-search-icon { color: rgba(255,255,255,0.7); }

  .dt-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dt-notif {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    transition: background 150ms;
  }

  .dt-notif:hover { background: rgba(255,255,255,0.25); }

  .dt-notif-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #F07020;
    border: 2px solid #1155CC;
  }

  .dt-avatar-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    overflow: hidden;
    transition: border-color 150ms, background 150ms;
  }

  .dt-avatar-btn:hover {
    border-color: #F07020;
    background: rgba(255,255,255,0.3);
  }

  .dt-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dt-username {
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }

  /* ── Body: conteúdo + sidebar direita ── */
  .dashboard-body {
    display: flex;
    flex: 1;
    min-height: calc(100vh - 60px);
  }

  /* ── Conteúdo principal ── */
  .dashboard-content {
    flex: 1;
    max-width: none;
    background: #F0F2F5;
    border-radius: 0;
    box-shadow: none;
    padding: 2rem 2.5rem;
    overflow-y: auto;
    min-height: calc(100vh - 60px);
  }

  /* ── Sidebar direita ── */
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 220px;
    flex-shrink: 0;
    background: #ffffff;
    border-left: 1px solid #E8ECF0;
    height: calc(100vh - 60px);
    position: sticky;
    top: 60px;
    padding: 0;
    overflow: hidden;
  }

  /* Cabeçalho azul da sidebar */
  .sidebar::before {
    content: '4R Pet Clínica';
    display: block;
    background: linear-gradient(135deg, #0A3080 0%, #1155CC 100%);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 1.125rem 1.25rem;
    border-bottom: 3px solid #F07020;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    padding: 1rem 0.75rem 0;
  }

  .snav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 10px;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6B7280;
    text-decoration: none;
    transition: background 150ms, color 150ms;
  }

  .snav-item:hover {
    background: #F5F5F7;
    color: #1F2937;
  }

  .snav-active,
  .snav-item.router-link-active {
    background: rgba(17, 85, 204, 0.07);
    color: #1155CC;
    font-weight: 600;
    border-left: 3px solid #F07020;
    padding-left: 7px;
  }

  .snav-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .snav-logout {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 10px;
    font-size: 0.825rem;
    font-weight: 500;
    color: #9CA3AF;
    background: none;
    border: none;
    border-top: 1px solid #F0F0F0;
    cursor: pointer;
    width: 100%;
    margin: 0.75rem 0.75rem 0.75rem;
    width: calc(100% - 1.5rem);
    padding-top: 0.875rem;
    transition: color 150ms, background 150ms;
  }

  .snav-logout:hover {
    color: #E53935;
    background: rgba(229, 57, 53, 0.06);
  }

  /* Oculta elementos duplicados no desktop */
  .search-section { display: none; }
  .btn-profile-desktop,
  .btn-logout { display: none !important; }
  .bottom-nav { display: none; }

  /* Header */
  .dash-header { margin-bottom: 0.25rem; }

  .header-date {
    font-size: var(--font-size-sm);
    color: #F07020;
    font-weight: 600;
  }

  .header-greeting {
    font-size: 1.75rem;
    background: linear-gradient(90deg, #0A3080 0%, #1155CC 60%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Alert */
  .alert-card {
    padding: 1.75rem;
    border-radius: 20px;
    background: linear-gradient(135deg, #0A3080 0%, #1155CC 50%, #1e6fd9 100%);
    box-shadow: 0 8px 32px rgba(17,85,204,0.3);
  }
  .alert-title { font-size: 1.35rem; }

  /* Quick Actions */
  .actions-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .action-item {
    background: var(--bg-primary);
    border: 1.5px solid #E8ECF0;
    border-radius: 16px;
    padding: 1.5rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    transition: box-shadow 150ms ease, transform 150ms ease, border-color 150ms;
  }

  .action-item:hover {
    box-shadow: 0 8px 24px rgba(17,85,204,0.12);
    transform: translateY(-3px);
    border-color: #1155CC;
  }

  .action-item:nth-child(1) .action-icon-wrapper { background-color: rgba(17,85,204,0.09); color: #1155CC; }
  .action-item:nth-child(2) .action-icon-wrapper { background-color: rgba(240,112,32,0.1); color: #F07020; }
  .action-item:nth-child(3) .action-icon-wrapper { background-color: rgba(76,175,80,0.1); color: #4CAF50; }

  .action-item:nth-child(1):hover .action-icon-wrapper { background-color: #1155CC; color: #fff; }
  .action-item:nth-child(2):hover .action-icon-wrapper { background-color: #F07020; color: #fff; }
  .action-item:nth-child(3):hover .action-icon-wrapper { background-color: #4CAF50; color: #fff; }

  .action-item:hover .action-icon-wrapper { transform: none; }

  .action-icon-wrapper {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    transition: background-color 150ms, color 150ms;
  }

  .action-label {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-primary);
  }

  /* Section title accent */
  .section-title {
    font-size: 1rem;
    position: relative;
    padding-left: 10px;
  }

  .section-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 16px;
    background: linear-gradient(180deg, #1155CC 0%, #F07020 100%);
    border-radius: 2px;
  }

  /* Pets: grid estilo MeusPets */
  .pets-scroll {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    overflow: visible;
    padding-bottom: 0;
  }

  .pet-card {
    min-width: unset;
    background: var(--bg-primary);
    border: 2px solid #E8ECF0;
    border-radius: 24px;
    padding: 2rem 1.5rem;
    transition: box-shadow 150ms ease, transform 150ms ease, border-color 150ms;
    gap: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .pet-card:hover {
    box-shadow: 0 8px 28px rgba(17,85,204,0.18);
    transform: translateY(-4px);
    border-color: #1155CC;
  }

  .pet-add:hover { border-color: #F07020; }
  .pet-add:hover .pet-add-circle { border-color: #F07020; color: #F07020; }

  .pet-avatar {
    width: 130px;
    height: 130px;
    border: 3px solid #E8ECF0;
    box-shadow: 0 4px 14px rgba(17,85,204,0.14);
  }

  .pet-card:hover .pet-avatar { border-color: #1155CC; }

  .pet-add-circle { width: 130px; height: 130px; }

  .pet-name { font-size: 1rem; font-weight: 700; color: #0A1F44; }
  .pet-species { font-size: 0.8rem; color: #6B7A99; }

  /* Compras: grid 3 colunas */
  .compras-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    flex-direction: unset;
  }

  .compra-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.25rem;
    gap: 0.75rem;
    border-radius: 16px;
  }

  .compra-img { width: 52px; height: 52px; }

  .btn-repetir {
    width: 100%;
    padding: 9px;
    text-align: center;
  }

  /* Notícias: grid editorial 3 colunas */
  .noticias-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;
    flex-direction: unset;
  }

  .noticia-left {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    flex-direction: column;
  }

  .noticias-center {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .noticia-right {
    grid-column: 3;
    grid-row: 1;
    display: flex;
    flex-direction: column;
  }

  .noticia-img { height: 180px; }
  .noticia-img-sm { height: auto; min-height: 120px; }

  .noticia-small {
    flex-direction: column;
  }

  .noticia-small .noticia-img-sm {
    width: 100%;
    height: 120px;
    min-height: unset;
  }

  .noticia-titulo { font-size: 1rem; }
  .noticia-desc { -webkit-line-clamp: 3; }

  /* Favorites */
  .favorite-card {
    padding: 1rem;
    border-radius: 14px;
    border: 1.5px solid #E8ECF0;
    transition: border-color 150ms, box-shadow 150ms;
  }
  .favorite-card:hover { border-color: #F07020; }

  .btn-reorder {
    background-color: rgba(240,112,32,0.1);
    color: #F07020;
  }
  .btn-reorder:hover { background-color: rgba(240,112,32,0.2); }

  .favorite-img-wrapper { width: 60px; height: 60px; border-radius: 12px; }
}

/* ===== Desktop Large ===== */
@media (min-width: 1440px) {
  .sidebar { width: 240px; }
  .desktop-topbar { padding: 0 2.5rem; }
  .dashboard-content { padding: 2.5rem 3rem; }
  .header-greeting { font-size: 2rem; }

  .pets-scroll { grid-template-columns: repeat(3, 1fr); }
  .pet-avatar   { width: 140px; height: 140px; }
  .pet-add-circle { width: 140px; height: 140px; }
}
</style>

<style>
.swal-noticia-popup {
  border-radius: 20px !important;
  overflow: hidden !important;
  padding: 0 !important;
}
.swal-noticia-popup .swal2-html-container {
  margin: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
}
.swal-noticia-popup .swal2-actions {
  margin: 0 !important;
  padding: 16px 24px 20px !important;
  justify-content: flex-end !important;
}
.swal-noticia-btn {
  border-radius: 10px !important;
  padding: 10px 28px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
}
</style>
