<template>
  <div class="home full-screen">

    <!-- ===== NAVBAR ===== -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="navbar-container">
        <div class="navbar-logo">
          <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="nav-logo-img" />
          <span class="nav-brand">
            <span class="nav-4r">4R</span>
            <span class="nav-pet">PET CLÍNICA</span>
          </span>
        </div>

        <ul class="navbar-links">
          <li><a href="#servicos" @click.prevent="scrollTo('servicos')">Serviços</a></li>
          <li><a href="#sobre" @click.prevent="scrollTo('sobre')">Sobre</a></li>
          <li><a href="#contato" @click.prevent="scrollTo('contato')">Contato</a></li>
          <li><router-link to="/localizacao">Localização</router-link></li>
        </ul>

        <router-link to="/login" class="btn-nav-cliente">Área do Cliente</router-link>

        <button class="mobile-menu-btn" @click="menuOpen = !menuOpen" aria-label="Menu">
          <span class="hamburger" :class="{ active: menuOpen }"></span>
        </button>
      </div>

      <div class="mobile-menu" :class="{ open: menuOpen }">
        <a href="#servicos" @click="scrollTo('servicos'); menuOpen = false">Serviços</a>
        <a href="#sobre" @click="scrollTo('sobre'); menuOpen = false">Sobre</a>
        <a href="#contato" @click="scrollTo('contato'); menuOpen = false">Contato</a>
        <router-link to="/localizacao" @click="menuOpen = false">Localização</router-link>
        <router-link to="/login" class="btn-mobile-cliente" @click="menuOpen = false">
          Área do Cliente
        </router-link>
      </div>
    </nav>

    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-badge">Cuidado especializado para o seu pet</span>
        <h1 class="hero-title">
          Saúde e bem-estar<br>
          <span class="hero-title-highlight">para quem você ama</span>
        </h1>
        <p class="hero-subtitle">
          Atendimento veterinário completo com carinho,<br class="desktop-break">
          dedicação e tecnologia para o seu melhor amigo.
        </p>
        <div class="hero-actions">
          <router-link to="/login" class="btn-hero-primary">
            Agendar Consulta
          </router-link>
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="btn-hero-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
      <div class="hero-scroll-indicator">
        <span></span>
      </div>
    </section>

    <!-- ===== SERVIÇOS ===== -->
    <section id="servicos" class="section-servicos">
      <div class="section-container">
        <div class="section-header">
          <span class="section-badge">O que oferecemos</span>
          <h2 class="section-title">Nossos Serviços</h2>
          <p class="section-subtitle">Cuidado completo para o seu pet em um só lugar</p>
        </div>

        <div class="servicos-grid">
          <div class="servico-card">
            <div class="servico-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h3 class="servico-title">Consultas Veterinárias</h3>
            <p class="servico-desc">Atendimento clínico completo com profissionais especializados para garantir a saúde e qualidade de vida do seu pet.</p>
          </div>

          <div class="servico-card">
            <div class="servico-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 6 C9 3.5 6 2 4 3 C2 4 2 7 4 8 C5 8.5 6 8 7 7"/>
                <path d="M15 6 C15 3.5 18 2 20 3 C22 4 22 7 20 8 C19 8.5 18 8 17 7"/>
                <ellipse cx="12" cy="14" rx="5" ry="6"/>
                <path d="M9 11 C7 12 6 14 6 16 C6 19 8.5 21.5 12 22 C15.5 21.5 18 19 18 16 C18 14 17 12 15 11"/>
              </svg>
            </div>
            <h3 class="servico-title">Banho e Tosa</h3>
            <p class="servico-desc">Estética pet com produtos de qualidade para deixar seu animal sempre limpo, cheiroso e com aparência impecável.</p>
          </div>

          <div class="servico-card">
            <div class="servico-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <h3 class="servico-title">Vacinação</h3>
            <p class="servico-desc">Carteirinha de vacinação atualizada e acompanhamento preventivo para proteger o seu pet de doenças.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SOBRE ===== -->
    <section id="sobre" class="section-sobre">
      <div class="section-container sobre-container">
        <div class="sobre-image-wrap">
          <img
            src="@/assets/images/pets/dogMini.png"
            alt="Pets felizes na 4R Clínica"
            class="sobre-img"
          />
          <div class="sobre-badge-float">
            <strong>+</strong> de cuidado e dedicação
          </div>
        </div>

        <div class="sobre-content">
          <span class="section-badge">Quem somos</span>
          <h2 class="section-title">Cuidando com amor<br>desde o primeiro dia</h2>
          <p class="sobre-text">
            A <strong>4R Pet Clínica Veterinária</strong> nasceu com um propósito claro: oferecer o melhor cuidado para os animais de estimação e tranquilidade total para seus tutores.
          </p>
          <p class="sobre-text">
            Nossa equipe é formada por profissionais apaixonados por animais, prontos para atender com dedicação, responsabilidade e o mais alto padrão de qualidade em cada consulta, banho ou vacinação.
          </p>
          <div class="sobre-stats">
            <div class="stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Dedicação</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">3</span>
              <span class="stat-label">Serviços</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">♥</span>
              <span class="stat-label">Amor pelos pets</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== NOTÍCIAS ===== -->
    <section id="noticias" class="section-noticias">
      <div class="section-container">
        <div class="section-header">
          <span class="section-badge">Fique por dentro</span>
          <h2 class="section-title">Notícias e Dicas</h2>
          <p class="section-subtitle">Conteúdo sobre saúde, bem-estar e cuidados para o seu pet</p>
        </div>

        <div v-if="loadingNoticias" class="noticias-home-grid">
          <div class="noticia-home-skeleton" v-for="i in 3" :key="i"></div>
        </div>

        <div v-else-if="noticias.length === 0" class="noticias-empty">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <p>Em breve, novidades por aqui!</p>
        </div>

        <div v-else class="noticias-home-grid">
          <div
            v-for="noticia in noticias"
            :key="noticia.id"
            class="noticia-home-card"
            @click="abrirNoticia(noticia)"
          >
            <div class="noticia-home-img" :style="{ background: getNoticiaGradient(noticia.categoria) }">
              <img v-if="noticia.foto_capa_url" :src="noticia.foto_capa_url" :alt="noticia.titulo" class="noticia-home-img-real" />
              <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" opacity="0.6">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div class="noticia-home-body">
              <span class="noticia-home-tag" :class="`htag-${noticia.categoria}`">{{ getNoticiaLabel(noticia.categoria) }}</span>
              <h3 class="noticia-home-titulo">{{ noticia.titulo }}</h3>
              <p class="noticia-home-desc">{{ noticia.subtitulo ? noticia.subtitulo.substring(0, 110) + '...' : '' }}</p>
              <span class="noticia-home-link">Ler mais →</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section id="contato" class="section-cta">
      <div class="cta-container">
        <div class="cta-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <h2 class="cta-title">Pronto para cuidar do seu pet?</h2>
        <p class="cta-subtitle">
          Acesse a área do cliente e gerencie consultas, vacinas e muito mais — tudo em um só lugar.
        </p>
        <div class="cta-actions">
          <router-link to="/cadastroCliente" class="btn-cta-primary">
            Criar Conta Grátis
          </router-link>
          <router-link to="/login" class="btn-cta-secondary">
            Já tenho conta
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">
          <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="footer-logo-img" />
          <span class="footer-brand">4R Pet Clínica Veterinária</span>
        </div>
        <p class="footer-copy">© 2026 4R Pet Clínica Veterinária. Todos os direitos reservados.</p>
      </div>
    </footer>

    <!-- ===== WHATSAPP FLUTUANTE ===== -->
    <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="whatsapp-float" title="Falar no WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import api from '@/services/api'
import Swal from 'sweetalert2'

const menuOpen = ref(false)
const isScrolled = ref(false)
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
    ? `<div style="width:100%;height:240px;overflow:hidden;border-radius:0;position:relative">
        <img src="${noticia.foto_capa_url}" alt="${noticia.titulo}"
          style="width:100%;height:100%;object-fit:cover;display:block"/>
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(10,31,68,0.65))"></div>
       </div>`
    : `<div style="width:100%;height:160px;background:${gradient};border-radius:0;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
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

// TODO: substituir pelo número real de WhatsApp (somente números com DDI)
const whatsappNumber = '77991990039'
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber mais sobre os serviços da 4R Pet Clínica Veterinária.`

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchNoticias()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
@import '@/assets/variables.css';

/* ===== BASE ===== */
.home {
  font-family: var(--font-family);
  color: var(--text-primary);
  overflow-x: hidden;
}

/* ===== NAVBAR ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background: transparent;
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.97);
  box-shadow: var(--shadow-md);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-logo-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-brand {
  display: flex;
  align-items: baseline;
  gap: 3px;
}

.nav-4r {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--primary-color);
}

.navbar.scrolled .nav-4r {
  color: var(--primary-color);
}

.nav-4r,
.nav-pet {
  transition: color var(--transition-normal);
}

.navbar:not(.scrolled) .nav-4r {
  color: #fff;
}

.nav-pet {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.navbar:not(.scrolled) .nav-pet {
  color: rgba(255, 255, 255, 0.9);
}

.navbar-links {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  margin-left: auto;
}

.navbar-links a {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color var(--transition-fast);
  padding: 0;
  background: none;
}

.navbar.scrolled .navbar-links a {
  color: var(--text-primary);
}

.navbar-links a:hover {
  color: var(--secondary-color) !important;
  background: none;
}

.btn-nav-cliente {
  display: none;
  padding: 0.5rem 1.25rem;
  background: var(--secondary-color);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  transition: background var(--transition-fast), transform var(--transition-fast);
  white-space: nowrap;
}

.btn-nav-cliente:hover {
  background: var(--secondary-dark);
  transform: translateY(-1px);
}

/* Hamburger */
.mobile-menu-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger,
.hamburger::before,
.hamburger::after {
  display: block;
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all var(--transition-normal);
}

.navbar.scrolled .hamburger,
.navbar.scrolled .hamburger::before,
.navbar.scrolled .hamburger::after {
  background: var(--text-primary);
}

.hamburger {
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  left: 0;
}

.hamburger::before { top: -7px; }
.hamburger::after  { top:  7px; }

.hamburger.active { background: transparent; }
.hamburger.active::before { transform: rotate(45deg); top: 0; }
.hamburger.active::after  { transform: rotate(-45deg); top: 0; }

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: #fff;
  padding: 1rem 1.5rem 1.5rem;
  gap: 0.25rem;
  box-shadow: var(--shadow-lg);
}

.mobile-menu.open {
  display: flex;
}

.mobile-menu a {
  padding: 0.75rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--border-color);
  background: none;
}

.mobile-menu a:last-of-type {
  border-bottom: none;
}

.btn-mobile-cliente {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--secondary-color);
  color: var(--text-primary);
  font-weight: 600;
  text-align: center;
  border-radius: var(--border-radius-lg);
  border-bottom: none !important;
}

/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-color: #0A3080;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(10, 48, 128, 0.88) 0%,
    rgba(17, 85, 204, 0.80) 40%,
    rgba(5, 20, 80, 0.72) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 6rem 1.5rem 4rem;
  max-width: 800px;
}

.hero-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(212, 169, 75, 0.25);
  border: 1px solid rgba(212, 169, 75, 0.5);
  color: var(--secondary-light);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--border-radius-full);
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.hero-title-highlight {
  color: var(--secondary-light);
}

.hero-subtitle {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.desktop-break { display: none; }

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  background: var(--secondary-color);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  width: 100%;
  max-width: 280px;
  transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn-hero-primary:hover {
  background: var(--secondary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 169, 75, 0.4);
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  width: 100%;
  max-width: 280px;
  backdrop-filter: blur(8px);
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.hero-scroll-indicator span {
  display: block;
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
  margin: 0 auto;
  animation: scrollPulse 2s ease infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}

/* ===== SEÇÕES COMUNS ===== */
.section-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-badge {
  display: inline-block;
  padding: 0.3rem 0.875rem;
  background: rgba(17, 85, 204, 0.08);
  color: var(--primary-color);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: var(--border-radius-full);
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

/* ===== SERVIÇOS ===== */
.section-servicos {
  padding: 5rem 0;
  background: var(--bg-primary);
}

.servicos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.servico-card {
  padding: 2rem 1.75rem;
  background: var(--bg-secondary);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  text-align: left;
}

.servico-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.servico-icon-wrap {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 1.25rem;
  color: #fff;
}

.servico-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.servico-desc {
  font-size: 0.925rem;
  color: var(--text-secondary);
  line-height: 1.75;
  text-align: left;
}

/* ===== SOBRE ===== */
.section-sobre {
  padding: 5rem 0;
  background: var(--bg-secondary);
}

.sobre-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.sobre-image-wrap {
  position: relative;
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  flex-shrink: 0;
}

.sobre-img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  display: block;
}

.sobre-badge-float {
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-color);
  box-shadow: var(--shadow-md);
}

.sobre-content .section-title {
  margin-top: 0.5rem;
}

.sobre-text {
  font-size: 0.975rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
  text-align: justify;
  text-justify: inter-word;
}

.sobre-text strong {
  color: var(--primary-color);
  font-weight: 700;
}

.sobre-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.75rem;
  padding: 1.25rem 1.5rem;
  background: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 0.2rem;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);
  flex-shrink: 0;
}

/* ===== NOTÍCIAS HOME ===== */
.section-noticias {
  padding: 5rem 0;
  background: #F8FAFC;
}

.noticias-home-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.noticias-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 20px;
  color: #94A3B8;
  font-size: 15px;
}

.noticia-home-skeleton {
  height: 320px;
  border-radius: 16px;
  background: linear-gradient(90deg, #E8ECF0 25%, #F1F5F9 50%, #E8ECF0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }

.noticia-home-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #E8ECF0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
}
.noticia-home-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  transform: translateY(-4px);
}

.noticia-home-img {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}
.noticia-home-img-real { width: 100%; height: 100%; object-fit: cover; }

.noticia-home-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}
.noticia-home-tag {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; padding: 3px 10px; border-radius: 20px; align-self: flex-start;
}
.htag-noticia   { color: #1D4ED8; background: #DBEAFE; }
.htag-dica      { color: #D97706; background: #FEF3C7; }
.htag-curiosidade { color: #16A34A; background: #DCFCE7; }
.htag-promocao  { color: #DC2626; background: #FEE2E2; }

.noticia-home-titulo {
  font-size: 18px; font-weight: 800; color: #0A1F44;
  line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.noticia-home-desc {
  font-size: 14px; color: #64748B; line-height: 1.65;
  display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  flex: 1;
}
.noticia-home-link {
  font-size: 14px; font-weight: 600; color: #0A3080;
  margin-top: auto; padding-top: 6px;
}
.noticia-home-card:hover .noticia-home-link { text-decoration: underline; }

@media (max-width: 900px) {
  .noticias-home-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .noticias-home-grid { grid-template-columns: 1fr; }
  .section-noticias { padding: 3rem 0; }
}

/* ===== CTA ===== */
.section-cta {
  padding: 5rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 60%, var(--primary-light) 100%);
  text-align: center;
}

.cta-container {
  max-width: 680px;
  margin: 0 auto;
}

.cta-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--secondary-light);
}

.cta-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.btn-cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2.25rem;
  background: var(--secondary-color);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  width: 100%;
  max-width: 280px;
  transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn-cta-primary:hover {
  background: var(--secondary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 169, 75, 0.5);
}

.btn-cta-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2.25rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  width: 100%;
  max-width: 280px;
  backdrop-filter: blur(8px);
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

/* ===== FOOTER ===== */
.footer {
  background: #050F2E;
  padding: 2rem 1.5rem;
}

.footer-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.footer-logo-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  opacity: 0.9;
}

.footer-brand {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.footer-copy {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
}

/* ===== WHATSAPP FLOAT ===== */
.whatsapp-float {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: var(--z-fixed);
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  text-decoration: none;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.6);
  background: #25D366;
}

/* ===== RESPONSIVE — TABLET ===== */
@media (min-width: 768px) {
  .navbar-links { display: flex; }
  .btn-nav-cliente { display: inline-flex; }
  .mobile-menu-btn { display: none; }

  .hero-title { font-size: 3.5rem; }
  .hero-actions { flex-direction: row; justify-content: center; }
  .btn-hero-primary,
  .btn-hero-secondary { width: auto; }
  .desktop-break { display: inline; }

  .servicos-grid { grid-template-columns: repeat(3, 1fr); }
  .servico-card { text-align: left; }
  .servico-icon-wrap { margin: 0 0 1.25rem; }

  .sobre-container { flex-direction: row; align-items: center; }
  .sobre-image-wrap { width: 45%; }
  .sobre-img { height: 300px; }
  .sobre-content { flex: 1; }

  .cta-actions { flex-direction: row; justify-content: center; }
  .btn-cta-primary,
  .btn-cta-secondary { width: auto; }

  .footer-container { flex-direction: row; justify-content: space-between; }
}

/* ===== RESPONSIVE — DESKTOP ===== */
@media (min-width: 1024px) {
  .hero-title { font-size: 4.25rem; }
  .hero-content { padding: 8rem 2rem 5rem; }
  .section-title { font-size: 2.5rem; }
  .sobre-img { height: 350px; }
  .cta-title { font-size: 2.5rem; }
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
