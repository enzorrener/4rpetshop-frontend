import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CadastroClienteView from '@/views/CadastroClienteView.vue'
import CadastroView from '@/views/CadastroView.vue'
import LoginView from '@/views/LoginView.vue'
import LoginFuncionarioView from '@/views/LoginFuncionarioView.vue'
import CadastroPetView from '@/views/CadastroPetView.vue'
import EditarPetView from '@/views/EditarPetView.vue'
import DashboardView from '@/views/DashboardView.vue'
import EditarPerfilView from '@/views/EditarPerfilView.vue'
import AgendarConsultaView from '@/views/AgendarConsultaView.vue'
import MeusPetsView from '@/views/MeusPetsView.vue'
import LocalizacaoView from '@/views/LocalizacaoView.vue'

// Admin Views
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminProdutosView from '@/views/admin/AdminProdutosView.vue'
import AdminProdutosMarcasView from '@/views/admin/AdminProdutosMarcasView.vue'
import UsuariosView from '@/views/admin/UsuariosView.vue'
import TrajetosView from '@/views/admin/TrajetosView.vue'
import CadastroTrajetoView from '@/views/admin/CadastroTrajetoView.vue'
import DetalhesTrajetoView from '@/views/admin/DetalhesTrajetoView.vue'
import VeiculosView from '@/views/admin/VeiculosView.vue'
import CadastroVeiculoView from '@/views/admin/CadastroVeiculoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Sempre rola para o topo ao navegar para uma nova página
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/login/funcionario',
      name: 'loginFuncionario',
      component: LoginFuncionarioView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/cadastroPet',
      name: 'cadastroPet',
      component: CadastroPetView
    },
    {
      path: '/editarPet/:id',
      name: 'editarPet',
      component: EditarPetView
    },
    {
      path: '/cadastroCliente',
      name: 'cadastroCliente',
      component: CadastroClienteView
    },
    {
      path: '/editarPerfil',
      name: 'editarPerfil',
      component: EditarPerfilView
    },
    {
      path: '/agendarConsulta',
      name: 'agendarConsulta',
      component: AgendarConsultaView
    },
    {
      path: '/meusPets',
      name: 'meusPets',
      component: MeusPetsView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/localizacao',
      name: 'localizacao',
      component: LocalizacaoView
    },
    // Rotas Administrativas
    {
      path: '/admin',
      name: 'adminDashboard',
      component: AdminDashboardView
    },
    {
      path: '/admin/usuarios',
      name: 'usuarios',
      component: UsuariosView
    },
    {
      path: '/admin/trajetos',
      name: 'trajetos',
      component: TrajetosView
    },
    {
      path: '/admin/trajetos/novo',
      name: 'cadastroTrajeto',
      component: CadastroTrajetoView
    },
    {
      path: '/admin/trajetos/:id',
      name: 'detalhesTrajeto',
      component: DetalhesTrajetoView
    },
    {
      path: '/admin/veiculos',
      name: 'veiculos',
      component: VeiculosView
    },
    {
      path: '/admin/veiculos/novo',
      name: 'cadastroVeiculo',
      component: CadastroVeiculoView
    },
    {
      path: '/admin/veiculos/:id',
      name: 'editarVeiculo',
      component: CadastroVeiculoView
    },
    {
      path: '/admin/produtos',
      name: 'adminProdutos',
      component: AdminProdutosView
    },
    {
      path: '/admin/produtos/marcas',
      name: 'adminProdutosMarcasNovo',
      component: AdminProdutosMarcasView
    },
    {
      path: '/admin/produtos/marcas/:id',
      name: 'adminProdutosMarcasEditar',
      component: AdminProdutosMarcasView
    }
  ]
})

export default router
