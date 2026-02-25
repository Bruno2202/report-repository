# 📁 Report Repository

<img width="1920" height="1080" alt="ReportRepository" src="https://github.com/user-attachments/assets/189105d6-4b0c-421c-b8ff-8cabcc9fc9a9" />

## Descrição Geral

O Report Repository é uma aplicação front-end desenvolvida para gerenciar, organizar e visualizar relatórios de forma eficiente. Seu objetivo principal é fornecer uma interface intuitiva para listar, buscar, pré-visualizar, editar metadados, fazer upload e organizar diversos tipos de relatórios, com foco em arquivos XML e SQL.

A aplicação permite que os usuários:
*   Visualizem e filtrem relatórios existentes.
*   Façam upload de novos arquivos XML e SQL.
*   Editem títulos, descrições (com suporte a Markdown) e associem tags a relatórios.
*   Pré-visualizem o conteúdo SQL com destaque de sintaxe e copiem/baixem arquivos.
*   Organizem relatórios usando tags e categorias personalizadas.
*   Gerenciem o caminho de rede onde os relatórios estão armazenados.

É uma ferramenta ideal para equipes que precisam de uma solução centralizada para acessar e manter uma coleção de relatórios de forma organizada e acessível.

<img width="1919" height="861" alt="image" src="https://github.com/user-attachments/assets/187f160f-f49a-461f-9929-18a96b53a305" />

## Tecnologias Usadas

Este projeto foi construído utilizando um conjunto moderno de tecnologias, garantindo uma aplicação robusta, escalável e de fácil manutenção:

*   **Linguagens:** TypeScript, JavaScript, HTML, CSS
*   **Frameworks/Bibliotecas:**
    *   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
    *   **Vite:** Ferramenta de build e servidor de desenvolvimento para projetos web.
    *   **Tailwind CSS:** Framework CSS para estilização rápida e responsiva.
    *   **Axios:** Cliente HTTP para fazer requisições à API.
    *   **React Router DOM:** Para gerenciamento de rotas na aplicação.
    *   **Lucide React:** Coleção de ícones para a interface.
    *   **React Hot Toast:** Biblioteca para notificações de feedback ao usuário.
    *   **ESLint:** Ferramenta de linting para manter a qualidade e consistência do código.
    *   **React Markdown & Remark GFM:** Para renderização de conteúdo Markdown com suporte a GitHub Flavored Markdown.
    *   **React Syntax Highlighter:** Para destaque de sintaxe em blocos de código (ex: SQL).

## Como Instalar e Rodar

Para configurar e rodar o projeto localmente, siga os passos abaixo:

> [!IMPORTANT]
Esta aplicação é o Front-end. Para que ela funcione corretamente, você deve ter o Backend (API) rodando em sua máquina ou servidor. Você pode encontrar o repositório da API aqui: https://github.com/Bruno2202/report-repository-api.git

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Bruno2202/report-repository.git
    cd report-repository
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (exemplo):
    ```env
    VITE_API_BASE_URL=http://localhost:3000/api # URL da API de backend
    ```
    *Certifique-se de que a API de backend esteja rodando e acessível.*

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará acessível em `http://localhost:5173`.

5.  **Build para produção (opcional):**
    Para gerar uma build otimizada para produção:
    ```bash
    npm run build
    ```
    Os arquivos de build serão gerados na pasta `dist/`.

6.  **Pré-visualize a build de produção (opcional):**
    ```bash
    npm run preview
    ```
    Isso iniciará um servidor local para servir os arquivos da pasta `dist/`.

## Estrutura do Projeto

A estrutura do projeto é organizada de forma modular para facilitar a navegação e a manutenção:

```
.
├── public/                 # Arquivos estáticos (ícones, etc.)
├── src/                    # Código fonte da aplicação
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── buttons/        # Botões da interface
│   │   ├── inputs/         # Campos de entrada
│   │   └── modals/         # Modais (Adicionar, Editar, Visualizar, etc.)
│   ├── config/             # Configurações globais (e.g., Axios)
│   ├── contexts/           # Contextos React para gerenciamento de estado global
│   ├── dtos/               # Data Transfer Objects (interfaces para requisições/respostas da API)
│   ├── models/             # Modelos de dados (interfaces para entidades do projeto)
│   ├── pages/              # Páginas principais da aplicação (Home, Manutenção)
│   ├── services/           # Serviços para interagir com a API
│   ├── style.css           # Estilos CSS globais (Tailwind CSS)
│   └── main.tsx            # Ponto de entrada da aplicação React
├── .eslintrc.cjs           # Configuração do ESLint
├── index.html              # Arquivo HTML principal
├── package.json            # Metadados do projeto e scripts
├── tsconfig.json           # Configurações globais do TypeScript
├── vite.config.ts          # Configuração do Vite
└── README.md               # Este arquivo README
```

## Como Contribuir

Agradecemos o interesse em contribuir para o Report Repository! Para colaborar, siga estas diretrizes:

1.  **Faça um Fork:** Crie um fork deste repositório para sua conta GitHub.
2.  **Clone o Fork:** Clone o repositório do seu fork para sua máquina local.
3.  **Crie uma Branch:** Crie uma nova branch para sua feature ou correção de bug (`git checkout -b feature/nome-da-feature` ou `bugfix/descricao-do-bug`).
4.  **Desenvolva:** Implemente suas alterações, garantindo que o código siga as melhores práticas e esteja bem documentado.
5.  **Testes:** Se aplicável, adicione ou atualize testes para suas alterações.
6.  **Lint:** Verifique a conformidade com as regras de linting (`npm run lint`).
7.  **Commit:** Faça commits descritivos das suas alterações.
8.  **Push:** Envie suas alterações para o seu fork (`git push origin feature/nome-da-feature`).
9.  **Pull Request:** Abra um Pull Request para a branch `main` deste repositório, descrevendo suas alterações.

Sua contribuição será revisada e, se aprovada, integrada ao projeto.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.

---

*Este README foi gerado automaticamente pelo README.ai* https://github.com/Bruno2202/readme-ai
