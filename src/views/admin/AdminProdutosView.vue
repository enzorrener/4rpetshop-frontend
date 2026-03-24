<template>
  <div class="admin-layout">
    <AdminSidebar v-model:open="sidebarOpen" />

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
            <span class="breadcrumb-current">Produtos</span>
          </div>
        </div>
        <div class="top-bar-right">
          <router-link to="/admin/marcas" class="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            Marcas
          </router-link>
          <router-link to="/admin/produtos/cadastro" class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Novo Produto
          </router-link>
        </div>
      </header>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ produtos.length }}</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ produtos.filter(p => p.ativo).length }}</span>
            <span class="stat-label">Ativos</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ produtos.filter(p => p.destaque).length }}</span>
            <span class="stat-label">Destaque</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ produtos.filter(p => !p.ativo).length }}</span>
            <span class="stat-label">Inativos</span>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="filters-card">
        <div class="filters-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filtros
        </div>
        <div class="filters-row">
          <div class="filter-group search-group">
            <div class="input-icon-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" v-model="filtros.nome" placeholder="Buscar produto..." class="filter-input" />
            </div>
          </div>
          <div class="filter-group">
            <select v-model="filtros.marca_id" class="filter-select">
              <option value="">Todas as marcas</option>
              <option v-for="m in marcas" :key="m.id" :value="m.id">{{ m.nome }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select v-model="filtros.categoria_id" class="filter-select">
              <option value="">Todas as categorias</option>
              <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nome }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select v-model="filtros.ativo" class="filter-select">
              <option value="">Todos os status</option>
              <option value="1">Ativos</option>
              <option value="0">Inativos</option>
            </select>
          </div>
          <button class="btn-clear" @click="limparFiltros">Limpar</button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="loading-state">
        <span class="spinner"></span>
        <p>Carregando produtos...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="produtosFiltrados.length === 0" class="empty-state">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p class="empty-title">{{ filtros.nome || filtros.marca_id || filtros.categoria_id || filtros.ativo !== '' ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado' }}</p>
        <p class="empty-desc">{{ filtros.nome || filtros.marca_id ? 'Tente alterar os filtros.' : 'Cadastre o primeiro produto.' }}</p>
        <router-link to="/admin/produtos/cadastro" class="btn-primary">Cadastrar Produto</router-link>
      </div>

      <!-- Tabela -->
      <div v-else class="table-card">
        <div class="table-meta">
          <span class="table-count">{{ produtosFiltrados.length }} produto{{ produtosFiltrados.length !== 1 ? 's' : '' }}</span>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:52px"></th>
                <th>Produto</th>
                <th style="width:120px">Marca</th>
                <th style="width:130px">Categoria</th>
                <th style="width:110px">Preço</th>
                <th style="width:90px">Estoque</th>
                <th style="width:90px">Status</th>
                <th style="width:90px">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="produto in produtosFiltrados" :key="produto.id">
                <td>
                  <div class="produto-thumb">
                    <img v-if="produto.foto_url" :src="produto.foto_url" :alt="produto.nome" class="thumb-img" />
                    <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                </td>
                <td>
                  <span class="produto-nome">{{ produto.nome }}</span>
                  <span v-if="produto.sku" class="produto-sku">SKU: {{ produto.sku }}</span>
                  <span v-if="produto.destaque" class="badge-destaque">Destaque</span>
                </td>
                <td><span class="cell-text">{{ produto.marca?.nome || '—' }}</span></td>
                <td><span class="cell-text">{{ produto.categoria?.nome || '—' }}</span></td>
                <td>
                  <div class="preco-col">
                    <span class="preco-principal">R$ {{ formatPreco(produto.preco) }}</span>
                    <span v-if="produto.preco_promocional" class="preco-promo">R$ {{ formatPreco(produto.preco_promocional) }}</span>
                  </div>
                </td>
                <td>
                  <span class="estoque-val" :class="{ 'estoque-baixo': produto.estoque <= 5 }">
                    {{ produto.estoque ?? '—' }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="produto.ativo ? 'badge-ativo' : 'badge-inativo'">
                    {{ produto.ativo ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
                <td>
                  <div class="row-actions">
                    <router-link :to="`/admin/produtos/${produto.id}`" class="btn-icon" title="Editar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </router-link>
                    <button class="btn-icon btn-danger" title="Excluir" @click="confirmarExclusao(produto)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router = useRouter()
const sidebarOpen = ref(false)
const isLoading = ref(true)
const token = localStorage.getItem('funcionario_token')

const produtos = ref([])
const marcas = ref([])
const categorias = ref([])

const filtros = reactive({ nome: '', marca_id: '', categoria_id: '', ativo: '' })

const limparFiltros = () => Object.assign(filtros, { nome: '', marca_id: '', categoria_id: '', ativo: '' })

const produtosFiltrados = computed(() => {
  return produtos.value.filter(p => {
    if (filtros.nome && !p.nome.toLowerCase().includes(filtros.nome.toLowerCase())) return false
    if (filtros.marca_id && p.marca_id !== filtros.marca_id) return false
    if (filtros.categoria_id && p.categoria_id !== filtros.categoria_id) return false
    if (filtros.ativo === '1' && !p.ativo) return false
    if (filtros.ativo === '0' && p.ativo) return false
    return true
  })
})

const formatPreco = (val) => Number(val || 0).toFixed(2).replace('.', ',')

const fetchProdutos = async () => {
  isLoading.value = true
  try {
    const { data } = await api.get('/admin/produtos', {
      headers: { Authorization: `Bearer ${token}` }
    })
    produtos.value = data.data || data || []
  } catch {
    /* silencioso — backend ainda não implementado */
  } finally {
    isLoading.value = false
  }
}

const fetchMarcas = async () => {
  try {
    const { data } = await api.get('/produtos/marcas', { headers: { Authorization: `Bearer ${token}` } })
    marcas.value = data.data || data || []
  } catch { /* silencioso */ }
}

const fetchCategorias = async () => {
  try {
    const { data } = await api.get('/produtos/categorias', { headers: { Authorization: `Bearer ${token}` } })
    categorias.value = data.data || data || []
  } catch { /* silencioso */ }
}

const confirmarExclusao = async (produto) => {
  const result = await Swal.fire({
    title: 'Excluir produto?',
    text: `"${produto.nome}" será removido permanentemente.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  })
  if (!result.isConfirmed) return
  try {
    await api.delete(`/admin/produtos/${produto.id}`, { headers: { Authorization: `Bearer ${token}` } })
    produtos.value = produtos.value.filter(p => p.id !== produto.id)
    Swal.fire({ icon: 'success', title: 'Excluído!', timer: 1800, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao excluir', confirmButtonColor: '#EF4444' })
  }
}

onMounted(() => {
  if (!token) { router.push('/login/funcionario'); return }
  fetchProdutos()
  fetchMarcas()
  fetchCategorias()
})
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #F1F5F9; }

.main-content { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-height: 100vh; }

/* Top Bar */
.top-bar { display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; height: 64px; background: white; border-bottom: 1px solid #E8ECF0; position: sticky; top: 0; z-index: 10; }
.top-bar-left { display: flex; align-items: center; gap: 0.75rem; }
.top-bar-right { display: flex; gap: 0.75rem; }
.btn-menu-mobile { display: none; background: none; border: none; cursor: pointer; color: #374151; padding: 4px; }
.breadcrumb-current { font-size: 18px; font-weight: 700; color: #0A1F44; }

.btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px; background: linear-gradient(135deg,#0A3080,#1155CC); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
.btn-primary:hover { opacity: 0.9; }
.btn-secondary { display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px; background: white; color: #374151; border: 1.5px solid #E2E8F0; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: border-color 0.2s; }
.btn-secondary:hover { border-color: #94A3B8; }

/* Stats */
.stats-row { display: flex; gap: 1rem; padding: 1.25rem 1.5rem 0; flex-wrap: wrap; }
.stat-card { flex: 1; min-width: 120px; background: white; border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 0.875rem; border: 1px solid #E8ECF0; }
.stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-blue   { background: rgba(17,85,204,0.1);  color: #1155CC; }
.stat-green  { background: rgba(34,197,94,0.1);  color: #16A34A; }
.stat-orange { background: rgba(240,112,32,0.1); color: #F07020; }
.stat-red    { background: rgba(239,68,68,0.1);  color: #EF4444; }
.stat-info { display: flex; flex-direction: column; }
.stat-value { font-size: 22px; font-weight: 700; color: #0A1F44; line-height: 1; }
.stat-label { font-size: 12px; color: #64748B; margin-top: 2px; }

/* Filters */
.filters-card { margin: 1.25rem 1.5rem 0; background: white; border-radius: 14px; border: 1px solid #E8ECF0; padding: 1rem 1.25rem; }
.filters-title { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 0.875rem; }
.filters-row { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
.filter-group { flex: 1; min-width: 160px; }
.search-group { min-width: 220px; flex: 2; }
.input-icon-wrap { display: flex; align-items: center; gap: 8px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 9px; padding: 0 12px; }
.input-icon-wrap svg { color: #94A3B8; flex-shrink: 0; }
.filter-input { border: none; outline: none; font-size: 14px; color: #374151; height: 40px; width: 100%; background: transparent; }
.filter-select { width: 100%; height: 42px; padding: 0 12px; border: 1.5px solid #E2E8F0; border-radius: 9px; font-size: 14px; color: #374151; background: #F8FAFC; outline: none; cursor: pointer; }
.filter-select:focus { border-color: #1155CC; }
.btn-clear { height: 42px; padding: 0 16px; border: 1.5px solid #E2E8F0; border-radius: 9px; background: white; font-size: 13px; font-weight: 600; color: #64748B; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
.btn-clear:hover { border-color: #94A3B8; color: #374151; }

/* Loading / Empty */
.loading-state, .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 5rem 1.5rem; color: #94A3B8; }
.spinner { width: 32px; height: 32px; border: 3px solid #E2E8F0; border-top-color: #1155CC; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.empty-title { font-size: 16px; font-weight: 700; color: #374151; }
.empty-desc  { font-size: 14px; color: #94A3B8; }

/* Table */
.table-card { margin: 1.25rem 1.5rem 1.5rem; background: white; border-radius: 14px; border: 1px solid #E8ECF0; overflow: hidden; }
.table-meta { padding: 14px 16px; border-bottom: 1px solid #F1F5F9; }
.table-count { font-size: 13px; color: #64748B; font-weight: 500; }
.table-wrap { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; background: #F8FAFC; border-bottom: 1px solid #E8ECF0; white-space: nowrap; }
.data-table td { padding: 14px 16px; border-bottom: 1px solid #F1F5F9; vertical-align: middle; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background: #FAFBFF; }

.produto-thumb { width: 44px; height: 44px; border-radius: 8px; background: #F1F5F9; border: 1px solid #E8ECF0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.thumb-img { width: 100%; height: 100%; object-fit: cover; }

.produto-nome { font-size: 14px; font-weight: 600; color: #0A1F44; display: block; }
.produto-sku  { font-size: 11px; color: #94A3B8; display: block; margin-top: 1px; }
.badge-destaque { display: inline-block; font-size: 10px; font-weight: 700; background: #FEF3C7; color: #D97706; padding: 2px 8px; border-radius: 20px; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.04em; }

.cell-text { font-size: 13px; color: #374151; }

.preco-col { display: flex; flex-direction: column; gap: 1px; }
.preco-principal { font-size: 14px; font-weight: 700; color: #0A1F44; }
.preco-promo { font-size: 11px; color: #F07020; font-weight: 600; }

.estoque-val { font-size: 14px; font-weight: 600; color: #374151; }
.estoque-baixo { color: #EF4444; }

.badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.badge-ativo   { background: #DCFCE7; color: #16A34A; }
.badge-inativo { background: #F1F5F9; color: #64748B; }

.row-actions { display: flex; gap: 5px; }
.btn-icon { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 1.5px solid #E2E8F0; border-radius: 7px; background: white; color: #64748B; cursor: pointer; text-decoration: none; transition: all 0.15s; }
.btn-icon:hover   { border-color: #1155CC; color: #1155CC; }
.btn-danger:hover { border-color: #EF4444; color: #EF4444; background: #FFF5F5; }

@media (max-width: 768px) {
  .main-content { margin-left: 0; }
  .btn-menu-mobile { display: flex; }
  .stats-row { padding: 1rem; gap: 0.625rem; }
  .stat-card { flex: 1 1 calc(50% - 0.375rem); min-width: 0; }
  .filters-card { margin: 0.75rem; }
  .filters-row { flex-direction: column; }
  .filter-group, .search-group { min-width: unset; width: 100%; flex: unset; }
  .table-card { margin: 0.75rem; }
  .data-table th:nth-child(4), .data-table td:nth-child(4),
  .data-table th:nth-child(6), .data-table td:nth-child(6) { display: none; }
}
</style>
