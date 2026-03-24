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
            <router-link to="/admin/produtos" class="breadcrumb-link">Produtos / Marcas</router-link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="breadcrumb-current">{{ isEditing ? 'Editar Marca' : 'Nova Marca' }}</span>
          </div>
        </div>
        <div class="top-bar-right" v-if="isEditing">
          <button class="btn-danger-outline" @click="confirmarExclusao">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
            <span class="btn-text">Excluir Marca</span>
          </button>
        </div>
      </header>

      <!-- Loading inicial (edição) -->
      <div v-if="isLoadingData" class="loading-section">
        <span class="loading-spinner"></span>
        <p>Carregando dados da marca...</p>
      </div>

      <!-- Formulário -->
      <div v-else class="form-page">

        <!-- Painel esquerdo: preview -->
        <div class="preview-panel">
          <div class="preview-card">
            <div class="preview-logo-wrap" @click="triggerFileInput">
              <img v-if="logoPreview" :src="logoPreview" alt="Logo" class="preview-logo-img" />
              <div v-else class="preview-logo-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Sem logo</span>
              </div>
              <div class="preview-logo-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>{{ logoPreview ? 'Alterar' : 'Enviar' }}</span>
              </div>
            </div>
            <input ref="fileInputRef" type="file" accept="image/png,image/jpeg,image/jpg,image/webp,image/gif" class="hidden-input" @change="onLogoSelecionado" />

            <div class="preview-info">
              <h3 class="preview-nome">{{ form.nome || 'Nome da Marca' }}</h3>
              <span class="preview-badge" :class="form.ativo ? 'badge-ativo' : 'badge-inativo'">
                {{ form.ativo ? 'Ativa' : 'Inativa' }}
              </span>
              <span v-if="categoriaSelecionada" class="preview-categoria">
                {{ categoriaSelecionada.nome }}
              </span>
            </div>

            <div class="preview-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Clique na imagem para {{ logoPreview ? 'alterar' : 'enviar' }} o logo
            </div>
          </div>
        </div>

        <!-- Painel direito: formulário -->
        <div class="form-panel">

          <!-- Seção: Identificação -->
          <div class="form-section">
            <div class="form-section-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              Identificação
            </div>

            <div class="form-group">
              <label class="form-label">Nome da Marca <span class="required">*</span></label>
              <input
                type="text"
                v-model="form.nome"
                placeholder="Ex: Royal Canin, Pedigree, Whiskas..."
                class="form-input"
                :class="{ 'input-error': erros.nome }"
                maxlength="100"
                @input="erros.nome = ''"
              />
              <span v-if="erros.nome" class="field-error">{{ erros.nome }}</span>
              <span class="field-hint">{{ form.nome.length }}/100 caracteres</span>
            </div>

            <div class="form-group">
              <label class="form-label">Categoria <span class="optional-tag">(opcional)</span></label>
              <div v-if="loadingCategorias" class="select-loading">Carregando categorias...</div>
              <select
                v-else
                v-model="form.categoria_id"
                class="form-select"
                :class="{ 'input-error': erros.categoria_id }"
              >
                <option :value="null">— Sem categoria —</option>
                <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                  {{ cat.nome }}
                </option>
              </select>
              <span v-if="erros.categoria_id" class="field-error">{{ erros.categoria_id }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Status</label>
              <div class="status-toggle-row">
                <button type="button" class="status-toggle" :class="{ on: form.ativo }" @click="form.ativo = !form.ativo">
                  <span class="toggle-knob"></span>
                </button>
                <div class="status-toggle-info">
                  <span class="status-toggle-label" :class="form.ativo ? 'text-ativo' : 'text-inativo'">
                    {{ form.ativo ? 'Ativa' : 'Inativa' }}
                  </span>
                  <span class="status-toggle-desc">{{ form.ativo ? 'A marca aparecerá nos produtos' : 'A marca ficará oculta nos produtos' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Seção: Logo -->
          <div class="form-section">
            <div class="form-section-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              Logo da Marca <span class="optional-tag">(opcional)</span>
            </div>

            <div class="upload-area" :class="{ 'has-image': !!logoPreview }" @click="triggerFileInput" @dragover.prevent @drop.prevent="onLogoDrop">
              <template v-if="logoPreview">
                <img :src="logoPreview" alt="Logo preview" class="upload-preview-img" />
                <div class="upload-overlay">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span>Clique para alterar</span>
                </div>
              </template>
              <template v-else>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <div class="upload-text">
                  <span class="upload-label">Clique ou arraste o arquivo</span>
                  <span class="upload-hint">PNG, JPG, WEBP, GIF — máximo 2MB</span>
                </div>
              </template>
            </div>

            <button v-if="logoPreview" type="button" class="btn-remove-logo" @click.stop="removerLogo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
              Remover logo
            </button>
          </div>

          <!-- Ações -->
          <div class="form-actions">
            <router-link to="/admin/produtos" class="btn-secondary">Cancelar</router-link>
            <button type="button" class="btn-primary" :disabled="isSaving" @click="salvar">
              <span v-if="isSaving" class="loading-spinner-sm"></span>
              <span v-else>{{ isEditing ? 'Salvar Alterações' : 'Cadastrar Marca' }}</span>
            </button>
          </div>

        </div>
      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router       = useRouter()
const route        = useRoute()
const isLoadingData = ref(false)
const isSaving     = ref(false)
const sidebarOpen  = ref(false)
const logoPreview  = ref(null)
const logoFile     = ref(null)
const logoRemovida = ref(false)
const fileInputRef = ref(null)

const marcaId  = computed(() => route.params.id || null)
const isEditing = computed(() => !!marcaId.value)

const token = localStorage.getItem('funcionario_token')

const categorias       = ref([])
const loadingCategorias = ref(false)

const form  = reactive({ nome: '', ativo: true, categoria_id: null })
const erros = reactive({ nome: '', categoria_id: '' })

const categoriaSelecionada = computed(() =>
  form.categoria_id ? categorias.value.find(c => c.id === form.categoria_id) || null : null
)

const fetchCategorias = async () => {
  loadingCategorias.value = true
  try {
    const { data } = await api.get('/produtos/categorias/ativas', {
      headers: { Authorization: `Bearer ${token}` }
    })
    categorias.value = data.data || []
  } catch {
    // silencioso — dropdown ficará vazio
  } finally {
    loadingCategorias.value = false
  }
}

const triggerFileInput = () => fileInputRef.value?.click()

const onLogoSelecionado = (e) => {
  const file = e.target.files[0]
  if (!file) return
  logoFile.value = file
  logoRemovida.value = false
  const reader = new FileReader()
  reader.onload = ev => { logoPreview.value = ev.target.result }
  reader.readAsDataURL(file)
}

const onLogoDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (!file || !file.type.startsWith('image/')) return
  logoFile.value = file
  logoRemovida.value = false
  const reader = new FileReader()
  reader.onload = ev => { logoPreview.value = ev.target.result }
  reader.readAsDataURL(file)
}

const removerLogo = () => {
  logoPreview.value = null
  logoFile.value = null
  logoRemovida.value = true
  if (fileInputRef.value) fileInputRef.value.value = ''
}

const fetchMarca = async () => {
  isLoadingData.value = true
  try {
    const { data } = await api.get(`/produtos/marcas/${marcaId.value}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const m = data.data
    form.nome        = m.nome || ''
    form.ativo       = m.ativo ?? true
    form.categoria_id = m.categoria_id || null
    logoPreview.value = m.logo_url || null
  } catch (e) {
    if (e.response?.status === 404) {
      await Swal.fire({ icon: 'error', title: 'Não encontrada', text: 'Esta marca não existe.', confirmButtonColor: '#1155CC' })
      router.push('/admin/produtos')
    }
  } finally {
    isLoadingData.value = false
  }
}

const salvar = async () => {
  erros.nome = ''
  if (!form.nome.trim()) { erros.nome = 'O nome da marca é obrigatório.'; return }

  isSaving.value = true
  try {
    const fd = new FormData()
    fd.append('nome', form.nome.trim())
    fd.append('ativo', form.ativo ? '1' : '0')
    if (form.categoria_id) fd.append('categoria_id', form.categoria_id)
    if (logoFile.value) fd.append('logo_marca', logoFile.value)
    if (logoRemovida.value && !logoFile.value) fd.append('remover_logo', '1')

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }

    if (isEditing.value) {
      fd.append('_method', 'PUT')
      await api.post(`/produtos/marcas/${marcaId.value}`, fd, { headers })
      await Swal.fire({ icon: 'success', title: 'Atualizado!', text: 'Marca atualizada com sucesso.', confirmButtonColor: '#1155CC', timer: 2000, showConfirmButton: false })
    } else {
      await api.post('/produtos/marcas', fd, { headers })
      await Swal.fire({ icon: 'success', title: 'Cadastrado!', text: 'Marca criada com sucesso.', confirmButtonColor: '#1155CC', timer: 2000, showConfirmButton: false })
    }

    router.push('/admin/produtos')
  } catch (e) {
    const err = e.response?.data?.errors
    if (err?.nome) { erros.nome = err.nome[0]; return }
    Swal.fire({ icon: 'error', title: 'Erro', text: e.response?.data?.message || 'Erro ao salvar marca.', confirmButtonColor: '#ef4444' })
  } finally {
    isSaving.value = false
  }
}

const confirmarExclusao = async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Excluir Marca',
    text: `Deseja excluir "${form.nome}"? Esta ação não pode ser desfeita.`,
    showCancelButton: true,
    confirmButtonColor: '#E53935',
    cancelButtonColor: '#1155CC',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  })
  if (!result.isConfirmed) return
  try {
    await api.delete(`/produtos/marcas/${marcaId.value}`, { headers: { Authorization: `Bearer ${token}` } })
    await Swal.fire({ icon: 'success', title: 'Excluído!', text: 'Marca removida.', confirmButtonColor: '#1155CC', timer: 1800, showConfirmButton: false })
    router.push('/admin/produtos')
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível excluir a marca.', confirmButtonColor: '#ef4444' })
  }
}

onMounted(() => {
  if (!token) { router.push('/login/funcionario'); return }
  fetchCategorias()
  if (isEditing.value) fetchMarca()
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
.breadcrumb-link { font-size: 14px; color: #1155CC; font-weight: 500; text-decoration: none; }
.breadcrumb-link:hover { text-decoration: underline; }
.breadcrumb svg { color: #C1C8D4; }
.breadcrumb-current { font-size: 14px; font-weight: 700; color: #0A1F44; }

/* Form Page Layout */
.form-page { display: flex; gap: 1.5rem; padding: 1.5rem; align-items: flex-start; flex: 1; }

/* Preview Panel */
.preview-panel { width: 260px; min-width: 260px; position: sticky; top: 80px; }
.preview-card { background: white; border: 1px solid #E8ECF0; border-radius: 18px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }

.preview-logo-wrap { height: 180px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; overflow: hidden; border-bottom: 1px solid #E8ECF0; }
.preview-logo-img { width: 100%; height: 100%; object-fit: contain; padding: 16px; }
.preview-logo-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #C1C8D4; }
.preview-logo-empty span { font-size: 12px; }
.preview-logo-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: white; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.2s; }
.preview-logo-wrap:hover .preview-logo-overlay { opacity: 1; }

.preview-info { padding: 1rem 1.25rem 0.75rem; display: flex; flex-direction: column; gap: 8px; }
.preview-nome { font-size: 1rem; font-weight: 700; color: #0A1F44; margin: 0; word-break: break-word; }
.preview-badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; align-self: flex-start; }
.preview-categoria { font-size: 12px; color: #6B7A99; background: #F1F5F9; border-radius: 20px; padding: 3px 10px; align-self: flex-start; font-weight: 500; }
.badge-ativo   { background: #E8F5E9; color: #2E7D32; }
.badge-inativo { background: #FFF3E0; color: #F57C00; }

.preview-hint { display: flex; align-items: center; gap: 6px; padding: 0.75rem 1.25rem 1rem; font-size: 11px; color: #9CA3AF; border-top: 1px solid #F1F5F9; margin-top: 0.25rem; }
.hidden-input { display: none; }

/* Form Panel */
.form-panel { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }

.form-section { background: white; border: 1px solid #E8ECF0; border-radius: 16px; padding: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.form-section-header { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #1155CC; text-transform: uppercase; letter-spacing: 0.6px; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #F1F5F9; }
.optional-tag { font-size: 11px; font-weight: 400; color: #9CA3AF; text-transform: none; letter-spacing: 0; margin-left: 2px; }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.form-group:last-child { margin-bottom: 0; }
.form-label { font-size: 13px; font-weight: 600; color: #374151; }
.required { color: #E53935; }
.form-input { height: 46px; padding: 0 14px; border: 1.5px solid #D1D9E0; border-radius: 10px; font-size: 15px; color: #0A1F44; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.form-select { height: 46px; padding: 0 14px; border: 1.5px solid #D1D9E0; border-radius: 10px; font-size: 15px; color: #0A1F44; outline: none; transition: border-color 0.15s, box-shadow 0.15s; width: 100%; background: white; cursor: pointer; }
.form-select:focus { border-color: #1155CC; box-shadow: 0 0 0 3px rgba(17,85,204,0.12); }
.form-select.input-error { border-color: #E53935; }
.select-loading { height: 46px; display: flex; align-items: center; padding: 0 14px; font-size: 14px; color: #9CA3AF; border: 1.5px solid #E8ECF0; border-radius: 10px; background: #F8FAFC; }
.form-input:focus { border-color: #1155CC; box-shadow: 0 0 0 3px rgba(17,85,204,0.12); }
.form-input.input-error { border-color: #E53935; }
.field-error { font-size: 12px; color: #E53935; }
.field-hint  { font-size: 11px; color: #9CA3AF; }

/* Status Toggle */
.status-toggle-row { display: flex; align-items: center; gap: 14px; }
.status-toggle { width: 48px; height: 26px; border-radius: 13px; border: none; cursor: pointer; background: #D1D9E0; position: relative; transition: background 0.2s; padding: 0; flex-shrink: 0; }
.status-toggle.on { background: #1155CC; }
.toggle-knob { width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.status-toggle.on .toggle-knob { transform: translateX(22px); }
.status-toggle-label { font-size: 14px; font-weight: 700; display: block; }
.text-ativo   { color: #2E7D32; }
.text-inativo { color: #F57C00; }
.status-toggle-desc { font-size: 12px; color: #9CA3AF; display: block; margin-top: 1px; }

/* Upload Area */
.upload-area {
  border: 2px dashed #D1D9E0;
  border-radius: 14px;
  height: 160px;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  cursor: pointer;
  position: relative; overflow: hidden;
  transition: border-color 0.15s, background 0.15s;
  background: #FAFBFC;
}
.upload-area:hover { border-color: #1155CC; background: #F0F5FF; }
.upload-area.has-image { border-style: solid; border-color: #E8ECF0; padding: 0; }
.upload-preview-img { width: 100%; height: 100%; object-fit: contain; padding: 12px; }
.upload-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: white; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.2s; }
.upload-area.has-image:hover .upload-overlay { opacity: 1; }
.upload-text { display: flex; flex-direction: column; gap: 4px; }
.upload-label { font-size: 14px; font-weight: 600; color: #374151; }
.upload-hint  { font-size: 12px; color: #9CA3AF; }
.upload-area svg { color: #9CA3AF; }

.btn-remove-logo { display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; padding: 6px 12px; background: none; border: 1.5px solid #E8ECF0; border-radius: 8px; font-size: 12px; font-weight: 600; color: #E53935; cursor: pointer; transition: all 0.15s; }
.btn-remove-logo:hover { background: #FFF5F5; border-color: #E53935; }

/* Actions */
.form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; padding-top: 0.25rem; }
.btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px; background: #1155CC; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background 0.15s; }
.btn-primary:hover:not(:disabled) { background: #0A3080; }
.btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
.btn-secondary { display: inline-flex; align-items: center; gap: 6px; padding: 11px 24px; background: white; color: #374151; border: 1.5px solid #E8ECF0; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: border-color 0.15s; }
.btn-secondary:hover { border-color: #9CA3AF; }
.btn-danger-outline { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: white; color: #E53935; border: 1.5px solid #E8ECF0; border-radius: 9px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-danger-outline:hover { border-color: #E53935; background: #FFF5F5; }

/* Loading */
.loading-section { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 4rem 1.5rem; color: #6B7A99; font-size: 14px; }
.loading-spinner { width: 32px; height: 32px; border: 3px solid #E8ECF0; border-top-color: #1155CC; border-radius: 50%; animation: spin 0.8s linear infinite; }
.loading-spinner-sm { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.5); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Responsivo ────────────────────────────────────── */

@media (max-width: 768px) {

  /* Layout base */
  .main-content   { margin-left: 0; }
  .btn-menu-mobile { display: flex; }

  /* ── Topbar ── */
  .top-bar {
    padding: 0 1rem;
    height: 54px;
    gap: 0.5rem;
    flex-wrap: nowrap;
  }
  .top-bar-left { flex: 1; min-width: 0; gap: 0.625rem; }
  /* Esconde "Produtos / Marcas >" e mostra só o título atual */
  .breadcrumb-link { display: none; }
  .breadcrumb > svg { display: none; }
  .breadcrumb-current {
    font-size: 15px;
    font-weight: 700;
    color: #0A1F44;
    white-space: nowrap;
  }
  /* Botão excluir: só ícone */
  .btn-danger-outline {
    padding: 8px;
    gap: 0;
    min-width: 36px;
    min-height: 36px;
    justify-content: center;
  }
  .btn-danger-outline .btn-text { display: none; }

  /* ── Form page: coluna única, sem padding nem gap ── */
  .form-page {
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    gap: 0;
    background: #F1F5F9;
    flex: 1;
  }

  /* ── Preview: cartão compacto separado do formulário ── */
  .preview-panel  { width: 100%; min-width: unset; position: static; }
  .preview-card   {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.875rem;
    padding: 0.875rem 1rem;
    background: white;
    border-radius: 0;
    border-width: 0;
    border-bottom: 1px solid #E8ECF0;
    box-shadow: none;
  }
  .preview-logo-wrap {
    width: 64px;
    min-width: 64px;
    height: 64px;
    border-radius: 10px;
    border-width: 1.5px;
    border-style: solid;
    border-color: #E8ECF0;
    border-bottom-color: #E8ECF0;
    flex-shrink: 0;
    cursor: pointer;
  }
  .preview-logo-empty svg  { width: 26px; height: 26px; }
  .preview-logo-empty span { font-size: 9px; }
  .preview-logo-overlay    { display: none; }  /* sem hover no touch */
  .preview-info  { padding: 0; flex: 1; min-width: 0; gap: 5px; }
  .preview-nome  { font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .preview-badge { font-size: 10px; padding: 2px 8px; }
  .preview-categoria { font-size: 10px; padding: 2px 8px; }
  .preview-hint  { display: none; }

  /* ── Seções do formulário ── */
  .form-panel { gap: 0.75rem; padding: 0.875rem; }
  .form-section {
    border-width: 1px;
    border-style: solid;
    border-color: #E8ECF0;
    border-radius: 14px;
    box-shadow: none;
    padding: 1.125rem 1rem;
    background: white;
  }
  .form-section-header {
    font-size: 12px;
    padding-bottom: 0.875rem;
    margin-bottom: 0.875rem;
  }

  /* ── Inputs ── */
  .form-input,
  .form-select   { height: 44px; font-size: 14px; }
  .select-loading { height: 44px; font-size: 13px; }

  /* ── Upload ── */
  .upload-area  { height: 110px; flex-direction: column; gap: 8px; }
  .upload-label { font-size: 13px; }
  .upload-hint  { font-size: 11px; }

  /* ── Ações: largura total empilhadas ── */
  .form-actions {
    flex-direction: column-reverse;
    gap: 0.625rem;
    padding: 0.875rem;
    background: transparent;
    border-top: none;
    box-shadow: none;
    position: static;
  }
  .form-actions .btn-primary,
  .form-actions .btn-secondary {
    justify-content: center;
    width: 100%;
    padding: 13px;
    font-size: 15px;
    border-radius: 12px;
  }
}
</style>
