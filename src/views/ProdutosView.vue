<template>
  <div class="produtos-page">

    <!-- Navbar -->
    <NavBar />

    <!-- Hero -->
    <section class="produtos-hero">
      <div class="hero-content">
        <span class="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Nossa Loja
        </span>
        <h1 class="hero-title">Produtos para seu Pet</h1>
        <p class="hero-subtitle">Encontre tudo que seu pet precisa com qualidade e os melhores preços</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="produtos-container">

      <!-- Sidebar Filtros (Desktop) -->
      <aside class="filtros-sidebar">
        <div class="filtros-header">
          <h3 class="filtros-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filtros
          </h3>
          <button v-if="temFiltrosAtivos" class="btn-limpar" @click="limparFiltros">Limpar</button>
        </div>

        <!-- Busca -->
        <div class="filtro-grupo">
          <label class="filtro-label">Buscar</label>
          <div class="input-busca">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              v-model="filtros.busca"
              placeholder="Nome do produto..."
              class="filtro-input"
            />
          </div>
        </div>

        <!-- Categorias -->
        <div class="filtro-grupo">
          <label class="filtro-label">Categoria</label>
          <div class="filtro-opcoes">
            <button
              v-for="cat in categorias"
              :key="cat.id"
              class="filtro-chip"
              :class="{ 'chip-active': filtros.categoria === cat.id }"
              @click="toggleCategoria(cat.id)"
            >
              {{ cat.nome }}
            </button>
          </div>
        </div>

        <!-- Marcas -->
        <div class="filtro-grupo">
          <label class="filtro-label">Marca</label>
          <select v-model="filtros.marca" class="filtro-select">
            <option value="">Todas as marcas</option>
            <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
              {{ marca.nome }}
            </option>
          </select>
        </div>

        <!-- Preço -->
        <div class="filtro-grupo">
          <label class="filtro-label">Faixa de Preço</label>
          <div class="filtro-preco">
            <button
              v-for="faixa in faixasPreco"
              :key="faixa.id"
              class="filtro-chip"
              :class="{ 'chip-active': filtros.preco === faixa.id }"
              @click="togglePreco(faixa.id)"
            >
              {{ faixa.label }}
            </button>
          </div>
        </div>

        <!-- Ordenação -->
        <div class="filtro-grupo">
          <label class="filtro-label">Ordenar por</label>
          <select v-model="filtros.ordem" class="filtro-select">
            <option value="relevancia">Relevância</option>
            <option value="menor_preco">Menor preço</option>
            <option value="maior_preco">Maior preço</option>
            <option value="nome_az">Nome A-Z</option>
            <option value="nome_za">Nome Z-A</option>
          </select>
        </div>
      </aside>

      <!-- Produtos -->
      <main class="produtos-main">

        <!-- Barra de Filtros Mobile -->
        <div class="filtros-mobile-bar">
          <button class="btn-filtros-mobile" @click="showFiltrosMobile = true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filtros
            <span v-if="totalFiltrosAtivos" class="filtros-count">{{ totalFiltrosAtivos }}</span>
          </button>
          <div class="busca-mobile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              v-model="filtros.busca"
              placeholder="Buscar..."
              class="busca-input-mobile"
            />
          </div>
        </div>

        <!-- Resultados Info -->
        <div class="resultados-info">
          <span class="resultados-count">
            {{ produtosFiltrados.length }} produto{{ produtosFiltrados.length !== 1 ? 's' : '' }} encontrado{{ produtosFiltrados.length !== 1 ? 's' : '' }}
          </span>
          <select v-model="filtros.ordem" class="ordem-select-desktop">
            <option value="relevancia">Relevância</option>
            <option value="menor_preco">Menor preço</option>
            <option value="maior_preco">Maior preço</option>
            <option value="nome_az">Nome A-Z</option>
          </select>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <span class="loading-spinner"></span>
          <p>Carregando produtos...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="produtosFiltrados.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h3 class="empty-title">Nenhum produto encontrado</h3>
          <p class="empty-desc">Tente alterar os filtros ou buscar por outro termo</p>
          <button class="btn-limpar-empty" @click="limparFiltros">Limpar Filtros</button>
        </div>

        <!-- Grid de Produtos -->
        <div v-else class="produtos-grid">
          <router-link
            v-for="produto in produtosFiltrados"
            :key="produto.id"
            :to="gerarUrlProduto(produto)"
            class="produto-card"
          >
            <div class="produto-imagem">
              <img
                v-if="produto.foto_url"
                :src="produto.foto_url"
                :alt="produto.nome"
                class="produto-img"
              />
              <div v-else class="produto-img-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <span v-if="produto.destaque" class="badge-destaque">Destaque</span>
              <span v-if="produto.em_promocao" class="badge-promo">Promoção</span>
            </div>

            <div class="produto-info">
              <span v-if="produto.marca" class="produto-marca">{{ produto.marca.nome }}</span>
              <h3 class="produto-nome">{{ produto.nome }}</h3>
              <p v-if="produto.descricao_curta" class="produto-descricao">{{ produto.descricao_curta }}</p>

              <div class="produto-preco">
                <span v-if="produto.preco_promocional" class="preco-original">
                  R$ {{ formatPreco(produto.preco) }}
                </span>
                <span class="preco-atual">
                  R$ {{ formatPreco(produto.preco_promocional || produto.preco) }}
                </span>
              </div>

              <div class="produto-actions">
                <span class="btn-ver-produto">
                  Ver Produto
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          </router-link>
        </div>

      </main>
    </div>

    <!-- Modal Filtros Mobile -->
    <Transition name="fade">
      <div v-if="showFiltrosMobile" class="filtros-modal-overlay" @click="showFiltrosMobile = false"></div>
    </Transition>
    <Transition name="slide-up">
      <div v-if="showFiltrosMobile" class="filtros-modal">
        <div class="modal-header">
          <h3 class="modal-title">Filtros</h3>
          <button class="btn-fechar" @click="showFiltrosMobile = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <!-- Categorias -->
          <div class="filtro-grupo">
            <label class="filtro-label">Categoria</label>
            <div class="filtro-opcoes">
              <button
                v-for="cat in categorias"
                :key="cat.id"
                class="filtro-chip"
                :class="{ 'chip-active': filtros.categoria === cat.id }"
                @click="toggleCategoria(cat.id)"
              >
                {{ cat.nome }}
              </button>
            </div>
          </div>

          <!-- Marcas -->
          <div class="filtro-grupo">
            <label class="filtro-label">Marca</label>
            <select v-model="filtros.marca" class="filtro-select">
              <option value="">Todas as marcas</option>
              <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
                {{ marca.nome }}
              </option>
            </select>
          </div>

          <!-- Preço -->
          <div class="filtro-grupo">
            <label class="filtro-label">Faixa de Preço</label>
            <div class="filtro-preco">
              <button
                v-for="faixa in faixasPreco"
                :key="faixa.id"
                class="filtro-chip"
                :class="{ 'chip-active': filtros.preco === faixa.id }"
                @click="togglePreco(faixa.id)"
              >
                {{ faixa.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-limpar-modal" @click="limparFiltros">Limpar Filtros</button>
          <button class="btn-aplicar" @click="showFiltrosMobile = false">
            Ver {{ produtosFiltrados.length }} produto{{ produtosFiltrados.length !== 1 ? 's' : '' }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Footer -->
    <footer class="produtos-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="footer-logo" />
          <span class="footer-nome">4R Pet Clínica</span>
        </div>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} 4R Pet Clínica. Todos os direitos reservados.</p>
      </div>
    </footer>

    <!-- WhatsApp Flutuante -->
    <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="whatsapp-float">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import api from '@/services/api'
import Swal from 'sweetalert2'
import NavBar from '@/components/NavBar.vue'

// Estado
const loading = ref(true)
const produtos = ref([])
const categorias = ref([])
const marcas = ref([])
const showFiltrosMobile = ref(false)

// Filtros
const filtros = reactive({
  busca: '',
  categoria: '',
  marca: '',
  preco: '',
  ordem: 'relevancia'
})

const faixasPreco = [
  { id: '0-50', label: 'Até R$ 50', min: 0, max: 50 },
  { id: '50-100', label: 'R$ 50 - R$ 100', min: 50, max: 100 },
  { id: '100-200', label: 'R$ 100 - R$ 200', min: 100, max: 200 },
  { id: '200+', label: 'Acima de R$ 200', min: 200, max: Infinity }
]

const whatsappLink = 'https://wa.me/5512123456789?text=Olá! Vim pelo site e gostaria de mais informações.'

// Computed
const temFiltrosAtivos = computed(() => {
  return filtros.busca || filtros.categoria || filtros.marca || filtros.preco
})

const totalFiltrosAtivos = computed(() => {
  let count = 0
  if (filtros.categoria) count++
  if (filtros.marca) count++
  if (filtros.preco) count++
  return count
})

const produtosFiltrados = computed(() => {
  let resultado = [...produtos.value]

  // Filtro por busca
  if (filtros.busca) {
    const termo = filtros.busca.toLowerCase()
    resultado = resultado.filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      (p.descricao && p.descricao.toLowerCase().includes(termo))
    )
  }

  // Filtro por categoria
  if (filtros.categoria) {
    resultado = resultado.filter(p => p.categoria_id === filtros.categoria)
  }

  // Filtro por marca
  if (filtros.marca) {
    resultado = resultado.filter(p => p.marca_id === filtros.marca)
  }

  // Filtro por preço
  if (filtros.preco) {
    const faixa = faixasPreco.find(f => f.id === filtros.preco)
    if (faixa) {
      resultado = resultado.filter(p => {
        const preco = p.preco_promocional || p.preco
        return preco >= faixa.min && preco < faixa.max
      })
    }
  }

  // Ordenação
  switch (filtros.ordem) {
    case 'menor_preco':
      resultado.sort((a, b) => (a.preco_promocional || a.preco) - (b.preco_promocional || b.preco))
      break
    case 'maior_preco':
      resultado.sort((a, b) => (b.preco_promocional || b.preco) - (a.preco_promocional || a.preco))
      break
    case 'nome_az':
      resultado.sort((a, b) => a.nome.localeCompare(b.nome))
      break
    case 'nome_za':
      resultado.sort((a, b) => b.nome.localeCompare(a.nome))
      break
    default:
      // Relevância: destaque primeiro
      resultado.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0))
  }

  return resultado
})

// Métodos
onMounted(async () => {
  await carregarDados()
})

const carregarDados = async () => {
  try {
    // Carregar produtos, categorias e marcas em paralelo
    const [produtosRes, categoriasRes, marcasRes] = await Promise.all([
      api.get('/produtos'),
      api.get('/categorias'),
      api.get('/marcas')
    ])

    produtos.value = produtosRes.data.data || produtosRes.data || []
    categorias.value = categoriasRes.data.data || categoriasRes.data || []
    marcas.value = marcasRes.data.data || marcasRes.data || []
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    Swal.fire({
      icon: 'error',
      title: 'Erro ao carregar produtos',
      text: 'Não foi possível carregar os produtos. Tente novamente mais tarde.',
      confirmButtonColor: '#1155CC'
    })
  } finally {
    loading.value = false
  }
}

const toggleCategoria = (id) => {
  filtros.categoria = filtros.categoria === id ? '' : id
}

const togglePreco = (id) => {
  filtros.preco = filtros.preco === id ? '' : id
}

const limparFiltros = () => {
  filtros.busca = ''
  filtros.categoria = ''
  filtros.marca = ''
  filtros.preco = ''
  filtros.ordem = 'relevancia'
}

const formatPreco = (valor) => {
  if (!valor) return '0,00'
  return Number(valor).toFixed(2).replace('.', ',')
}

const gerarSlug = (nome) => {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Espaços viram hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
}

const gerarUrlProduto = (produto) => {
  const slug = gerarSlug(produto.nome)
  return `/produtos/${slug}-${produto.id}`
}

</script>

<style scoped>
/* ===== BASE ===== */
.produtos-page {
  min-height: 100vh;
  background: #F8FAFC;
}

/* ===== HERO ===== */
.produtos-hero {
  padding: 120px 1.5rem 60px;
  background: linear-gradient(135deg, #0A3080 0%, #1155CC 100%);
  text-align: center;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.75rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 15px;
  color: rgba(255,255,255,0.85);
  margin: 0;
  line-height: 1.5;
}

/* ===== CONTAINER ===== */
.produtos-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  gap: 2rem;
}

/* ===== SIDEBAR FILTROS ===== */
.filtros-sidebar {
  display: none;
  width: 260px;
  flex-shrink: 0;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.filtros-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #F1F5F9;
}

.filtros-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0;
}

.btn-limpar {
  background: none;
  border: none;
  color: #DC2626;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.filtro-grupo {
  margin-bottom: 1.5rem;
}

.filtro-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
}

.input-busca {
  position: relative;
}

.input-busca svg {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94A3B8;
}

.filtro-input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.filtro-input:focus {
  outline: none;
  border-color: #1155CC;
}

.filtro-opcoes,
.filtro-preco {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filtro-chip {
  padding: 8px 14px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}

.filtro-chip:hover {
  border-color: #1155CC;
  color: #1155CC;
}

.chip-active {
  background: #EFF6FF;
  border-color: #1155CC;
  color: #1155CC;
}

.filtro-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.filtro-select:focus {
  outline: none;
  border-color: #1155CC;
}

/* ===== MAIN ===== */
.produtos-main {
  flex: 1;
  min-width: 0;
}

/* Filtros Mobile Bar */
.filtros-mobile-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.btn-filtros-mobile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  flex-shrink: 0;
}

.filtros-count {
  background: #1155CC;
  color: white;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
}

.busca-mobile {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
}

.busca-mobile svg {
  color: #94A3B8;
  flex-shrink: 0;
}

.busca-input-mobile {
  flex: 1;
  border: none;
  padding: 10px 0;
  font-size: 14px;
}

.busca-input-mobile:focus {
  outline: none;
}

/* Resultados Info */
.resultados-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.resultados-count {
  font-size: 14px;
  color: #64748B;
}

.ordem-select-desktop {
  display: none;
  padding: 8px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 13px;
  background: white;
  cursor: pointer;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 80px 20px;
  color: #64748B;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #E2E8F0;
  border-top-color: #1155CC;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #F1F5F9;
  color: #94A3B8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 18px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 8px;
}

.empty-desc {
  font-size: 14px;
  color: #94A3B8;
  margin: 0 0 1.5rem;
}

.btn-limpar-empty {
  padding: 12px 24px;
  background: #F1F5F9;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
}

/* ===== PRODUTOS GRID ===== */
.produtos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  align-items: stretch;
}

.produto-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: all 0.2s;
  text-decoration: none;
}

.produto-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.produto-imagem {
  position: relative;
  aspect-ratio: 1;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.produto-img {
  max-width: 75%;
  max-height: 75%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.produto-img-placeholder {
  color: #CBD5E1;
}

.badge-destaque,
.badge-promo {
  position: absolute;
  top: 10px;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-destaque {
  left: 10px;
  background: linear-gradient(135deg, #F07020, #D4600A);
  color: white;
}

.badge-promo {
  right: 10px;
  background: #10B981;
  color: white;
}

.produto-info {
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.produto-marca {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.produto-nome {
  font-size: 14px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0 0 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.produto-descricao {
  display: none;
  font-size: 13px;
  color: #64748B;
  margin: 0 0 10px;
  line-height: 1.4;
}

.produto-preco {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.preco-original {
  font-size: 12px;
  color: #94A3B8;
  text-decoration: line-through;
}

.preco-atual {
  font-size: 16px;
  font-weight: 800;
  color: #10B981;
}

.produto-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.btn-ver-produto {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.produto-card:hover .btn-ver-produto {
  background: linear-gradient(135deg, #0A3080, #072060);
}

/* ===== MODAL FILTROS MOBILE ===== */
.filtros-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 200;
}

.filtros-modal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 24px 24px 0 0;
  z-index: 201;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #F1F5F9;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0;
}

.btn-fechar {
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 4px;
}

.modal-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 1rem 1.5rem;
  border-top: 1px solid #F1F5F9;
}

.btn-limpar-modal {
  flex: 1;
  padding: 14px;
  background: #F1F5F9;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
}

.btn-aplicar {
  flex: 2;
  padding: 14px;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}

/* ===== FOOTER ===== */
.produtos-footer {
  background: white;
  border-top: 1px solid #E8ECF0;
  padding: 2rem 1.5rem;
  margin-top: 3rem;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.footer-nome {
  font-size: 16px;
  font-weight: 700;
  color: #0A1F44;
}

.footer-copy {
  font-size: 13px;
  color: #94A3B8;
  margin: 0;
}

/* ===== WHATSAPP FLOAT ===== */
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37,211,102,0.4);
  z-index: 90;
  transition: transform 0.2s;
}

.whatsapp-float:hover {
  transform: scale(1.1);
}

/* ===== TABLET ===== */
@media (min-width: 640px) {
  .hero-title { font-size: 2.5rem; }

  .produtos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .produto-descricao {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 1024px) {
  .hero-title { font-size: 3rem; }

  .filtros-sidebar { display: block; }
  .filtros-mobile-bar { display: none; }

  .ordem-select-desktop { display: block; }

  .produtos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .produto-info { padding: 16px; }
  .produto-nome { font-size: 15px; }
  .preco-atual { font-size: 18px; }

  .footer-container {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* ===== DESKTOP LARGE ===== */
@media (min-width: 1280px) {
  .produtos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
