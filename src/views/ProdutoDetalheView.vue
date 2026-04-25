<template>
  <div class="produto-detalhe-page">

    <!-- Navbar -->
    <NavBar />

    <!-- Breadcrumb -->
    <div class="breadcrumb-container">
      <div class="breadcrumb">
        <router-link to="/" class="breadcrumb-link">Início</router-link>
        <span class="breadcrumb-sep">/</span>
        <router-link to="/produtos" class="breadcrumb-link">Produtos</router-link>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">{{ produto?.nome || 'Carregando...' }}</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="loading-state">
        <span class="loading-spinner"></span>
        <p>Carregando produto...</p>
      </div>
    </div>

    <!-- Produto não encontrado -->
    <div v-else-if="!produto" class="not-found-container">
      <div class="not-found">
        <div class="not-found-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 class="not-found-title">Produto não encontrado</h2>
        <p class="not-found-desc">O produto que você está procurando não existe ou foi removido.</p>
        <router-link to="/produtos" class="btn-voltar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
          </svg>
          Ver todos os produtos
        </router-link>
      </div>
    </div>

    <!-- Conteúdo do Produto -->
    <main v-else class="produto-container">
      <div class="produto-layout">

        <!-- Galeria de Imagens -->
        <div class="produto-galeria">
          <div
            class="galeria-principal"
            @mousemove="handleZoom"
            @mouseleave="resetZoom"
            @mouseenter="zoomActive = true"
          >
            <img
              v-if="imagemAtual"
              ref="imagemRef"
              :src="imagemAtual"
              :alt="produto.nome"
              class="imagem-principal"
              :style="zoomStyle"
            />
            <div v-else class="imagem-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>

            <!-- Ícone de Lupa -->
            <div v-if="imagemAtual" class="zoom-hint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </div>

            <!-- Badges -->
            <div class="badges-container">
              <span v-if="produto.destaque" class="badge badge-destaque">Destaque</span>
              <span v-if="produto.em_promocao" class="badge badge-promo">
                -{{ calcularDesconto }}%
              </span>
            </div>
          </div>

          <!-- Thumbnails -->
          <div v-if="produto.imagens && produto.imagens.length > 1" class="galeria-thumbs">
            <button
              v-for="(img, index) in produto.imagens"
              :key="index"
              class="thumb-btn"
              :class="{ 'thumb-active': imagemAtual === img }"
              @click="imagemAtual = img"
            >
              <img :src="img" :alt="`${produto.nome} - ${index + 1}`" class="thumb-img" />
            </button>
          </div>
        </div>

        <!-- Informações do Produto -->
        <div class="produto-info">
          <!-- Marca -->
          <span v-if="produto.marca" class="produto-marca">{{ produto.marca.nome }}</span>

          <!-- Nome -->
          <h1 class="produto-nome">{{ produto.nome }}</h1>

          <!-- SKU e Código -->
          <div class="produto-codigos">
            <span v-if="produto.sku" class="codigo-item">SKU: {{ produto.sku }}</span>
            <span class="codigo-item">Cód: {{ produto.id }}</span>
          </div>

          <!-- Avaliação (placeholder) -->
          <div class="produto-rating">
            <div class="stars">
              <svg v-for="i in 5" :key="i" width="16" height="16" viewBox="0 0 24 24" :fill="i <= 4 ? '#F59E0B' : 'none'" :stroke="i <= 4 ? '#F59E0B' : '#CBD5E1'" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span class="rating-text">4.0 (12 avaliações)</span>
          </div>

          <!-- Preço -->
          <div class="produto-preco-box">
            <div v-if="produto.preco_promocional" class="preco-de">
              <span class="preco-label">De:</span>
              <span class="preco-riscado">R$ {{ formatPreco(produto.preco) }}</span>
            </div>
            <div class="preco-por">
              <span v-if="produto.preco_promocional" class="preco-label">Por:</span>
              <span class="preco-atual">R$ {{ formatPreco(produto.preco_promocional || produto.preco) }}</span>
            </div>
            <span v-if="produto.preco_promocional" class="economia-badge">
              Economia de R$ {{ formatPreco(produto.preco - produto.preco_promocional) }}
            </span>
          </div>

          <!-- Descrição Curta -->
          <p v-if="produto.descricao_curta" class="produto-descricao-curta">
            {{ produto.descricao_curta }}
          </p>

          <!-- Estoque -->
          <div v-if="produto.estoque !== undefined && produto.estoque !== null" class="produto-estoque">
            <span v-if="produto.estoque > 10" class="estoque-status estoque-disponivel">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Em estoque
            </span>
            <span v-else-if="produto.estoque > 0" class="estoque-status estoque-baixo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Últimas {{ produto.estoque }} unidades
            </span>
            <span v-else class="estoque-status estoque-esgotado">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Produto esgotado
            </span>
          </div>

          <!-- Ações -->
          <div class="produto-actions">
            <button
              class="btn-adicionar-carrinho"
              :class="{ 'added': itemAdicionado }"
              @click="adicionarAoCarrinho"
              :disabled="itemAdicionado"
            >
              <svg v-if="!itemAdicionado" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ itemAdicionado ? 'Adicionado!' : 'Adicionar ao Carrinho' }}
            </button>
            <button class="btn-compartilhar" @click="compartilhar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>

          <!-- Categoria -->
          <div v-if="produto.categoria" class="produto-categoria">
            <span class="categoria-label">Categoria:</span>
            <router-link :to="`/produtos?categoria=${produto.categoria.id}`" class="categoria-link">
              {{ produto.categoria.nome }}
            </router-link>
          </div>

          <!-- Informações de Entrega -->
          <div class="info-cards">
            <div class="info-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <div class="info-card-text">
                <span class="info-card-title">Entrega</span>
                <span class="info-card-desc">Consulte via WhatsApp</span>
              </div>
            </div>
            <div class="info-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div class="info-card-text">
                <span class="info-card-title">Garantia</span>
                <span class="info-card-desc">Produto original</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Descrição Completa -->
      <section v-if="produto.descricao" class="descricao-section">
        <h2 class="section-title">Descrição do Produto</h2>
        <div class="descricao-content" v-html="produto.descricao"></div>
      </section>

      <!-- Produtos Relacionados -->
      <section v-if="produtosRelacionados.length > 0" class="relacionados-section">
        <h2 class="section-title">Produtos Relacionados</h2>
        <div class="relacionados-grid">
          <router-link
            v-for="prod in produtosRelacionados"
            :key="prod.id"
            :to="gerarUrlProduto(prod)"
            class="relacionado-card"
          >
            <div class="relacionado-img">
              <img v-if="prod.foto_url" :src="prod.foto_url" :alt="prod.nome" />
              <div v-else class="img-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
            </div>
            <div class="relacionado-info">
              <span class="relacionado-nome">{{ prod.nome }}</span>
              <span class="relacionado-preco">R$ {{ formatPreco(prod.preco_promocional || prod.preco) }}</span>
            </div>
          </router-link>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="produto-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="footer-logo" />
          <span class="footer-nome">4R Pet Clínica</span>
        </div>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} 4R Pet Clínica. Todos os direitos reservados.</p>
      </div>
    </footer>

    <!-- WhatsApp Flutuante -->
    <a :href="whatsappGeral" target="_blank" rel="noopener noreferrer" class="whatsapp-float">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

// Estado
const loading = ref(true)
const produto = ref(null)
const produtosRelacionados = ref([])
const imagemAtual = ref(null)
const imagemRef = ref(null)
const itemAdicionado = ref(false)

// Zoom
const zoomActive = ref(false)
const zoomX = ref(50)
const zoomY = ref(50)

const whatsappGeral = 'https://wa.me/5512123456789?text=Olá! Vim pelo site e gostaria de mais informações.'

// Computed
const calcularDesconto = computed(() => {
  if (!produto.value?.preco_promocional) return 0
  const desconto = ((produto.value.preco - produto.value.preco_promocional) / produto.value.preco) * 100
  return Math.round(desconto)
})

const zoomStyle = computed(() => {
  if (!zoomActive.value) {
    return {
      transform: 'scale(1)',
      transformOrigin: 'center center'
    }
  }
  return {
    transform: 'scale(2)',
    transformOrigin: `${zoomX.value}% ${zoomY.value}%`
  }
})

// Métodos
onMounted(() => {
  carregarProduto()
})

// Watch para recarregar quando a rota mudar
watch(() => route.params.slug, () => {
  carregarProduto()
})

const extrairIdDoSlug = (slug) => {
  // O ID está no final do slug, após o último hífen
  // Ex: "racao-premium-teste-123" -> 123
  const partes = slug.split('-')
  const ultimaParte = partes[partes.length - 1]
  const id = parseInt(ultimaParte)
  return isNaN(id) ? null : id
}

const carregarProduto = async () => {
  loading.value = true
  produto.value = null
  produtosRelacionados.value = []

  try {
    const slug = route.params.slug
    const produtoId = extrairIdDoSlug(slug)

    if (!produtoId) {
      loading.value = false
      return
    }

    // Buscar produto da API
    const response = await api.get(`/produtos/${produtoId}`)
    produto.value = response.data.data || response.data

    // Definir imagem atual
    if (produto.value.foto_url) {
      imagemAtual.value = produto.value.foto_url
    } else if (produto.value.imagens && produto.value.imagens.length > 0) {
      imagemAtual.value = produto.value.imagens[0]
    }

    // Carregar produtos relacionados (mesma categoria)
    if (produto.value.categoria_id) {
      const relacionadosRes = await api.get(`/produtos?categoria_id=${produto.value.categoria_id}&limit=5`)
      const todos = relacionadosRes.data.data || relacionadosRes.data || []
      produtosRelacionados.value = todos.filter(p => p.id !== produto.value.id).slice(0, 4)
    }

  } catch (error) {
    console.error('Erro ao carregar produto:', error)
    produto.value = null
  } finally {
    loading.value = false
  }
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

const gerarUrlProduto = (prod) => {
  const slug = gerarSlug(prod.nome)
  return `/produtos/${slug}-${prod.id}`
}

const compartilhar = async () => {
  const url = window.location.href
  const texto = `Confira este produto: ${produto.value.nome}`

  if (navigator.share) {
    try {
      await navigator.share({
        title: produto.value.nome,
        text: texto,
        url: url
      })
    } catch (err) {
      console.log('Compartilhamento cancelado')
    }
  } else {
    // Fallback: copiar link
    try {
      await navigator.clipboard.writeText(url)
      alert('Link copiado para a área de transferência!')
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }
}

// Zoom da imagem
const handleZoom = (event) => {
  if (!imagemRef.value) return

  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  zoomX.value = x
  zoomY.value = y
  zoomActive.value = true
}

const resetZoom = () => {
  zoomActive.value = false
  zoomX.value = 50
  zoomY.value = 50
}

// Carrinho
const adicionarAoCarrinho = () => {
  if (!produto.value || itemAdicionado.value) return

  cartStore.addItem(produto.value)
  itemAdicionado.value = true

  // Reset após 2 segundos para permitir adicionar novamente
  setTimeout(() => {
    itemAdicionado.value = false
  }, 2000)
}

// Reset do estado quando trocar de produto
watch(() => route.params.slug, () => {
  itemAdicionado.value = false
  resetZoom()
})
</script>

<style scoped>
/* ===== BASE ===== */
.produto-detalhe-page {
  min-height: 100vh;
  background: #F8FAFC;
}

/* ===== BREADCRUMB ===== */
.breadcrumb-container {
  padding: 80px 1.5rem 0;
  max-width: 1280px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 1rem 0;
  font-size: 13px;
  flex-wrap: wrap;
}

.breadcrumb-link {
  color: #64748B;
  text-decoration: none;
}

.breadcrumb-link:hover { color: #1155CC; }

.breadcrumb-sep { color: #CBD5E1; }

.breadcrumb-current {
  color: #0A1F44;
  font-weight: 600;
}

/* ===== LOADING ===== */
.loading-container,
.not-found-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.loading-state,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #E2E8F0;
  border-top-color: #1155CC;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin { to { transform: rotate(360deg); } }

.not-found-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #FEF2F2;
  color: #DC2626;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.not-found-title {
  font-size: 22px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0 0 8px;
}

.not-found-desc {
  font-size: 14px;
  color: #64748B;
  margin: 0 0 1.5rem;
}

.btn-voltar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

/* ===== PRODUTO CONTAINER ===== */
.produto-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.produto-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

/* ===== GALERIA ===== */
.produto-galeria {
  width: 100%;
}

.galeria-principal {
  position: relative;
  aspect-ratio: 1;
  background: #F8FAFC;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
}

.imagem-principal {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.1s ease-out;
}

.zoom-hint {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  pointer-events: none;
  transition: opacity 0.2s;
}

.galeria-principal:hover .zoom-hint {
  opacity: 0;
}

.imagem-placeholder {
  color: #CBD5E1;
}

.badges-container {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.badge {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-destaque {
  background: linear-gradient(135deg, #F07020, #D4600A);
  color: white;
}

.badge-promo {
  background: #10B981;
  color: white;
}

.galeria-thumbs {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.thumb-btn {
  width: 60px;
  height: 60px;
  border: 2px solid #E2E8F0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  background: white;
  padding: 0;
}

.thumb-btn.thumb-active {
  border-color: #1155CC;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ===== INFO ===== */
.produto-info {
  flex: 1;
}

.produto-marca {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #1155CC;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.produto-nome {
  font-size: 24px;
  font-weight: 800;
  color: #0A1F44;
  line-height: 1.3;
  margin: 0 0 10px;
}

.produto-codigos {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.codigo-item {
  font-size: 12px;
  color: #94A3B8;
}

.produto-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.stars {
  display: flex;
  gap: 2px;
}

.rating-text {
  font-size: 13px;
  color: #64748B;
}

.produto-preco-box {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.preco-de {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.preco-label {
  font-size: 13px;
  color: #64748B;
}

.preco-riscado {
  font-size: 16px;
  color: #94A3B8;
  text-decoration: line-through;
}

.preco-por {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preco-atual {
  font-size: 32px;
  font-weight: 800;
  color: #10B981;
}

.economia-badge {
  display: inline-block;
  margin-top: 8px;
  padding: 6px 12px;
  background: #DCFCE7;
  color: #16A34A;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.produto-descricao-curta {
  font-size: 15px;
  color: #64748B;
  line-height: 1.6;
  margin: 0 0 16px;
}

.produto-estoque {
  margin-bottom: 20px;
}

.estoque-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.estoque-disponivel {
  background: #DCFCE7;
  color: #16A34A;
}

.estoque-baixo {
  background: #FEF3C7;
  color: #D97706;
}

.estoque-esgotado {
  background: #FEE2E2;
  color: #DC2626;
}

.produto-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.btn-adicionar-carrinho {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-adicionar-carrinho:hover:not(:disabled) {
  background: linear-gradient(135deg, #0A3080, #072060);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(17, 85, 204, 0.3);
}

.btn-adicionar-carrinho:disabled {
  cursor: default;
}

.btn-adicionar-carrinho.added {
  background: linear-gradient(135deg, #10B981, #059669);
}

.btn-adicionar-carrinho.added:hover {
  transform: none;
  box-shadow: none;
}

.btn-compartilhar {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-compartilhar:hover {
  background: #E2E8F0;
  color: #0A1F44;
}

.produto-categoria {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.categoria-label {
  color: #64748B;
}

.categoria-link {
  color: #1155CC;
  text-decoration: none;
  font-weight: 600;
}

.categoria-link:hover {
  text-decoration: underline;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #F8FAFC;
  border-radius: 12px;
}

.info-card svg {
  color: #1155CC;
  flex-shrink: 0;
}

.info-card-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-card-title {
  font-size: 14px;
  font-weight: 600;
  color: #0A1F44;
}

.info-card-desc {
  font-size: 12px;
  color: #64748B;
}

/* ===== DESCRIÇÃO ===== */
.descricao-section,
.relacionados-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #E8ECF0;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0 0 1rem;
}

.descricao-content {
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
}

.descricao-content :deep(p) {
  margin: 0 0 1rem;
}

.descricao-content :deep(ul) {
  margin: 0 0 1rem;
  padding-left: 1.5rem;
}

.descricao-content :deep(li) {
  margin-bottom: 0.5rem;
}

/* ===== RELACIONADOS ===== */
.relacionados-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.relacionado-card {
  background: #F8FAFC;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.2s;
}

.relacionado-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.relacionado-img {
  aspect-ratio: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.relacionado-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-placeholder {
  color: #CBD5E1;
}

.relacionado-info {
  padding: 12px;
}

.relacionado-nome {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #0A1F44;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.relacionado-preco {
  font-size: 15px;
  font-weight: 700;
  color: #10B981;
}

/* ===== FOOTER ===== */
.produto-footer {
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
  .produto-layout {
    padding: 2rem;
  }

  .produto-nome { font-size: 28px; }

  .relacionados-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .info-cards {
    flex-direction: row;
  }

  .info-card {
    flex: 1;
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 1024px) {
  .breadcrumb-container {
    padding-top: 90px;
  }

  .produto-layout {
    flex-direction: row;
    gap: 3rem;
    padding: 2.5rem;
  }

  .produto-galeria {
    width: 45%;
    max-width: 500px;
    position: sticky;
    top: 100px;
    align-self: flex-start;
  }

  .produto-info {
    flex: 1;
  }

  .produto-nome { font-size: 32px; }
  .preco-atual { font-size: 36px; }

  .footer-container {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
