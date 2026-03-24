<template>
  <div class="cadastro-container">
    <div class="cadastro-card">
      <h2>Cadastro de Funcionário</h2>
      
      <div v-if="mensagem" :class="['mensagem', mensagemTipo]">
        {{ mensagem }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Nome Completo *</label>
          <input v-model="form.nome_completo" type="text" required />
        </div>

        <div class="form-group">
          <label>Nome Abreviado *</label>
          <input v-model="form.nome_abrev" type="text" required />
        </div>

        <div class="form-group">
          <label>Matrícula *</label>
          <input v-model="form.matricula" type="text" required />
        </div>

        <div class="form-group">
          <label>CPF *</label>
          <input v-model="form.cpf" type="text" placeholder="000.000.000-00" required />
        </div>

        <div class="form-group">
          <label>Data de Nascimento *</label>
          <input v-model="form.data_nascimento" type="date" required />
        </div>

        <div class="form-group">
          <label>Data de Admissão *</label>
          <input v-model="form.data_admissao" type="date" required />
        </div>

        <div class="form-group">
          <label>Endereço *</label>
          <textarea v-model="form.endereco" rows="3" required></textarea>
        </div>

        <div class="form-group">
          <label>Telefone *</label>
          <input v-model="form.telefone" type="tel" placeholder="(00) 00000-0000" required />
        </div>

        <div class="form-group">
          <label>Email *</label>
          <input v-model="form.email" type="email" required />
        </div>

        <div class="form-group">
          <label>Departamento *</label>
          <input v-model="form.departamento" type="text" required />
        </div>

        <div class="form-group">
          <label>Cargo *</label>
          <input v-model="form.cargo" type="text" required />
        </div>

        <div class="form-group">
          <label>Filial *</label>
          <input v-model="form.filial" type="text" required />
        </div>

        <div class="form-group">
          <label>Salário</label>
          <input v-model="form.salario" type="number" step="0.01" />
        </div>

        <div class="form-group">
          <label>Status *</label>
          <select v-model="form.status" required>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Cadastrando...' : 'Cadastrar Funcionário' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '@/services/api'

const form = reactive({
  nome_completo: '',
  nome_abrev: '',
  matricula: '',
  cpf: '',
  data_nascimento: '',
  data_admissao: '',
  endereco: '',
  telefone: '',
  email: '',
  departamento: '',
  cargo: '',
  filial: '',
  salario: null,
  status: 'ativo'
})

const loading = ref(false)
const mensagem = ref('')
const mensagemTipo = ref('')

const handleSubmit = async () => {
  loading.value = true
  mensagem.value = ''
  
  try {
    const response = await api.post('/funcionarios', form)
    mensagemTipo.value = 'sucesso'
    mensagem.value = 'Funcionário cadastrado com sucesso!'
    
    Object.keys(form).forEach(key => {
      if (key === 'status') {
        form[key] = 'ativo'
      } else {
        form[key] = key === 'salario' ? null : ''
      }
    })
    
    console.log('Funcionário criado:', response.data)
  } catch (error) {
    mensagemTipo.value = 'erro'
    if (error.response?.data?.errors) {
      const erros = Object.values(error.response.data.errors).flat()
      mensagem.value = erros.join(', ')
    } else {
      mensagem.value = 'Erro ao cadastrar funcionário. Tente novamente.'
    }
    console.error('Erro:', error.response?.data || error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cadastro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.cadastro-card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 600px;
}

h2 {
  margin-bottom: 30px;
  color: #2c3e50;
  text-align: center;
}

.mensagem {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.mensagem.sucesso {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mensagem.erro {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  resize: vertical;
  font-family: inherit;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #42b983;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  background: #38a373;
}

.btn-submit:disabled {
  background: #95d3b8;
  cursor: not-allowed;
}
</style>