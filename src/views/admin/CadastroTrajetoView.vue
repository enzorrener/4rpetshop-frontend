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
          <h1 class="page-title">Novo Trajeto</h1>
        </div>
        <div class="top-bar-right">
          <button type="button" class="btn-secondary" @click="$router.back()">
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
            <!-- Card: Tipo de Servico -->
            <div class="card card-full">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Tipo de Servico
                </h2>
              </div>
              <div class="card-body">
                <div class="tipo-grid">
                  <button
                    type="button"
                    v-for="tipo in tiposServico"
                    :key="tipo.value"
                    class="tipo-btn"
                    :class="{ active: form.tipo_servico === tipo.value }"
                    @click="form.tipo_servico = tipo.value"
                  >
                    <span class="tipo-icon">{{ tipo.icon }}</span>
                    <span class="tipo-label">{{ tipo.label }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Card: Veiculo -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
                    <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
                  </svg>
                  Veiculo
                </h2>
              </div>
              <div class="card-body">
                <div class="select-wrapper">
                  <select v-model="form.veiculo_id" class="form-select" required>
                    <option value="">Selecione um veiculo</option>
                    <option v-for="veiculo in veiculos" :key="veiculo.id" :value="veiculo.id">
                      {{ veiculo.placa }} - {{ veiculo.modelo || veiculo.identificacao }}
                    </option>
                  </select>
                  <svg class="select-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Card: Data e Hora -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Data e Hora
                </h2>
              </div>
              <div class="card-body">
                <input
                  type="datetime-local"
                  v-model="form.data_hora_agendada"
                  class="form-input"
                  :min="minDateTime"
                  required
                />
              </div>
            </div>

            <!-- Card: Cliente -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Cliente
                </h2>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      v-model="clienteSearch"
                      placeholder="Buscar cliente por nome ou email..."
                      class="form-input"
                      @input="searchClientes"
                      @focus="showClienteList = true"
                    />
                    <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <div v-if="showClienteList && clientesFiltered.length > 0" class="search-results">
                    <div
                      v-for="cliente in clientesFiltered"
                      :key="cliente.id"
                      class="search-item"
                      @click="selectCliente(cliente)"
                    >
                      <span class="search-item-name">{{ cliente.nome || `${cliente.primeiro_nome} ${cliente.sobrenome || ''}` }}</span>
                      <span class="search-item-info">{{ cliente.email }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="selectedCliente" class="selected-item">
                  <div class="selected-info">
                    <span class="selected-icon">👤</span>
                    <span>{{ selectedCliente.nome || `${selectedCliente.primeiro_nome} ${selectedCliente.sobrenome || ''}` }}</span>
                  </div>
                  <button type="button" class="btn-remove" @click="clearCliente">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Card: Pet -->
            <div class="card" v-if="selectedCliente">
              <div class="card-header">
                <h2 class="card-title">
                  <span class="emoji-icon">🐾</span>
                  Pet
                </h2>
              </div>
              <div class="card-body">
                <div v-if="petsCliente.length > 0" class="select-wrapper">
                  <select v-model="form.pet_id" class="form-select">
                    <option value="">Selecione um pet (opcional)</option>
                    <option v-for="pet in petsCliente" :key="pet.id" :value="pet.id">
                      {{ pet.nome_pet }} - {{ getEspecieLabel(pet.especie) }}
                    </option>
                  </select>
                  <svg class="select-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div v-else class="empty-state-small">
                  <p>Nenhum pet cadastrado para este cliente.</p>
                </div>
              </div>
            </div>

            <!-- Card: Observacoes -->
            <div class="card card-full">
              <div class="card-header">
                <h2 class="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                  Observacoes
                  <span class="optional-badge">Opcional</span>
                </h2>
              </div>
              <div class="card-body">
                <textarea
                  v-model="form.observacoes"
                  placeholder="Informacoes adicionais sobre o trajeto..."
                  class="form-textarea"
                  maxlength="500"
                  rows="4"
                ></textarea>
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
                Criar Trajeto
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
import { useRouter } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router = useRouter()
const isLoading = ref(false)
const isLoadingData = ref(true)
const sidebarOpen = ref(false)

const veiculos = ref([])
const clientes = ref([])
const petsCliente = ref([])
const clienteSearch = ref('')
const showClienteList = ref(false)
const selectedCliente = ref(null)

const token = localStorage.getItem('funcionario_token')

const tiposServico = [
  { value: 'buscar_pet', label: 'Buscar Pet', icon: '🐕' },
  { value: 'entregar_pet', label: 'Entregar Pet', icon: '🏠' },
  { value: 'consulta', label: 'Consulta', icon: '🏥' },
  { value: 'emergencia', label: 'Emergencia', icon: '🚨' }
]

const form = reactive({
  tipo_servico: 'buscar_pet',
  veiculo_id: '',
  cliente_id: '',
  pet_id: '',
  data_hora_agendada: '',
  observacoes: ''
})

const minDateTime = computed(() => {
  const now = new Date()
  return now.toISOString().slice(0, 16)
})

const clientesFiltered = computed(() => {
  if (!clienteSearch.value || clienteSearch.value.length < 2) return []
  const search = clienteSearch.value.toLowerCase()
  return clientes.value.filter(c => {
    const nome = (c.nome || `${c.primeiro_nome} ${c.sobrenome || ''}`).toLowerCase()
    const email = (c.email || '').toLowerCase()
    return nome.includes(search) || email.includes(search)
  }).slice(0, 5)
})

const isFormValid = computed(() => {
  return form.tipo_servico && form.veiculo_id && form.cliente_id && form.data_hora_agendada
})

const getEspecieLabel = (especie) => {
  const especies = { 1: 'Cachorro', 2: 'Gato', 3: 'Passaro', 4: 'Outro' }
  return especies[especie] || 'Pet'
}

const fetchVeiculos = async () => {
  try {
    const response = await api.get('/veiculos/ativos', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    veiculos.value = response.data.data || response.data || []
  } catch (error) {
    console.error('Erro ao buscar veiculos:', error)
  }
}

const fetchClientes = async () => {
  try {
    const response = await api.get('/clientes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    clientes.value = response.data.data || response.data || []
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
  }
}

const searchClientes = () => {
  showClienteList.value = true
}

const selectCliente = async (cliente) => {
  selectedCliente.value = cliente
  form.cliente_id = cliente.id
  clienteSearch.value = ''
  showClienteList.value = false

  try {
    const response = await api.get(`/clientes/${cliente.id}/pets`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    petsCliente.value = response.data.data || response.data || []
  } catch {
    petsCliente.value = []
  }
}

const clearCliente = () => {
  selectedCliente.value = null
  form.cliente_id = ''
  form.pet_id = ''
  petsCliente.value = []
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos obrigatorios',
      text: 'Preencha todos os campos obrigatorios.',
      confirmButtonColor: '#0A3080'
    })
    return
  }

  isLoading.value = true

  try {
    const payload = {
      tipo_servico: form.tipo_servico,
      veiculo_id: form.veiculo_id,
      cliente_id: form.cliente_id,
      data_hora_agendada: form.data_hora_agendada
    }

    if (form.pet_id) {
      payload.pet_id = form.pet_id
    }

    if (form.observacoes.trim()) {
      payload.observacoes = form.observacoes.trim()
    }

    await api.post('/trajetos', payload, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    await Swal.fire({
      icon: 'success',
      title: 'Trajeto Criado!',
      text: 'O trajeto foi criado com sucesso.',
      confirmButtonColor: '#0A3080'
    })

    router.push('/admin/trajetos')
  } catch (error) {
    const msg = error.response?.data?.message || 'Erro ao criar trajeto.'
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

onMounted(async () => {
  if (!token) {
    router.push('/login')
    return
  }

  isLoadingData.value = true
  await Promise.all([fetchVeiculos(), fetchClientes()])
  isLoadingData.value = false

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.form-group')) {
      showClienteList.value = false
    }
  })
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
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16px;
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
}

.card-full {
  grid-column: 1 / -1;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
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

.emoji-icon {
  font-size: 18px;
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

.card-body {
  padding: 20px;
}

/* Tipo Grid */
.tipo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .tipo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tipo-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
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
  font-size: 32px;
}

.tipo-label {
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
}

.tipo-btn.active .tipo-label {
  color: #0A3080;
}

/* Form Elements */
.form-group {
  position: relative;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  padding-right: 44px;
  font-size: 15px;
  color: #374151;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus {
  border-color: #0A3080;
  background: white;
  box-shadow: 0 0 0 3px rgba(46, 50, 111, 0.1);
}

.input-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  height: 48px;
  padding: 0 44px 0 16px;
  font-size: 15px;
  color: #374151;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;
}

.form-select:focus {
  border-color: #0A3080;
  background: white;
  box-shadow: 0 0 0 3px rgba(46, 50, 111, 0.1);
}

.select-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  color: #374151;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
}

.form-textarea:focus {
  border-color: #0A3080;
  background: white;
  box-shadow: 0 0 0 3px rgba(46, 50, 111, 0.1);
}

/* Search Results */
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 20;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
}

.search-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-item:hover {
  background: #F5F5FF;
}

.search-item-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.search-item-info {
  font-size: 12px;
  color: #9CA3AF;
}

/* Selected Item */
.selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #EEEEF5;
  border-radius: 10px;
  margin-top: 12px;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #0A3080;
}

.selected-icon {
  font-size: 18px;
}

.btn-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #9CA3AF;
  padding: 4px;
  display: flex;
  transition: color 0.2s;
}

.btn-remove:hover {
  color: #EF4444;
}

.empty-state-small {
  padding: 16px;
  text-align: center;
  color: #9CA3AF;
  font-size: 14px;
}

.empty-state-small p {
  margin: 0;
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
  min-width: 200px;
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
