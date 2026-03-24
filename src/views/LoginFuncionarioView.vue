<template>
  <div class="login-container">
    <div class="login-content">
      <!-- Logo -->
      <div class="logo-section">
        <div class="logo-icon">
          <img
            src="@/assets/images/logo/LogoArrendondadoPetShop.png"
            alt="4R Pet Shop"
            class="logo-img"
          />
        </div>
        <span class="logo-text">
          <span class="logo-4r">4R</span>
          <span class="logo-petshop">PET CLINICA</span>
        </span>
      </div>

      <!-- Admin Badge -->
      <div class="admin-badge">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
        <span>Acesso Administrativo</span>
      </div>

      <!-- Header -->
      <div class="header-section">
        <h1 class="title">Login Funcionario</h1>
        <p class="subtitle">Acesse o painel administrativo</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="form">
        <!-- Usuario -->
        <div class="form-group">
          <label class="form-label">Usuario</label>
          <div class="input-wrapper with-icon">
            <span class="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input
              type="text"
              v-model="form.nome_login"
              placeholder="Nome de usuario"
              class="form-input with-icon"
              required
            />
          </div>
        </div>

        <!-- Senha -->
        <div class="form-group">
          <label class="form-label">Senha</label>
          <div class="input-wrapper with-icon">
            <span class="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.senha"
              placeholder="Digite sua senha"
              class="form-input with-icon"
              required
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-submit" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-else>Entrar</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="footer-section">
        <router-link to="/login" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
          Voltar para login de clientes
        </router-link>
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

const form = reactive({
  nome_login: '',
  senha: ''
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true

  try {
    const response = await api.post('/login/funcionario', {
      nome_login: form.nome_login,
      senha: form.senha
    })

    localStorage.setItem('funcionario_token', response.data.access_token)
    localStorage.setItem('funcionario', JSON.stringify(response.data.funcionario))

    await Swal.fire({
      icon: 'success',
      title: 'Bem-vindo!',
      text: `Ola, ${response.data.funcionario.nome_abrev || response.data.funcionario.nome_completo}!`,
      confirmButtonColor: '#1155CC',
      timer: 2000
    })

    router.push('/admin')

  } catch (error) {
    if (error.response?.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Usuario ou senha incorretos',
        confirmButtonColor: '#ef4444'
      })
    } else if (error.response?.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Funcionario inativo. Entre em contato com o administrador.',
        confirmButtonColor: '#ef4444'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao fazer login. Tente novamente.',
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

.login-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #EAF0FA 0%, #FFFFFF 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: var(--spacing-lg) var(--spacing-md);
}

.login-content {
  width: 100%;
  max-width: var(--max-width-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-xl);
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 30%;
  object-fit: cover;
}

.logo-text {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.logo-4r {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.logo-petshop {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

/* Admin Badge */
.admin-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-color) 0%, #2E80E0 100%);
  color: white;
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  align-self: center;
}

/* Header Section */
.header-section {
  text-align: center;
}

.title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

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
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input.with-icon {
  padding-left: calc(var(--spacing-md) + 28px);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(17, 85, 204, 0.1);
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
  transition: color var(--transition-fast);
}

.toggle-password:hover {
  color: var(--text-secondary);
}

/* Submit Button */
.btn-submit {
  width: 100%;
  height: var(--input-height-lg);
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: white;
  background: linear-gradient(135deg, var(--primary-color) 0%, #2E80E0 100%);
  border: none;
  border-radius: var(--border-radius-xl);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(17, 85, 204, 0.4);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Footer Section */
.footer-section {
  text-align: center;
  padding: var(--spacing-md) 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--primary-color);
}

/* Responsive */
@media (max-width: 375px) {
  .login-container {
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .title {
    font-size: var(--font-size-xl);
  }
}

@media (min-width: 428px) {
  .login-content {
    max-width: var(--max-width-md);
  }
}

@media (min-width: 768px) {
  .login-container {
    align-items: center;
    padding: var(--spacing-xl);
  }

  .login-content {
    background-color: white;
    padding: var(--spacing-2xl);
    border-radius: var(--border-radius-2xl);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 420px;
  }
}

@media (min-width: 1024px) {
  .login-container {
    background: linear-gradient(135deg, #EAF0FA 0%, #EAF3FF 100%);
    padding: var(--spacing-3xl);
  }

  .login-content {
    max-width: 440px;
    padding: var(--spacing-2xl) var(--spacing-3xl);
    border-radius: 20px;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.08),
      0 2px 10px rgba(0, 0, 0, 0.04);
  }

  .form-input {
    height: 56px;
  }

  .btn-submit {
    height: 56px;
    font-size: var(--font-size-lg);
  }
}
</style>
