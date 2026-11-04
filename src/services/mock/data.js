// Dados fictícios usados apenas no modo demonstração (VITE_MOCK=true).
// Nenhum dado aqui corresponde a clientes, funcionários ou veículos reais.
import fotoFachada from '@/assets/images/loja/fachada.webp'
import fotoCachorros from '@/assets/images/pets/CachorrosBrincando.jpeg'
import fotoDogMini from '@/assets/images/pets/dogMini.png'
import fotoGato from '@/assets/images/logo/LogoGato.jpg'
import fotoPassaro from '@/assets/images/logo/PassaroLogo.jpg'
import fotoCachorro from '@/assets/images/logo/LogoCachorro.jpg'

// Gera uma imagem SVG simples (data URI) para produtos e marcas
const svgImagem = (texto, cor1, cor2, simbolo = '') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${cor1}"/><stop offset="1" stop-color="${cor2}"/></linearGradient></defs>
<rect width="600" height="600" fill="url(#g)"/>
<text x="300" y="285" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" fill="rgba(255,255,255,0.9)">${simbolo}</text>
<text x="300" y="400" font-family="Arial, sans-serif" font-size="38" font-weight="700" text-anchor="middle" fill="#fff">${texto}</text>
</svg>`
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

const hoje = new Date()
const dataRelativa = (dias, hora = 9, minuto = 0) => {
  const d = new Date(hoje)
  d.setDate(d.getDate() + dias)
  d.setHours(hora, minuto, 0, 0)
  return d.toISOString()
}

export const categorias = [
  { id: 1, nome: 'Rações', ativo: true },
  { id: 2, nome: 'Petiscos', ativo: true },
  { id: 3, nome: 'Higiene', ativo: true },
  { id: 4, nome: 'Brinquedos', ativo: true },
  { id: 5, nome: 'Acessórios', ativo: true }
]

export const marcas = [
  { id: 1, nome: 'NutriPet', categoria_id: 1, ativo: true, logo_url: svgImagem('NutriPet', '#1155CC', '#3B82F6', 'N'), created_at: dataRelativa(-120) },
  { id: 2, nome: 'Bom Faro', categoria_id: 2, ativo: true, logo_url: svgImagem('Bom Faro', '#F59E0B', '#F97316', 'B'), created_at: dataRelativa(-100) },
  { id: 3, nome: 'Pelo Limpo', categoria_id: 3, ativo: true, logo_url: svgImagem('Pelo Limpo', '#10B981', '#059669', 'P'), created_at: dataRelativa(-90) },
  { id: 4, nome: 'Brinca+', categoria_id: 4, ativo: true, logo_url: svgImagem('Brinca+', '#8B5CF6', '#EC4899', 'B'), created_at: dataRelativa(-60) },
  { id: 5, nome: 'Passeio Feliz', categoria_id: 5, ativo: false, logo_url: svgImagem('Passeio Feliz', '#64748B', '#334155', 'P'), created_at: dataRelativa(-30) }
]

const produtoBase = (id, nome, marca_id, categoria_id, preco, extra = {}) => {
  const marca = marcas.find((m) => m.id === marca_id)
  const cores = [['#1155CC', '#60A5FA'], ['#F97316', '#FBBF24'], ['#10B981', '#34D399'], ['#8B5CF6', '#C084FC'], ['#EF4444', '#F87171']]
  const [c1, c2] = cores[(categoria_id - 1) % cores.length]
  return {
    id,
    nome,
    sku: `4R-${String(id).padStart(4, '0')}`,
    descricao: `${nome} da marca ${marca.nome}. Produto de demonstração com descrição completa para visualizar o layout da página de detalhes.`,
    descricao_curta: `${nome} - qualidade ${marca.nome}.`,
    marca_id,
    categoria_id,
    especie: 'cao',
    preco,
    preco_promocional: null,
    preco_custo: +(preco * 0.6).toFixed(2),
    estoque: 25,
    estoque_minimo: 5,
    unidade: 'un',
    peso: 1,
    ativo: true,
    destaque: false,
    em_promocao: false,
    foto_url: svgImagem(nome.length > 22 ? nome.slice(0, 22) + '...' : nome, c1, c2, '🐾'),
    imagens: [],
    ...extra
  }
}

export const produtos = [
  produtoBase(1, 'Ração Premium Cães Adultos 15kg', 1, 1, 249.9, { destaque: true, em_promocao: true, preco_promocional: 219.9, unidade: 'kg', peso: 15 }),
  produtoBase(2, 'Ração Gatos Castrados 3kg', 1, 1, 89.9, { especie: 'gato', unidade: 'kg', peso: 3 }),
  produtoBase(3, 'Ração Filhotes Raças Pequenas 2kg', 1, 1, 64.5, { destaque: true }),
  produtoBase(4, 'Bifinho Sabor Carne 500g', 2, 2, 29.9, { em_promocao: true, preco_promocional: 24.9 }),
  produtoBase(5, 'Petisco Dental Cães Médios', 2, 2, 34.9),
  produtoBase(6, 'Sachê Gatos Salmão 85g', 2, 2, 4.5, { especie: 'gato', estoque: 3 }),
  produtoBase(7, 'Shampoo Neutro 500ml', 3, 3, 27.9, { unidade: 'ml', peso: 0.5 }),
  produtoBase(8, 'Tapete Higiênico 30 unidades', 3, 3, 59.9, { destaque: true, unidade: 'pct' }),
  produtoBase(9, 'Areia Sanitária 4kg', 3, 3, 22.9, { especie: 'gato' }),
  produtoBase(10, 'Bolinha com Som', 4, 4, 15.9),
  produtoBase(11, 'Arranhador Torre 60cm', 4, 4, 129.9, { especie: 'gato', em_promocao: true, preco_promocional: 109.9 }),
  produtoBase(12, 'Corda Mordedor', 4, 4, 19.9),
  produtoBase(13, 'Coleira Ajustável Média', 5, 5, 39.9),
  produtoBase(14, 'Guia Retrátil 5m', 5, 5, 74.9, { estoque: 0 }),
  produtoBase(15, 'Comedouro Inox Duplo', 5, 5, 49.9, { ativo: false })
]

export const noticias = [
  {
    id: 1,
    titulo: 'Campanha de vacinação antirrábica',
    subtitulo: 'Vacinação gratuita para cães e gatos neste mês',
    conteudo: 'Durante todo o mês a clínica realiza a campanha de vacinação. Traga a carteirinha do seu pet e agende um horário.\n\nTexto de demonstração.',
    categoria: 'noticia',
    publicado: true,
    destaque: true,
    foto_capa_url: fotoCachorros,
    fotos: [],
    publicado_em: dataRelativa(-2),
    created_at: dataRelativa(-3)
  },
  {
    id: 2,
    titulo: 'Como cuidar dos dentes do seu pet',
    subtitulo: 'Escovação e petiscos dentais fazem diferença',
    conteudo: 'A saúde bucal evita diversas doenças. Escove os dentes do seu pet ao menos três vezes por semana.\n\nTexto de demonstração.',
    categoria: 'dica',
    publicado: true,
    destaque: false,
    foto_capa_url: fotoDogMini,
    fotos: [],
    publicado_em: dataRelativa(-6),
    created_at: dataRelativa(-7)
  },
  {
    id: 3,
    titulo: 'Gatos dormem até 16 horas por dia',
    subtitulo: 'Entenda o motivo',
    conteudo: 'O sono prolongado é natural para felinos e ajuda a conservar energia.\n\nTexto de demonstração.',
    categoria: 'curiosidade',
    publicado: true,
    destaque: false,
    foto_capa_url: fotoGato,
    fotos: [],
    publicado_em: dataRelativa(-10),
    created_at: dataRelativa(-11)
  },
  {
    id: 4,
    titulo: 'Banho e tosa com 20% de desconto',
    subtitulo: 'Válido de segunda a quarta',
    conteudo: 'Aproveite a promoção de banho e tosa no início da semana.\n\nTexto de demonstração.',
    categoria: 'promocao',
    publicado: true,
    destaque: false,
    foto_capa_url: fotoFachada,
    fotos: [],
    publicado_em: dataRelativa(-14),
    created_at: dataRelativa(-15)
  },
  {
    id: 5,
    titulo: 'Cuidados com aves no inverno',
    subtitulo: 'Rascunho ainda não publicado',
    conteudo: 'Mantenha a gaiola protegida de correntes de ar.\n\nTexto de demonstração.',
    categoria: 'dica',
    publicado: false,
    destaque: false,
    foto_capa_url: fotoPassaro,
    fotos: [],
    publicado_em: null,
    created_at: dataRelativa(-1)
  }
]

export const clientes = [
  {
    id: 1,
    primeiro_nome: 'Maria',
    segundo_nome: 'Demo',
    ultimo_nome: 'Silva',
    sobrenome: 'Silva',
    nome: 'Maria Demo Silva',
    email: 'maria@exemplo.com',
    telefone: '(12) 90000-0001',
    cep: '12200-000',
    endereco: 'Rua Exemplo',
    numero: '100',
    bairro: 'Centro',
    complemento: '',
    foto_cliente: null,
    created_at: dataRelativa(-200)
  },
  {
    id: 2,
    primeiro_nome: 'João',
    segundo_nome: 'Teste',
    ultimo_nome: 'Souza',
    sobrenome: 'Souza',
    nome: 'João Teste Souza',
    email: 'joao@exemplo.com',
    telefone: '(12) 90000-0002',
    cep: '12200-100',
    endereco: 'Avenida Modelo',
    numero: '250',
    bairro: 'Jardim',
    complemento: 'Apto 12',
    foto_cliente: null,
    created_at: dataRelativa(-150)
  },
  {
    id: 3,
    primeiro_nome: 'Ana',
    segundo_nome: 'Fictícia',
    ultimo_nome: 'Lima',
    sobrenome: 'Lima',
    nome: 'Ana Fictícia Lima',
    email: 'ana@exemplo.com',
    telefone: '(12) 90000-0003',
    cep: '12200-200',
    endereco: 'Travessa Teste',
    numero: '45',
    bairro: 'Vila Nova',
    complemento: '',
    foto_cliente: null,
    created_at: dataRelativa(-40)
  }
]

export const pets = [
  { id: 1, cliente_id: 1, nome_pet: 'Thor', especie: 1, raca: 'Golden Retriever', genero: 1, data_nascimento: '2020-05-10', peso_kg: 32, observacoes_cuidados: 'Alergia a frango.', foto_url: fotoCachorro },
  { id: 2, cliente_id: 1, nome_pet: 'Mia', especie: 2, raca: 'Siamês', genero: 2, data_nascimento: '2021-09-02', peso_kg: 4.2, observacoes_cuidados: '', foto_url: fotoGato },
  { id: 3, cliente_id: 1, nome_pet: 'Piu', especie: 3, raca: 'Calopsita', genero: 1, data_nascimento: '2023-01-15', peso_kg: 0.1, observacoes_cuidados: '', foto_url: fotoPassaro },
  { id: 4, cliente_id: 2, nome_pet: 'Bidu', especie: 1, raca: 'Spitz Alemão', genero: 1, data_nascimento: '2022-03-20', peso_kg: 3.5, observacoes_cuidados: '', foto_url: fotoDogMini },
  { id: 5, cliente_id: 3, nome_pet: 'Luna', especie: 2, raca: 'SRD', genero: 2, data_nascimento: '2019-11-11', peso_kg: 5, observacoes_cuidados: 'Medicação diária.', foto_url: null }
]

export const funcionarios = [
  { id: 1, nome_completo: 'Administrador Demonstração', nome_abrev: 'Admin Demo', nome_usuario: 'admin', matricula: 'F001', cpf: '000.000.000-01', data_nascimento: '1990-01-01', data_admissao: '2020-02-01', endereco: 'Rua Exemplo, 1', telefone: '(12) 90000-1001', email: 'admin@exemplo.com', departamento: 'Administração', cargo: 'Gerente', filial: 'Matriz', salario: 6500, status: 'ativo', admin: true },
  { id: 2, nome_completo: 'Carla Veterinária Exemplo', nome_abrev: 'Dra. Carla', nome_usuario: 'carla', matricula: 'F002', cpf: '000.000.000-02', data_nascimento: '1988-06-12', data_admissao: '2021-03-15', endereco: 'Rua Exemplo, 2', telefone: '(12) 90000-1002', email: 'carla@exemplo.com', departamento: 'Clínica', cargo: 'Veterinária', filial: 'Matriz', salario: 8000, status: 'ativo', admin: false },
  { id: 3, nome_completo: 'Pedro Motorista Exemplo', nome_abrev: 'Pedro', nome_usuario: 'pedro', matricula: 'F003', cpf: '000.000.000-03', data_nascimento: '1995-09-30', data_admissao: '2022-08-01', endereco: 'Rua Exemplo, 3', telefone: '(12) 90000-1003', email: 'pedro@exemplo.com', departamento: 'Logística', cargo: 'Motorista', filial: 'Matriz', salario: 3200, status: 'ativo', admin: false },
  { id: 4, nome_completo: 'Lucas Tosador Exemplo', nome_abrev: 'Lucas', nome_usuario: 'lucas', matricula: 'F004', cpf: '000.000.000-04', data_nascimento: '1999-12-05', data_admissao: '2023-01-10', endereco: 'Rua Exemplo, 4', telefone: '(12) 90000-1004', email: 'lucas@exemplo.com', departamento: 'Estética', cargo: 'Tosador', filial: 'Filial 2', salario: 2800, status: 'inativo', admin: false }
]

export const veiculos = [
  { id: 1, placa: 'ABC1D23', modelo: 'Fiat Fiorino', identificacao: 'Van 01', tipo: 'proprio', rastreador_id: 'TRK-001', ativo: true },
  { id: 2, placa: 'XYZ4E56', modelo: 'Renault Kangoo', identificacao: 'Van 02', tipo: 'proprio', rastreador_id: 'TRK-002', ativo: true },
  { id: 3, placa: 'DEF7G89', modelo: 'Honda CG 160', identificacao: 'Moto 01', tipo: 'terceiro', rastreador_id: 'TRK-003', ativo: false }
]

// Posições fictícias em São José dos Campos (SP)
export const posicoes = [
  { vehicleId: 1, veiculo_id: 1, plate: 'ABC1D23', label: 'Van 01', deviceModel: 'GT06', latitude: '-23.1896', longitude: '-45.8841', speed: 42, ignition: 'ON', address: 'Av. Exemplo, Centro' },
  { vehicleId: 2, veiculo_id: 2, plate: 'XYZ4E56', label: 'Van 02', deviceModel: 'GT06', latitude: '-23.2105', longitude: '-45.8990', speed: 0, ignition: 'OFF', address: 'Rua Modelo, Jardim' }
]

export const trajetos = [
  { id: 1, tipo_servico: 'buscar_pet', status: 'em_andamento', cliente_id: 1, pet_id: 1, veiculo_id: 1, data_hora_agendada: dataRelativa(0, 9), data_hora_inicio: dataRelativa(0, 9, 5), data_hora_fim: null, observacoes: 'Portão azul.', eventos: [{ id: 1, tipo_evento: 'saiu_empresa', data_hora_evento: dataRelativa(0, 9, 5) }] },
  { id: 2, tipo_servico: 'entregar_pet', status: 'agendado', cliente_id: 2, pet_id: 4, veiculo_id: 2, data_hora_agendada: dataRelativa(0, 15), data_hora_inicio: null, data_hora_fim: null, observacoes: '', eventos: [] },
  { id: 3, tipo_servico: 'consulta', status: 'agendado', cliente_id: 3, pet_id: 5, veiculo_id: 1, data_hora_agendada: dataRelativa(1, 10), data_hora_inicio: null, data_hora_fim: null, observacoes: '', eventos: [] },
  { id: 4, tipo_servico: 'buscar_pet', status: 'concluido', cliente_id: 1, pet_id: 2, veiculo_id: 2, data_hora_agendada: dataRelativa(-1, 8), data_hora_inicio: dataRelativa(-1, 8, 2), data_hora_fim: dataRelativa(-1, 9, 10), observacoes: '', eventos: [
    { id: 2, tipo_evento: 'saiu_empresa', data_hora_evento: dataRelativa(-1, 8, 2) },
    { id: 3, tipo_evento: 'chegou_cliente', data_hora_evento: dataRelativa(-1, 8, 25) },
    { id: 4, tipo_evento: 'saiu_cliente', data_hora_evento: dataRelativa(-1, 8, 35) },
    { id: 5, tipo_evento: 'chegou_empresa', data_hora_evento: dataRelativa(-1, 9, 10) }
  ] },
  { id: 5, tipo_servico: 'emergencia', status: 'cancelado', cliente_id: 2, pet_id: 4, veiculo_id: 1, data_hora_agendada: dataRelativa(-3, 20), data_hora_inicio: null, data_hora_fim: null, observacoes: 'Cancelado pelo cliente.', eventos: [] }
]

export const alertas = [
  { id: 1, titulo: 'Vacina V10 - reforço anual', pet_nome: 'Thor', pet_foto: fotoCachorro, tipo: 'Vacina', dias_restantes: 'Em 5 dias', local: '4R Pet Clínica - Matriz' }
]

export const favoritos = []
