<template>
  <aside class="sidebar" :class="{ open: open }">
    <div class="sidebar-header">
      <div class="logo">
        <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R" class="logo-img" />
        <div class="logo-text">
          <span class="logo-title">4R Pet Shop</span>
          <span class="logo-subtitle">Painel Admin</span>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/admin" class="nav-item" :exact="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link to="/admin/usuarios" class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span>Usuários</span>
      </router-link>

      <router-link to="/admin/trajetos" class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>Trajetos</span>
      </router-link>

      <router-link to="/admin/veiculos" class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
          <circle cx="6.5" cy="16.5" r="2.5"/>
          <circle cx="16.5" cy="16.5" r="2.5"/>
        </svg>
        <span>Veículos</span>
      </router-link>

      <router-link to="/admin/noticias" class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <span>Notícias</span>
      </router-link>

      <router-link to="/admin/funcionarios" class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Funcionários</span>
      </router-link>

      <div class="nav-divider"></div>
      <span class="nav-section-label">Produtos</span>

      <router-link to="/admin/produtos" class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span>Produtos</span>
      </router-link>

      <router-link to="/admin/marcas" class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        <span>Marcas</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-details">
          <span class="user-name">{{ userName }}</span>
          <span class="user-role">Funcionário</span>
        </div>
      </div>
      <button class="btn-logout" @click="handleLogout">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  </aside>

  <div class="sidebar-overlay" :class="{ active: open }" @click="$emit('update:open', false)"></div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:open'])

const router = useRouter()
const funcionario = JSON.parse(localStorage.getItem('funcionario') || '{}')

const userName = computed(() => funcionario.nome_abrev || funcionario.nome_completo || 'Usuário')
const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
})

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Sair do sistema?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sair',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1155CC'
  })
  if (result.isConfirmed) {
    localStorage.removeItem('funcionario_token')
    localStorage.removeItem('funcionario')
    router.push('/login/funcionario')
  }
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #0A3080 0%, #071D5E 100%);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.logo-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 8px 4px;
}

.nav-section-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 4px 16px;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: white;
  font-size: 13px;
  font-weight: 500;
}

.user-role {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.3);
  color: white;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.sidebar-overlay.active {
  display: block;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
