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
            <span class="breadcrumb-current">Notícias</span>
          </div>
        </div>
        <div class="top-bar-right">
          <router-link to="/admin/noticias/nova" class="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span class="btn-text">Nova Notícia</span>
          </router-link>
        </div>
      </header>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ noticias.length }}</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ ativas }}</span>
            <span class="stat-label">Publicadas</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ inativas }}</span>
            <span class="stat-label">Rascunhos</span>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="filters-bar">
        <div class="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input v-model="busca" type="text" placeholder="Buscar por título..." class="search-input" />
        </div>
        <div class="filter-group">
          <select v-model="filtroCategoria" class="filter-select">
            <option value="">Todas categorias</option>
            <option v-for="cat in categorias" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
          </select>
        </div>
        <div class="filter-group">
          <select v-model="filtroAtivo" class="filter-select">
            <option value="">Todos status</option>
            <option value="1">Publicadas</option>
            <option value="0">Rascunhos</option>
          </select>
        </div>
      </div>

      <!-- Tabela -->
      <div class="table-card">
        <div v-if="isLoading" class="loading-state">
          <span class="spinner"></span>
          <p>Carregando notícias...</p>
        </div>

        <div v-else-if="noticiasFiltradas.length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <p>Nenhuma notícia encontrada</p>
          <router-link to="/admin/noticias/nova" class="btn-primary btn-sm">Criar primeira notícia</router-link>
        </div>

        <table v-else class="data-table">
          <thead>
            <tr>
              <th style="width:50px">ID</th>
              <th>Título</th>
              <th style="width:130px">Categoria</th>
              <th style="width:100px">Status</th>
              <th style="width:130px">Publicado em</th>
              <th style="width:100px">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="noticia in noticiasFiltradas" :key="noticia.id">
              <td class="td-id">#{{ noticia.id }}</td>
              <td>
                <div class="noticia-cell">
                  <div class="noticia-img-thumb" :style="{ background: getCategoriaGradient(noticia.categoria) }">
                    <img v-if="noticia.foto_capa_url" :src="noticia.foto_capa_url" :alt="noticia.titulo" class="thumb-img" />
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    </svg>
                  </div>
                  <div class="noticia-info">
                    <span class="noticia-titulo">{{ noticia.titulo }}</span>
                    <span class="noticia-desc">{{ noticia.subtitulo ? noticia.subtitulo.substring(0, 80) + '...' : '—' }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge-categoria" :class="`badge-${noticia.categoria}`">
                  {{ getCategoriaLabel(noticia.categoria) }}
                </span>
              </td>
              <td>
                <span class="badge-status" :class="noticia.publicado ? 'badge-ativo' : 'badge-inativo'">
                  {{ noticia.publicado ? 'Publicada' : 'Rascunho' }}
                </span>
              </td>
              <td class="td-date">{{ formatDate(noticia.publicado_em || noticia.created_at) }}</td>
              <td>
                <div class="acoes">
                  <router-link :to="`/admin/noticias/${noticia.id}`" class="btn-icon btn-edit" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </router-link>
                  <button class="btn-icon btn-delete" title="Excluir" @click="confirmarExclusao(noticia)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6"/><path d="M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const sidebarOpen = ref(false)
const isLoading = ref(true)
const noticias = ref([])
const busca = ref('')
const filtroCategoria = ref('')
const filtroAtivo = ref('')

const token = localStorage.getItem('funcionario_token')

const categorias = [
  { value: 'noticia', label: 'Notícia' },
  { value: 'dica', label: 'Dica' },
  { value: 'curiosidade', label: 'Curiosidade' },
  { value: 'promocao', label: 'Promoção' }
]

const ativas = computed(() => noticias.value.filter(n => n.publicado).length)
const inativas = computed(() => noticias.value.filter(n => !n.publicado).length)

const noticiasFiltradas = computed(() => {
  return noticias.value.filter(n => {
    if (busca.value && !n.titulo.toLowerCase().includes(busca.value.toLowerCase())) return false
    if (filtroCategoria.value && n.categoria !== filtroCategoria.value) return false
    if (filtroAtivo.value !== '' && String(n.publicado ? 1 : 0) !== filtroAtivo.value) return false
    return true
  })
})

const getCategoriaLabel = (valor) => {
  return categorias.find(c => c.value === valor)?.label || valor
}

const getCategoriaGradient = (cat) => {
  const map = {
    noticia: 'linear-gradient(135deg,#1155CC,#0A3080)',
    dica: 'linear-gradient(135deg,#F07020,#c85a10)',
    curiosidade: 'linear-gradient(135deg,#4CAF50,#2e7d32)',
    promocao: 'linear-gradient(135deg,#E53935,#B71C1C)'
  }
  return map[cat] || 'linear-gradient(135deg,#607D8B,#37474F)'
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const fetchNoticias = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/admin/noticias', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    noticias.value = response.data.data || response.data || []
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
  } finally {
    isLoading.value = false
  }
}

const confirmarExclusao = async (noticia) => {
  const result = await Swal.fire({
    title: 'Excluir notícia?',
    text: `"${noticia.titulo}" será removida permanentemente.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  })
  if (!result.isConfirmed) return

  try {
    await api.delete(`/admin/noticias/${noticia.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    noticias.value = noticias.value.filter(n => n.id !== noticia.id)
    Swal.fire({ icon: 'success', title: 'Excluída!', text: 'Notícia removida com sucesso.', confirmButtonColor: '#0A3080', timer: 2000, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível excluir a notícia.', confirmButtonColor: '#EF4444' })
  }
}

onMounted(() => {
  if (!token) { window.location.href = import.meta.env.BASE_URL + 'login/funcionario'; return }
  fetchNoticias()
})
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #F1F5F9; }

.main-content {
  flex: 1; margin-left: 240px; padding: 0;
  display: flex; flex-direction: column; min-height: 100vh;
}

/* Top Bar */
.top-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 1.5rem; height: 64px; background: white;
  border-bottom: 1px solid #E8ECF0; position: sticky; top: 0; z-index: 10;
}
.top-bar-left { display: flex; align-items: center; gap: 0.75rem; }
.breadcrumb-current { font-size: 18px; font-weight: 700; color: #0A1F44; }
.btn-menu-mobile { display: none; background: none; border: none; cursor: pointer; color: #374151; padding: 4px; }
.top-bar-right { display: flex; gap: 0.75rem; }

.btn-primary {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px; background: linear-gradient(135deg,#0A3080,#3D4290);
  color: white; border: none; border-radius: 10px;
  font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.9; }
.btn-primary.btn-sm { padding: 8px 16px; font-size: 13px; }

/* Stats */
.stats-row {
  display: flex; gap: 1rem; padding: 1.25rem 1.5rem 0;
}
.stat-card {
  flex: 1; background: white; border-radius: 12px;
  padding: 1rem 1.25rem; display: flex; align-items: center; gap: 0.875rem;
  border: 1px solid #E8ECF0;
}
.stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-icon-blue { background: rgba(10,48,128,0.1); color: #0A3080; }
.stat-icon-green { background: rgba(34,197,94,0.1); color: #16A34A; }
.stat-icon-orange { background: rgba(240,112,32,0.1); color: #F07020; }
.stat-info { display: flex; flex-direction: column; }
.stat-value { font-size: 22px; font-weight: 700; color: #0A1F44; line-height: 1; }
.stat-label { font-size: 12px; color: #64748B; margin-top: 2px; }

/* Filters */
.filters-bar {
  display: flex; gap: 0.75rem; padding: 1rem 1.5rem;
  align-items: center; flex-wrap: wrap;
}
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94A3B8; pointer-events: none; }
.search-input {
  width: 100%; height: 40px; padding: 0 12px 0 38px;
  border: 1px solid #E2E8F0; border-radius: 8px; font-size: 14px;
  background: white; outline: none; color: #374151;
}
.search-input:focus { border-color: #0A3080; }
.filter-group { min-width: 140px; }
.filter-select {
  width: 100%; height: 40px; padding: 0 12px;
  border: 1px solid #E2E8F0; border-radius: 8px; font-size: 14px;
  background: white; outline: none; cursor: pointer; color: #374151;
}
.filter-select:focus { border-color: #0A3080; }

/* Table */
.table-card {
  margin: 0 1.5rem 1.5rem; background: white; border-radius: 14px;
  border: 1px solid #E8ECF0; overflow: hidden; flex: 1;
}
.loading-state, .empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 60px 20px; color: #94A3B8;
}
.spinner {
  width: 36px; height: 36px; border: 3px solid #E2E8F0;
  border-top-color: #0A3080; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th {
  padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600;
  color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;
  background: #F8FAFC; border-bottom: 1px solid #E8ECF0;
}
.data-table td { padding: 14px 16px; border-bottom: 1px solid #F1F5F9; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: #FAFBFF; }

.td-id { font-size: 12px; color: #94A3B8; font-weight: 600; }
.td-date { font-size: 13px; color: #64748B; }

.noticia-cell { display: flex; align-items: center; gap: 12px; }
.noticia-img-thumb {
  width: 44px; height: 44px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.thumb-img { width: 100%; height: 100%; object-fit: cover; }
.noticia-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.noticia-titulo { font-size: 14px; font-weight: 600; color: #0A1F44; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; }
.noticia-desc { font-size: 12px; color: #94A3B8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; }

.badge-categoria {
  display: inline-block; padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600;
}
.badge-noticia { background: #DBEAFE; color: #1D4ED8; }
.badge-dica { background: #FEF3C7; color: #D97706; }
.badge-curiosidade { background: #DCFCE7; color: #16A34A; }
.badge-promocao { background: #FEE2E2; color: #DC2626; }

.badge-status {
  display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
}
.badge-ativo { background: #DCFCE7; color: #16A34A; }
.badge-inativo { background: #F1F5F9; color: #64748B; }

.acoes { display: flex; gap: 6px; }
.btn-icon {
  width: 32px; height: 32px; border-radius: 8px; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.btn-edit { background: #EFF6FF; color: #1D4ED8; }
.btn-edit:hover { background: #DBEAFE; }
.btn-delete { background: #FFF1F2; color: #EF4444; }
.btn-delete:hover { background: #FEE2E2; }

@media (max-width: 768px) {
  .main-content { margin-left: 0; }
  .btn-menu-mobile { display: flex; }
  .stats-row { flex-wrap: wrap; padding: 1rem; }
  .stat-card { min-width: calc(50% - 0.5rem); }
  .filters-bar { padding: 0.75rem 1rem; }
  .table-card { margin: 0 1rem 1rem; }
  .data-table th:nth-child(5),
  .data-table td:nth-child(5) { display: none; }
  .noticia-titulo, .noticia-desc { max-width: 160px; }
}
</style>
