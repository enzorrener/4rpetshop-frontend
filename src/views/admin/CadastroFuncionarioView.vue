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
            <router-link to="/admin/funcionarios" class="breadcrumb-root">Funcionários</router-link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="breadcrumb-current">{{ isEditMode ? 'Editar Funcionário' : 'Novo Funcionário' }}</span>
          </div>
        </div>
        <div class="top-bar-right">
          <router-link to="/admin/funcionarios" class="btn-secondary">Cancelar</router-link>
        </div>
      </header>

      <!-- Loading de dados (modo edição) -->
      <div v-if="isLoadingData" class="loading-section">
        <span class="loading-spinner"></span>
        <p>Carregando dados...</p>
      </div>

      <!-- Formulário -->
      <form v-else @submit.prevent="handleSubmit" class="form-container">

        <!-- Seção: Identificação -->
        <div class="form-card">
          <div class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Identificação
          </div>
          <div class="form-grid">
            <div class="form-group col-2">
              <label class="form-label">Nome Completo <span class="required">*</span></label>
              <input type="text" v-model="form.nome_completo" class="form-input" placeholder="Ex: João da Silva" maxlength="255" required />
            </div>
            <div class="form-group">
              <label class="form-label">Nome Abreviado <span class="required">*</span></label>
              <input type="text" v-model="form.nome_abrev" class="form-input" placeholder="Ex: João Silva" maxlength="100" required />
            </div>
            <div class="form-group">
              <label class="form-label">Matrícula <span class="required">*</span></label>
              <input type="text" v-model="form.matricula" class="form-input" placeholder="Ex: 00123" :disabled="isEditMode" required />
            </div>
            <div class="form-group">
              <label class="form-label">CPF <span class="required">*</span></label>
              <input type="text" v-model="form.cpf" class="form-input" placeholder="Somente números" maxlength="11" required />
            </div>
            <div class="form-group">
              <label class="form-label">Data de Nascimento <span class="required">*</span></label>
              <input type="date" v-model="form.data_nascimento" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Data de Admissão <span class="required">*</span></label>
              <input type="date" v-model="form.data_admissao" class="form-input" required />
            </div>
          </div>
        </div>

        <!-- Seção: Contato -->
        <div class="form-card">
          <div class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .82h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.18a16 16 0 006.73 6.73l1.24-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Contato
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Telefone <span class="required">*</span></label>
              <input type="text" v-model="form.telefone" class="form-input" placeholder="Ex: 77999990000" maxlength="20" required />
            </div>
            <div class="form-group">
              <label class="form-label">E-mail <span class="required">*</span></label>
              <input type="email" v-model="form.email" class="form-input" placeholder="email@exemplo.com" required />
            </div>
            <div class="form-group col-2">
              <label class="form-label">Endereço <span class="required">*</span></label>
              <input type="text" v-model="form.endereco" class="form-input" placeholder="Rua, número, bairro, cidade" required />
            </div>
          </div>
        </div>

        <!-- Seção: Cargo e Departamento -->
        <div class="form-card">
          <div class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
            Cargo e Departamento
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Cargo <span class="required">*</span></label>
              <input type="text" v-model="form.cargo" class="form-input" placeholder="Ex: Motorista, Veterinário" required />
            </div>
            <div class="form-group">
              <label class="form-label">Departamento <span class="required">*</span></label>
              <input type="text" v-model="form.departamento" class="form-input" placeholder="Ex: Operações, Saúde Animal" required />
            </div>
            <div class="form-group">
              <label class="form-label">Filial <span class="required">*</span></label>
              <input type="text" v-model="form.filial" class="form-input" placeholder="Ex: Matriz" required />
            </div>
            <div class="form-group">
              <label class="form-label">Salário</label>
              <input type="number" v-model="form.salario" class="form-input" placeholder="0,00" step="0.01" min="0" />
            </div>
            <div class="form-group">
              <label class="form-label">Status</label>
              <select v-model="form.status" class="form-select">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Seção: Acesso ao Sistema -->
        <div class="form-card">
          <div class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            Acesso ao Sistema
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Login <span class="required">*</span></label>
              <input type="text" v-model="form.nome_usuario" class="form-input" placeholder="Nome de usuário para login" required />
            </div>
            <div class="form-group">
              <label class="form-label">{{ isEditMode ? 'Nova Senha (deixe em branco para não alterar)' : 'Senha' }} {{ !isEditMode ? '*' : '' }}</label>
              <div class="input-pwd-wrap">
                <input :type="showPassword ? 'text' : 'password'" v-model="form.senha" class="form-input" placeholder="Mínimo 6 caracteres" :required="!isEditMode" />
                <button type="button" class="btn-toggle-pwd" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="form-group col-2">
              <label class="toggle-label">
                <div class="toggle-wrap" :class="{ 'toggle-on': form.admin }" @click="form.admin = !form.admin">
                  <div class="toggle-thumb"></div>
                </div>
                <div>
                  <span class="toggle-text">Administrador</span>
                  <span class="toggle-desc">Acesso completo ao painel administrativo</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Botão Salvar -->
        <div class="form-actions">
          <router-link to="/admin/funcionarios" class="btn-secondary">Cancelar</router-link>
          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="isLoading" class="loading-spinner-sm"></span>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
            </svg>
            {{ isEditMode ? 'Salvar Alterações' : 'Cadastrar Funcionário' }}
          </button>
        </div>

      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import Swal from 'sweetalert2'
import AdminSidebar from '@/components/AdminSidebar.vue'

const router       = useRouter()
const route        = useRoute()
const isLoading    = ref(false)
const isLoadingData = ref(false)
const sidebarOpen  = ref(false)
const showPassword = ref(false)
const token        = localStorage.getItem('funcionario_token')

const funcionarioId = computed(() => route.params.id)
const isEditMode    = computed(() => !!funcionarioId.value)

const form = reactive({
  nome_completo:   '',
  nome_abrev:      '',
  matricula:       '',
  cpf:             '',
  data_nascimento: '',
  data_admissao:   '',
  endereco:        '',
  telefone:        '',
  email:           '',
  departamento:    '',
  cargo:           '',
  filial:          '',
  salario:         '',
  status:          'ativo',
  nome_usuario:      '',
  senha:           '',
  admin:           false
})

const fetchFuncionario = async () => {
  isLoadingData.value = true
  try {
    const { data } = await api.get(`/funcionarios/${funcionarioId.value}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const f = data.data || data
    form.nome_completo   = f.nome_completo   || ''
    form.nome_abrev      = f.nome_abrev      || ''
    form.matricula       = f.matricula       || ''
    form.cpf             = f.cpf             || ''
    form.data_nascimento = f.data_nascimento ? f.data_nascimento.split('T')[0] : ''
    form.data_admissao   = f.data_admissao   ? f.data_admissao.split('T')[0]   : ''
    form.endereco        = f.endereco        || ''
    form.telefone        = f.telefone        || ''
    form.email           = f.email           || ''
    form.departamento    = f.departamento    || ''
    form.cargo           = f.cargo           || ''
    form.filial          = f.filial          || ''
    form.salario         = f.salario         || ''
    form.status          = f.status          || 'ativo'
    form.nome_usuario      = f.nome_usuario      || ''
    form.admin           = !!f.admin
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível carregar os dados.', confirmButtonColor: '#EF4444' })
    router.push('/admin/funcionarios')
  } finally {
    isLoadingData.value = false
  }
}

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const payload = {
      nome_completo:   form.nome_completo,
      nome_abrev:      form.nome_abrev,
      matricula:       form.matricula,
      cpf:             form.cpf,
      data_nascimento: form.data_nascimento,
      data_admissao:   form.data_admissao,
      endereco:        form.endereco,
      telefone:        form.telefone,
      email:           form.email,
      departamento:    form.departamento,
      cargo:           form.cargo,
      filial:          form.filial,
      salario:         form.salario || null,
      status:          form.status,
      nome_usuario:      form.nome_usuario,
      admin:           form.admin ? 1 : 0,
    }

    if (form.senha) payload.senha = form.senha

    if (isEditMode.value) {
      await api.put(`/funcionarios/${funcionarioId.value}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      Swal.fire({ icon: 'success', title: 'Salvo!', text: 'Funcionário atualizado com sucesso.', confirmButtonColor: '#1155CC', timer: 1800, showConfirmButton: false })
    } else {
      await api.post('/funcionarios', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      Swal.fire({ icon: 'success', title: 'Cadastrado!', text: 'Funcionário cadastrado com sucesso.', confirmButtonColor: '#1155CC', timer: 1800, showConfirmButton: false })
    }

    router.push('/admin/funcionarios')
  } catch (error) {
    const errors = error.response?.data?.errors
    const msg = errors ? Object.values(errors).flat().join('\n') : 'Erro ao salvar. Verifique os dados.'
    Swal.fire({ icon: 'error', title: 'Erro', text: msg, confirmButtonColor: '#EF4444' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (!token) { router.push('/login/funcionario'); return }
  if (isEditMode.value) fetchFuncionario()
})
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #F1F5F9; font-family: 'Inter', sans-serif; }
.main-content { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
.top-bar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: white; border-bottom: 1px solid #E8ECF0; position: sticky; top: 0; z-index: 100; }
.top-bar-left { display: flex; align-items: center; gap: 1rem; }
.top-bar-right { display: flex; gap: 0.75rem; }
.btn-menu-mobile { display: none; background: none; border: none; cursor: pointer; color: #374151; }
.breadcrumb { display: flex; align-items: center; gap: 6px; }
.breadcrumb-root { font-size: 14px; color: #6B7A99; font-weight: 500; text-decoration: none; }
.breadcrumb-root:hover { color: #1155CC; }
.breadcrumb svg { color: #C1C8D4; }
.breadcrumb-current { font-size: 14px; font-weight: 700; color: #0A1F44; }

.form-container { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; max-width: 900px; }
.form-card { background: white; border: 1px solid #E8ECF0; border-radius: 14px; padding: 1.5rem; }
.card-header { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #0A1F44; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid #F1F5F9; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group.col-2 { grid-column: span 2; }
.form-label { font-size: 12px; font-weight: 600; color: #6B7A99; text-transform: uppercase; letter-spacing: 0.4px; }
.required { color: #E53935; }
.form-input { height: 42px; padding: 0 12px; border: 1.5px solid #E8ECF0; border-radius: 9px; font-size: 14px; color: #374151; background: #F8FAFC; outline: none; transition: border-color 0.15s; }
.form-input:focus { border-color: #1155CC; background: white; }
.form-input:disabled { opacity: 0.6; cursor: not-allowed; }
.form-select { height: 42px; padding: 0 12px; border: 1.5px solid #E8ECF0; border-radius: 9px; font-size: 14px; color: #374151; background: #F8FAFC; outline: none; cursor: pointer; }
.form-select:focus { border-color: #1155CC; }

.input-pwd-wrap { position: relative; }
.input-pwd-wrap .form-input { padding-right: 40px; width: 100%; box-sizing: border-box; }
.btn-toggle-pwd { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9CA3AF; display: flex; align-items: center; }
.btn-toggle-pwd:hover { color: #374151; }

.toggle-label { display: flex; align-items: center; gap: 14px; cursor: pointer; user-select: none; padding: 0.5rem 0; }
.toggle-wrap { width: 44px; height: 24px; border-radius: 12px; background: #E8ECF0; position: relative; transition: background 0.2s; flex-shrink: 0; cursor: pointer; }
.toggle-wrap.toggle-on { background: #1155CC; }
.toggle-thumb { width: 18px; height: 18px; background: white; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
.toggle-wrap.toggle-on .toggle-thumb { transform: translateX(20px); }
.toggle-text { font-size: 14px; font-weight: 600; color: #0A1F44; display: block; }
.toggle-desc { font-size: 12px; color: #6B7A99; display: block; margin-top: 2px; }

.form-actions { display: flex; justify-content: flex-end; gap: 0.75rem; padding-bottom: 1.5rem; }

.btn-primary   { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: #1155CC; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background 0.15s; }
.btn-primary:hover { background: #0A3080; }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.btn-secondary { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: white; color: #374151; border: 1.5px solid #E8ECF0; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; }
.btn-secondary:hover { border-color: #9CA3AF; }

.loading-section { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 4rem 1.5rem; color: #6B7A99; font-size: 14px; }
.loading-spinner { width: 32px; height: 32px; border: 3px solid #E8ECF0; border-top-color: #1155CC; border-radius: 50%; animation: spin 0.8s linear infinite; }
.loading-spinner-sm { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .main-content { margin-left: 0; }
  .btn-menu-mobile { display: flex; }
  .form-container { padding: 0.75rem; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group.col-2 { grid-column: span 1; }
  .form-actions { flex-direction: column-reverse; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
}
</style>
