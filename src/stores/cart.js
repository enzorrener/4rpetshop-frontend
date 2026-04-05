import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  // Estado - carrega do localStorage se existir
  const items = ref(JSON.parse(localStorage.getItem('cart_items') || '[]'))

  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantidade, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      const preco = item.preco_promocional || item.preco
      return total + (preco * item.quantidade)
    }, 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  // Salvar no localStorage
  const saveToStorage = () => {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }

  // Actions
  const addItem = (produto, quantidade = 1) => {
    const existingItem = items.value.find(item => item.id === produto.id)

    if (existingItem) {
      existingItem.quantidade += quantidade
    } else {
      items.value.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        preco_promocional: produto.preco_promocional,
        foto_url: produto.foto_url,
        marca: produto.marca,
        quantidade: quantidade
      })
    }

    saveToStorage()
    return true
  }

  const removeItem = (produtoId) => {
    const index = items.value.findIndex(item => item.id === produtoId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToStorage()
    }
  }

  const updateQuantity = (produtoId, quantidade) => {
    const item = items.value.find(item => item.id === produtoId)
    if (item) {
      if (quantidade <= 0) {
        removeItem(produtoId)
      } else {
        item.quantidade = quantidade
        saveToStorage()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    saveToStorage()
  }

  const isInCart = (produtoId) => {
    return items.value.some(item => item.id === produtoId)
  }

  const getItemQuantity = (produtoId) => {
    const item = items.value.find(item => item.id === produtoId)
    return item ? item.quantidade : 0
  }

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }
})
