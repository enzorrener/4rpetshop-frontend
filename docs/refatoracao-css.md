# Refatoração CSS — Plano de Melhoria Futura

> Este documento descreve a refatoração planejada para extrair CSS duplicado das views
> em arquivos compartilhados, tornando o código mais legível e manutenível.
> **Status: Pendente** — Não executar sem testes completos.

---

## Problema Atual

Cada view (`<style scoped>`) repete centenas de linhas de CSS idênticas. Exemplo: o bottom navigation é copiado em 5 arquivos com exatamente o mesmo código (~50 linhas cada). No total, estimamos **~3.000 linhas de CSS duplicadas** no projeto.

---

## Estrutura Proposta

Criar uma pasta `src/assets/components/` com arquivos CSS compartilhados:

```
src/assets/
├── variables.css           (já existe — manter como está)
├── base.css                (já existe — manter como está)
├── main.css                (já existe — adicionar imports dos novos arquivos)
└── components/
    ├── navigation.css      — Bottom navigation
    ├── layout.css          — Estrutura de página e header
    ├── forms.css           — Formulários e inputs
    ├── buttons.css         — Botões (submit, delete)
    └── loading.css         — Spinners e estados de carregamento
```

Importar todos no `main.css`:

```css
@import './variables.css';
@import './components/layout.css';
@import './components/navigation.css';
@import './components/forms.css';
@import './components/buttons.css';
@import './components/loading.css';
```

> **Importante:** Os estilos devem ser globais (importados via `main.css`), NÃO via
> `@import` dentro de `<style scoped>`, pois o Vue não aplica scoping corretamente
> em imports dentro de blocos scoped.

---

## Detalhamento por Arquivo

### 1. navigation.css — Bottom Navigation

**Arquivos que usam (5):**
- `DashboardView.vue`
- `EditarPetView.vue`
- `CadastroPetView.vue`
- `AgendarConsultaView.vue`
- `MeusPetsView.vue`

**Classes a extrair (100% idênticas entre os 5 arquivos):**

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 var(--spacing-sm);
  z-index: var(--z-fixed);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.nav-item.active {
  color: #6B8E6B;
}

.nav-center {
  margin-top: -20px;
}

.nav-add-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6B8E6B 0%, #8BAF8B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(107, 142, 107, 0.4);
  text-decoration: none;
}

/* Esconder no tablet/desktop */
@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
```

**Economia:** ~50 linhas removidas de cada view = **~250 linhas no total**

---

### 2. layout.css — Estrutura de Página

**Arquivos que usam (6):**
- `DashboardView.vue` — `.dashboard-page`, `.dashboard-content`
- `EditarPetView.vue` — `.pet-page`, `.pet-content`
- `CadastroPetView.vue` — `.pet-page`, `.pet-content`
- `MeusPetsView.vue` — `.pets-page`, `.pets-content`
- `AgendarConsultaView.vue` — `.agendar-container`, `.agendar-content`
- `EditarPerfilView.vue` — `.cadastro-container`, `.cadastro-content`

**Classes padronizadas a criar:**

```css
/* Substituir todos os nomes acima por .page-container e .page-content */
.page-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: var(--spacing-lg) var(--spacing-md);
  padding-bottom: 90px;
}

.page-content {
  width: 100%;
  max-width: var(--max-width-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
}

.btn-back {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  padding: var(--spacing-xs);
}

.page-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  text-align: center;
}

/* ===== Responsivo ===== */
@media (max-width: 375px) {
  .page-container {
    padding: var(--spacing-md) var(--spacing-sm);
  }
  .page-title {
    font-size: var(--font-size-base);
  }
}

@media (min-width: 428px) {
  .page-content {
    max-width: var(--max-width-md);
  }
}

@media (min-width: 768px) {
  .page-container {
    background: var(--bg-page);
    align-items: center;
    padding: var(--spacing-xl);
    padding-bottom: 0;
  }
  .page-content {
    background-color: var(--bg-primary);
    padding: var(--spacing-2xl);
    border-radius: var(--border-radius-2xl);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 480px;
  }
}

@media (min-width: 1024px) {
  .page-container {
    background: var(--bg-page-gradient);
    padding: var(--spacing-3xl);
  }
  .page-content {
    max-width: 520px;
    padding: var(--spacing-2xl) var(--spacing-3xl);
    border-radius: 20px;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.08),
      0 2px 10px rgba(0, 0, 0, 0.04);
  }
}

@media (min-width: 1440px) {
  .page-content {
    max-width: 560px;
    padding: var(--spacing-3xl);
  }
}
```

**O que muda nos templates:**
- `<div class="dashboard-page">` → `<div class="page-container">`
- `<div class="dashboard-content">` → `<div class="page-content">`
- (mesma lógica para todas as views)

**Diferença na AgendarConsultaView:** usa `background: var(--bg-primary)` sólido em vez de gradiente. Solução: adicionar classe modificadora `.page-container--solid` com `background: var(--bg-primary)`.

**Economia:** ~70 linhas por view = **~420 linhas no total**

---

### 3. forms.css — Formulários

**Arquivos que usam (3):**
- `EditarPetView.vue`
- `CadastroPetView.vue`
- `EditarPerfilView.vue`

**Classes a extrair:**

```css
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-row {
  display: flex;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-group.half {
  flex: 1;
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.optional-tag {
  font-weight: var(--font-weight-normal);
  color: var(--text-muted);
  font-size: var(--font-size-xs);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper.with-icon-right .input-icon-right {
  position: absolute;
  right: var(--spacing-md);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: var(--input-height-lg);
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: #6B8E6B;
  box-shadow: 0 0 0 3px rgba(107, 142, 107, 0.15);
}

.form-textarea {
  height: auto;
  padding: var(--spacing-sm) var(--spacing-md);
  resize: vertical;
  font-family: var(--font-family);
  line-height: var(--line-height-normal);
}

/* ===== Species Grid ===== */
.species-grid {
  display: flex;
  gap: var(--spacing-sm);
}

.species-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-xs);
  background: none;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
}

.species-btn:hover {
  border-color: #6B8E6B;
}

.species-btn.active {
  border-color: #6B8E6B;
  background-color: #F0F5F0;
  color: #4A6B4A;
}

.species-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.species-img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
}

.species-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

/* ===== Gender Toggle ===== */
.gender-toggle {
  display: flex;
  gap: var(--spacing-sm);
}

.gender-btn {
  flex: 1;
  height: var(--input-height-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-full);
  background: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.gender-btn:hover {
  border-color: #6B8E6B;
}

.gender-btn.active {
  border-color: #6B8E6B;
  background-color: #6B8E6B;
  color: white;
}

/* ===== Photo Section ===== */
.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.photo-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #E8EDE8;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: opacity var(--transition-fast);
}

.photo-circle:hover {
  opacity: 0.85;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #6B8E6B;
  letter-spacing: 0.5px;
}

.hidden-input {
  display: none;
}

/* ===== Responsivo ===== */
@media (max-width: 375px) {
  .species-grid {
    gap: var(--spacing-xs);
  }
  .species-btn {
    padding: var(--spacing-xs) 2px;
  }
  .species-icon {
    width: 32px;
    height: 32px;
  }
  .photo-circle {
    width: 90px;
    height: 90px;
  }
  .form-row {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .form-input {
    height: 56px;
  }
}
```

**Diferença na EditarPerfilView:** usa cor de foco roxa `var(--primary-color)` em vez de verde. Solução: no scoped da EditarPerfilView, sobrescrever apenas `.form-input:focus { border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(91, 58, 140, 0.1); }`.

**Economia:** ~180 linhas por view de formulário = **~540 linhas no total**

---

### 4. buttons.css — Botões

**Arquivos que usam (3):**
- `EditarPetView.vue`
- `CadastroPetView.vue`
- `EditarPerfilView.vue`

**Classes a extrair:**

```css
.btn-submit {
  width: 100%;
  height: var(--input-height-lg);
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: white;
  background: linear-gradient(135deg, #6B8E6B 0%, #8BAF8B 100%);
  border: none;
  border-radius: var(--border-radius-xl);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--error-color);
  display: flex;
  align-items: center;
  padding: var(--spacing-xs);
  transition: opacity var(--transition-fast);
}

.btn-delete:hover {
  opacity: 0.7;
}

@media (min-width: 1024px) {
  .btn-submit {
    height: 56px;
    font-size: var(--font-size-lg);
  }
}
```

**Diferença na EditarPerfilView:** usa gradiente dourado e texto escuro. Solução: sobrescrever no scoped com `.btn-submit { background: linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-light) 100%); color: var(--text-primary); }`.

**Economia:** ~40 linhas por view = **~120 linhas no total**

---

### 5. loading.css — Carregamento

**Arquivos que usam (5):**
- `EditarPetView.vue`
- `CadastroPetView.vue`
- `MeusPetsView.vue`
- `AgendarConsultaView.vue`
- `EditarPerfilView.vue`

**Classes a extrair:**

```css
.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-spinner-lg {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border-color);
  border-top-color: #6B8E6B;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Economia:** ~30 linhas por view = **~150 linhas no total**

---

## Resumo da Economia

| Arquivo CSS | Classes extraídas | Views afetadas | Linhas economizadas |
|-------------|------------------|----------------|---------------------|
| navigation.css | 5 classes | 5 views | ~250 linhas |
| layout.css | 5 classes + media queries | 6 views | ~420 linhas |
| forms.css | ~20 classes | 3 views | ~540 linhas |
| buttons.css | 4 classes | 3 views | ~120 linhas |
| loading.css | 3 classes + keyframes | 5 views | ~150 linhas |
| **TOTAL** | **~37 classes** | **6 views** | **~1.480 linhas** |

---

## Passos para Executar a Migração

### Passo 1: Criar os arquivos CSS compartilhados
- Criar `src/assets/components/` e os 5 arquivos `.css` com o conteúdo descrito acima

### Passo 2: Atualizar main.css
- Adicionar os imports dos novos arquivos

### Passo 3: Migrar uma view de cada vez
- Começar pela mais simples: `MeusPetsView.vue`
- Trocar nomes de classes no template (ex: `.pets-page` → `.page-container`)
- Remover do `<style scoped>` tudo que já está no CSS global
- Testar no navegador antes de seguir para a próxima
- Ordem sugerida: MeusPetsView → AgendarConsultaView → DashboardView → CadastroPetView → EditarPetView → EditarPerfilView

### Passo 4: Testar
- Verificar todas as views no mobile (375px, 428px)
- Verificar no tablet (768px)
- Verificar no desktop (1024px, 1440px)
- Testar navegação entre páginas
- Garantir que nenhum estilo visual mudou

---

## Riscos e Cuidados

1. **Conflito de classes globais:** Como os estilos serão globais, classes genéricas como `.form` podem conflitar com bibliotecas futuras. Considerar prefixo se necessário (ex: `.app-form`).

2. **Especificidade CSS:** Estilos scoped têm maior especificidade por causa do atributo `[data-v-xxx]`. Ao remover o scoped, a especificidade diminui. Testar se algum estilo para de funcionar.

3. **Ordem de importação:** Os imports em `main.css` devem vir na ordem: variables → layout → navigation → forms → buttons → loading.

4. **Views com variações:** EditarPerfilView usa cores roxas/douradas. Manter essas diferenças no `<style scoped>` da view, sobrescrevendo apenas o necessário.
