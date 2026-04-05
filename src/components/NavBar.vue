<template>
  <nav class="navbar" :class="{ scrolled: isScrolled || !transparent, solid: !transparent }">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="nav-logo-img" />
        <span class="nav-brand">
          <span class="nav-4r">4R</span>
          <span class="nav-pet">PET CLÍNICA</span>
        </span>
      </router-link>

      <ul class="navbar-links">
        <li><router-link to="/#servicos">Serviços</router-link></li>
        <li><router-link to="/produtos" :class="{ active: isActive('/produtos') }">Produtos</router-link></li>
        <li><router-link to="/#sobre">Sobre</router-link></li>
        <li><router-link to="/#contato">Contato</router-link></li>
        <li><router-link to="/localizacao" :class="{ active: isActive('/localizacao') }">Localização</router-link></li>
      </ul>

      <!-- Carrinho -->
      <router-link to="/carrinho" class="nav-cart" :class="{ 'has-items': totalItems > 0 }">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        <span v-if="totalItems > 0" class="cart-badge">{{ totalItems > 99 ? '99+' : totalItems }}</span>
      </router-link>

      <router-link to="/login" class="btn-nav-cliente">Área do Cliente</router-link>

      <button class="mobile-menu-btn" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span class="hamburger" :class="{ active: menuOpen }"></span>
      </button>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <router-link to="/" @click="menuOpen = false">Início</router-link>
      <router-link to="/produtos" @click="menuOpen = false">Produtos</router-link>
      <router-link to="/#sobre" @click="menuOpen = false">Sobre</router-link>
      <router-link to="/#contato" @click="menuOpen = false">Contato</router-link>
      <router-link to="/localizacao" @click="menuOpen = false">Localização</router-link>
      <router-link to="/carrinho" class="mobile-cart-link" @click="menuOpen = false">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        Carrinho
        <span v-if="totalItems > 0" class="mobile-cart-badge">{{ totalItems }}</span>
      </router-link>
      <router-link to="/login" class="btn-mobile-cliente" @click="menuOpen = false">
        Área do Cliente
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  transparent: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const cartStore = useCartStore()
const menuOpen = ref(false)
const isScrolled = ref(false)

// Carrinho
const totalItems = computed(() => cartStore.totalItems)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const isActive = (path) => {
  return route.path.startsWith(path)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ===== NAVBAR ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: transparent;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar.scrolled,
.navbar.solid {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-brand {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.nav-4r {
  font-size: 1.15rem;
  font-weight: 800;
  color: #fff;
  transition: color 0.3s ease;
}

.nav-pet {
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

.navbar.scrolled .nav-4r,
.navbar.solid .nav-4r {
  color: #1155CC;
}

.navbar.scrolled .nav-pet,
.navbar.solid .nav-pet {
  color: #0A1F44;
}

/* ===== LINKS ===== */
.navbar-links {
  display: none;
  list-style: none;
  margin: 0 0 0 auto;
  padding: 0;
  gap: 2rem;
}

.navbar-links li {
  margin: 0;
  list-style: none;
}

.navbar-links a,
.navbar-links a:link,
.navbar-links a:visited {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
  background: transparent !important;
  border: none;
  outline: none;
  padding: 0 !important;
  border-radius: 0;
}

.navbar.scrolled .navbar-links a,
.navbar.solid .navbar-links a {
  color: #374151;
}

.navbar-links a:hover,
.navbar-links a:focus,
.navbar-links a:active {
  color: #F07020 !important;
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  outline: none !important;
  padding: 0 !important;
}

.navbar-links a.active {
  color: #F07020 !important;
}

.navbar-links a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #F07020;
  border-radius: 2px;
}

/* ===== CARRINHO ===== */
.nav-cart {
  position: relative;
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.2s ease;
}

.navbar.scrolled .nav-cart,
.navbar.solid .nav-cart {
  color: #374151;
}

.nav-cart:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #F07020;
}

.navbar.scrolled .nav-cart:hover,
.navbar.solid .nav-cart:hover {
  background: rgba(240, 112, 32, 0.1);
  color: #F07020;
}

.cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #F07020;
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ===== BOTÃO ÁREA DO CLIENTE ===== */
.btn-nav-cliente {
  display: none;
  padding: 0.6rem 1.5rem;
  background: #F07020;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 50px;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.btn-nav-cliente:hover {
  background: #D4600A;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(240, 112, 32, 0.35);
}

/* ===== HAMBURGER ===== */
.mobile-menu-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
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
  transition: all 0.3s ease;
}

.navbar.scrolled .hamburger,
.navbar.scrolled .hamburger::before,
.navbar.scrolled .hamburger::after,
.navbar.solid .hamburger,
.navbar.solid .hamburger::before,
.navbar.solid .hamburger::after {
  background: #0A1F44;
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
.hamburger::after  { top: 7px; }

.hamburger.active { background: transparent; }
.hamburger.active::before { transform: rotate(45deg); top: 0; }
.hamburger.active::after  { transform: rotate(-45deg); top: 0; }

/* ===== MOBILE MENU ===== */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: #fff;
  padding: 1rem 1.5rem 1.5rem;
  gap: 0.25rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.mobile-menu.open {
  display: flex;
}

.mobile-menu a {
  padding: 0.85rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  border-bottom: 1px solid #F1F5F9;
}

.mobile-menu a:last-of-type:not(.btn-mobile-cliente) {
  border-bottom: none;
}

.mobile-menu a:hover {
  color: #1155CC;
}

.btn-mobile-cliente {
  margin-top: 0.75rem;
  padding: 0.85rem 1rem;
  background: #F07020;
  color: white !important;
  font-weight: 600;
  text-align: center;
  border-radius: 12px;
  border-bottom: none !important;
}

.btn-mobile-cliente:hover {
  background: #D4600A;
  color: white !important;
}

.mobile-cart-link {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mobile-cart-link svg {
  flex-shrink: 0;
}

.mobile-cart-badge {
  margin-left: auto;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  background: #F07020;
  color: white;
  font-size: 12px;
  font-weight: 700;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== RESPONSIVE — TABLET & DESKTOP ===== */
@media (min-width: 768px) {
  .navbar-links { display: flex; }
  .nav-cart { display: flex; }
  .btn-nav-cliente { display: inline-flex; }
  .mobile-menu-btn { display: none; }
}
</style>
