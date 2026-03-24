<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const fullScreenRoutes = [
  'cadastroCliente', 'cadastro', 'login', 'loginFuncionario',
  'cadastroPet', 'editarPet', 'dashboard', 'editarPerfil',
  'agendarConsulta', 'meusPets', 'localizacao',
  // Admin routes
  'adminDashboard', 'trajetos', 'cadastroTrajeto', 'detalhesTrajeto',
  'veiculos', 'cadastroVeiculo', 'editarVeiculo', 'usuarios', 'adminProdutosMarcas',
  'adminProdutosMarcasNovo', 'adminProdutosMarcasEditar', 'adminProdutos',
  'adminNoticias', 'novaNoticia', 'editarNoticia',
  'cadastroProduto', 'editarProduto', 'adminMarcas', ''
]
const isFullScreen = computed(() => fullScreenRoutes.includes(route.name))
</script>

<template>
  <div :class="{ 'full-screen': isFullScreen }">
    <RouterView />
  </div>
</template>

<style scoped>
.full-screen {
  width: 100%;
  min-height: 100vh;
}
</style>

