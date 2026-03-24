<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <AdminSidebar v-model:open="sidebarOpen" />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Bar -->
      <header class="top-bar">
        <div class="top-bar-left">
          <button class="btn-menu-mobile" @click="sidebarOpen = !sidebarOpen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h1 class="page-title">Usuarios Cadastrados</h1>
        </div>
        <div class="top-bar-right">
          <div class="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar usuario ou pet..."
              @input="filterUsuarios"
            />
          </div>
          <button class="btn-refresh" @click="fetchUsuarios" :disabled="isLoading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: isLoading }">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
            </svg>
            Atualizar
          </button>
        </div>
      </header>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon usuarios">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ usuarios.length }}</span>
            <span class="stat-label">Total Usuarios</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon pets">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/>
              <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>
              <path d="M8 14v.5"/>
              <path d="M16 14v.5"/>
              <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>
              <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ totalPets }}</span>
            <span class="stat-label">Total Pets</span>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="table-container">
        <div v-if="isLoading" class="loading-state">
          <span class="loading-spinner"></span>
          <p>Carregando usuarios...</p>
        </div>

        <div v-else-if="filteredUsuarios.length === 0" class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
          </svg>
          <p>Nenhum usuario encontrado</p>
        </div>

        <table v-else class="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Pets</th>
              <th>Cadastro</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in filteredUsuarios" :key="usuario.id">
              <td class="user-cell">
                <div class="user-avatar-sm">
                  {{ getInitials(usuario.primeiro_nome, usuario.ultimo_nome) }}
                </div>
                <div class="user-info-cell">
                  <span class="user-name-cell">{{ usuario.primeiro_nome }} {{ usuario.ultimo_nome }}</span>
                </div>
              </td>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.telefone || '-' }}</td>
              <td class="pets-cell">
                <div v-if="usuario.pets && usuario.pets.length > 0" class="pets-list">
                  <span
                    v-for="pet in usuario.pets"
                    :key="pet.id"
                    class="pet-badge"
                    :class="getPetClass(pet.especie)"
                  >
                    {{ pet.nome_pet }}
                  </span>
                </div>
                <span v-else class="no-pets">Sem pets</span>
              </td>
              <td class="date-cell">{{ formatDate(usuario.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router = useRouter()
const isLoading = ref(false)
const sidebarOpen = ref(false)
const searchQuery = ref('')

const token = localStorage.getItem('funcionario_token')

const usuarios = ref([])
const filteredUsuarios = ref([])

const totalPets = computed(() => {
  return usuarios.value.reduce((total, user) => {
    return total + (user.pets ? user.pets.length : 0)
  }, 0)
})

const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName[0] : ''
  const last = lastName ? lastName[0] : ''
  return (first + last).toUpperCase()
}

const getPetClass = (especie) => {
  // especie é um número: 1=Cachorro, 2=Gato, 3=Pássaro, 4=Outro
  const classes = {
    1: 'dog',
    2: 'cat',
    3: 'bird',
    4: 'other'
  }
  return classes[especie] || 'other'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const filterUsuarios = () => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) {
    filteredUsuarios.value = usuarios.value
    return
  }

  filteredUsuarios.value = usuarios.value.filter(user => {
    const fullName = `${user.primeiro_nome || ''} ${user.ultimo_nome || ''}`.toLowerCase()
    const email = user.email?.toLowerCase() || ''
    const petsNames = user.pets?.map(p => (p.nome_pet || '').toLowerCase()).join(' ') || ''

    return fullName.includes(query) || email.includes(query) || petsNames.includes(query)
  })
}

const fetchUsuarios = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/clientes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    usuarios.value = response.data.data || response.data || []
    filteredUsuarios.value = usuarios.value
  } catch (error) {
    console.error('Erro ao buscar usuarios:', error)
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Nao foi possivel carregar os usuarios',
      confirmButtonColor: '#1155CC'
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (!token) {
    router.push('/login/funcionario')
    return
  }

  await fetchUsuarios()
})
</script>

<style scoped>
@import '@/assets/variables.css';

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #F5F7FA;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Top Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-menu-mobile {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  min-width: 250px;
}

.search-box svg {
  color: var(--text-muted);
}

.search-box input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  color: var(--text-primary);
}

.search-box input::placeholder {
  color: var(--text-muted);
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.btn-refresh:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-refresh svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Stats Row */
.stats-row {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-width: 200px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.usuarios { background: linear-gradient(135deg, #1155CC 0%, #2E80E0 100%); color: white; }
.stat-icon.pets { background: linear-gradient(135deg, #F07020 0%, #FF8C3A 100%); color: white; }

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  flex: 1;
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border-color);
}

.users-table td {
  padding: 16px;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid #F3F4F6;
}

.users-table tr:hover {
  background: #FAFBFC;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar-sm {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1155CC 0%, #2E80E0 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.user-info-cell {
  display: flex;
  flex-direction: column;
}

.user-name-cell {
  font-weight: 600;
  color: var(--text-primary);
}

.pets-cell {
  max-width: 300px;
}

.pets-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pet-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.pet-badge.dog {
  background: #DBEAFE;
  color: #1E40AF;
}

.pet-badge.cat {
  background: #FCE7F3;
  color: #9D174D;
}

.pet-badge.bird {
  background: #D1FAE5;
  color: #065F46;
}

.pet-badge.other {
  background: #F3F4F6;
  color: #4B5563;
}

.no-pets {
  color: var(--text-muted);
  font-size: 13px;
}

.date-cell {
  color: var(--text-muted);
  font-size: 13px;
}

/* Loading & Empty States */
.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

.empty-state svg {
  opacity: 0.3;
  margin-bottom: 16px;
}

.empty-state p,
.loading-state p {
  font-size: 14px;
}

/* Responsive */
@media (max-width: 1024px) {
  .search-box {
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
  }

  .btn-menu-mobile {
    display: block;
  }

  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .top-bar-right {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
    min-width: auto;
  }

  .stats-row {
    flex-direction: column;
  }

  .stat-card {
    min-width: auto;
  }

  .users-table th,
  .users-table td {
    padding: 12px 8px;
  }

  .user-cell {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 18px;
  }

  .btn-refresh span {
    display: none;
  }
}
</style>
