<template>
  <div class="page-container">

    <!-- LEFT PANEL: fundo azul animado (tablet/desktop) -->
    <div class="left-panel">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="left-brand">
        <div class="left-brand-name">
          <div class="logo-icon-wrap">
            <img
              src="@/assets/images/logo/LogoArrendondadoPetShop.png"
              alt="4R Pet Shop"
              class="logo-img"
            />
          </div>
          <span class="left-subtitle">PET CLÍNICA VETERINÁRIA</span>
        </div>
        <p class="left-tagline">Faça parte da nossa família<br>e cuide melhor do seu pet.</p>
      </div>
    </div>

    <!-- RIGHT PANEL: formulário de cadastro -->
    <div class="right-panel">
      <div class="form-wrapper">

        <!-- Logo (mobile) -->
        <div class="logo-section">
          <div class="logo-icon-wrap">
            <img
              src="@/assets/images/logo/LogoArrendondadoPetShop.png"
              alt="4R Pet Shop"
              class="logo-img"
            />
          </div>
          <span class="logo-text mobile-only">
            <span class="logo-4r">4R</span>
            <span class="logo-petshop">PET CLINICA VETERINÁRIA</span>
          </span>
        </div>

        <!-- Header -->
        <div class="header-section">
          <h1 class="title">Criar Conta</h1>
          <p class="subtitle">Junte-se a nós para cuidar melhor do seu pet</p>
        </div>

        <!-- Formulário -->
        <form @submit.prevent="handleSubmit" class="form">

          <!-- Nome -->
          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">Primeiro Nome</label>
              <input type="text" v-model="form.primeiroNome" placeholder="Primeiro Nome" class="form-input" required />
            </div>
            <div class="form-group half">
              <label class="form-label">Sobrenome</label>
              <input type="text" v-model="form.segundoNome" placeholder="Sobrenome" class="form-input" required />
            </div>
          </div>

          <!-- E-mail -->
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 6L12 13L2 6"/>
                </svg>
              </span>
              <input type="email" v-model="form.email" placeholder="nome@exemplo.com" class="form-input has-icon" required />
            </div>
          </div>

          <!-- Telefone -->
          <div class="form-group">
            <label class="form-label">Número de Telefone</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <input type="tel" v-model="form.telefone" placeholder="(11) 99999-0000" class="form-input has-icon" maxlength="15" inputmode="numeric" required @input="onTelefoneInput" />
            </div>
          </div>

          <!-- CEP -->
          <div class="form-group">
            <label class="form-label">CEP</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <input type="text" v-model="form.cep" placeholder="00000-000" class="form-input has-icon" maxlength="9" inputmode="numeric" required @input="onCepInput" />
              <span v-if="cepLoading" class="cep-spinner"></span>
            </div>
            <span v-if="cepError" class="field-error">{{ cepError }}</span>
          </div>

          <!-- Endereço -->
          <div class="form-group">
            <label class="form-label">Endereço</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </span>
              <input type="text" v-model="form.endereco" placeholder="Rua / Avenida" class="form-input has-icon" required />
            </div>
          </div>

          <!-- Bairro + Número -->
          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">Bairro</label>
              <input type="text" v-model="form.bairro" placeholder="Bairro" class="form-input" required />
            </div>
            <div class="form-group quarter">
              <label class="form-label">Número</label>
              <input type="text" v-model="form.numero" placeholder="Nº" class="form-input" inputmode="numeric" required />
            </div>
          </div>

          <!-- Complemento -->
          <div class="form-group">
            <label class="form-label">
              Complemento <span class="optional-tag">(opcional)</span>
            </label>
            <input type="text" v-model="form.complemento" placeholder="Apto, bloco, sala..." class="form-input" />
          </div>

          <!-- Senha -->
          <div class="form-group">
            <label class="form-label">Senha</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <input :type="showPassword ? 'text' : 'password'" v-model="form.senha" placeholder="Crie uma senha" class="form-input has-icon" required />
              <button type="button" class="toggle-pwd" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirmar Senha -->
          <div class="form-group">
            <label class="form-label">Confirmar Senha</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </span>
              <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmarSenha" placeholder="Confirme sua senha" class="form-input has-icon" required />
              <button type="button" class="toggle-pwd" @click="showConfirmPassword = !showConfirmPassword">
                <svg v-if="!showConfirmPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>CADASTRAR</span>
          </button>

        </form>

        <!-- Footer -->
        <div class="footer-section">
          <p class="footer-text">
            Já tem uma conta?
            <router-link to="/login" class="login-link">Entrar</router-link>
          </p>
          <router-link to="/" class="back-home-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar ao início
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import api from '@/services/api'
import { ref, reactive } from 'vue'

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
const cepLoading = ref(false)
const cepError = ref('')

let cepTimeout = null

const onTelefoneInput = () => {
  let raw = form.telefone.replace(/\D/g, '').slice(0, 11)
  if (raw.length > 2) {
    form.telefone = `(${raw.slice(0, 2)}) ${raw.slice(2)}`
  } else if (raw.length > 0) {
    form.telefone = `(${raw}`
  } else {
    form.telefone = ''
  }
}

const onCepInput = () => {
  let raw = form.cep.replace(/\D/g, '')
  form.cep = raw.length > 5 ? raw.slice(0, 5) + '-' + raw.slice(5, 8) : raw
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
    if (data.erro) { cepError.value = 'CEP não encontrado'; return }
    form.endereco = data.logradouro || ''
    form.bairro = data.bairro || ''
  } catch {
    cepError.value = 'Erro ao buscar CEP'
  } finally {
    cepLoading.value = false
  }
}

const handleSubmit = async () => {
  if (form.senha !== form.confirmarSenha) {
    Swal.fire({ icon: 'error', title: 'Erro!', text: 'As senhas não coincidem!', confirmButtonColor: '#2563eb' })
    return
  }

  isLoading.value = true

  try {
    await api.post('/clientes', {
      primeiro_nome: form.primeiroNome,
      segundo_nome: form.segundoNome,
      email: form.email,
      telefone: form.telefone,
      cep: form.cep,
      endereco: form.endereco,
      bairro: form.bairro,
      numero: form.numero,
      complemento: form.complemento,
      password: form.senha,
      password_confirmation: form.confirmarSenha
    })

    await Swal.fire({ icon: 'success', title: 'Sucesso!', text: 'Cliente cadastrado com sucesso!', confirmButtonColor: '#10b981' })

    Object.assign(form, {
      primeiroNome: '', segundoNome: '', email: '', telefone: '',
      cep: '', endereco: '', bairro: '', numero: '', complemento: '',
      senha: '', confirmarSenha: ''
    })
  } catch (error) {
    const erros = error.response?.data?.errors
      ? Object.values(error.response.data.errors).flat().join(', ')
      : 'Erro ao cadastrar cliente. Tente novamente.'
    Swal.fire({ icon: 'error', title: 'Erro!', text: erros, confirmButtonColor: '#ef4444' })
    console.error('Erro:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import '@/assets/variables.css';

/* ── Container ─────────────────────────────── */
.page-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

/* ── LEFT PANEL ────────────────────────────── */
.left-panel {
  display: none;
  background: linear-gradient(150deg, #1a6ae0 0%, #1155CC 40%, #0A3080 75%, #060f2a 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.orb-1 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
  top: -100px;
  right: -100px;
  animation: floatOrb 7s ease-in-out infinite;
}

.orb-2 {
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
  bottom: -60px;
  left: -60px;
  animation: floatOrb 9s ease-in-out infinite reverse;
}

.orb-3 {
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(240,112,32,0.12) 0%, transparent 70%);
  top: 50%;
  left: 10%;
  animation: floatOrb 11s ease-in-out infinite 2s;
}

@keyframes floatOrb {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-24px) scale(1.05); }
}

.left-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 48px 40px;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.left-brand-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.left-4r {
  font-size: 3.25rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
  letter-spacing: 0.02em;
}

.left-subtitle {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255,255,255,0.60);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.left-tagline {
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.75;
  max-width: 260px;
  margin-top: 4px;
}

/* ── RIGHT PANEL ───────────────────────────── */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px;
  overflow-y: auto;
}

.form-wrapper {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 24px;
}

/* ── Logo (mobile) ─────────────────────────── */
.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 16px;
}

.logo-icon-wrap {
  width: 48px;
  height: 48px;
  background-color: var(--primary-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.logo-img { width: 100%; height: 100%; object-fit: cover; }

.logo-text { display: flex; align-items: baseline; gap: 2px; }
.logo-4r { font-size: 1.25rem; font-weight: 700; color: var(--primary-color); }
.logo-petshop { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }

/* ── Header ────────────────────────────────── */
.header-section { text-align: left; }

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
  line-height: 1.25;
}

.subtitle { font-size: 0.875rem; color: var(--text-secondary); }

/* ── Form ──────────────────────────────────── */
.form { display: flex; flex-direction: column; gap: 14px; }

.form-row { display: flex; gap: 12px; }

.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group.half { flex: 1; }
.form-group.quarter { flex: 0 0 30%; }

.form-label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

.optional-tag { font-weight: 400; color: var(--text-muted); font-size: 0.75rem; }

.input-wrapper { position: relative; display: flex; align-items: center; }

.input-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  font-size: 0.9375rem;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.form-input.has-icon { padding-left: 44px; }

.form-input::placeholder { color: var(--text-muted); }

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(17,85,204,0.1);
}

.toggle-pwd {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  padding: 0;
}
.toggle-pwd:hover { color: var(--text-secondary); }

.cep-spinner {
  position: absolute;
  right: 14px;
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.field-error { font-size: 0.75rem; color: #e53e3e; }

/* ── Botão ─────────────────────────────────── */
.btn-submit {
  width: 100%;
  height: 52px;
  margin-top: 4px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #ffffff;
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-light) 100%);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(240,112,32,0.35);
}
.btn-submit:active:not(:disabled) { transform: translateY(0); }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Footer ────────────────────────────────── */
.footer-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-bottom: 24px;
}
.footer-text { font-size: 0.875rem; color: var(--text-secondary); }
.login-link {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  padding: 0 !important;
  background: transparent !important;
}

.login-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
  background: transparent !important;
}

.back-home-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0 !important;
  background: transparent !important;
  transition: color 0.2s ease;
}

.back-home-link:hover {
  color: var(--primary-color);
  background: transparent !important;
}

/* ── Utilitários ───────────────────────────── */
.mobile-only { display: flex; }

/* ── Mobile pequeno ────────────────────────── */
@media (max-width: 375px) {
  .right-panel { padding: 16px 12px; }
  .title { font-size: 1.5rem; }
  .form-row { flex-direction: column; gap: 14px; }
}

/* ── Tablet (>= 768px) ─────────────────────── */
@media (min-width: 768px) {
  .page-container {
    flex-direction: row;
    background: var(--bg-page);
  }

  .left-panel {
    display: flex;
    flex: 0 0 50%;
    min-height: 100vh;
    position: sticky;
    top: 0;
    height: 100vh;
  }

  .right-panel {
    flex: 0 0 50%;
    justify-content: center;
    padding: 40px 32px;
    background-color: var(--bg-primary);
    min-height: 100vh;
  }

  .form-wrapper { max-width: 460px; }

  .mobile-only { display: none !important; }

  .logo-section { justify-content: center; padding-top: 0; }
  .logo-icon-wrap { width: 56px; height: 56px; border-radius: 14px; }

  .header-section { text-align: center; }
}

/* ── Desktop (>= 1024px) ────────────────────── */
@media (min-width: 1024px) {
  .left-panel { flex: 0 0 50%; }

  .right-panel {
    flex: 0 0 50%;
    padding: 48px 56px;
  }

  .form-wrapper { max-width: 500px; }

  .title { font-size: 2.25rem; }
  .form-input { height: 52px; }
  .btn-submit { height: 54px; font-size: 1.0625rem; }
}

/* ── Desktop Large (>= 1440px) ─────────────── */
@media (min-width: 1440px) {
  .left-panel { flex: 0 0 50%; }
  .right-panel { flex: 0 0 50%; padding: 48px 64px; }
  .form-wrapper { max-width: 520px; }
}
</style>
