<template>
  <div class="perfil-page">

    <!-- Topbar azul (desktop) -->
    <header class="perfil-topbar">
      <button type="button" class="topbar-back" @click="$router.push('/dashboard')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        <span>Dashboard</span>
      </button>
      <h1 class="topbar-title">Editar Perfil</h1>
      <div></div>
    </header>

    <!-- Layout desktop: esquerda + direita -->
    <div class="perfil-layout">

      <!-- PAINEL ESQUERDO -->
      <aside class="perfil-left">

        <!-- Header mobile -->
        <div class="mobile-header-bar">
          <button type="button" class="back-btn" @click="$router.push('/dashboard')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 class="header-title">Editar Perfil</h1>
          <div style="width:24px"></div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-container">
          <span class="loading-spinner"></span>
          <p>Carregando...</p>
        </div>

        <!-- Foto + info -->
        <div v-else class="left-profile-wrap">
          <div class="photo-circle" @click="triggerFileInput">
            <img v-if="photoPreview" :src="photoPreview" alt="Foto do perfil" class="photo-preview" />
            <svg v-else width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <div class="photo-edit-overlay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
          </div>
          <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/jpg" class="hidden-input" @change="onFileSelected" />
          <span class="photo-label">ALTERAR FOTO</span>

          <div class="left-user-info">
            <h2 class="left-user-name">{{ form.primeiroNome }} {{ form.segundoNome || '' }}</h2>
            <p class="left-user-email">{{ form.email }}</p>
          </div>

          <div class="left-badges">
            <div class="left-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Cliente</span>
            </div>
            <div class="left-badge left-badge-orange">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Premium</span>
            </div>
          </div>
        </div>

        <!-- Brand desktop -->
        <div class="left-brand">
          <span class="brand-4r">4R</span>
          <span class="brand-sub">PET CLÍNICA VETERINÁRIA</span>
        </div>
      </aside>

      <!-- PAINEL DIREITO: formulário -->
      <main class="perfil-right">
        <div v-if="loading" class="loading-container">
          <span class="loading-spinner loading-spinner-dark"></span>
          <p>Carregando dados...</p>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="form">

          <!-- Seção: Dados Pessoais -->
          <div class="form-section-block">
            <div class="form-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Dados Pessoais
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label class="form-label">Primeiro Nome</label>
                <div class="input-wrapper">
                  <input type="text" v-model="form.primeiroNome" placeholder="Primeiro Nome" class="form-input" required />
                </div>
              </div>
              <div class="form-group half">
                <label class="form-label">Sobrenome</label>
                <div class="input-wrapper">
                  <input type="text" v-model="form.segundoNome" placeholder="Sobrenome" class="form-input" required />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">E-mail</label>
              <div class="input-wrapper with-icon">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6L12 13L2 6"/>
                  </svg>
                </span>
                <input type="email" v-model="form.email" placeholder="nome@exemplo.com" class="form-input with-icon" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Telefone</label>
              <div class="input-wrapper with-icon">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </span>
                <input type="tel" v-model="form.telefone" placeholder="(11) 99999-0000" class="form-input with-icon" maxlength="15" inputmode="numeric" required @input="onTelefoneInput" />
              </div>
            </div>
          </div>

          <!-- Seção: Endereço -->
          <div class="form-section-block">
            <div class="form-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Endereço
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label class="form-label">CEP</label>
                <div class="input-wrapper with-icon">
                  <span class="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <input type="text" v-model="form.cep" placeholder="00000-000" class="form-input with-icon" maxlength="9" inputmode="numeric" required @input="onCepInput" />
                  <span v-if="cepLoading" class="cep-spinner"></span>
                </div>
                <span v-if="cepError" class="field-error">{{ cepError }}</span>
              </div>
              <div class="form-group half">
                <label class="form-label">Número</label>
                <div class="input-wrapper">
                  <input type="text" v-model="form.numero" placeholder="Nº" class="form-input" inputmode="numeric" required />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Endereço</label>
              <div class="input-wrapper with-icon">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </span>
                <input type="text" v-model="form.endereco" placeholder="Rua / Avenida" class="form-input with-icon" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label class="form-label">Bairro</label>
                <div class="input-wrapper">
                  <input type="text" v-model="form.bairro" placeholder="Bairro" class="form-input" required />
                </div>
              </div>
              <div class="form-group half">
                <label class="form-label">Complemento <span class="optional-tag">(opcional)</span></label>
                <div class="input-wrapper">
                  <input type="text" v-model="form.complemento" placeholder="Apto, bloco..." class="form-input" />
                </div>
              </div>
            </div>
          </div>

          <!-- Seção: Segurança -->
          <div class="form-section-block">
            <div class="form-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Segurança
            </div>

            <div class="form-group">
              <label class="form-label">Nova Senha <span class="optional-tag">(deixe vazio para manter)</span></label>
              <div class="input-wrapper with-icon">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input :type="showPassword ? 'text' : 'password'" v-model="form.senha" placeholder="Nova senha" class="form-input with-icon" />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="form-group" v-if="form.senha">
              <label class="form-label">Confirmar Nova Senha</label>
              <div class="input-wrapper with-icon">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmarSenha" placeholder="Confirme a nova senha" class="form-input with-icon" required />
                <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
                  <svg v-if="!showConfirmPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Botão salvar -->
          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="loading-spinner"></span>
            <span v-else>Salvar Alterações</span>
          </button>
        </form>
      </main>

    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import api from '@/services/api'
import { ref, reactive, onMounted } from 'vue'

const fileInput = ref(null)
const photoPreview = ref(null)
const selectedFile = ref(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileSelected = (event) => {
  const file = event.target.files[0]
  if (!file) return
  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const form = reactive({
  primeiroNome: '',
  segundoNome: '',
  email: '',
  telefone: '',
  cep: '',
  endereco: '',
  bairro: '',
  numero: '',
  complemento: '',
  senha: '',
  confirmarSenha: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const loading = ref(true)
const cepLoading = ref(false)
const cepError = ref('')
const userId = ref(null)

let cepTimeout = null

const onTelefoneInput = () => {
  let raw = form.telefone.replace(/\D/g, '').slice(0, 11)
  if (raw.length > 6) {
    form.telefone = `(${raw.slice(0, 2)}) ${raw.slice(2)}`
  } else if (raw.length > 2) {
    form.telefone = `(${raw.slice(0, 2)}) ${raw.slice(2)}`
  } else if (raw.length > 0) {
    form.telefone = `(${raw}`
  } else {
    form.telefone = ''
  }
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('cliente_token')
    const response = await api.get('/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const user = response.data
    userId.value = user.id
    form.primeiroNome = user.primeiro_nome || ''
    form.segundoNome = user.segundo_nome || ''
    form.email = user.email || ''
    form.telefone = user.telefone || ''
    form.cep = user.cep || ''
    form.endereco = user.endereco || ''
    form.bairro = user.bairro || ''
    form.numero = user.numero || ''
    form.complemento = user.complemento || ''

    if (user.foto_cliente) {
      photoPreview.value = /^(https?:|data:)/.test(user.foto_cliente)
        ? user.foto_cliente
        : 'https://4rpetshop.srv1211850.hstgr.cloud/storage/' + user.foto_cliente
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Não foi possível carregar os dados do perfil.',
      confirmButtonColor: '#ef4444'
    })
    console.error('Erro ao carregar perfil:', error)
  } finally {
    loading.value = false
  }
})

const onCepInput = () => {
  let raw = form.cep.replace(/\D/g, '')
  if (raw.length > 5) {
    form.cep = raw.slice(0, 5) + '-' + raw.slice(5, 8)
  } else {
    form.cep = raw
  }
  cepError.value = ''
  if (raw.length === 8) {
    clearTimeout(cepTimeout)
    cepTimeout = setTimeout(() => buscarCep(raw), 300)
  }
}

const buscarCep = async (cep) => {
  cepLoading.value = true
  cepError.value = ''
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    if (data.erro) {
      cepError.value = 'CEP nao encontrado'
      return
    }
    form.endereco = data.logradouro || ''
    form.bairro = data.bairro || ''
  } catch {
    cepError.value = 'Erro ao buscar CEP'
  } finally {
    cepLoading.value = false
  }
}

const handleSubmit = async () => {
  if (form.senha && form.senha !== form.confirmarSenha) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'As senhas não coincidem!',
      confirmButtonColor: '#2563eb'
    })
    return
  }

  isLoading.value = true

  try {
    const token = localStorage.getItem('cliente_token')

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('primeiro_nome', form.primeiroNome)
    formData.append('segundo_nome', form.segundoNome)
    formData.append('email', form.email)
    formData.append('telefone', form.telefone)
    formData.append('cep', form.cep)
    formData.append('endereco', form.endereco)
    formData.append('bairro', form.bairro)
    formData.append('numero', form.numero)
    if (form.complemento) formData.append('complemento', form.complemento)

    if (form.senha) {
      formData.append('password', form.senha)
      formData.append('password_confirmation', form.confirmarSenha)
    }

    if (selectedFile.value) {
      formData.append('foto_cliente', selectedFile.value)
    }

    const response = await api.post(`/clientes/${userId.value}`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    })

    if (response.data?.cliente) {
      localStorage.setItem('cliente', JSON.stringify(response.data.cliente))
    }

    await Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Perfil atualizado com sucesso!',
      confirmButtonColor: '#10b981'
    })

    form.senha = ''
    form.confirmarSenha = ''
  } catch (error) {
    if (error.response?.data?.errors) {
      const erros = Object.values(error.response.data.errors).flat().join(', ')
      Swal.fire({
        icon: 'error',
        title: 'Erro de validação',
        text: erros,
        confirmButtonColor: '#ef4444'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao atualizar perfil. Tente novamente.',
        confirmButtonColor: '#ef4444'
      })
    }
    console.error('Erro:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import '@/assets/variables.css';

/* ===== Base ===== */
.perfil-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  display: flex;
  flex-direction: column;
}

/* Topbar (desktop only) */
.perfil-topbar { display: none; }

/* Layout: mobile = coluna simples */
.perfil-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* ===== Painel esquerdo ===== */
.perfil-left {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg) var(--spacing-md);
  gap: var(--spacing-md);
}

.mobile-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--spacing-md);
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  padding: 0;
}

.header-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.left-profile-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.photo-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #DDEEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border: 3px solid rgba(17,85,204,0.2);
  transition: transform 150ms, box-shadow 150ms;
  color: #1155CC;
}

.photo-circle:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(17,85,204,0.2); }

.photo-preview { width: 100%; height: 100%; object-fit: cover; }

.photo-edit-overlay {
  display: none;
  position: absolute;
  inset: 0;
  background: rgba(17,85,204,0.55);
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.photo-circle:hover .photo-edit-overlay { display: flex; }

.hidden-input { display: none; }

.photo-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #1155CC;
  letter-spacing: 0.5px;
}

.left-user-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.left-user-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.left-user-email {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

.left-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.left-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #1155CC;
  background: rgba(17,85,204,0.09);
  padding: 4px 10px;
  border-radius: 20px;
}

.left-badge-orange { color: #F07020; background: rgba(240,112,32,0.1); }

.left-brand { display: none; }

/* ===== Painel direito ===== */
.perfil-right {
  flex: 1;
  padding: 0 var(--spacing-md) var(--spacing-lg);
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-section-block {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  background: var(--bg-primary);
  border: 1.5px solid #E8ECF0;
  border-radius: 16px;
  padding: var(--spacing-md);
}

.form-section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: #1155CC;
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid #F0F2F5;
}

.form-row {
  display: flex;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-group.half { flex: 1; }
.form-group.quarter { flex: 0 0 30%; }

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper.with-icon .input-icon {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: var(--input-height-lg);
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  background: #FAFBFC;
  border: 1.5px solid #E8ECF0;
  border-radius: var(--border-radius-lg);
  outline: none;
  transition: border-color 150ms, box-shadow 150ms, background 150ms;
}

.form-input.with-icon { padding-left: calc(var(--spacing-md) + 28px); }
.form-input::placeholder { color: var(--text-muted); }

.form-input:focus {
  border-color: #1155CC;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(17,85,204,0.1);
}

.cep-spinner {
  position: absolute;
  right: var(--spacing-md);
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-top-color: #1155CC;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.field-error { font-size: 12px; color: #E53935; }

.optional-tag {
  font-weight: 400;
  color: var(--text-muted);
  font-size: 12px;
}

.toggle-password {
  position: absolute;
  right: var(--spacing-md);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 150ms;
}
.toggle-password:hover { color: var(--text-secondary); }

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-spinner-dark {
  border-color: #E8ECF0;
  border-top-color: #1155CC;
}

/* Submit */
.btn-submit {
  width: 100%;
  height: 52px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: #fff;
  background: linear-gradient(135deg, #F07020 0%, #c85a10 100%);
  border: none;
  border-radius: var(--border-radius-xl);
  cursor: pointer;
  transition: transform 150ms, box-shadow 150ms;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(240,112,32,0.35);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(240,112,32,0.45);
}

.btn-submit:active:not(:disabled) { transform: translateY(0); }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

@keyframes spin { to { transform: rotate(360deg); } }

/* ===== Responsive ===== */
@media (max-width: 375px) {
  .form-row { flex-direction: column; }
}

/* ===== Tablet ===== */
@media (min-width: 768px) {
  .perfil-page {
    background: #F0F2F5;
  }

  .perfil-layout {
    justify-content: center;
    align-items: flex-start;
    padding: var(--spacing-xl);
  }

  .perfil-left {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
  }

  .perfil-right { padding: var(--spacing-md) 0 var(--spacing-xl); max-width: 480px; margin: 0 auto; width: 100%; }
}

/* ===== Desktop ===== */
@media (min-width: 1024px) {
  .perfil-page { background: #F0F2F5; }

  /* Topbar azul */
  .perfil-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 2.5rem;
    background: linear-gradient(90deg, #0A3080 0%, #1155CC 100%);
    position: sticky;
    top: 0;
    z-index: 100;
    flex-shrink: 0;
  }

  .topbar-back {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 150ms;
  }
  .topbar-back:hover { background: rgba(255,255,255,0.25); }

  .topbar-title {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.02em;
  }

  /* Layout dois painéis */
  .perfil-layout {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2.5rem;
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  /* Painel esquerdo: fixo, azul */
  .perfil-left {
    width: 300px;
    flex-shrink: 0;
    background: linear-gradient(170deg, #0A3080 0%, #1155CC 60%, #1e6fd9 100%);
    border-radius: 20px;
    padding: 2rem 1.5rem;
    box-shadow: 0 8px 32px rgba(17,85,204,0.25);
    position: sticky;
    top: 80px;
    gap: 1.25rem;
  }

  .mobile-header-bar { display: none; }

  .left-profile-wrap { gap: 1rem; }

  .photo-circle {
    width: 120px;
    height: 120px;
    border-color: rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.15);
    color: #fff;
  }

  .photo-circle:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.3); }

  .photo-label { color: rgba(255,255,255,0.7); }

  .left-user-name { color: #fff; font-size: 1.1rem; }
  .left-user-email { color: rgba(255,255,255,0.6); }

  .left-badge { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.15); }
  .left-badge-orange { color: #FFD580; background: rgba(240,112,32,0.25); }

  /* Brand no fundo do painel */
  .left-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.12);
    gap: 2px;
  }

  .brand-4r {
    font-size: 1.5rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: 0.05em;
  }

  .brand-sub {
    font-size: 0.55rem;
    font-weight: 700;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  /* Painel direito */
  .perfil-right {
    flex: 1;
    padding: 0;
    min-width: 0;
  }

  .form { gap: 1.25rem; }

  .form-section-block {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .form-input { height: 52px; }

  .btn-submit {
    height: 56px;
    font-size: var(--font-size-lg);
  }
}

/* ===== Desktop Large ===== */
@media (min-width: 1440px) {
  .perfil-layout { max-width: 1200px; }
  .perfil-left { width: 320px; }
}
</style>
