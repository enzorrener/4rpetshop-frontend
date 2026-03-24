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
            <router-link to="/admin/noticias" class="breadcrumb-link">Notícias</router-link>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span class="breadcrumb-current">{{ isEditing ? 'Editar Notícia' : 'Nova Notícia' }}</span>
          </div>
        </div>
        <div class="top-bar-right">
          <button v-if="isEditing" type="button" class="btn-toggle-publicar" :class="form.publicado ? 'btn-despublicar' : 'btn-publicar-quick'" @click="togglePublicar" :disabled="isToggling">
            <span v-if="isToggling" class="spinner-sm"></span>
            <template v-else>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path v-if="form.publicado" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                <line v-if="form.publicado" x1="1" y1="1" x2="23" y2="23"/>
                <path v-else d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle v-if="!form.publicado" cx="12" cy="12" r="3"/>
              </svg>
              <span class="btn-text">{{ form.publicado ? 'Despublicar' : 'Publicar' }}</span>
            </template>
          </button>
          <button v-if="isEditing" type="button" class="btn-danger-outline" @click="confirmarExclusao">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
            </svg>
            <span class="btn-text">Excluir</span>
          </button>
        </div>
      </header>

      <div v-if="isLoadingData" class="loading-page">
        <span class="spinner-lg"></span>
        <p>Carregando...</p>
      </div>

      <div v-else class="form-page">
        <!-- Preview Panel -->
        <div class="preview-panel">
          <div class="preview-card">
            <div class="preview-img" :style="{ background: getCategoriaGradient(form.categoria) }">
              <img v-if="capaPreview" :src="capaPreview" :alt="form.titulo" class="preview-img-real" />
              <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" opacity="0.6">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div class="preview-info">
              <div class="preview-badges">
                <span class="badge-categoria" :class="`badge-${form.categoria}`">{{ getCategoriaLabel(form.categoria) }}</span>
                <span class="badge-status" :class="form.publicado ? 'badge-ativo' : 'badge-inativo'">
                  {{ form.publicado ? 'Publicada' : 'Rascunho' }}
                </span>
                <span v-if="form.destaque" class="badge-destaque">⭐ Destaque</span>
              </div>
              <h3 class="preview-titulo">{{ form.titulo || 'Título da notícia...' }}</h3>
              <p class="preview-desc">{{ form.subtitulo || 'Subtítulo aparecerá aqui...' }}</p>
            </div>
          </div>
        </div>

        <!-- Form Panel -->
        <div class="form-panel">
          <form @submit.prevent="handleSubmit">

            <!-- Identificação -->
            <div class="form-section">
              <h3 class="form-section-header">Identificação</h3>
              <div class="form-field">
                <label class="form-label">Título <span class="required">*</span></label>
                <input
                  v-model="form.titulo"
                  type="text"
                  class="form-input"
                  :class="{ 'input-error': erros.titulo }"
                  placeholder="Ex: Como cuidar da alimentação do seu cão adulto"
                  maxlength="150"
                />
                <span v-if="erros.titulo" class="error-msg">{{ erros.titulo }}</span>
                <span class="char-count">{{ form.titulo.length }}/150</span>
              </div>

              <div class="form-field">
                <label class="form-label">Subtítulo</label>
                <input
                  v-model="form.subtitulo"
                  type="text"
                  class="form-input"
                  placeholder="Resumo ou chamada da notícia (aparece nos cards)"
                  maxlength="255"
                />
                <span class="char-count">{{ form.subtitulo.length }}/255</span>
              </div>

              <div class="form-row">
                <div class="form-field">
                  <label class="form-label">Categoria <span class="required">*</span></label>
                  <div class="select-wrap">
                    <select v-model="form.categoria" class="form-select">
                      <option v-for="cat in categorias" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
                    </select>
                    <svg class="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div class="form-field">
                  <label class="form-label">Opções</label>
                  <div class="toggles-col">
                    <div class="toggle-wrap">
                      <label class="toggle">
                        <input type="checkbox" v-model="form.publicado" />
                        <span class="toggle-slider"></span>
                      </label>
                      <span class="toggle-label">{{ form.publicado ? 'Publicada' : 'Rascunho' }}</span>
                    </div>
                    <div class="toggle-wrap">
                      <label class="toggle">
                        <input type="checkbox" v-model="form.destaque" />
                        <span class="toggle-slider toggle-slider-star"></span>
                      </label>
                      <span class="toggle-label">{{ form.destaque ? '⭐ Destaque' : 'Destaque' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Foto Capa -->
            <div class="form-section">
              <h3 class="form-section-header">Foto da Capa</h3>
              <input ref="capaInputRef" type="file" accept="image/png,image/jpeg,image/jpg,image/webp,image/gif" class="hidden-input" @change="onCapaSelecionada" />
              <div class="form-field">
                <div class="upload-area" :class="{ 'has-image': !!capaPreview }" @click="capaInputRef?.click()" @dragover.prevent @drop.prevent="onCapaDrop">
                  <template v-if="capaPreview">
                    <img :src="capaPreview" alt="Preview capa" class="upload-preview-img" />
                    <div class="upload-overlay">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      Alterar capa
                    </div>
                  </template>
                  <template v-else>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <div class="upload-text">
                      <span class="upload-label">Clique ou arraste a foto de capa</span>
                      <span class="upload-hint">PNG, JPG, JPEG, WEBP, GIF — máximo 4MB</span>
                    </div>
                  </template>
                </div>
                <button v-if="capaPreview" type="button" class="btn-remove-img" @click.stop="removerCapa">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Remover capa
                </button>
              </div>
            </div>

            <!-- Conteúdo -->
            <div class="form-section">
              <h3 class="form-section-header">Conteúdo</h3>
              <div class="form-field">
                <label class="form-label">Texto Completo <span class="required">*</span></label>
                <textarea
                  v-model="form.conteudo"
                  class="form-textarea form-textarea-lg"
                  :class="{ 'input-error': erros.conteudo }"
                  placeholder="Escreva o conteúdo completo da notícia aqui..."
                  rows="14"
                ></textarea>
                <span v-if="erros.conteudo" class="error-msg">{{ erros.conteudo }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="$router.back()">Cancelar</button>
              <button type="submit" class="btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-sm"></span>
                <template v-else>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {{ isEditing ? 'Salvar Alterações' : 'Criar Notícia' }}
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router = useRouter()
const route = useRoute()
const sidebarOpen = ref(false)
const isLoading = ref(false)
const isLoadingData = ref(false)
const isToggling = ref(false)

// Inputs de arquivo
const capaInputRef = ref(null)

// Capa
const capaFile = ref(null)
const capaPreview = ref(null)

// Fotos existentes (somente leitura ao editar, não usadas no form)
const fotosExistentes = ref([])

const isEditing = computed(() => !!route.params.id)
const token = localStorage.getItem('funcionario_token')

const categorias = [
  { value: 'noticia',      label: 'Notícia' },
  { value: 'dica',         label: 'Dica de Saúde' },
  { value: 'curiosidade',  label: 'Curiosidade' },
  { value: 'promocao',     label: 'Promoção' }
]

const form = reactive({
  titulo: '',
  subtitulo: '',
  conteudo: '',
  categoria: 'noticia',
  publicado: false,
  destaque: false
})

const erros = reactive({ titulo: '', conteudo: '' })

const getCategoriaLabel = (v) => categorias.find(c => c.value === v)?.label || v

const getCategoriaGradient = (cat) => {
  const map = {
    noticia:     'linear-gradient(135deg,#1155CC,#0A3080)',
    dica:        'linear-gradient(135deg,#F07020,#c85a10)',
    curiosidade: 'linear-gradient(135deg,#4CAF50,#2e7d32)',
    promocao:    'linear-gradient(135deg,#E53935,#B71C1C)'
  }
  return map[cat] || 'linear-gradient(135deg,#607D8B,#37474F)'
}

// ── Upload da capa ────────────────────────────────────────────────────────
const processarCapa = (file) => {
  if (!file || !file.type.startsWith('image/')) return
  if (file.size > 4 * 1024 * 1024) {
    Swal.fire({ icon: 'warning', title: 'Arquivo muito grande', text: 'A imagem deve ter no máximo 4MB.', confirmButtonColor: '#0A3080' })
    return
  }
  capaFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => { capaPreview.value = e.target.result }
  reader.readAsDataURL(file)
}

const onCapaSelecionada = (e) => processarCapa(e.target.files[0])
const onCapaDrop = (e) => processarCapa(e.dataTransfer.files[0])
const removerCapa = () => {
  capaFile.value = null
  capaPreview.value = null
  if (capaInputRef.value) capaInputRef.value.value = ''
}

// ── Validação ─────────────────────────────────────────────────────────────
const validar = () => {
  let ok = true
  erros.titulo = ''
  erros.conteudo = ''
  if (!form.titulo.trim()) { erros.titulo = 'Título é obrigatório.'; ok = false }
  if (!form.conteudo.trim()) { erros.conteudo = 'Conteúdo é obrigatório.'; ok = false }
  return ok
}

// ── Submit ────────────────────────────────────────────────────────────────
const handleSubmit = async () => {
  if (!validar()) return
  isLoading.value = true
  try {
    const fd = new FormData()
    fd.append('titulo', form.titulo)
    if (form.subtitulo) fd.append('subtitulo', form.subtitulo)
    fd.append('conteudo', form.conteudo)
    fd.append('categoria', form.categoria)
    fd.append('publicado', form.publicado ? '1' : '0')
    fd.append('destaque', form.destaque ? '1' : '0')
    if (capaFile.value) fd.append('foto_capa', capaFile.value)

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }

    if (isEditing.value) {
      fd.append('_method', 'PUT')
      await api.post(`/admin/noticias/${route.params.id}`, fd, { headers })
      await Swal.fire({ icon: 'success', title: 'Salvo!', text: 'Notícia atualizada com sucesso.', confirmButtonColor: '#0A3080', timer: 2000, showConfirmButton: false })
    } else {
      await api.post('/admin/noticias', fd, { headers })
      await Swal.fire({ icon: 'success', title: 'Criada!', text: 'Notícia criada com sucesso.', confirmButtonColor: '#0A3080', timer: 2000, showConfirmButton: false })
    }
    router.push('/admin/noticias')
  } catch (error) {
    const msg = error.response?.data?.message || 'Erro ao salvar notícia.'
    Swal.fire({ icon: 'error', title: 'Erro', text: msg, confirmButtonColor: '#EF4444' })
  } finally {
    isLoading.value = false
  }
}

// ── Toggle publicar ───────────────────────────────────────────────────────
const togglePublicar = async () => {
  isToggling.value = true
  try {
    const res = await api.post(`/admin/noticias/${route.params.id}/publicar`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    form.publicado = res.data.publicado
    const status = form.publicado ? 'Publicada!' : 'Despublicada!'
    Swal.fire({ icon: 'success', title: status, confirmButtonColor: '#0A3080', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao alterar status', confirmButtonColor: '#EF4444' })
  } finally {
    isToggling.value = false
  }
}

// ── Excluir ───────────────────────────────────────────────────────────────
const confirmarExclusao = async () => {
  const result = await Swal.fire({
    title: 'Excluir notícia?',
    text: 'Esta ação não pode ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  })
  if (!result.isConfirmed) return
  try {
    await api.delete(`/admin/noticias/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    await Swal.fire({ icon: 'success', title: 'Excluída!', confirmButtonColor: '#0A3080', timer: 1500, showConfirmButton: false })
    router.push('/admin/noticias')
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao excluir', confirmButtonColor: '#EF4444' })
  }
}

// ── Load ──────────────────────────────────────────────────────────────────
onMounted(async () => {
  if (!token) { router.push('/login/funcionario'); return }
  if (isEditing.value) {
    isLoadingData.value = true
    try {
      const res = await api.get(`/admin/noticias/${route.params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const n = res.data.data || res.data
      form.titulo    = n.titulo    || ''
      form.subtitulo = n.subtitulo || ''
      form.conteudo  = n.conteudo  || ''
      form.categoria = n.categoria || 'noticia'
      form.publicado = !!n.publicado
      form.destaque  = !!n.destaque
      if (n.foto_capa_url) capaPreview.value = n.foto_capa_url
      fotosExistentes.value = n.fotos || []
    } catch {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Notícia não encontrada.', confirmButtonColor: '#EF4444' })
      router.push('/admin/noticias')
    } finally {
      isLoadingData.value = false
    }
  }
})
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #F1F5F9; }
.main-content { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-height: 100vh; }

/* Top Bar */
.top-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 1.5rem; height: 64px; background: white;
  border-bottom: 1px solid #E8ECF0; position: sticky; top: 0; z-index: 10;
}
.top-bar-left { display: flex; align-items: center; gap: 0.75rem; }
.breadcrumb { display: flex; align-items: center; gap: 6px; }
.breadcrumb-link { font-size: 14px; color: #64748B; text-decoration: none; }
.breadcrumb-link:hover { color: #0A3080; }
.breadcrumb-current { font-size: 15px; font-weight: 700; color: #0A1F44; }
.btn-menu-mobile { display: none; background: none; border: none; cursor: pointer; color: #374151; padding: 4px; }
.top-bar-right { display: flex; gap: 0.75rem; align-items: center; }

.btn-toggle-publicar {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 10px;
  font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: 1px solid;
}
.btn-publicar-quick { background: #DCFCE7; color: #16A34A; border-color: #86EFAC; }
.btn-publicar-quick:hover { background: #BBF7D0; }
.btn-despublicar { background: #FEF3C7; color: #D97706; border-color: #FCD34D; }
.btn-despublicar:hover { background: #FDE68A; }
.btn-toggle-publicar:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-danger-outline {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; background: white; color: #EF4444;
  border: 1px solid #FCA5A5; border-radius: 10px;
  font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.btn-danger-outline:hover { background: #FEF2F2; }

/* Loading */
.loading-page { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 12px; color: #94A3B8; }
.spinner-lg { width: 40px; height: 40px; border: 3px solid #E2E8F0; border-top-color: #0A3080; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Form Page */
.form-page { display: flex; flex-direction: row; gap: 1.5rem; padding: 1.5rem; flex: 1; align-items: flex-start; }

/* Preview Panel */
.preview-panel { width: 300px; min-width: 300px; position: sticky; top: 80px; }
.preview-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid #E8ECF0; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.preview-img { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
.preview-img-real { width: 100%; height: 100%; object-fit: cover; }
.preview-info { padding: 1rem; display: flex; flex-direction: column; gap: 8px; }
.preview-badges { display: flex; gap: 6px; flex-wrap: wrap; }
.preview-titulo { font-size: 15px; font-weight: 700; color: #0A1F44; line-height: 1.4; margin: 0; }
.preview-desc { font-size: 12px; color: #64748B; line-height: 1.5; margin: 0; }

/* Form Panel */
.form-panel { flex: 1; display: flex; flex-direction: column; gap: 1rem; min-width: 0; }
.form-section { background: white; border-radius: 16px; padding: 1.5rem; border: 1px solid #E8ECF0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.form-section-header {
  font-size: 13px; font-weight: 700; color: #0A1F44; text-transform: uppercase;
  letter-spacing: 0.5px; margin: 0 0 1.25rem;
  padding-bottom: 0.875rem; border-bottom: 1px solid #F1F5F9;
  display: flex; align-items: center; gap: 8px;
}
.optional-label { font-size: 11px; font-weight: 500; color: #94A3B8; text-transform: none; letter-spacing: 0; }
.form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.form-field:last-child { margin-bottom: 0; }
.form-label { font-size: 13px; font-weight: 600; color: #374151; }
.required { color: #EF4444; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.form-input, .form-select {
  width: 100%; height: 44px; padding: 0 14px;
  border: 1px solid #E2E8F0; border-radius: 10px;
  font-size: 14px; color: #374151; background: #F8FAFC;
  outline: none; transition: all 0.2s; box-sizing: border-box;
}
.form-input:focus, .form-select:focus { border-color: #0A3080; background: white; box-shadow: 0 0 0 3px rgba(10,48,128,0.08); }
.input-error { border-color: #EF4444 !important; }
.error-msg { font-size: 12px; color: #EF4444; }
.char-count { font-size: 11px; color: #94A3B8; text-align: right; }
.field-hint { font-size: 12px; color: #94A3B8; }

.select-wrap { position: relative; }
.select-wrap .form-select { appearance: none; padding-right: 36px; cursor: pointer; }
.select-chevron { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #94A3B8; pointer-events: none; }

.form-textarea {
  width: 100%; padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px;
  font-size: 14px; color: #374151; background: #F8FAFC; outline: none;
  resize: vertical; font-family: inherit; transition: all 0.2s; box-sizing: border-box; line-height: 1.6;
}
.form-textarea:focus { border-color: #0A3080; background: white; box-shadow: 0 0 0 3px rgba(10,48,128,0.08); }
.form-textarea-lg { min-height: 280px; }

/* Upload capa */
.hidden-input { display: none; }
.upload-area {
  width: 100%; height: 140px; border: 2px dashed #E2E8F0; border-radius: 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; cursor: pointer; transition: all 0.2s; background: #F8FAFC;
  position: relative; overflow: hidden; box-sizing: border-box;
}
.upload-area:hover { border-color: #0A3080; background: #F0F5FF; }
.upload-area.has-image { border-style: solid; border-color: #E8ECF0; padding: 0; }
.upload-preview-img { width: 100%; height: 100%; object-fit: cover; }
.upload-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.45);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; color: white; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.2s;
}
.upload-area.has-image:hover .upload-overlay { opacity: 1; }
.upload-text { display: flex; flex-direction: column; gap: 4px; align-items: center; }
.upload-label { font-size: 14px; font-weight: 600; color: #374151; }
.upload-hint  { font-size: 12px; color: #9CA3AF; }
.btn-remove-img {
  display: flex; align-items: center; gap: 6px; margin-top: 8px;
  background: none; border: none; cursor: pointer;
  font-size: 12px; color: #EF4444; font-weight: 500; padding: 0;
}
.btn-remove-img:hover { text-decoration: underline; }

/* Toggles */
.toggles-col { display: flex; flex-direction: column; gap: 10px; justify-content: center; height: 44px; }
.toggle-wrap { display: flex; align-items: center; gap: 10px; }
.toggle { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background: #CBD5E1; border-radius: 24px; transition: 0.3s;
}
.toggle-slider:before {
  content: ''; position: absolute; width: 18px; height: 18px;
  left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.3s;
}
.toggle input:checked + .toggle-slider { background: #16A34A; }
.toggle input:checked + .toggle-slider-star { background: #F59E0B; }
.toggle input:checked + .toggle-slider:before,
.toggle input:checked + .toggle-slider-star:before { transform: translateX(20px); }
.toggle-label { font-size: 13px; color: #374151; font-weight: 500; }

/* Actions */
.form-actions {
  display: flex; justify-content: flex-end; gap: 0.75rem;
  background: white; padding: 1rem 1.5rem; border-radius: 16px; border: 1px solid #E8ECF0;
}
.btn-secondary {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; background: white; border: 1px solid #E2E8F0;
  border-radius: 10px; color: #374151; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s;
}
.btn-secondary:hover { background: #F8FAFC; }
.btn-primary {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px; background: linear-gradient(135deg,#0A3080,#3D4290);
  color: white; border: none; border-radius: 10px;
  font-size: 14px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
}
.btn-primary:hover:not(:disabled) { opacity: 0.9; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner-sm {
  width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite;
}

/* Badges */
.badge-categoria { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.badge-noticia     { background: #DBEAFE; color: #1D4ED8; }
.badge-dica        { background: #FEF3C7; color: #D97706; }
.badge-curiosidade { background: #DCFCE7; color: #16A34A; }
.badge-promocao    { background: #FEE2E2; color: #DC2626; }
.badge-status { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.badge-ativo    { background: #DCFCE7; color: #16A34A; }
.badge-inativo  { background: #F1F5F9; color: #64748B; }
.badge-destaque { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #FEF3C7; color: #D97706; }

@media (max-width: 1100px) {
  .preview-panel { width: 260px; min-width: 260px; }
}
@media (max-width: 768px) {
  .main-content { margin-left: 0; }
  .btn-menu-mobile { display: flex; }
  .breadcrumb-link { display: none; }
  .breadcrumb > svg { display: none; }
  .btn-text { display: none; }
  .btn-danger-outline, .btn-toggle-publicar { padding: 8px; min-width: 36px; justify-content: center; gap: 0; }
  .form-page { flex-direction: column; padding: 0; gap: 0; background: #F1F5F9; }
  .preview-panel { width: 100%; min-width: unset; position: static; }
  .preview-card { border-radius: 0; border-left: none; border-right: none; border-top: none; box-shadow: none; }
  .preview-img { height: 130px; }
  .form-panel { gap: 0.75rem; padding: 0.875rem; }
  .form-section { border-radius: 14px; padding: 1.125rem 1rem; }
  .form-row { grid-template-columns: 1fr; }
  .toggles-col { height: auto; gap: 8px; }
  .form-actions { flex-direction: column-reverse; gap: 0.625rem; border-radius: 14px; }
  .btn-primary, .btn-secondary { justify-content: center; width: 100%; padding: 13px; font-size: 15px; border-radius: 12px; }
}
</style>
