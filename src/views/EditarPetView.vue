<template>
  <div class="pet-page">

    <!-- Topbar azul (desktop) -->
    <header class="pet-topbar">
      <button type="button" class="topbar-back" @click="$router.back()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        <span>Meus Pets</span>
      </button>
      <h1 class="topbar-title">Editar Pet</h1>
      <button type="button" class="topbar-delete" @click="handleDelete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
        </svg>
        Excluir Pet
      </button>
    </header>

    <div class="pet-layout">

      <!-- PAINEL ESQUERDO -->
      <aside class="pet-left">

        <!-- Header mobile -->
        <div class="mobile-header-bar">
          <button type="button" class="btn-back" @click="$router.back()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 class="page-title">Editar Pet</h1>
          <button type="button" class="btn-delete" @click="handleDelete">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>

        <!-- Loading -->
        <div v-if="isLoadingData" class="loading-section">
          <span class="loading-spinner-lg"></span>
          <p>Carregando...</p>
        </div>

        <!-- Foto + info -->
        <div v-else class="left-profile-wrap">
          <div class="photo-circle" @click="triggerFileInput">
            <img v-if="photoPreview" :src="photoPreview" alt="Foto do pet" class="photo-preview" />
            <svg v-else width="56" height="56" viewBox="0 0 56 56" fill="none">
              <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="currentColor" opacity="0.7"/>
              <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="currentColor" opacity="0.7"/>
              <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="currentColor" opacity="0.7"/>
              <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="currentColor" opacity="0.7"/>
              <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="currentColor" opacity="0.7"/>
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

          <div class="left-pet-info">
            <h2 class="left-pet-name">{{ form.nome_pet || 'Nome do Pet' }}</h2>
            <p class="left-pet-raca">{{ form.raca || 'Raça não informada' }}</p>
          </div>

          <div class="left-badges">
            <div class="left-badge" :class="getEspecieBadgeClass(form.especie)">
              <svg width="13" height="13" viewBox="0 0 56 56" fill="none">
                <ellipse cx="17.5" cy="14" rx="5.5" ry="7" fill="currentColor" opacity="0.8"/>
                <ellipse cx="38.5" cy="14" rx="5.5" ry="7" fill="currentColor" opacity="0.8"/>
                <ellipse cx="10" cy="28" rx="5" ry="6.5" fill="currentColor" opacity="0.8"/>
                <ellipse cx="46" cy="28" rx="5" ry="6.5" fill="currentColor" opacity="0.8"/>
                <path d="M18 38c0-7 4.5-11 10-11s10 4 10 11c0 5-4.5 8-10 8s-10-3-10-8z" fill="currentColor" opacity="0.8"/>
              </svg>
              <span>{{ getEspecieLabel(form.especie) }}</span>
            </div>
            <div class="left-badge left-badge-gray">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{{ form.data_nascimento ? calcularIdadeDisplay(form.data_nascimento) : 'Idade não informada' }}</span>
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
      <main class="pet-right">
        <div v-if="isLoadingData" class="loading-section">
          <span class="loading-spinner-lg"></span>
          <p>Carregando dados do pet...</p>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="form">

          <!-- Seção: Identificação -->
          <div class="form-section-block">
            <div class="form-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              Identificação
            </div>

            <div class="form-group">
              <label class="form-label">Nome do Pet</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.nome_pet" placeholder="Ex: Max" class="form-input" maxlength="100" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Espécie</label>
              <div class="species-grid">
                <button type="button" class="species-btn" :class="{ active: form.especie === 1 }" @click="form.especie = 1">
                  <div class="species-icon"><img src="@/assets/images/logo/LogoCachorro.jpg" alt="Cachorro" class="species-img" /></div>
                  <span class="species-label">Cachorro</span>
                </button>
                <button type="button" class="species-btn" :class="{ active: form.especie === 2 }" @click="form.especie = 2">
                  <div class="species-icon"><img src="@/assets/images/logo/LogoGato.jpg" alt="Gato" class="species-img" /></div>
                  <span class="species-label">Gato</span>
                </button>
                <button type="button" class="species-btn" :class="{ active: form.especie === 3 }" @click="form.especie = 3">
                  <div class="species-icon"><img src="@/assets/images/logo/PassaroLogo.jpg" alt="Pássaro" class="species-img" /></div>
                  <span class="species-label">Pássaro</span>
                </button>
                <button type="button" class="species-btn" :class="{ active: form.especie === 4 }" @click="form.especie = 4">
                  <div class="species-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="1"/><circle cx="6" cy="12" r="1"/><circle cx="18" cy="12" r="1"/>
                    </svg>
                  </div>
                  <span class="species-label">Outros</span>
                </button>
              </div>
            </div>

            <div class="form-group" v-if="form.especie === 4">
              <label class="form-label">Qual espécie?</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.especie_outro" placeholder="Ex: Hamster, Coelho..." class="form-input" maxlength="100" required />
              </div>
            </div>
          </div>

          <!-- Seção: Detalhes -->
          <div class="form-section-block">
            <div class="form-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Detalhes
            </div>

            <div class="form-group">
              <label class="form-label">Raça</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.raca" placeholder="Ex: Golden Retriever" class="form-input" maxlength="100" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label class="form-label">Gênero</label>
                <div class="gender-toggle">
                  <button type="button" class="gender-btn" :class="{ active: form.genero === 1 }" @click="form.genero = 1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="8" r="5"/><line x1="12" y1="13" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/>
                    </svg>
                    Macho
                  </button>
                  <button type="button" class="gender-btn" :class="{ active: form.genero === 2 }" @click="form.genero = 2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="11" r="5"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="9" y1="19" x2="15" y2="19"/>
                    </svg>
                    Fêmea
                  </button>
                </div>
              </div>
              <div class="form-group half">
                <label class="form-label">Peso (kg)</label>
                <div class="input-wrapper">
                  <input type="number" v-model="form.peso_kg" placeholder="0.0" class="form-input" step="0.1" min="0" />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Data de Nascimento</label>
              <div class="input-wrapper">
                <input type="date" v-model="form.data_nascimento" class="form-input" :max="today" required />
              </div>
            </div>
          </div>

          <!-- Seção: Cuidados -->
          <div class="form-section-block">
            <div class="form-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              Cuidados <span class="optional-tag">(opcional)</span>
            </div>
            <div class="form-group">
              <label class="form-label">Observações</label>
              <div class="input-wrapper">
                <textarea v-model="form.observacoes_cuidados" placeholder="Cuidados especiais, alergias, medicamentos..." class="form-input form-textarea" maxlength="300" rows="4"></textarea>
              </div>
            </div>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="loading-spinner"></span>
            <span v-else>Salvar Alterações</span>
          </button>
        </form>
      </main>

    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <router-link to="/dashboard" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Início</span>
      </router-link>
      <a href="#" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span>Loja</span>
      </a>
      <div class="nav-item nav-center">
        <div class="nav-add-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </div>
      <router-link to="/meusPets" class="nav-item active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/>
          <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 00-.42-3.31"/>
        </svg>
        <span>Pets</span>
      </router-link>
      <router-link to="/editarPerfil" class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Perfil</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()
const fileInput = ref(null)
const photoPreview = ref(null)
const isLoading = ref(false)
const isLoadingData = ref(true)
const petId = computed(() => route.params.id)

const token = computed(() => localStorage.getItem('cliente_token'))

const form = reactive({
  nome_pet: '',
  especie: 1,
  especie_outro: '',
  raca: '',
  genero: 1,
  data_nascimento: '',
  peso_kg: null,
  observacoes_cuidados: '',
  foto_pet: null
})

const today = computed(() => {
  const d = new Date()
  return d.toISOString().split('T')[0]
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileSelected = (event) => {
  const file = event.target.files[0]
  if (!file) return
  form.foto_pet = file
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const fetchPet = async () => {
  if (!token.value) {
    router.push('/login')
    return
  }

  isLoadingData.value = true
  try {
    const response = await api.get(`/pets/${petId.value}`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })

    const pet = response.data

    form.nome_pet = pet.nome_pet || ''
    form.especie = pet.especie || 1
    form.especie_outro = pet.especie_outro || ''
    form.raca = pet.raca || ''
    form.genero = pet.genero || 1
    form.data_nascimento = pet.data_nascimento ? pet.data_nascimento.split('T')[0] : ''
    form.peso_kg = pet.peso_kg || null
    form.observacoes_cuidados = pet.observacoes_cuidados || ''

    if (pet.foto_url) {
      photoPreview.value = pet.foto_url
    }
  } catch (error) {
    console.error('Erro ao buscar pet:', error)
    if (error.response?.status === 404) {
      await Swal.fire({ icon: 'error', title: 'Pet não encontrado', confirmButtonColor: '#1155CC' })
      router.push('/dashboard')
    } else if (error.response?.status === 401) {
      localStorage.removeItem('cliente_token')
      localStorage.removeItem('cliente')
      router.push('/login')
    }
  } finally {
    isLoadingData.value = false
  }
}

const validate = () => {
  if (!form.nome_pet.trim()) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Nome do pet é obrigatório.', confirmButtonColor: '#1155CC' })
    return false
  }
  if (!form.especie) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Selecione a espécie.', confirmButtonColor: '#1155CC' })
    return false
  }
  if (form.especie === 4 && !form.especie_outro.trim()) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Informe a espécie do pet.', confirmButtonColor: '#1155CC' })
    return false
  }
  if (!form.raca.trim()) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Raça é obrigatória.', confirmButtonColor: '#1155CC' })
    return false
  }
  if (!form.genero) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Selecione o gênero.', confirmButtonColor: '#1155CC' })
    return false
  }
  if (!form.data_nascimento) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Data de nascimento é obrigatória.', confirmButtonColor: '#1155CC' })
    return false
  }
  if (new Date(form.data_nascimento) > new Date()) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Data de nascimento não pode ser futura.', confirmButtonColor: '#1155CC' })
    return false
  }
  if (form.peso_kg !== null && form.peso_kg !== '' && Number(form.peso_kg) <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Peso deve ser maior que 0.', confirmButtonColor: '#1155CC' })
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validate()) return

  isLoading.value = true

  try {
    const formData = new FormData()

    formData.append('nome_pet', form.nome_pet.trim())
    formData.append('especie', form.especie)
    formData.append('raca', form.raca.trim())
    formData.append('genero', form.genero)
    formData.append('data_nascimento', form.data_nascimento)

    if (form.especie === 4 && form.especie_outro.trim()) {
      formData.append('especie_outro', form.especie_outro.trim())
    }

    if (form.peso_kg !== null && form.peso_kg !== '') {
      formData.append('peso_kg', Number(form.peso_kg))
    }

    if (form.observacoes_cuidados.trim()) {
      formData.append('observacoes_cuidados', form.observacoes_cuidados.trim())
    }

    if (form.foto_pet) {
      formData.append('foto_pet', form.foto_pet)
    }

    // PUT via POST com _method para FormData
    formData.append('_method', 'PUT')

    await api.post(`/pets/${petId.value}`, formData, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    await Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Pet atualizado com sucesso!',
      confirmButtonColor: '#4CAF50'
    })

    router.push('/dashboard')

  } catch (error) {
    if (error.response?.data?.errors) {
      const erros = Object.values(error.response.data.errors).flat().join(', ')
      Swal.fire({ icon: 'error', title: 'Erro de validação', text: erros, confirmButtonColor: '#ef4444' })
    } else {
      Swal.fire({ icon: 'error', title: 'Erro!', text: 'Erro ao atualizar pet. Tente novamente.', confirmButtonColor: '#ef4444' })
    }
    console.error('Erro:', error)
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Excluir Pet',
    text: `Deseja realmente excluir "${form.nome_pet}"? Esta ação não pode ser desfeita.`,
    showCancelButton: true,
    confirmButtonColor: '#E53935',
    cancelButtonColor: '#1155CC',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  try {
    await api.delete(`/pets/${petId.value}`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    })

    await Swal.fire({
      icon: 'success',
      title: 'Excluído!',
      text: 'Pet excluído com sucesso.',
      confirmButtonColor: '#4CAF50'
    })

    router.push('/dashboard')
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro!', text: 'Erro ao excluir pet.', confirmButtonColor: '#ef4444' })
    console.error('Erro:', error)
  }
}

const calcularIdadeDisplay = (dataNascimento) => {
  if (!dataNascimento) return 'Idade não informada'
  const nascimento = new Date(dataNascimento)
  const hoje = new Date()
  let anos = hoje.getFullYear() - nascimento.getFullYear()
  let meses = hoje.getMonth() - nascimento.getMonth()
  if (meses < 0) { anos--; meses += 12 }
  if (anos > 0) return anos === 1 ? '1 ano' : `${anos} anos`
  if (meses > 0) return meses === 1 ? '1 mês' : `${meses} meses`
  return 'Recém-nascido'
}

const getEspecieBadgeClass = (especie) => {
  const map = { 1: 'left-badge-blue', 2: 'left-badge-orange', 3: 'left-badge-green', 4: 'left-badge-gray' }
  return map[especie] || 'left-badge-gray'
}

const getEspecieLabel = (especie) => {
  if (form.especie === 4 && form.especie_outro) return form.especie_outro
  const map = { 1: 'Cachorro', 2: 'Gato', 3: 'Pássaro', 4: 'Outro' }
  return map[especie] || 'Pet'
}

onMounted(() => {
  fetchPet()
})
</script>

<style scoped>
@import '@/assets/variables.css';

/* ===== Base ===== */
.pet-page {
  min-height: 100vh;
  width: 100%;
  background: #F4F6FA;
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
}

/* ===== Desktop Topbar (hidden mobile) ===== */
.pet-topbar {
  display: none;
}

/* ===== Mobile Header Bar ===== */
.mobile-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #E8ECF0;
}

.btn-back {
  background: none;
  border: none;
  cursor: pointer;
  color: #1155CC;
  display: flex;
  align-items: center;
  padding: 4px;
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  color: #E53935;
  display: flex;
  align-items: center;
  padding: 4px;
  transition: opacity 0.15s;
}

.btn-delete:hover { opacity: 0.7; }

.page-title {
  font-size: 17px;
  font-weight: 700;
  color: #0A1F44;
}

/* ===== Layout (desktop: side by side) ===== */
.pet-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* ===== Left Panel (photo info) ===== */
.pet-left {
  background: white;
  display: flex;
  flex-direction: column;
}

.left-profile-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  gap: 12px;
}

/* ===== Right Panel (form) ===== */
.pet-right {
  padding: 16px;
}

/* ===== Left Info ===== */
.left-pet-info {
  text-align: center;
}

.left-pet-name {
  font-size: 20px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0;
}

.left-pet-raca {
  font-size: 13px;
  color: #6B7A99;
  margin: 4px 0 0;
}

.left-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.left-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.left-badge-blue   { background: #EBF5FF; color: #1155CC; }
.left-badge-orange { background: #FFF3E0; color: #F07020; }
.left-badge-green  { background: #E8F5E9; color: #2E7D32; }
.left-badge-gray   { background: #F0F2F5; color: #4A5568; }

.left-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin-top: auto;
}

.brand-4r {
  font-size: 22px;
  font-weight: 900;
  color: #1155CC;
  letter-spacing: 2px;
}

.brand-sub {
  font-size: 9px;
  color: #6B7A99;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* ===== Loading ===== */
.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.loading-spinner-lg {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border-color);
  border-top-color: #1155CC;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* ===== Form Section Block ===== */
.form-section-block {
  background: white;
  border: 1.5px solid #E8ECF0;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #1155CC;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid #E8ECF0;
  padding-bottom: 12px;
}

.optional-tag {
  font-weight: 400;
  color: #9AA3B2;
  font-size: 11px;
  text-transform: none;
  letter-spacing: 0;
}

/* ===== Photo Section ===== */
.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.photo-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #DDEEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: opacity var(--transition-fast);
}

.photo-circle:hover {
  opacity: 0.85;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-edit-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.photo-circle:hover .photo-edit-overlay { opacity: 1; }

.camera-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #1155CC;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-primary);
}

.photo-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #1155CC;
  letter-spacing: 0.5px;
}

.hidden-input {
  display: none;
}

/* ===== Form ===== */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
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

.form-group.half {
  flex: 1;
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.optional-tag {
  font-weight: var(--font-weight-normal);
  color: var(--text-muted);
  font-size: var(--font-size-xs);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper.with-icon-right .input-icon-right {
  position: absolute;
  right: var(--spacing-md);
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
  background-color: var(--bg-primary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: #1155CC;
  box-shadow: 0 0 0 3px rgba(17, 85, 204, 0.15);
}

.form-textarea {
  height: auto;
  padding: var(--spacing-sm) var(--spacing-md);
  resize: vertical;
  font-family: var(--font-family);
  line-height: var(--line-height-normal);
}

/* ===== Species Grid ===== */
.species-grid {
  display: flex;
  gap: var(--spacing-sm);
}

.species-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-xs);
  background: none;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
}

.species-btn:hover {
  border-color: #1155CC;
}

.species-btn.active {
  border-color: #1155CC;
  background-color: #EBF5FF;
  color: #0A3080;
}

.species-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.species-img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
}

.species-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

/* ===== Gender Toggle ===== */
.gender-toggle {
  display: flex;
  gap: var(--spacing-sm);
}

.gender-btn {
  flex: 1;
  height: var(--input-height-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-full);
  background: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.gender-btn:hover {
  border-color: #1155CC;
}

.gender-btn.active {
  border-color: #1155CC;
  background-color: #1155CC;
  color: white;
}

/* ===== Submit Button ===== */
.btn-submit {
  width: 100%;
  height: 52px;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #F07020 0%, #E05010 100%);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(240,112,32,0.35);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(240,112,32,0.45);
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
  to { transform: rotate(360deg); }
}

/* ===== Bottom Navigation ===== */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 var(--spacing-sm);
  z-index: var(--z-fixed);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.nav-item.active {
  color: #1155CC;
}

.nav-center {
  margin-top: -20px;
}

.nav-add-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1155CC 0%, #2E80E0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(17, 85, 204, 0.4);
}

/* ===== iPhone SE ===== */
@media (max-width: 375px) {
  .species-grid { gap: 6px; }
  .species-btn  { padding: 6px 2px; }
  .species-icon { width: 32px; height: 32px; }
  .form-row     { flex-direction: column; }
}

/* ===== Desktop (1024px+) ===== */
@media (min-width: 1024px) {
  .pet-page {
    background: #EEF1F8;
    padding-bottom: 0;
  }

  /* Blue topbar */
  .pet-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 32px;
    background: linear-gradient(90deg, #0A3080 0%, #1155CC 100%);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .topbar-back {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    opacity: 0.85;
    transition: opacity 0.15s;
  }
  .topbar-back:hover { opacity: 1; }

  .topbar-title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    letter-spacing: 0.3px;
  }

  .topbar-delete {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.12);
    border: 1.5px solid rgba(255,255,255,0.3);
    color: #FFB3B3;
    font-size: 13px;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
  }
  .topbar-delete:hover { background: rgba(229,57,53,0.35); }

  /* Hide mobile elements */
  .mobile-header-bar { display: none; }
  .bottom-nav        { display: none; }

  /* Two-panel layout */
  .pet-layout {
    flex-direction: row;
    min-height: calc(100vh - 60px);
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 32px;
    gap: 28px;
    align-items: flex-start;
  }

  /* Left panel */
  .pet-left {
    width: 300px;
    min-width: 300px;
    background: linear-gradient(180deg, #0A3080 0%, #1155CC 60%, #2E80E0 100%);
    border-radius: 24px;
    position: sticky;
    top: 80px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(10,48,128,0.25);
  }

  .left-profile-wrap {
    padding: 36px 24px 24px;
    gap: 16px;
  }

  .photo-circle {
    width: 130px;
    height: 130px;
    background: rgba(255,255,255,0.15);
    border: 3px solid rgba(255,255,255,0.4);
  }

  .photo-circle svg { color: rgba(255,255,255,0.7); }

  .photo-label {
    color: rgba(255,255,255,0.65);
    font-size: 10px;
    letter-spacing: 1px;
  }

  .left-pet-name  { color: white; font-size: 22px; }
  .left-pet-raca  { color: rgba(255,255,255,0.65); }

  .left-badge-blue   { background: rgba(255,255,255,0.18); color: #A8D4FF; }
  .left-badge-orange { background: rgba(240,112,32,0.25);  color: #FFB87A; }
  .left-badge-green  { background: rgba(76,175,80,0.2);    color: #A5D6A7; }
  .left-badge-gray   { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); }

  .left-brand {
    padding: 20px 24px;
    border-top: 1px solid rgba(255,255,255,0.15);
    margin-top: 0;
  }
  .brand-4r  { color: white; font-size: 24px; }
  .brand-sub { color: rgba(255,255,255,0.5); }

  /* Right panel */
  .pet-right {
    flex: 1;
    padding: 0;
  }

  .form { gap: 0; }

  .form-section-block {
    padding: 24px 28px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .form-input { height: 52px; font-size: 15px; }

  .btn-submit {
    height: 56px;
    font-size: 16px;
    border-radius: 16px;
  }

  .loading-section { padding: 48px 0; }
}

/* ===== Desktop Large (1440px+) ===== */
@media (min-width: 1440px) {
  .pet-layout { max-width: 1300px; padding: 40px; }
  .pet-left   { width: 320px; min-width: 320px; }
  .photo-circle { width: 140px; height: 140px; }
}
</style>
