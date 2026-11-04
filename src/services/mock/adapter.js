// Adapter do axios que simula a API no modo demonstração (VITE_MOCK=true).
// Os dados ficam no localStorage do navegador, então criar, editar e excluir
// funciona normalmente e cada visitante tem a própria cópia.
import { AxiosError } from 'axios'
import * as seed from './data'

const STORAGE_KEY = 'mock_db_v1'
const COLECOES = ['categorias', 'marcas', 'produtos', 'noticias', 'clientes', 'pets', 'funcionarios', 'veiculos', 'posicoes', 'trajetos', 'alertas', 'favoritos']

const carregarDb = () => {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (salvo) return salvo
  } catch {
    // ignora e recria a base
  }
  const db = {}
  COLECOES.forEach((c) => { db[c] = JSON.parse(JSON.stringify(seed[c])) })
  return db
}

let db = carregarDb()

const salvarDb = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch {
    // limite do localStorage atingido (ex.: muitas fotos); mantém em memória
  }
}

export const resetarDemo = () => {
  localStorage.removeItem(STORAGE_KEY)
  db = carregarDb()
}

const proximoId = (lista) => lista.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1

// Campos de arquivo do formulário -> campo de URL retornado pela API
const CAMPOS_ARQUIVO = {
  foto: 'foto_url',
  foto_pet: 'foto_url',
  foto_capa: 'foto_capa_url',
  logo_marca: 'logo_url',
  foto_cliente: 'foto_cliente'
}

const arquivoParaDataUrl = (arquivo) =>
  new Promise((resolve) => {
    const leitor = new FileReader()
    leitor.onload = () => resolve(leitor.result)
    leitor.onerror = () => resolve(null)
    leitor.readAsDataURL(arquivo)
  })

const normalizarValor = (valor) => {
  if (valor === 'true') return true
  if (valor === 'false') return false
  return valor
}

const lerCorpo = async (data) => {
  if (!data) return {}
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const corpo = {}
    for (const [chave, valor] of data.entries()) {
      if (typeof File !== 'undefined' && valor instanceof File) {
        const campo = CAMPOS_ARQUIVO[chave] || chave
        corpo[campo] = await arquivoParaDataUrl(valor)
      } else {
        corpo[chave] = normalizarValor(valor)
      }
    }
    return corpo
  }
  if (typeof data === 'string') {
    try { return JSON.parse(data) } catch { return {} }
  }
  return { ...data }
}

const booleanos = ['ativo', 'destaque', 'em_promocao', 'publicado', 'admin']
const numericos = ['marca_id', 'categoria_id', 'preco', 'preco_promocional', 'preco_custo', 'estoque', 'estoque_minimo', 'peso', 'peso_kg', 'especie', 'genero', 'veiculo_id', 'cliente_id', 'pet_id', 'salario']

const limparCorpo = (corpo) => {
  const limpo = { ...corpo }
  delete limpo._method
  delete limpo.password
  delete limpo.password_confirmation
  delete limpo.remover_logo
  booleanos.forEach((c) => {
    if (c in limpo) limpo[c] = limpo[c] === true || limpo[c] === 1 || limpo[c] === '1'
  })
  numericos.forEach((c) => {
    if (c in limpo && limpo[c] !== '' && limpo[c] !== null && !isNaN(Number(limpo[c]))) limpo[c] = Number(limpo[c])
    else if (c in limpo && limpo[c] === '') limpo[c] = null
  })
  return limpo
}

// Relacionamentos que a API real devolve aninhados
const comRelacoes = {
  produtos: (p) => ({
    ...p,
    marca: db.marcas.find((m) => m.id === p.marca_id) || null,
    categoria: db.categorias.find((c) => c.id === p.categoria_id) || null
  }),
  trajetos: (t) => ({
    ...t,
    cliente: db.clientes.find((c) => c.id === t.cliente_id) || null,
    pet: db.pets.find((p) => p.id === t.pet_id) || null,
    veiculo: db.veiculos.find((v) => v.id === t.veiculo_id) || null
  }),
  clientes: (c) => ({ ...c, pets: db.pets.filter((p) => p.cliente_id === c.id) })
}

const expandir = (colecao, item) => (comRelacoes[colecao] ? comRelacoes[colecao](item) : item)

const clienteLogado = () => {
  try {
    const salvo = JSON.parse(localStorage.getItem('cliente'))
    if (salvo?.id) return db.clientes.find((c) => c.id === salvo.id) || db.clientes[0]
  } catch {
    // sem cliente salvo
  }
  return db.clientes[0]
}

const mesmoDia = (iso, ref = new Date()) => {
  if (!iso) return false
  const d = new Date(iso)
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate()
}

class RespostaErro {
  constructor(status, data) {
    this.status = status
    this.data = data
  }
}

const naoEncontrado = () => { throw new RespostaErro(404, { message: 'Registro não encontrado (demonstração).' }) }

const buscar = (colecao, id) => {
  const item = db[colecao].find((i) => String(i.id) === String(id))
  if (!item) naoEncontrado()
  return item
}

const criar = (colecao, corpo, extra = {}) => {
  const item = { id: proximoId(db[colecao]), ...limparCorpo(corpo), ...extra }
  db[colecao].push(item)
  salvarDb()
  return item
}

const atualizar = (colecao, id, corpo) => {
  const item = buscar(colecao, id)
  Object.assign(item, limparCorpo(corpo))
  salvarDb()
  return item
}

const remover = (colecao, id) => {
  buscar(colecao, id)
  db[colecao] = db[colecao].filter((i) => String(i.id) !== String(id))
  salvarDb()
  return { message: 'Removido com sucesso.' }
}

// CRUD padrão para uma coleção em um prefixo de URL
const crud = (prefixo, colecao, opcoes = {}) => [
  ['get', new RegExp(`^${prefixo}$`), () => ({ data: db[colecao].map((i) => expandir(colecao, i)) })],
  ['get', new RegExp(`^${prefixo}/(\\d+)$`), (_, [id]) => ({ data: expandir(colecao, buscar(colecao, id)) })],
  ['post', new RegExp(`^${prefixo}$`), (corpo) => ({ data: expandir(colecao, criar(colecao, corpo, opcoes.extraCriar?.(corpo))), message: 'Criado com sucesso.' })],
  ['post', new RegExp(`^${prefixo}/(\\d+)$`), (corpo, [id]) => ({ data: expandir(colecao, atualizar(colecao, id, corpo)), message: 'Atualizado com sucesso.' })],
  ['put', new RegExp(`^${prefixo}/(\\d+)$`), (corpo, [id]) => ({ data: expandir(colecao, atualizar(colecao, id, corpo)), message: 'Atualizado com sucesso.' })],
  ['delete', new RegExp(`^${prefixo}/(\\d+)$`), (_, [id]) => remover(colecao, id)]
]

const adicionarEvento = (id, tipo_evento) => {
  const trajeto = buscar('trajetos', id)
  trajeto.eventos = trajeto.eventos || []
  trajeto.eventos.push({ id: Date.now(), tipo_evento, data_hora_evento: new Date().toISOString() })
  salvarDb()
  return trajeto
}

const tokenFalso = () => 'demo-token-' + Date.now()

const rotas = [
  // Autenticação
  ['post', /^\/login$/, (corpo) => {
    const cliente = db.clientes.find((c) => c.email === corpo.email) || db.clientes[0]
    return { access_token: tokenFalso(), token_type: 'Bearer', cliente }
  }],
  ['post', /^\/login\/funcionario$/, (corpo) => {
    const funcionario = db.funcionarios.find((f) => f.nome_usuario === corpo.nome_login) || db.funcionarios[0]
    return { access_token: tokenFalso(), token_type: 'Bearer', funcionario }
  }],
  ['post', /^\/logout$/, () => ({ message: 'Logout realizado.' })],
  ['post', /^\/forgot-password$/, () => ({ message: 'Se o e-mail existir, enviaremos o link de redefinição (demonstração).' })],
  ['post', /^\/validate-reset-token$/, () => ({ valid: true, message: 'Token válido.' })],
  ['post', /^\/reset-password$/, () => ({ message: 'Senha redefinida com sucesso (demonstração).' })],
  ['get', /^\/me$/, () => ({ ...clienteLogado(), pets: db.pets.filter((p) => p.cliente_id === clienteLogado().id) })],

  // Área do cliente
  ['get', /^\/pets$/, () => db.pets.filter((p) => p.cliente_id === clienteLogado().id)],
  ['get', /^\/pets\/(\d+)$/, (_, [id]) => buscar('pets', id)],
  ['post', /^\/pets$/, (corpo) => ({ data: criar('pets', corpo, { cliente_id: Number(corpo.cliente_id) || clienteLogado().id }), message: 'Pet cadastrado.' })],
  ['post', /^\/pets\/(\d+)$/, (corpo, [id]) => ({ data: atualizar('pets', id, corpo), message: 'Pet atualizado.' })],
  ['delete', /^\/pets\/(\d+)$/, (_, [id]) => remover('pets', id)],
  ['get', /^\/alertas$/, () => ({ data: db.alertas })],
  ['get', /^\/favoritos$/, () => ({ data: db.favoritos })],
  ['post', /^\/clientes\/(\d+)$/, (corpo, [id]) => {
    const cliente = atualizar('clientes', id, corpo)
    cliente.nome = [cliente.primeiro_nome, cliente.segundo_nome].filter(Boolean).join(' ')
    salvarDb()
    return { message: 'Perfil atualizado.', cliente }
  }],
  ['post', /^\/clientes$/, (corpo) => ({ data: criar('clientes', corpo, { nome: [corpo.primeiro_nome, corpo.segundo_nome].filter(Boolean).join(' '), created_at: new Date().toISOString() }), message: 'Cadastro realizado.' })],
  ['get', /^\/clientes$/, () => ({ data: db.clientes.map((c) => expandir('clientes', c)) })],
  ['get', /^\/clientes\/(\d+)\/pets$/, (_, [id]) => ({ data: db.pets.filter((p) => String(p.cliente_id) === String(id)) })],

  // Loja e conteúdo público
  ['get', /^\/noticias$/, () => ({ data: db.noticias.filter((n) => n.publicado) })],
  ['get', /^\/categorias$/, () => ({ data: db.categorias })],
  ['get', /^\/marcas$/, () => ({ data: db.marcas.filter((m) => m.ativo) })],
  ['get', /^\/produtos$/, (_, __, params) => {
    let lista = db.produtos.filter((p) => p.ativo)
    if (params.categoria_id) lista = lista.filter((p) => String(p.categoria_id) === String(params.categoria_id))
    if (params.limit) lista = lista.slice(0, Number(params.limit))
    return { data: lista.map((p) => expandir('produtos', p)) }
  }],

  // Produtos: categorias e marcas (admin)
  ['get', /^\/produtos\/categorias(\/ativas)?$/, () => ({ data: db.categorias })],
  ...crud('/produtos/marcas', 'marcas', { extraCriar: () => ({ created_at: new Date().toISOString() }) }),
  ['get', /^\/produtos\/(\d+)$/, (_, [id]) => ({ data: expandir('produtos', buscar('produtos', id)) })],
  ...crud('/admin/produtos', 'produtos'),

  // Notícias (admin)
  ['post', /^\/admin\/noticias\/(\d+)\/publicar$/, (_, [id]) => {
    const noticia = buscar('noticias', id)
    noticia.publicado = !noticia.publicado
    noticia.publicado_em = noticia.publicado ? new Date().toISOString() : null
    salvarDb()
    return { data: noticia, publicado: noticia.publicado }
  }],
  ...crud('/admin/noticias', 'noticias', { extraCriar: (c) => ({ created_at: new Date().toISOString(), publicado_em: c.publicado === '1' ? new Date().toISOString() : null, fotos: [] }) }),

  // Funcionários
  ...crud('/funcionarios', 'funcionarios'),

  // Veículos e rastreamento
  ['get', /^\/veiculos\/ativos$/, () => ({ data: db.veiculos.filter((v) => v.ativo) })],
  ['post', /^\/veiculos\/sincronizar$/, () => ({ message: 'Veículos sincronizados (demonstração).' })],
  ...crud('/veiculos', 'veiculos'),
  ['get', /^\/posicoes\/tempo-real$/, () => {
    // Pequena variação para simular movimento
    db.posicoes.forEach((p) => {
      if (p.ignition === 'ON') {
        p.latitude = String((parseFloat(p.latitude) + (Math.random() - 0.5) * 0.002).toFixed(6))
        p.longitude = String((parseFloat(p.longitude) + (Math.random() - 0.5) * 0.002).toFixed(6))
        p.speed = Math.round(20 + Math.random() * 40)
      }
    })
    return { data: db.posicoes }
  }],

  // Trajetos
  ['get', /^\/trajetos\/hoje$/, () => ({ data: db.trajetos.filter((t) => mesmoDia(t.data_hora_agendada)).map((t) => expandir('trajetos', t)) })],
  ['get', /^\/trajetos\/em-andamento$/, () => ({ data: db.trajetos.filter((t) => t.status === 'em_andamento').map((t) => expandir('trajetos', t)) })],
  ['post', /^\/trajetos\/(\d+)\/iniciar$/, (_, [id]) => {
    const t = buscar('trajetos', id)
    t.status = 'em_andamento'
    t.data_hora_inicio = new Date().toISOString()
    salvarDb()
    return { data: expandir('trajetos', t), message: 'Trajeto iniciado.' }
  }],
  ['post', /^\/trajetos\/(\d+)\/eventos$/, (corpo, [id]) => ({ data: expandir('trajetos', adicionarEvento(id, corpo.tipo_evento)), message: 'Evento registrado.' })],
  ['post', /^\/trajetos\/(\d+)\/finalizar$/, (_, [id]) => {
    const t = buscar('trajetos', id)
    t.status = 'concluido'
    t.data_hora_fim = new Date().toISOString()
    salvarDb()
    return { data: expandir('trajetos', t), message: 'Trajeto finalizado.' }
  }],
  ['post', /^\/trajetos\/(\d+)\/cancelar$/, (_, [id]) => {
    const t = buscar('trajetos', id)
    t.status = 'cancelado'
    salvarDb()
    return { data: expandir('trajetos', t), message: 'Trajeto cancelado.' }
  }],
  ...crud('/trajetos', 'trajetos', { extraCriar: () => ({ status: 'agendado', eventos: [], data_hora_inicio: null, data_hora_fim: null }) })
]

const atraso = () => new Promise((r) => setTimeout(r, 250))

export const mockAdapter = async (config) => {
  await atraso()

  const metodo = (config.method || 'get').toLowerCase()
  const url = (config.url || '').replace(config.baseURL || '', '')
  const [caminho, query = ''] = url.split('?')
  const params = { ...Object.fromEntries(new URLSearchParams(query)), ...(config.params || {}) }
  const rota = rotas.find(([m, regex]) => m === metodo && regex.test(caminho))

  const responder = (status, data) => ({ data, status, statusText: String(status), headers: {}, config, request: {} })

  try {
    if (!rota) naoEncontrado()
    const corpo = await lerCorpo(config.data)
    const match = caminho.match(rota[1]).slice(1)
    const resultado = rota[2](corpo, match, params)
    return responder(metodo === 'post' && !match.length ? 201 : 200, resultado)
  } catch (erroOriginal) {
    let erro = erroOriginal
    if (!(erro instanceof RespostaErro)) {
      console.error('[mock] erro inesperado:', erro)
      erro = new RespostaErro(500, { message: 'Erro na simulação da API.' })
    }
    const resposta = responder(erro.status, erro.data)
    throw new AxiosError(erro.data.message, String(erro.status), config, {}, resposta)
  }
}
