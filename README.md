# 📊 Report Repository

Aplicação **front-end** construída com **React + Vite** para **gerenciar, navegar e manter relatórios** (XML + SQL), oferecendo **preview**, **edição de metadados** e **upload** de novos relatórios de forma centralizada e intuitiva.

---

## ✨ Principais Funcionalidades

* 🔎 **Listagem e busca avançada** por título, conteúdo XML, descrição e tags.
* 📝 **Pré-visualização de descrições em Markdown**.
* 💾 **Pré-visualização e download de arquivos SQL**.
* ✏️ **Edição de metadados do relatório** (título, tipo, tags e descrição).
* ⬆️ **Upload de novos relatórios** com XML, SQL e metadados.
* 📂 **Organização por paths de relatórios**, permitindo múltiplas origens/pastas.

---

## 🛠️ Tecnologias Utilizadas

* ⚛️ **React 19** (JSX / TSX)
* ⚡ **Vite**
* 🧠 **TypeScript** (modo estrito)
* 🎨 **Tailwind CSS** + plugin typography
* 🌐 **Axios** (requisições HTTP)
* 🔔 **react-hot-toast** (notificações)
* 🧾 **react-markdown + remark-gfm** (renderização Markdown)

---

## 🚀 Como Rodar o Projeto Localmente

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Rodar em modo desenvolvimento

```bash
npm run dev
```

### 3️⃣ Build de produção

```bash
npm run build
```

### 4️⃣ Lint

```bash
npm run lint
```

---

## ⚙️ Configuração e Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto ou defina as variáveis no ambiente:

```env
VITE_API_DOMAIN=https://api.exemplo.com
VITE_DEFAULT_REPORT_PATH=/default/path
```

* **VITE_API_DOMAIN** — URL base da API.
* **VITE_DEFAULT_REPORT_PATH** — Path padrão exibido na Sidebar.

---

## 🌐 Comunicação com a API

* Uploads utilizam **multipart/form-data**.
* Headers customizados (`X-Report-Path`) são configurados automaticamente.
* Centralização das chamadas em **ReportService**.

---

## 🤝 Contribuição

* Utilize **TypeScript em modo estrito**.
* Mantenha o padrão de código e organização existente.
* Execute `npm run lint` antes de abrir um Pull Request.

---

✨ *Report Repository — gerenciamento de relatórios com foco em organização, produtividade e clareza.*
