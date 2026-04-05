<template>
  <div class="localizacao-page">

    <!-- Navbar -->
    <NavBar />

    <!-- Main -->
    <main class="main-content">

      <!-- Page Header -->
      <header class="page-header">
        <h1 class="page-title">Nossa Localização</h1>
        <p class="page-subtitle">Estamos localizados no coração da cidade para oferecer o melhor atendimento ao seu pet, com fácil acesso.</p>
      </header>

      <!-- Grid: Mapa + Cards -->
      <div class="content-grid">

        <!-- Mapa -->
        <div class="map-col">
          <div class="map-container">
            <div id="map" ref="mapRef"></div>

            <!-- Controles do mapa -->
            <div class="map-controls">
              <button @click="zoomIn" class="map-btn" title="Aumentar zoom">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <button @click="zoomOut" class="map-btn" title="Diminuir zoom">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <button @click="centerMap" class="map-btn" title="Centralizar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
                </svg>
              </button>
            </div>

            <!-- Botão Google Maps flutuante -->
            <div class="map-footer-btn">
              <a :href="googleMapsLink" target="_blank" rel="noopener noreferrer" class="btn-maps">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                Abrir no Google Maps
              </a>
            </div>

            <!-- Popup mobile -->
            <div class="marker-popup" :class="{ show: showPopup }" @click="showImageModal = true">
              <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="popup-logo" />
              <div class="popup-content">
                <strong>4R Pet Clínica</strong>
                <span>Clique para ver a fachada</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Cards laterais -->
        <div class="cards-col">

          <!-- Card destaque: WhatsApp -->
          <div class="card card-highlight">
            <div class="card-highlight-deco">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" opacity="0.12">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div class="card-highlight-content">
              <span class="card-eyebrow">Atendimento</span>
              <h2 class="card-highlight-title">Fale conosco agora</h2>
              <p class="card-highlight-sub">Tire dúvidas, agende consultas ou solicite informações diretamente pelo WhatsApp.</p>
              <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chamar no WhatsApp
              </a>
            </div>
          </div>

          <!-- Card Endereço -->
          <div class="card card-info">
            <div class="card-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="card-info-body">
              <h3 class="card-info-title">Endereço</h3>
              <p class="card-info-text">R. Ruy Barbosa - Centro<br>Barreiras - BA, 47800-082</p>
              <button @click="showImageModal = true" class="card-link-btn">
                Ver fachada da loja →
              </button>
            </div>
          </div>

          <!-- Card Horários -->
          <div class="card card-info">
            <div class="card-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="card-info-body">
              <h3 class="card-info-title">Horário de Atendimento</h3>
              <div class="hours-list">
                <div class="hours-row">
                  <span class="hours-day">Segunda - Sexta</span>
                  <span class="hours-time">08h às 18h</span>
                </div>
                <div class="hours-row">
                  <span class="hours-day">Sábado</span>
                  <span class="hours-time">08h às 13h</span>
                </div>
                <div class="hours-row">
                  <span class="hours-day">Domingo</span>
                  <span class="hours-time closed">Fechado</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-grid">
        <!-- Marca -->
        <div class="footer-brand-col">
          <div class="footer-logo">
            <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="footer-logo-img" />
            <span class="footer-brand-name">4R Pet Clínica</span>
          </div>
          <p class="footer-brand-desc">Referência em medicina veterinária. Cuidado especializado com amor e dedicação para o seu melhor amigo.</p>
        </div>
        <!-- Links -->
        <div class="footer-links-col">
          <h4 class="footer-col-title">Links Úteis</h4>
          <router-link to="/" class="footer-link">Início</router-link>
          <router-link to="/servicos" class="footer-link">Serviços</router-link>
          <router-link to="/agendamento" class="footer-link">Agendamento</router-link>
          <router-link to="/sobre" class="footer-link">Sobre Nós</router-link>
        </div>
        <!-- Suporte -->
        <div class="footer-links-col">
          <h4 class="footer-col-title">Contato</h4>
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="footer-link">WhatsApp</a>
          <a :href="googleMapsLink" target="_blank" rel="noopener noreferrer" class="footer-link">Como Chegar</a>
          <span class="footer-link-static">Barreiras - BA</span>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; 2026 4R Pet Clínica Veterinária. Todos os direitos reservados.</p>
      </div>
    </footer>

    <!-- Modal Fachada -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showImageModal" class="modal-backdrop" @click="showImageModal = false">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="showImageModal = false" aria-label="Fechar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <img src="@/assets/images/loja/fachada.webp" alt="Fachada da 4R Pet Clínica" class="fachada-img" />
            <div class="modal-info">
              <h3>4R Pet Clínica Veterinária</h3>
              <p>R. Ruy Barbosa - Centro, Barreiras - BA</p>
              <a :href="googleMapsLink" target="_blank" rel="noopener noreferrer" class="modal-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/NavBar.vue'

const showImageModal = ref(false)
const showPopup = ref(false)
const mapRef = ref(null)
let map = null

// Coordenadas de Barreiras - BA (R. Ruy Barbosa - Centro)
const latitude = -12.148575
const longitude = -45.000138

const whatsappNumber = '5577991990039'
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber mais sobre os serviços da 4R Pet Clínica Veterinária.`
const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`

function zoomIn() {
  if (map) map.zoomIn()
}

function zoomOut() {
  if (map) map.zoomOut()
}

function centerMap() {
  if (map) map.setView([latitude, longitude], 17)
}

onMounted(async () => {
  // Carregar Leaflet dinamicamente
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  document.head.appendChild(link)

  const script = document.createElement('script')
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
  script.onload = initMap
  document.head.appendChild(script)

  // Mostrar popup após um tempo no mobile
  setTimeout(() => {
    showPopup.value = true
  }, 1500)
})

function initMap() {
  if (!window.L || !mapRef.value) return

  map = window.L.map(mapRef.value, {
    zoomControl: false,
    attributionControl: true
  }).setView([latitude, longitude], 17)

  window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  // Marcador customizado
  const customIcon = window.L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="marker-wrapper">
        <div class="marker-pin-custom">
          <div class="marker-inner">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
          </div>
        </div>
        <div class="marker-pulse-ring"></div>
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 50]
  })

  const marker = window.L.marker([latitude, longitude], { icon: customIcon }).addTo(map)

  marker.on('click', () => {
    showImageModal.value = true
  })
}

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
@import '@/assets/variables.css';

/* ── Base ───────────────────────────────────── */
.localizacao-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  background: var(--bg-secondary);
}

/* ── Main ───────────────────────────────────── */
.main-content {
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 6rem 1.5rem 4rem;
}

/* ── Page Header ────────────────────────────── */
.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--primary-color);
  letter-spacing: -0.02em;
  margin: 0 0 0.625rem;
  line-height: 1.15;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 560px;
  margin: 0;
}

/* ── Content Grid ───────────────────────────── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* ── Mapa ───────────────────────────────────── */
.map-col { width: 100%; }

.map-container {
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  background: var(--bg-tertiary);
  box-shadow: var(--shadow-md);
}

#map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  z-index: 1000;
}

.map-btn {
  width: 38px;
  height: 38px;
  background: var(--bg-primary);
  border: none;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.map-btn:hover {
  background: var(--primary-color);
  color: #fff;
}

.map-footer-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.btn-maps {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: var(--primary-color);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 20px rgba(17,85,204,0.35);
  transition: all var(--transition-fast);
}

/* Tablet/Desktop: volta para o canto inferior direito, tamanho normal */
@media (min-width: 768px) {
  .map-footer-btn {
    top: auto;
    bottom: 1rem;
    right: 1rem;
  }

  .btn-maps {
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
}

.btn-maps:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(17,85,204,0.4);
}

/* Popup mobile */
.marker-popup {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  padding: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  cursor: pointer;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.4s ease;
  pointer-events: none;
  border: 1px solid var(--border-color);
}

.marker-popup.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.popup-logo {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-md);
  object-fit: cover;
  flex-shrink: 0;
}

.popup-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.popup-content strong { font-size: 0.875rem; color: var(--text-primary); }
.popup-content span { font-size: 0.75rem; color: var(--text-muted); }

/* ── Cards ──────────────────────────────────── */
.cards-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  background: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* Card Destaque */
.card-highlight {
  background: var(--primary-color);
  border-color: transparent;
  position: relative;
  overflow: hidden;
  padding: 1.75rem;
}

.card-highlight-deco {
  position: absolute;
  top: -16px;
  right: -16px;
  color: #ffffff;
}

.card-highlight-content {
  position: relative;
  z-index: 1;
}

.card-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 0.5rem;
}

.card-highlight-title {
  font-size: 1.375rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

.card-highlight-sub {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.btn-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  background: #25D366;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-fast);
}

.btn-whatsapp:hover {
  background: #1da851;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37,211,102,0.35);
}

/* Card Info */
.card-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
}

.card-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-md);
  background: rgba(17,85,204,0.08);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-info-body { flex: 1; }

.card-info-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.card-info-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 0.75rem;
}

.card-link-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--primary-color);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.card-link-btn:hover { opacity: 0.7; }

/* Horários */
.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.hours-row:last-child { border-bottom: none; }

.hours-day {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.hours-time {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--primary-color);
}

.hours-time.closed {
  color: var(--text-muted);
  font-weight: 500;
}

/* ── Footer ─────────────────────────────────── */
.footer {
  background: #050F2E;
  padding: 3rem 1.5rem 2rem;
  margin-top: auto;
}

.footer-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

.footer-brand-col { display: flex; flex-direction: column; gap: 1rem; }

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.footer-logo-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  opacity: 0.9;
}

.footer-brand-name {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.footer-brand-desc {
  font-size: 0.825rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  margin: 0;
  max-width: 280px;
}

.footer-links-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-col-title {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin: 0 0 0.25rem;
}

.footer-link {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  transition: color var(--transition-fast);
  padding: 0 !important;
  background: transparent !important;
}

.footer-link:hover {
  color: #fff;
  background: transparent !important;
  background-color: transparent !important;
}

.footer-link-static {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.4);
}

.footer-bottom {
  max-width: 1280px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.07);
}

.footer-copy {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.3);
  margin: 0;
}

/* ── Modal ──────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 9999;
  backdrop-filter: blur(8px);
}

.modal-content {
  position: relative;
  max-width: 550px;
  width: 100%;
  background: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.modal-close {
  position: absolute;
  top: 0.875rem;
  right: 0.875rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all var(--transition-fast);
}

.modal-close:hover { background: rgba(0,0,0,0.75); }

.fachada-img { width: 100%; height: auto; display: block; }

.modal-info {
  padding: 1.5rem;
  text-align: center;
}

.modal-info h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem;
}

.modal-info p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
}

.modal-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--secondary-color);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: var(--border-radius-full);
  transition: all var(--transition-fast);
}

.modal-link:hover {
  background: var(--secondary-dark);
  transform: translateY(-2px);
}

/* Modal Transition */
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-active .modal-content, .modal-leave-active .modal-content { transition: transform 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-content, .modal-leave-to .modal-content { transform: scale(0.92) translateY(16px); }

/* ── Marker customizado ─────────────────────── */
:deep(.custom-marker-container) { background: none !important; border: none !important; }
:deep(.marker-wrapper) { position: relative; display: flex; align-items: center; justify-content: center; }
:deep(.marker-pin-custom) {
  width: 48px; height: 48px;
  background: var(--primary-color);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 15px rgba(17,85,204,0.4);
  cursor: pointer;
  transition: transform 0.3s ease;
}
:deep(.marker-pin-custom:hover) { transform: rotate(-45deg) scale(1.1); }
:deep(.marker-inner) { transform: rotate(45deg); display: flex; align-items: center; justify-content: center; }
:deep(.marker-pulse-ring) {
  position: absolute; width: 60px; height: 60px;
  border-radius: 50%;
  background: rgba(17,85,204,0.2);
  animation: pulse-ring 2s ease-out infinite;
  z-index: -1;
}

@keyframes pulse-ring {
  0%   { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* ── Tablet (≥ 768px) ───────────────────────── */
@media (min-width: 768px) {
  .main-content { padding: 6.5rem 2rem 5rem; }

  .page-title { font-size: 3rem; }

  .content-grid {
    grid-template-columns: 1fr 380px;
    gap: 2rem;
  }

  .map-container { height: 600px; }

  .cards-col { position: sticky; top: 80px; }

  .marker-popup {
    left: 1rem;
    right: auto;
    width: 280px;
    transform: translateY(16px);
  }
  .marker-popup.show { transform: translateY(0); }

  .footer-grid { grid-template-columns: 1.5fr 1fr 1fr; }
}

/* ── Desktop (≥ 1024px) ─────────────────────── */
@media (min-width: 1024px) {
  .page-title { font-size: 3.5rem; }

  .content-grid {
    grid-template-columns: 1fr 420px;
    gap: 2.5rem;
  }

  .map-container { height: 650px; }
}

/* ── Desktop Large (≥ 1280px) ───────────────── */
@media (min-width: 1280px) {
  .content-grid { grid-template-columns: 1fr 440px; }
}
</style>
