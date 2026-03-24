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
          <h1 class="page-title">{{ isEditMode ? 'Editar Veiculo' : 'Novo Veiculo' }}</h1>
        </div>
        <div class="top-bar-right">
          <button
            v-if="isEditMode"
            type="button"
            class="btn-danger"
            @click="handleDelete"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
            Excluir
          </button>
          <button type="button" class="btn-secondary" @click="$router.push('/admin/veiculos')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            Voltar
          </button>
        </div>
      </header>

      <!-- Loading -->
      <div v-if="isLoadingData" class="loading-section">
        <span class="loading-spinner-lg"></span>
        <p>Carregando dados...</p>
      </div>

      <template v-else>
        <form @submit.prevent="handleSubmit" class="form-layout">
          <!-- Cards Grid -->
          <div class="cards-grid">
            <!-- Card: Identificacao -->
            <div class="card card-full">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
                    <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
                  </svg>
                  Identificacao do Veiculo
                </h2>
                <div class="status-toggle">
                  <button
                    type="button"
                    class="toggle-btn"
                    :class="{ active: form.ativo }"
                    @click="form.ativo = true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Ativo
                  </button>
                  <button
                    type="button"
                    class="toggle-btn"
                    :class="{ active: !form.ativo }"
                    @click="form.ativo = false"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Inativo
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="fields-grid">
                  <div class="field">
                    <label class="field-label">Placa *</label>
                    <input
                      type="text"
                      v-model="form.placa"
                      placeholder="ABC-1234 ou ABC1D23"
                      class="form-input uppercase"
                      maxlength="8"
                      required
                    />
                  </div>
                  <div class="field">
                    <label class="field-label">Modelo</label>
                    <input
                      type="text"
                      v-model="form.modelo"
                      placeholder="Ex: Fiat Strada"
                      class="form-input"
                      maxlength="100"
                    />
                  </div>
                  <div class="field">
                    <label class="field-label">Identificacao (Apelido)</label>
                    <input
                      type="text"
                      v-model="form.identificacao"
                      placeholder="Ex: Van Pet 01"
                      class="form-input"
                      maxlength="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Card: Tipo -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Tipo de Veiculo
                </h2>
              </div>
              <div class="card-body">
                <div class="tipo-grid">
                  <button
                    type="button"
                    v-for="tipo in tiposVeiculo"
                    :key="tipo.value"
                    class="tipo-btn"
                    :class="{ active: form.tipo === tipo.value }"
                    @click="form.tipo = tipo.value"
                  >
                    <span class="tipo-icon">{{ tipo.icon }}</span>
                    <span class="tipo-label">{{ tipo.label }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Card: Rastreador -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  Rastreador
                  <span class="optional-badge">Opcional</span>
                </h2>
              </div>
              <div class="card-body">
                <div class="field">
                  <label class="field-label">ID do Rastreador (API STC)</label>
                  <input
                    type="text"
                    v-model="form.rastreador_id"
                    placeholder="ID do rastreador"
                    class="form-input"
                    maxlength="100"
                  />
                  <p class="field-hint">Informe o ID do rastreador para monitorar a posicao em tempo real.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Section -->
          <div class="submit-section">
            <button type="submit" class="btn-submit" :disabled="isLoading || !isFormValid">
              <span v-if="isLoading" class="loading-spinner"></span>
              <template v-else>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ isEditMode ? 'Salvar Alteracoes' : 'Cadastrar Veiculo' }}
              </template>
            </button>
          </div>
        </form>
      </template>
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
const isLoading = ref(false)
const isLoadingData = ref(false)
const sidebarOpen = ref(false)

const token = localStorage.getItem('funcionario_token')
const veiculoId = computed(() => route.params.id)
const isEditMode = computed(() => !!veiculoId.value && veiculoId.value !== 'novo')

const tiposVeiculo = [
  { value: 'proprio', label: 'Proprio', icon: '🏢' },
  { value: 'terceiro', label: 'Terceiro', icon: '🤝' }
]

const form = reactive({
  placa: '',
  modelo: '',
  identificacao: '',
  tipo: 'proprio',
  rastreador_id: '',
  ativo: true
})

const isFormValid = computed(() => {
  return form.placa.trim().length >= 7
})

const fetchVeiculo = async () => {
  if (!isEditMode.value) return

  isLoadingData.value = true
  try {
    const response = await api.get(`/veiculos/${veiculoId.value}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    const veiculo = response.data.data || response.data

    form.placa = veiculo.placa || ''
    form.modelo = veiculo.modelo || ''
    form.identificacao = veiculo.identificacao || ''
    form.tipo = veiculo.tipo || 'proprio'
    form.rastreador_id = veiculo.rastreador_id || ''
    form.ativo = veiculo.ativo !== false
  } catch (error) {
    console.error('Erro ao buscar veiculo:', error)
    if (error.response?.status === 404) {
      await Swal.fire({
        icon: 'error',
        title: 'Veiculo nao encontrado',
        confirmButtonColor: '#0A3080'
      })
      router.push('/admin/veiculos')
    }
  } finally {
    isLoadingData.value = false
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Placa invalida',
      text: 'Informe uma placa valida.',
      confirmButtonColor: '#0A3080'
    })
    return
  }

  isLoading.value = true

  try {
    const payload = {
      placa: form.placa.toUpperCase().trim(),
      modelo: form.modelo.trim() || null,
      identificacao: form.identificacao.trim() || null,
      tipo: form.tipo,
      rastreador_id: form.rastreador_id.trim() || null,
      ativo: form.ativo
    }

    if (isEditMode.value) {
      await api.put(`/veiculos/${veiculoId.value}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } else {
      await api.post('/veiculos', payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    }

    await Swal.fire({
      icon: 'success',
      title: isEditMode.value ? 'Veiculo Atualizado!' : 'Veiculo Cadastrado!',
      confirmButtonColor: '#0A3080'
    })

    router.push('/admin/veiculos')
  } catch (error) {
    const msg = error.response?.data?.message || 'Erro ao salvar veiculo.'
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: msg,
      confirmButtonColor: '#EF4444'
    })
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Excluir Veiculo',
    text: `Deseja realmente excluir o veiculo ${form.placa}?`,
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#9CA3AF',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  try {
    await api.delete(`/veiculos/${veiculoId.value}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    await Swal.fire({
      icon: 'success',
      title: 'Veiculo Excluido!',
      confirmButtonColor: '#0A3080'
    })

    router.push('/admin/veiculos')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Nao foi possivel excluir o veiculo.',
      confirmButtonColor: '#EF4444'
    })
  }
}

onMounted(async () => {
  if (!token) {
    router.push('/login')
    return
  }

  await fetchVeiculo()
})
</script>

<style scoped>
@import '@/assets/variables.css';

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #F5F7FA;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

/* Top Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-menu-mobile {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
}

@media (max-width: 1023px) {
  .btn-menu-mobile {
    display: flex;
  }
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}

.btn-danger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #FEE2E2;
  border: 1px solid #FECACA;
  border-radius: 10px;
  color: #EF4444;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger:hover {
  background: #FECACA;
}

/* Loading */
.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 0;
  color: #6B7280;
}

.loading-spinner-lg {
  width: 48px;
  height: 48px;
  border: 3px solid #E5E7EB;
  border-top-color: #0A3080;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Form Layout */
.form-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 1023px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-full {
  grid-column: 1 / -1;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.card-title svg {
  color: #0A3080;
}

.optional-badge {
  font-size: 11px;
  font-weight: 500;
  color: #9CA3AF;
  background: #F3F4F6;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: auto;
}

.status-toggle {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  border-color: #0A3080;
}

.toggle-btn.active {
  background: #0A3080;
  border-color: #0A3080;
  color: white;
}

.card-body {
  padding: 20px;
}

/* Fields Grid */
.fields-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .fields-grid {
    grid-template-columns: 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.field-hint {
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
}

/* Tipo Grid */
.tipo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.tipo-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 16px;
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.tipo-btn:hover {
  border-color: #0A3080;
  background: #F5F5FF;
}

.tipo-btn.active {
  border-color: #0A3080;
  background: #EEEEF5;
}

.tipo-icon {
  font-size: 36px;
}

.tipo-label {
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
}

.tipo-btn.active .tipo-label {
  color: #0A3080;
}

/* Form Elements */
.form-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 15px;
  color: #374151;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s;
}

.form-input.uppercase {
  text-transform: uppercase;
}

.form-input:focus {
  border-color: #0A3080;
  background: white;
  box-shadow: 0 0 0 3px rgba(46, 50, 111, 0.1);
}

/* Submit Section */
.submit-section {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 220px;
  height: 52px;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #0A3080 0%, #3D4290 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(46, 50, 111, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 22px;
  height: 22px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
