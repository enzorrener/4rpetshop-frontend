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
            <router-link to="/admin/produtos" class="breadcrumb-root">Produtos</router-link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="breadcrumb-current">{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</span>
          </div>
        </div>
        <div class="top-bar-right">
          <router-link to="/admin/produtos" class="btn-secondary">Cancelar</router-link>
          <button class="btn-primary" :disabled="isSaving" @click="handleSubmit">
            <span v-if="isSaving" class="spinner-sm"></span>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
            </svg>
            {{ isSaving ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Produto') }}
          </button>
        </div>
      </header>

      <!-- Loading -->
      <div v-if="isLoadingData" class="page-loading">
        <span class="spinner"></span>
        <p>Carregando...</p>
      </div>

      <div v-else class="page-body">

        <!-- Coluna Lateral Esquerda -->
        <div class="col-aside">

          <!-- Foto do Produto -->
          <div class="card">
            <h2 class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              Foto do Produto
            </h2>

            <input ref="fotoInputRef" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" class="hidden-input" @change="onFotoSelecionada" />

            <div class="foto-upload-area" :class="{ 'has-foto': !!fotoPreview }" @click="fotoInputRef?.click()" @dragover.prevent @drop.prevent="onFotoDrop">
              <template v-if="fotoPreview">
                <img :src="fotoPreview" alt="Preview" class="foto-preview-img" />
                <div class="foto-overlay">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  <span>Alterar foto</span>
                </div>
              </template>
              <template v-else>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span class="upload-label">Clique ou arraste a foto</span>
                <span class="upload-hint">PNG, JPG, WEBP — máx. 4MB</span>
              </template>
            </div>

            <button v-if="fotoPreview" type="button" class="btn-remove" @click.stop="removerFoto">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
              Remover foto
            </button>
          </div>

          <!-- Publicação -->
          <div class="card">
            <h2 class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
              </svg>
              Publicação
            </h2>

            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-label">Produto Ativo</span>
                <span class="toggle-desc">{{ form.ativo ? 'Visível na loja' : 'Oculto da loja' }}</span>
              </div>
              <button type="button" class="toggle-btn" :class="{ 'toggle-on': form.ativo }" @click="form.ativo = !form.ativo">
                <span class="toggle-thumb"></span>
              </button>
            </div>

            <div class="divider"></div>

            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-label">Produto em Destaque</span>
                <span class="toggle-desc">{{ form.destaque ? 'Aparece na vitrine principal' : 'Não destacado' }}</span>
              </div>
              <button type="button" class="toggle-btn" :class="{ 'toggle-on': form.destaque }" @click="form.destaque = !form.destaque">
                <span class="toggle-thumb"></span>
              </button>
            </div>

            <div class="divider"></div>

            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-label">Produto com Desconto</span>
                <span class="toggle-desc">{{ form.em_promocao ? 'Badge de promoção ativo' : 'Sem badge de promoção' }}</span>
              </div>
              <button type="button" class="toggle-btn" :class="{ 'toggle-on': form.em_promocao }" @click="form.em_promocao = !form.em_promocao">
                <span class="toggle-thumb"></span>
              </button>
            </div>
          </div>

          <!-- Resumo de Preços -->
          <div v-if="form.preco" class="card card-preview">
            <h2 class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              Prévia do Preço
            </h2>
            <div class="preview-price-block">
              <div v-if="form.preco_promocional" class="preview-original">
                De: <span>R$ {{ formatPreco(form.preco) }}</span>
              </div>
              <div class="preview-final">
                {{ form.preco_promocional ? 'Por:' : '' }}
                <strong>R$ {{ formatPreco(form.preco_promocional || form.preco) }}</strong>
              </div>
              <div v-if="form.preco_promocional && form.preco" class="preview-desconto">
                {{ calcDesconto() }}% de desconto
              </div>
            </div>
          </div>

        </div>

        <!-- Coluna Principal Direita -->
        <div class="col-main">

          <!-- Informações Básicas -->
          <div class="card">
            <h2 class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              Informações Básicas
            </h2>

            <div class="form-row">
              <div class="form-field form-field-grow">
                <label class="field-label">Nome do Produto <span class="required">*</span></label>
                <input v-model="form.nome" type="text" class="field-input" :class="{ 'field-error': erros.nome }" placeholder="Ex: Ração Premium Cão Adulto 15kg" maxlength="150" />
                <span v-if="erros.nome" class="error-msg">{{ erros.nome }}</span>
                <span class="field-hint">{{ form.nome.length }}/150 caracteres</span>
              </div>
              <div class="form-field" style="width:140px; flex-shrink:0">
                <label class="field-label">SKU / Código</label>
                <input v-model="form.sku" type="text" class="field-input" placeholder="Ex: RAC-001" maxlength="50" />
                <span class="field-hint">Código interno</span>
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">Descrição</label>
              <textarea v-model="form.descricao" class="field-textarea" rows="4" placeholder="Descreva o produto: composição, benefícios, modo de uso, indicações..." maxlength="2000"></textarea>
              <span class="field-hint">{{ form.descricao.length }}/2000 caracteres</span>
            </div>
          </div>

          <!-- Categorização -->
          <div class="card">
            <h2 class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              Categorização
            </h2>
            <div class="form-row">
              <div class="form-field form-field-grow">
                <label class="field-label">Marca</label>
                <select v-model="form.marca_id" class="field-select">
                  <option value="">Selecione a marca</option>
                  <option v-for="m in marcas" :key="m.id" :value="m.id">{{ m.nome }}</option>
                </select>
              </div>
              <div class="form-field form-field-grow">
                <label class="field-label">
                  Categoria
                  <span v-if="categoriaAutoPreenchida" class="auto-tag">preenchido automaticamente</span>
                </label>
                <select v-model="form.categoria_id" class="field-select" :class="{ 'field-auto': categoriaAutoPreenchida }" @change="categoriaAutoPreenchida = false">
                  <option value="">Selecione a categoria</option>
                  <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nome }}</option>
                </select>
              </div>
              <div class="form-field form-field-grow">
                <label class="field-label">Espécie</label>
                <select v-model="form.especie" class="field-select">
                  <option value="">Todas</option>
                  <option value="cao">Cão</option>
                  <option value="gato">Gato</option>
                  <option value="ave">Ave</option>
                  <option value="peixe">Peixe</option>
                  <option value="roedor">Roedor</option>
                  <option value="reptil">Réptil</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Preços -->
          <div class="card">
            <h2 class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
              Preços
            </h2>
            <div class="form-row">
              <div class="form-field form-field-grow">
                <label class="field-label">Preço de Venda <span class="required">*</span></label>
                <div class="input-prefix-wrap">
                  <span class="input-prefix">R$</span>
                  <input v-model="form.preco" type="number" min="0" step="0.01" class="field-input input-with-prefix" :class="{ 'field-error': erros.preco }" placeholder="0,00" />
                </div>
                <span v-if="erros.preco" class="error-msg">{{ erros.preco }}</span>
              </div>
              <div class="form-field form-field-grow">
                <label class="field-label">Preço Promocional <span class="optional-tag">(opcional)</span></label>
                <div class="input-prefix-wrap">
                  <span class="input-prefix">R$</span>
                  <input v-model="form.preco_promocional" type="number" min="0" step="0.01" class="field-input input-with-prefix" placeholder="0,00" />
                </div>
                <span class="field-hint">Deixe vazio para não aplicar desconto</span>
              </div>
              <div class="form-field form-field-grow">
                <label class="field-label">Custo / Preço de Compra <span class="optional-tag">(opcional)</span></label>
                <div class="input-prefix-wrap">
                  <span class="input-prefix">R$</span>
                  <input v-model="form.preco_custo" type="number" min="0" step="0.01" class="field-input input-with-prefix" placeholder="0,00" />
                </div>
                <span class="field-hint">Não exibido ao cliente</span>
              </div>
            </div>
          </div>

          <!-- Estoque e Medidas -->
          <div class="card">
            <h2 class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              Estoque e Medidas
            </h2>
            <div class="form-row">
              <div class="form-field form-field-grow">
                <label class="field-label">Quantidade em Estoque</label>
                <input v-model="form.estoque" type="number" min="0" class="field-input" placeholder="0" />
              </div>
              <div class="form-field form-field-grow">
                <label class="field-label">Estoque Mínimo</label>
                <input v-model="form.estoque_minimo" type="number" min="0" class="field-input" placeholder="0" />
                <span class="field-hint">Alerta quando abaixo deste valor</span>
              </div>
              <div class="form-field form-field-grow">
                <label class="field-label">Unidade de Medida</label>
                <select v-model="form.unidade" class="field-select">
                  <option value="un">Unidade (un)</option>
                  <option value="kg">Quilograma (kg)</option>
                  <option value="g">Grama (g)</option>
                  <option value="l">Litro (L)</option>
                  <option value="ml">Mililitro (ml)</option>
                  <option value="cx">Caixa (cx)</option>
                  <option value="pct">Pacote (pct)</option>
                  <option value="par">Par</option>
                </select>
              </div>
              <div class="form-field form-field-grow">
                <label class="field-label">Peso / Tamanho</label>
                <input v-model="form.peso" type="text" class="field-input" placeholder="Ex: 15kg, 500g, P/M/G" maxlength="50" />
                <span class="field-hint">Exibido na vitrine</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const route  = useRoute()
const router = useRouter()
const sidebarOpen   = ref(false)
const isSaving      = ref(false)
const isLoadingData = ref(false)
const token = localStorage.getItem('funcionario_token')

const isEditing = computed(() => !!route.params.id)

const fotoInputRef = ref(null)
const fotoFile     = ref(null)
const fotoPreview  = ref(null)

const marcas     = ref([])
const categorias = ref([])
const categoriaAutoPreenchida = ref(false)

const form = reactive({
  nome:              '',
  sku:               '',
  descricao:         '',
  marca_id:          '',
  categoria_id:      '',
  especie:           '',
  preco:             '',
  preco_promocional: '',
  preco_custo:       '',
  estoque:           '',
  estoque_minimo:    '',
  unidade:           'un',
  peso:              '',
  ativo:             true,
  destaque:          false,
  em_promocao:       false
})

watch(() => form.marca_id, (novaId) => {
  const marca = marcas.value.find(m => m.id == novaId)
  if (marca?.categoria_id) {
    form.categoria_id = marca.categoria_id
    categoriaAutoPreenchida.value = true
  } else {
    categoriaAutoPreenchida.value = false
  }
})

const erros = reactive({ nome: '', preco: '' })

// ── Foto ──────────────────────────────────────────────────────────────────
const processarFoto = (file) => {
  if (!file || !file.type.startsWith('image/')) return
  if (file.size > 4 * 1024 * 1024) {
    Swal.fire({ icon: 'warning', title: 'Arquivo muito grande', text: 'A imagem deve ter no máximo 4MB.', confirmButtonColor: '#0A3080' })
    return
  }
  fotoFile.value = file
  const reader = new FileReader()
  reader.onload = e => { fotoPreview.value = e.target.result }
  reader.readAsDataURL(file)
}

const onFotoSelecionada = (e) => processarFoto(e.target.files[0])
const onFotoDrop        = (e) => processarFoto(e.dataTransfer.files[0])
const removerFoto       = () => {
  fotoFile.value = null
  fotoPreview.value = null
  if (fotoInputRef.value) fotoInputRef.value.value = ''
}

// ── Formatação ────────────────────────────────────────────────────────────
const formatPreco = (val) => Number(val || 0).toFixed(2).replace('.', ',')
const calcDesconto = () => {
  const orig = parseFloat(form.preco)
  const promo = parseFloat(form.preco_promocional)
  if (!orig || !promo || promo >= orig) return 0
  return Math.round((1 - promo / orig) * 100)
}

// ── Validação ─────────────────────────────────────────────────────────────
const validar = () => {
  let ok = true
  erros.nome  = ''
  erros.preco = ''
  if (!form.nome.trim())       { erros.nome  = 'Nome é obrigatório.'; ok = false }
  if (!form.preco && form.preco !== 0) { erros.preco = 'Preço é obrigatório.'; ok = false }
  return ok
}

// ── Submit ────────────────────────────────────────────────────────────────
const handleSubmit = async () => {
  if (!validar()) return
  isSaving.value = true
  try {
    const fd = new FormData()
    fd.append('nome',        form.nome)
    fd.append('sku',         form.sku)
    fd.append('descricao',   form.descricao)
    fd.append('marca_id',    form.marca_id)
    fd.append('categoria_id',form.categoria_id)
    fd.append('especie',     form.especie)
    fd.append('preco',       form.preco)
    fd.append('preco_promocional', form.preco_promocional || '')
    fd.append('preco_custo', form.preco_custo || '')
    fd.append('estoque',     form.estoque || 0)
    fd.append('estoque_minimo', form.estoque_minimo || 0)
    fd.append('unidade',     form.unidade)
    fd.append('peso',        form.peso)
    fd.append('ativo',       form.ativo ? '1' : '0')
    fd.append('destaque',    form.destaque ? '1' : '0')
    fd.append('em_promocao', form.em_promocao ? '1' : '0')
    if (fotoFile.value) fd.append('foto', fotoFile.value)

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }

    if (isEditing.value) {
      fd.append('_method', 'PUT')
      await api.post(`/admin/produtos/${route.params.id}`, fd, { headers })
      await Swal.fire({ icon: 'success', title: 'Salvo!', text: 'Produto atualizado com sucesso.', confirmButtonColor: '#0A3080', timer: 2000, showConfirmButton: false })
    } else {
      await api.post('/admin/produtos', fd, { headers })
      await Swal.fire({ icon: 'success', title: 'Cadastrado!', text: 'Produto criado com sucesso.', confirmButtonColor: '#0A3080', timer: 2000, showConfirmButton: false })
    }
    router.push('/admin/produtos')
  } catch (err) {
    const msg = err?.response?.data?.message || 'Verifique os dados e tente novamente.'
    Swal.fire({ icon: 'error', title: 'Erro ao salvar', text: msg, confirmButtonColor: '#EF4444' })
  } finally {
    isSaving.value = false
  }
}

// ── Carregar dados auxiliares ─────────────────────────────────────────────
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

// ── Carregar produto (edição) ─────────────────────────────────────────────
const fetchProduto = async () => {
  isLoadingData.value = true
  try {
    const { data } = await api.get(`/admin/produtos/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const p = data.data || data
    Object.assign(form, {
      nome:              p.nome             || '',
      sku:               p.sku              || '',
      descricao:         p.descricao        || '',
      marca_id:          p.marca_id         || '',
      categoria_id:      p.categoria_id     || '',
      especie:           p.especie          || '',
      preco:             p.preco            || '',
      preco_promocional: p.preco_promocional|| '',
      preco_custo:       p.preco_custo      || '',
      estoque:           p.estoque          ?? '',
      estoque_minimo:    p.estoque_minimo   ?? '',
      unidade:           p.unidade          || 'un',
      peso:              p.peso             || '',
      ativo:             !!p.ativo,
      destaque:          !!p.destaque,
      em_promocao:       !!p.em_promocao
    })
    if (p.foto_url) fotoPreview.value = p.foto_url
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao carregar produto', confirmButtonColor: '#EF4444' })
  } finally {
    isLoadingData.value = false
  }
}

onMounted(() => {
  if (!token) { router.push('/login/funcionario'); return }
  fetchMarcas()
  fetchCategorias()
  if (isEditing.value) fetchProduto()
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

.breadcrumb { display: flex; align-items: center; gap: 6px; }
.breadcrumb-root { font-size: 14px; color: #64748B; font-weight: 500; text-decoration: none; transition: color 0.15s; }
.breadcrumb-root:hover { color: #1155CC; }
.breadcrumb svg { color: #CBD5E1; }
.breadcrumb-current { font-size: 14px; font-weight: 700; color: #0A1F44; }

.btn-primary { display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px; background: linear-gradient(135deg,#0A3080,#1155CC); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
.btn-primary:hover:not(:disabled) { opacity: 0.9; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-secondary { display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px; background: white; color: #374151; border: 1.5px solid #E2E8F0; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: border-color 0.2s; }
.btn-secondary:hover { border-color: #94A3B8; }

/* Loading */
.page-loading { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 5rem; color: #94A3B8; }
.spinner { width: 32px; height: 32px; border: 3px solid #E2E8F0; border-top-color: #1155CC; border-radius: 50%; animation: spin 0.8s linear infinite; }
.spinner-sm { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Body layout */
.page-body { display: flex; gap: 1.5rem; padding: 1.5rem; align-items: flex-start; }
.col-aside { width: 280px; min-width: 280px; display: flex; flex-direction: column; gap: 1.25rem; position: sticky; top: 80px; }
.col-main  { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; min-width: 0; }

/* Card */
.card { background: white; border-radius: 14px; border: 1px solid #E8ECF0; padding: 1.25rem 1.5rem; }
.card-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #0A1F44; margin-bottom: 1.25rem; padding-bottom: 0.875rem; border-bottom: 1px solid #F1F5F9; }
.card-preview { background: linear-gradient(135deg, #F0F4FF, #F8FAFF); border-color: #C7D7F4; }

/* Form fields */
.form-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
.form-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 1rem; }
.form-field:last-child { margin-bottom: 0; }
.form-field-grow { flex: 1; min-width: 180px; }
.field-label { font-size: 12px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.4px; }
.required { color: #EF4444; }
.optional-tag { font-size: 11px; color: #94A3B8; font-weight: 400; text-transform: none; letter-spacing: 0; }
.auto-tag { font-size: 10px; font-weight: 600; color: #16A34A; background: #DCFCE7; padding: 2px 7px; border-radius: 20px; text-transform: none; letter-spacing: 0; vertical-align: middle; }
.field-auto { border-color: #86EFAC !important; background: #F0FDF4 !important; }

.field-input, .field-select, .field-textarea {
  width: 100%; padding: 10px 12px;
  border: 1.5px solid #E2E8F0; border-radius: 9px;
  font-size: 14px; color: #374151; background: #F8FAFC;
  outline: none; transition: border-color 0.15s;
  font-family: inherit;
}
.field-input:focus, .field-select:focus, .field-textarea:focus { border-color: #1155CC; background: white; }
.field-input.field-error, .field-select.field-error { border-color: #EF4444; }
.field-textarea { resize: vertical; min-height: 100px; }
.field-hint { font-size: 11px; color: #94A3B8; }
.error-msg  { font-size: 12px; color: #EF4444; font-weight: 500; }

.input-prefix-wrap { display: flex; align-items: center; border: 1.5px solid #E2E8F0; border-radius: 9px; overflow: hidden; background: #F8FAFC; transition: border-color 0.15s; }
.input-prefix-wrap:focus-within { border-color: #1155CC; background: white; }
.input-prefix { padding: 10px 10px 10px 12px; font-size: 13px; font-weight: 600; color: #64748B; background: #F1F5F9; border-right: 1px solid #E2E8F0; user-select: none; }
.input-with-prefix { border: none !important; background: transparent !important; border-radius: 0 !important; flex: 1; }
.input-with-prefix:focus { background: transparent !important; }

/* Foto upload */
.hidden-input { display: none; }
.foto-upload-area {
  width: 100%; height: 180px; border: 2px dashed #E2E8F0; border-radius: 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; background: #F8FAFC;
}
.foto-upload-area:hover { border-color: #1155CC; background: #F0F4FF; }
.foto-upload-area.has-foto { border-style: solid; border-color: #E2E8F0; padding: 0; }
.foto-preview-img { width: 100%; height: 100%; object-fit: contain; padding: 8px; }
.foto-overlay { position: absolute; inset: 0; background: rgba(10,31,68,0.5); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: white; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.2s; }
.foto-upload-area:hover .foto-overlay { opacity: 1; }
.upload-label { font-size: 13px; font-weight: 600; color: #374151; }
.upload-hint  { font-size: 11px; color: #94A3B8; }

.btn-remove { display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; padding: 7px 14px; background: #FFF5F5; border: 1px solid #FCA5A5; border-radius: 8px; color: #EF4444; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.btn-remove:hover { background: #FEE2E2; }
/* Toggles */
.toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 4px 0; }
.toggle-info { display: flex; flex-direction: column; gap: 2px; }
.toggle-label { font-size: 14px; font-weight: 600; color: #0A1F44; }
.toggle-desc  { font-size: 12px; color: #64748B; }
.toggle-btn { position: relative; width: 44px; height: 24px; border-radius: 12px; background: #E2E8F0; border: none; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
.toggle-btn.toggle-on { background: linear-gradient(135deg, #0A3080, #1155CC); }
.toggle-thumb { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
.toggle-btn.toggle-on .toggle-thumb { transform: translateX(20px); }
.divider { height: 1px; background: #F1F5F9; margin: 10px 0; }

/* Preview preços */
.preview-price-block { display: flex; flex-direction: column; gap: 4px; }
.preview-original { font-size: 13px; color: #94A3B8; text-decoration: line-through; }
.preview-final { font-size: 22px; color: #0A1F44; }
.preview-final strong { font-weight: 800; }
.preview-desconto { display: inline-block; background: #DCFCE7; color: #16A34A; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-top: 4px; }

@media (max-width: 1024px) {
  .page-body { flex-direction: column; }
  .col-aside { width: 100%; min-width: unset; position: static; }
}
@media (max-width: 768px) {
  .main-content { margin-left: 0; }
  .btn-menu-mobile { display: flex; }
  .page-body { padding: 1rem; gap: 1rem; }
  .form-row { flex-direction: column; gap: 0; }
  .form-field-grow { min-width: unset; }
  .top-bar { padding: 0 1rem; }
  .top-bar-right .btn-secondary span, .breadcrumb-root { display: none; }
}
</style>
