<template>
  <div class="forgot-container">

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

        <!-- Header -->
        <div class="header-section">
          <h1 class="title">Encontre sua conta</h1>
          <p class="subtitle">Informe seu e-mail para receber um link de redefinição de senha.</p>
        </div>

        <!-- Formulário -->
        <form v-if="!enviado" @submit.prevent="handleSubmit" class="form">

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
                v-model="email"
                placeholder="seu@email.com"
                class="form-input"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>ENVIAR LINK</span>
          </button>
        </form>

        <!-- Mensagem de sucesso -->
        <div v-else class="success-section">
          <div class="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 class="success-title">E-mail enviado!</h2>
          <p class="success-text">
            Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.
            Verifique sua caixa de entrada e a pasta de spam.
          </p>
        </div>

        <div class="footer-section">
          <p class="footer-text">
            <router-link to="/login" class="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Voltar para o login
            </router-link>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import api from '@/services/api'
import { ref } from 'vue'

const email = ref('')
const isLoading = ref(false)
const enviado = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await api.post('/forgot-password', { email: email.value })
    enviado.value = true
  } catch (error) {
    if (error.response?.status === 422) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Por favor, informe um e-mail válido.',
        confirmButtonColor: '#ef4444'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
        confirmButtonColor: '#ef4444'
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import '@/assets/variables.css';

/* ── Container ─────────────────────────────── */
.forgot-container {
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
  justify-content: center;
  align-items: center;
  padding: 32px 24px;
  overflow-y: auto;
}

.form-wrapper {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ── Logo (mobile) ─────────────────────────── */
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-top: 8px;
}

.logo-icon-wrap {
  width: 64px;
  height: 64px;
  background-color: var(--primary-color);
  border-radius: 16px;
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
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.logo-4r {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.logo-petshop {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
}

/* ── Header ────────────────────────────────── */
.header-section { text-align: center; }

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
  line-height: 1.25;
}

.subtitle {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ── Form ──────────────────────────────────── */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
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

/* ── Success Section ───────────────────────── */
.success-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 32px 16px;
  background-color: var(--bg-secondary, #f8fafc);
  border-radius: 16px;
}

.success-icon {
  color: var(--success-color, #10b981);
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.success-text {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 340px;
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
.footer-section { text-align: center; padding-top: 8px; padding-bottom: 24px; }

.footer-text { font-size: 0.9375rem; color: var(--text-secondary); }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  padding: 12px 0;
}

.back-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* ── Utilitários ───────────────────────────── */
.mobile-only { display: flex; }

/* ── Mobile pequeno (< 375px) ──────────────── */
@media (max-width: 375px) {
  .right-panel { padding: 24px 20px; }
  .title { font-size: 1.5rem; }
  .form-wrapper { gap: 28px; }
}

/* ── Tablet / Desktop (>= 768px) ───────────── */
@media (min-width: 768px) {
  .forgot-container {
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
