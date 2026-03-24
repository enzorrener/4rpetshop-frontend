<template>
  <div class="login-container">

    <!-- LEFT PANEL: fundo azul + logo (tablet/desktop) -->
    <div class="left-panel">
      <!-- Orbes decorativos animados -->
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
        <p class="left-tagline">Cuidado que seu pet merece,<br>excelência que você confia.</p>
      </div>
    </div>

    <!-- RIGHT PANEL: formulário -->
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

        <!-- Banner mobile -->
        <div class="banner-section mobile-only">
          <img
            src="@/assets/images/pets/CachorrosBrincando.jpeg"
            alt="Cachorros brincando"
            class="banner-img"
          />
        </div>

        <!-- Header -->
        <div class="header-section">
          <h1 class="title">Bem-vindo de volta!</h1>
          <p class="subtitle">Acesse sua conta para gerenciar os cuidados do seu pet.</p>
        </div>

        <!-- Formulário -->
        <form @submit.prevent="handleSubmit" class="form">

          <div class="form-group">
            <label class="form-label">E-mail</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 6L12 13L2 6"/>
                </svg>
              </span>
              <input
                type="email"
                v-model="form.email"
                placeholder="seu@email.com"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label class="form-label">Senha</label>
              <a href="#" class="forgot-link" @click.prevent>Esqueceu a senha?</a>
            </div>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.senha"
                placeholder="Digite sua senha"
                class="form-input"
                required
              />
              <button type="button" class="toggle-pwd" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="remember-row">
            <label class="remember-label">
              <input type="checkbox" v-model="rememberMe" class="remember-checkbox" />
              <span>Lembrar de mim</span>
            </label>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>ENTRAR</span>
          </button>
        </form>

        <div class="footer-section">
          <p class="footer-text">
            Ainda não tem uma conta?
            <router-link to="/cadastroCliente" class="cadastro-link">Cadastre-se</router-link>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import api from '@/services/api'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({ email: '', senha: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const rememberMe = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const response = await api.post('/login', {
      email: form.email,
      password: form.senha
    })
    localStorage.setItem('cliente_token', response.data.access_token)
    localStorage.setItem('cliente', JSON.stringify(response.data.cliente))
    await Swal.fire({
      icon: 'success',
      title: 'Bem-vindo!',
      text: `Olá, ${response.data.cliente.primeiro_nome}!`,
      confirmButtonColor: '#10b981',
      timer: 2000
    })
    router.push('/dashboard')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: error.response?.status === 401
        ? 'Email ou senha incorretos'
        : 'Erro ao fazer login. Tente novamente.',
      confirmButtonColor: '#ef4444'
    })
    console.error('Erro:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import '@/assets/variables.css';

/* ── Container ─────────────────────────────── */
.login-container {
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

/* Gradiente vivo — muda suavemente de ângulo */
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Orbes flutuantes */
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

/* Conteúdo central */
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
  justify-content: flex-start;
  align-items: center;
  padding: 24px 16px;
  overflow-y: auto;
}

.form-wrapper {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-text {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.logo-4r {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
}

.logo-petshop {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* ── Banner mobile ─────────────────────────── */
.banner-section {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

/* ── Header ────────────────────────────────── */
.header-section { text-align: left; }

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
  line-height: 1.25;
}

.subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ── Form ──────────────────────────────────── */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.forgot-link {
  font-size: 0.75rem;
  color: var(--secondary-color);
  font-weight: 500;
  text-decoration: none;
}

.forgot-link:hover {
  color: var(--secondary-dark);
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: 52px;
  padding: 0 16px 0 48px;
  font-size: 1rem;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.form-input::placeholder { color: var(--text-muted); }

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(17,85,204,0.1);
}

.toggle-pwd {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  padding: 0;
}

.toggle-pwd:hover { color: var(--text-secondary); }

/* ── Lembrar de mim ────────────────────────── */
.remember-row { display: flex; align-items: center; }

.remember-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  cursor: pointer;
  user-select: none;
}

.remember-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--primary-color);
  cursor: pointer;
}

/* ── Botão ─────────────────────────────────── */
.btn-submit {
  width: 100%;
  height: 52px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #ffffff;
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-light) 100%);
  border: none;
  border-radius: 16px;
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
.footer-section { text-align: center; padding-bottom: 16px; }

.footer-text { font-size: 0.875rem; color: var(--text-secondary); }

.cadastro-link {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
}

.cadastro-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* ── Utilitários ───────────────────────────── */
.mobile-only { display: flex; }

/* ── Mobile pequeno (< 375px) ──────────────── */
@media (max-width: 375px) {
  .right-panel { padding: 16px 12px; }
  .title { font-size: 1.5rem; }
  .banner-img { height: 150px; }
}

/* ── Tablet / Desktop (>= 768px) ───────────── */
@media (min-width: 768px) {
  .login-container {
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
    padding: 48px 32px;
    background-color: var(--bg-primary);
    min-height: 100vh;
  }

  .form-wrapper { max-width: 400px; }

  .mobile-only { display: none !important; }

  .logo-section {
    justify-content: center;
    padding-top: 0;
  }

  .logo-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 16px;
  }

  .header-section { text-align: center; }
}

/* ── Desktop (>= 1024px) ────────────────────── */
@media (min-width: 1024px) {
  .left-panel { flex: 0 0 50%; }

  .right-panel {
    flex: 0 0 50%;
    padding: 64px 48px;
  }

  .form-wrapper { max-width: 440px; gap: 28px; }

  .title { font-size: 2.25rem; }

  .form-input { height: 56px; }
  .btn-submit { height: 56px; font-size: 1.0625rem; }
}

/* ── Desktop Large (>= 1440px) ─────────────── */
@media (min-width: 1440px) {
  .left-panel { flex: 0 0 50%; }
  .right-panel { flex: 0 0 50%; padding: 64px; }
  .form-wrapper { max-width: 480px; }
}
</style>
