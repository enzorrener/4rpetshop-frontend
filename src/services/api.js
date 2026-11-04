import axios from 'axios'

const api = axios.create({
  baseURL: 'https://4rpetshop.srv1211850.hstgr.cloud/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Modo demonstração: respostas fictícias, sem chamar o servidor real
if (import.meta.env.VITE_MOCK === 'true') {
  // Import dinâmico: o build de produção não inclui os dados fictícios
  api.defaults.adapter = async (config) => (await import('./mock/adapter')).mockAdapter(config)
  import('./mock/aviso').then((m) => m.mostrarAvisoDemo())
}

export default api
