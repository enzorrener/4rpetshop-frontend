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
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div class="breadcrumb">
            <span class="breadcrumb-root">Produtos</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="breadcrumb-current">Marcas</span>
          </div>
        </div>
        <div class="top-bar-right">
          <router-link to="/admin/produtos/marcas" class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nova Marca
          </router-link>
        </div>
      </header>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon total">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ marcas.length }}</span>
            <span class="stat-label">Total de Marcas</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ativo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ marcas.filter(m => m.ativo).length }}</span>
            <span class="stat-label">Ativas</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon logo-stat">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ marcas.filter(m => m.logo_url).length }}</span>
            <span class="stat-label">Com Logo</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon inativo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ marcas.filter(m => !m.ativo).length }}</span>
            <span class="stat-label">Inativas</span>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="filters-card">
        <div class="filters-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filtros de Pesquisa
        </div>
        <div class="filters-row">
          <div class="filter-group">
            <label class="filter-label">Nome</label>
            <div class="input-icon-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" v-model="filtros.nome" placeholder="Buscar por nome..." class="filter-input" />
            </div>
          </div>
          <div class="filter-group">
            <label class="filter-label">Ativo</label>
            <select v-model="filtros.ativo" class="filter-select">
              <option value="">Todos</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Categoria</label>
            <select v-model="filtros.categoria" class="filter-select">
              <option value="">Todas</option>
              <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Logo Cadastrada</label>
            <select v-model="filtros.logo" class="filter-select">
              <option value="">Todas</option>
              <option value="sim">Com Logo</option>
              <option value="nao">Sem Logo</option>
            </select>
          </div>
          <div class="filter-actions">
            <button class="btn-clear" @click="limparFiltros">Limpar</button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="loading-section">
        <span class="loading-spinner"></span>
        <p>Carregando marcas...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="marcasFiltradas.length === 0" class="empty-state">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        <h3>{{ temFiltros ? 'Nenhuma marca encontrada' : 'Nenhuma marca cadastrada' }}</h3>
        <p>{{ temFiltros ? 'Tente alterar os filtros de pesquisa.' : 'Cadastre a primeira marca de produto.' }}</p>
        <button v-if="temFiltros" class="btn-secondary" @click="limparFiltros">Limpar Filtros</button>
        <router-link v-else to="/admin/produtos/marcas" class="btn-primary">Cadastrar Marca</router-link>
      </div>

      <!-- Tabela -->
      <div v-else class="table-section">
        <div class="table-info">
          <span class="table-count">{{ marcasFiltradas.length }} marca{{ marcasFiltradas.length !== 1 ? 's' : '' }} encontrada{{ marcasFiltradas.length !== 1 ? 's' : '' }}</span>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:60px">Logo</th>
                <th>Nome</th>
                <th style="width:110px">Status</th>
                <th style="width:130px">Categoria</th>
                <th style="width:120px">Logo Cadastrada</th>
                <th style="width:130px">Criado em</th>
                <th style="width:120px">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="marca in marcasFiltradas" :key="marca.id">
                <td>
                  <div class="logo-thumb">
                    <img v-if="marca.logo_url" :src="marca.logo_url" :alt="marca.nome" class="logo-img-thumb" />
                    <div v-else class="logo-empty-thumb">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="marca-nome">{{ marca.nome }}</span>
                  <span class="marca-id">#{{ marca.id }}</span>
                </td>
                <td>
                  <span class="badge" :class="marca.ativo ? 'badge-ativo' : 'badge-inativo'">
                    {{ marca.ativo ? 'Ativa' : 'Inativa' }}
                  </span>
                </td>
                <td>
                  <span v-if="marca.categoria" class="badge badge-categoria">{{ marca.categoria.nome }}</span>
                  <span v-else class="cell-muted">—</span>
                </td>
                <td>
                  <span class="badge" :class="marca.logo_url ? 'badge-logo-sim' : 'badge-logo-nao'">
                    {{ marca.logo_url ? 'Sim' : 'Não' }}
                  </span>
                </td>
                <td class="cell-muted">{{ formatarData(marca.created_at) }}</td>
                <td>
                  <div class="row-actions">
                    <router-link :to="`/admin/produtos/marcas/${marca.id}`" class="btn-icon" title="Editar">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </router-link>
                    <button class="btn-icon btn-toggle" :title="marca.ativo ? 'Desativar' : 'Ativar'" @click="toggleAtivo(marca)">
                      <svg v-if="marca.ativo" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="5" width="22" height="14" rx="7"/><circle cx="16" cy="12" r="3" fill="currentColor"/>
                      </svg>
                      <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="5" width="22" height="14" rx="7"/><circle cx="8" cy="12" r="3" fill="currentColor"/>
                      </svg>
                    </button>
                    <button class="btn-icon btn-danger" title="Excluir" @click="confirmarExclusao(marca)">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router    = useRouter()
const isLoading = ref(true)
const sidebarOpen = ref(false)
const marcas    = ref([])

const token      = localStorage.getItem('funcionario_token')

const categorias = ref([])

const filtros = reactive({ nome: '', ativo: '', categoria: '', logo: '' })
const temFiltros = computed(() =>
  filtros.nome || filtros.ativo !== '' || filtros.categoria !== '' || filtros.logo !== ''
)

const marcasFiltradas = computed(() => {
  return marcas.value.filter(m => {
    if (filtros.nome && !m.nome.toLowerCase().includes(filtros.nome.toLowerCase())) return false
    if (filtros.ativo === 'true'  && !m.ativo)  return false
    if (filtros.ativo === 'false' &&  m.ativo)  return false
    if (filtros.categoria !== '' && m.categoria_id !== filtros.categoria) return false
    if (filtros.logo === 'sim' && !m.logo_url)  return false
    if (filtros.logo === 'nao' &&  m.logo_url)  return false
    return true
  })
})

const limparFiltros = () => { filtros.nome = ''; filtros.ativo = ''; filtros.categoria = ''; filtros.logo = '' }

const fetchCategorias = async () => {
  try {
    const { data } = await api.get('/produtos/categorias/ativas', {
      headers: { Authorization: `Bearer ${token}` }
    })
    categorias.value = data.data || []
  } catch {
    // silencioso — dropdown fica vazio
  }
}

const fetchMarcas = async () => {
  isLoading.value = true
  try {
    const { data } = await api.get('/produtos/marcas', {
      headers: { Authorization: `Bearer ${token}` }
    })
    marcas.value = data.data || []
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível carregar as marcas.', confirmButtonColor: '#1155CC' })
  } finally {
    isLoading.value = false
  }
}

const toggleAtivo = async (marca) => {
  try {
    const fd = new FormData()
    fd.append('_method', 'PUT')
    fd.append('ativo', marca.ativo ? '0' : '1')
    await api.post(`/produtos/marcas/${marca.id}`, fd, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    })
    marca.ativo = !marca.ativo
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível alterar o status.', confirmButtonColor: '#ef4444' })
  }
}

const confirmarExclusao = async (marca) => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Excluir Marca',
    text: `Deseja excluir "${marca.nome}"? Esta ação não pode ser desfeita.`,
    showCancelButton: true,
    confirmButtonColor: '#E53935',
    cancelButtonColor: '#1155CC',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  })
  if (!result.isConfirmed) return
  try {
    await api.delete(`/produtos/marcas/${marca.id}`, { headers: { Authorization: `Bearer ${token}` } })
    marcas.value = marcas.value.filter(m => m.id !== marca.id)
    Swal.fire({ icon: 'success', title: 'Excluído!', text: 'Marca removida.', confirmButtonColor: '#1155CC', timer: 1800, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível excluir a marca.', confirmButtonColor: '#ef4444' })
  }
}

const formatarData = (date) => date ? new Date(date).toLocaleDateString('pt-BR') : '—'

onMounted(() => {
  if (!token) { router.push('/login/funcionario'); return }
  fetchCategorias()
  fetchMarcas()
})
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #F1F5F9; font-family: 'Inter', sans-serif; }

/* Main */
.main-content { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
.top-bar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: white; border-bottom: 1px solid #E8ECF0; position: sticky; top: 0; z-index: 100; }
.top-bar-left { display: flex; align-items: center; gap: 1rem; }
.top-bar-right { display: flex; gap: 0.75rem; }
.btn-menu-mobile { display: none; background: none; border: none; cursor: pointer; color: #374151; }

.breadcrumb { display: flex; align-items: center; gap: 6px; }
.breadcrumb-root { font-size: 14px; color: #6B7A99; font-weight: 500; }
.breadcrumb svg { color: #C1C8D4; }
.breadcrumb-current { font-size: 14px; font-weight: 700; color: #0A1F44; }

/* Stats */
.stats-row { display: flex; gap: 1rem; padding: 1.25rem 1.5rem 0; flex-wrap: wrap; }
.stat-card { display: flex; align-items: center; gap: 1rem; background: white; border: 1px solid #E8ECF0; border-radius: 12px; padding: 1rem 1.25rem; flex: 1; min-width: 130px; }
.stat-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-icon.total     { background: #EBF5FF; color: #1155CC; }
.stat-icon.ativo     { background: #E8F5E9; color: #2E7D32; }
.stat-icon.inativo   { background: #FFF3E0; color: #F57C00; }
.stat-icon.logo-stat { background: #F3E8FF; color: #7C3AED; }
.stat-value { font-size: 1.5rem; font-weight: 800; color: #0A1F44; display: block; line-height: 1; }
.stat-label { font-size: 0.72rem; color: #6B7A99; display: block; margin-top: 3px; white-space: nowrap; }

/* Filters */
.filters-card { background: white; border: 1px solid #E8ECF0; border-radius: 14px; margin: 1.25rem 1.5rem 0; padding: 1.25rem 1.5rem; }
.filters-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 1rem; }
.filters-row { display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap; }
.filter-group { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 150px; }
.filter-label { font-size: 12px; font-weight: 600; color: #6B7A99; text-transform: uppercase; letter-spacing: 0.4px; }
.input-icon-wrap { display: flex; align-items: center; gap: 8px; background: #F8FAFC; border: 1.5px solid #E8ECF0; border-radius: 9px; padding: 0 12px; }
.input-icon-wrap svg { color: #9CA3AF; flex-shrink: 0; }
.filter-input { border: none; outline: none; font-size: 14px; color: #374151; height: 40px; width: 100%; background: transparent; }
.filter-select { height: 42px; padding: 0 12px; border: 1.5px solid #E8ECF0; border-radius: 9px; font-size: 14px; color: #374151; background: #F8FAFC; outline: none; cursor: pointer; }
.filter-select:focus { border-color: #1155CC; }
.filter-actions { display: flex; align-items: flex-end; }
.btn-clear { height: 42px; padding: 0 16px; border: 1.5px solid #E8ECF0; border-radius: 9px; background: white; font-size: 13px; font-weight: 600; color: #6B7A99; cursor: pointer; transition: all 0.15s; white-space: nowrap; display: flex; align-items: center; }
.btn-clear:hover { border-color: #9CA3AF; color: #374151; }

/* Table */
.table-section { padding: 1.25rem 1.5rem; }
.table-info { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.table-count { font-size: 13px; color: #6B7A99; font-weight: 500; }
.table-wrap { overflow-x: auto; border-radius: 14px; border: 1px solid #E8ECF0; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.data-table { width: 100%; border-collapse: collapse; background: white; }
.data-table thead tr { background: #F8FAFC; }
.data-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6B7A99; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #E8ECF0; white-space: nowrap; }
.data-table td { padding: 13px 16px; border-bottom: 1px solid #F1F5F9; vertical-align: middle; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background: #FAFBFC; }

.logo-thumb { width: 44px; height: 44px; border-radius: 8px; overflow: hidden; border: 1px solid #E8ECF0; background: white; }
.logo-img-thumb { width: 100%; height: 100%; object-fit: contain; }
.logo-empty-thumb { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #F8FAFC; color: #C1C8D4; }

.marca-nome { font-size: 14px; font-weight: 600; color: #0A1F44; display: block; }
.marca-id   { font-size: 11px; color: #9CA3AF; display: block; margin-top: 1px; }
.cell-muted { color: #6B7A99; font-size: 13px; }

.badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.badge-ativo      { background: #E8F5E9; color: #2E7D32; }
.badge-inativo    { background: #FFF3E0; color: #F57C00; }
.badge-logo-sim   { background: #EDE9FE; color: #7C3AED; }
.badge-logo-nao   { background: #F1F5F9; color: #9CA3AF; }
.badge-categoria  { background: #E0F2FE; color: #0369A1; }

.row-actions { display: flex; gap: 5px; align-items: center; }
.btn-icon { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 1.5px solid #E8ECF0; border-radius: 7px; background: white; color: #6B7A99; cursor: pointer; text-decoration: none; transition: all 0.15s; }
.btn-icon:hover      { border-color: #1155CC; color: #1155CC; }
.btn-toggle:hover    { border-color: #F07020; color: #F07020; }
.btn-danger:hover    { border-color: #E53935; color: #E53935; background: #FFF5F5; }

/* Loading / Empty */
.loading-section { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 4rem 1.5rem; color: #6B7A99; font-size: 14px; }
.loading-spinner { width: 32px; height: 32px; border: 3px solid #E8ECF0; border-top-color: #1155CC; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 4rem 1.5rem; color: #9CA3AF; text-align: center; }
.empty-state h3 { font-size: 1.1rem; font-weight: 700; color: #374151; margin: 0; }
.empty-state p  { font-size: 14px; margin: 0; }

/* Buttons */
.btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; background: #1155CC; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background 0.15s; }
.btn-primary:hover { background: #0A3080; }
.btn-secondary { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; background: white; color: #374151; border: 1.5px solid #E8ECF0; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: border-color 0.15s; }
.btn-secondary:hover { border-color: #9CA3AF; }

@media (max-width: 768px) {
  .main-content { margin-left: 0; }
  .btn-menu-mobile { display: flex; }
  .top-bar { padding: 0.75rem 1rem; }

  /* Stats: 2 por linha */
  .stats-row { padding: 0.75rem 0.75rem 0; gap: 0.625rem; }
  .stat-card { flex: 1 1 calc(50% - 0.375rem); min-width: 0; padding: 0.875rem; gap: 0.75rem; }
  .stat-icon { width: 36px; height: 36px; }
  .stat-value { font-size: 1.25rem; }
  .stat-label { font-size: 0.68rem; }

  /* Filtros */
  .filters-card { margin: 0.75rem; padding: 0.875rem; }
  .filters-row { flex-direction: column; gap: 0.625rem; }
  .filter-group { min-width: unset; width: 100%; }
  .filter-select { width: 100%; }
  .filter-actions { width: 100%; }
  .btn-clear { width: 100%; justify-content: center; }

  /* Tabela: ocultar colunas Logo Cadastrada e Criado em (cols 5 e 6) */
  .table-section { padding: 0.75rem; }
  .data-table th:nth-child(5),
  .data-table td:nth-child(5),
  .data-table th:nth-child(6),
  .data-table td:nth-child(6) { display: none; }

  /* Células mais compactas */
  .data-table th { padding: 10px 10px; font-size: 10px; }
  .data-table td { padding: 10px 10px; }
  .logo-thumb { width: 36px; height: 36px; }
  .marca-nome { font-size: 13px; }
  .marca-id { font-size: 10px; }

  /* Botões de ação: toque mais fácil */
  .btn-icon { width: 34px; height: 34px; }
  .row-actions { gap: 3px; }
}

@media (max-width: 480px) {
  /* Ocultar Categoria e Status — mantém só Logo + Nome + Ações */
  .data-table th:nth-child(3),
  .data-table td:nth-child(3),
  .data-table th:nth-child(4),
  .data-table td:nth-child(4) { display: none; }

  .stats-row { padding: 0.625rem 0.625rem 0; }
  .stat-card { padding: 0.75rem; }
  .filters-card { margin: 0.625rem; }
}
</style>
