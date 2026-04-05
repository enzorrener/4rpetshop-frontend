<template>
  <div class="carrinho-page">
    <!-- Navbar -->
    <NavBar />

    <!-- Header -->
    <section class="carrinho-header">
      <div class="header-content">
        <h1 class="header-title">Meu Carrinho</h1>
        <p class="header-subtitle">{{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }} no carrinho</p>
      </div>
    </section>

    <!-- Content -->
    <div class="carrinho-container">
      <!-- Empty State -->
      <div v-if="isEmpty" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
        </div>
        <h2 class="empty-title">Seu carrinho está vazio</h2>
        <p class="empty-desc">Adicione produtos para continuar comprando</p>
        <router-link to="/produtos" class="btn-continuar">
          Ver Produtos
        </router-link>
      </div>

      <!-- Cart Items -->
      <div v-else class="carrinho-content">
        <div class="carrinho-items">
          <div v-for="item in items" :key="item.id" class="cart-item">
            <div class="item-image">
              <img v-if="item.foto_url" :src="item.foto_url" :alt="item.nome" />
              <div v-else class="image-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
            </div>

            <div class="item-details">
              <span v-if="item.marca" class="item-marca">{{ item.marca.nome }}</span>
              <h3 class="item-nome">{{ item.nome }}</h3>
              <div class="item-preco">
                <span v-if="item.preco_promocional" class="preco-original">
                  R$ {{ formatPreco(item.preco) }}
                </span>
                <span class="preco-atual">
                  R$ {{ formatPreco(item.preco_promocional || item.preco) }}
                </span>
              </div>
            </div>

            <div class="item-actions">
              <div class="quantidade-control">
                <button class="qty-btn" @click="decrementar(item.id)" :disabled="item.quantidade <= 1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <span class="qty-value">{{ item.quantidade }}</span>
                <button class="qty-btn" @click="incrementar(item.id)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>

              <button class="btn-remover" @click="removerItem(item.id)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
              </button>
            </div>

            <div class="item-subtotal">
              <span class="subtotal-label">Subtotal</span>
              <span class="subtotal-value">R$ {{ formatPreco(getSubtotal(item)) }}</span>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="carrinho-summary">
          <div class="summary-card">
            <h3 class="summary-title">Resumo do Pedido</h3>

            <div class="summary-row">
              <span>Subtotal ({{ totalItems }} itens)</span>
              <span>R$ {{ formatPreco(totalPrice) }}</span>
            </div>

            <div class="summary-row">
              <span>Frete</span>
              <span class="frete-consultar">Consultar</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row summary-total">
              <span>Total</span>
              <span>R$ {{ formatPreco(totalPrice) }}</span>
            </div>

            <a :href="gerarLinkWhatsApp" target="_blank" class="btn-finalizar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Finalizar via WhatsApp
            </a>

            <button class="btn-limpar" @click="limparCarrinho">
              Limpar Carrinho
            </button>
          </div>

          <router-link to="/produtos" class="link-continuar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            Continuar comprando
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="carrinho-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <img src="@/assets/images/logo/LogoArrendondadoPetShop.png" alt="4R Pet" class="footer-logo" />
          <span class="footer-nome">4R Pet Clínica</span>
        </div>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} 4R Pet Clínica. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// Computed
const items = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.totalItems)
const totalPrice = computed(() => cartStore.totalPrice)
const isEmpty = computed(() => cartStore.isEmpty)

const gerarLinkWhatsApp = computed(() => {
  if (items.value.length === 0) return '#'

  let mensagem = 'Olá! Gostaria de finalizar meu pedido:\n\n'

  items.value.forEach(item => {
    const preco = item.preco_promocional || item.preco
    mensagem += `• ${item.nome} (${item.quantidade}x) - R$ ${formatPreco(preco * item.quantidade)}\n`
  })

  mensagem += `\n*Total: R$ ${formatPreco(totalPrice.value)}*`
  mensagem += '\n\nAguardo informações sobre frete e pagamento.'

  return `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`
})

// Methods
const formatPreco = (valor) => {
  if (!valor) return '0,00'
  return Number(valor).toFixed(2).replace('.', ',')
}

const getSubtotal = (item) => {
  const preco = item.preco_promocional || item.preco
  return preco * item.quantidade
}

const incrementar = (itemId) => {
  const item = items.value.find(i => i.id === itemId)
  if (item) {
    cartStore.updateQuantity(itemId, item.quantidade + 1)
  }
}

const decrementar = (itemId) => {
  const item = items.value.find(i => i.id === itemId)
  if (item && item.quantidade > 1) {
    cartStore.updateQuantity(itemId, item.quantidade - 1)
  }
}

const removerItem = (itemId) => {
  cartStore.removeItem(itemId)
}

const limparCarrinho = () => {
  if (confirm('Deseja realmente limpar o carrinho?')) {
    cartStore.clearCart()
  }
}
</script>

<style scoped>
/* ===== BASE ===== */
.carrinho-page {
  min-height: 100vh;
  background: #F8FAFC;
}

/* ===== HEADER ===== */
.carrinho-header {
  padding: 100px 1.5rem 40px;
  background: linear-gradient(135deg, #0A3080 0%, #1155CC 100%);
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
}

.header-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0 0 8px;
}

.header-subtitle {
  font-size: 15px;
  color: rgba(255,255,255,0.8);
  margin: 0;
}

/* ===== CONTAINER ===== */
.carrinho-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.empty-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #F1F5F9;
  color: #94A3B8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 22px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0 0 8px;
}

.empty-desc {
  font-size: 14px;
  color: #64748B;
  margin: 0 0 1.5rem;
}

.btn-continuar {
  padding: 14px 32px;
  background: linear-gradient(135deg, #1155CC, #0A3080);
  color: white;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-continuar:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(17, 85, 204, 0.3);
}

/* ===== CART CONTENT ===== */
.carrinho-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ===== ITEMS ===== */
.carrinho-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: auto auto;
  gap: 12px 16px;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.item-image {
  grid-row: span 2;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  color: #CBD5E1;
}

.item-details {
  min-width: 0;
}

.item-marca {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.item-nome {
  font-size: 14px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0 0 6px;
  line-height: 1.3;
}

.item-preco {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preco-original {
  font-size: 12px;
  color: #94A3B8;
  text-decoration: line-through;
}

.preco-atual {
  font-size: 15px;
  font-weight: 700;
  color: #10B981;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantidade-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F8FAFC;
  border-radius: 8px;
  padding: 4px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-btn:not(:disabled):hover {
  border-color: #1155CC;
  color: #1155CC;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0A1F44;
}

.btn-remover {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FEE2E2;
  border: none;
  border-radius: 8px;
  color: #DC2626;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-remover:hover {
  background: #DC2626;
  color: white;
}

.item-subtotal {
  grid-column: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #F1F5F9;
}

.subtotal-label {
  font-size: 12px;
  color: #64748B;
}

.subtotal-value {
  font-size: 15px;
  font-weight: 700;
  color: #0A1F44;
}

/* ===== SUMMARY ===== */
.carrinho-summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.summary-title {
  font-size: 18px;
  font-weight: 700;
  color: #0A1F44;
  margin: 0 0 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  color: #374151;
}

.frete-consultar {
  color: #64748B;
  font-style: italic;
}

.summary-divider {
  height: 1px;
  background: #E8ECF0;
  margin: 8px 0;
}

.summary-total {
  font-size: 18px;
  font-weight: 700;
  color: #0A1F44;
}

.btn-finalizar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  margin-top: 1rem;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-finalizar:hover {
  background: #128C7E;
}

.btn-limpar {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: transparent;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-limpar:hover {
  border-color: #DC2626;
  color: #DC2626;
}

.link-continuar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  color: #1155CC;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.link-continuar:hover {
  text-decoration: underline;
}

/* ===== FOOTER ===== */
.carrinho-footer {
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

/* ===== TABLET ===== */
@media (min-width: 640px) {
  .cart-item {
    grid-template-columns: 100px 1fr auto;
    grid-template-rows: 1fr;
    align-items: center;
    gap: 1rem;
  }

  .item-image {
    grid-row: 1;
    width: 100px;
    height: 100px;
  }

  .item-subtotal {
    grid-column: auto;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    border-top: none;
    padding-top: 0;
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 1024px) {
  .header-title { font-size: 2.5rem; }

  .carrinho-content {
    flex-direction: row;
    align-items: flex-start;
  }

  .carrinho-items {
    flex: 1;
  }

  .carrinho-summary {
    width: 360px;
    position: sticky;
    top: 100px;
  }

  .cart-item {
    grid-template-columns: 120px 1fr auto auto;
  }

  .item-image {
    width: 120px;
    height: 120px;
  }

  .footer-container {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
