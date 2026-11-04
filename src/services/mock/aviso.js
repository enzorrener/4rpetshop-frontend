// Aviso discreto exibido apenas no modo demonstração (VITE_MOCK=true)
import { resetarDemo } from './adapter'

const CHAVE_FECHADO = 'mock_aviso_fechado'

export const mostrarAvisoDemo = () => {
  if (typeof document === 'undefined' || document.getElementById('aviso-demo')) return

  const aviso = document.createElement('div')
  aviso.id = 'aviso-demo'
  aviso.setAttribute('role', 'status')
  aviso.style.cssText = [
    'position:fixed', 'left:12px', 'bottom:12px', 'z-index:99999',
    'max-width:calc(100vw - 24px)', 'box-sizing:border-box',
    'background:#0F172A', 'color:#F8FAFC', 'border-radius:10px',
    'box-shadow:0 6px 24px rgba(0,0,0,.25)', 'font:13px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
    'padding:10px 12px', 'display:flex', 'align-items:center', 'gap:10px', 'flex-wrap:wrap'
  ].join(';')

  const fechado = sessionStorage.getItem(CHAVE_FECHADO) === '1'

  const texto = document.createElement('span')
  texto.innerHTML = '<strong>Demonstração</strong> &middot; dados fictícios. Entre com qualquer e-mail/usuário e senha.'

  const botao = (rotulo) => {
    const b = document.createElement('button')
    b.type = 'button'
    b.textContent = rotulo
    b.style.cssText = 'background:#1E293B;color:#F8FAFC;border:1px solid #334155;border-radius:6px;padding:4px 8px;font:inherit;cursor:pointer'
    return b
  }

  const restaurar = botao('Restaurar dados')
  restaurar.addEventListener('click', () => {
    resetarDemo()
    ;['cliente', 'cliente_token', 'funcionario', 'funcionario_token', 'cart_items'].forEach((k) => localStorage.removeItem(k))
    window.location.href = import.meta.env.BASE_URL
  })

  const minimizar = botao(fechado ? 'Demo' : 'Ocultar')
  minimizar.addEventListener('click', () => {
    const oculto = texto.style.display === 'none'
    texto.style.display = oculto ? '' : 'none'
    restaurar.style.display = oculto ? '' : 'none'
    minimizar.textContent = oculto ? 'Ocultar' : 'Demo'
    sessionStorage.setItem(CHAVE_FECHADO, oculto ? '0' : '1')
  })

  if (fechado) {
    texto.style.display = 'none'
    restaurar.style.display = 'none'
  }

  aviso.append(texto, restaurar, minimizar)
  document.body.appendChild(aviso)
}
