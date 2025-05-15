# Teste Montink: Página de Detalhes de Produto Interativa

Este projeto foi desenvolvido como parte de teste da [Montink](https://montink.com) focado na criação de uma página de detalhes de produto interativa e responsiva utilizando tecnologias modernas de desenvolvimento web.

O resultado final pode ser visualizado aqui: [Link do Deploy](https://ecommerce-product-page-alpha-bice.vercel.app)

## Sobre o Projeto

O objetivo principal foi construir uma página que exiba informações detalhadas de um produto, permitindo ao usuário selecionar variantes (tamanho e cor), visualizar imagens correspondentes à cor escolhida, calcular o frete e, crucialmente, persistir as escolhas e dados inseridos por um período limitado de tempo, mesmo após a atualização da página.

## Funcionalidades Implementadas

- ✨ Exibição de detalhes do produto (nome, preço).
- 👕 Seleção de variantes de tamanho.
- 🎨 Seleção de variantes de cor, atualizando a galeria de imagens dinamicamente.
- 🖼️ Galeria de imagens com visualização da imagem principal e miniaturas clicáveis.
- 🔍 Funcionalidade de zoom na imagem principal.
- CEP Cálculo de Frete utilizando API externa (ViaCEP).
- 🏠 Exibição das informações de endereço do frete calculado.
- ⏳ **Persistência de Estado:** Todas as seleções de usuário (cor, tamanho, CEP) e os dados de frete calculados são salvos no `localStorage` do navegador e mantidos por 15 minutos, sobrevivendo a atualizações de página.
- 🔄 Indicadores de carregamento e tratamento básico de erros para a busca de CEP.
- 💅 Estilização responsiva com Tailwind CSS.
- 🚀 Animações sutis na entrada dos elementos.

## Tecnologias Utilizadas

* **React:** Biblioteca JavaScript para construir interfaces de usuário.
* **Next.js:** Framework React com foco em performance, SEO e experiência do desenvolvedor (utilizando Client Components para a interatividade).
* **TypeScript:** Linguagem superset do JavaScript que adiciona tipagem estática.
* **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
* `react-medium-image-zoom`: Biblioteca para funcionalidade de zoom na imagem.
* `animate.css`: Biblioteca para animações CSS prontas.
* `localStorage`: API do navegador para persistência de dados no lado do cliente.

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <PASTA_DO_PROJETO>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

O aplicativo estará disponível em `http://localhost:3000`.

## Notas Pessoais e Agradecimento

Este projeto foi um teste muito interessante que me permitiu aplicar e reforçar conhecimentos em desenvolvimento front-end moderno, especialmente na gestão de estado reativo, tratamento de efeitos colaterais (como chamadas de API e interações com APIs do navegador como `localStorage`), e na arquitetura de componentes com React e Next.js.

Tive uma experiência muito legal trabalhando neste projeto, explorando as melhores práticas para criar interfaces de usuário fluidas e robustas, e resolvendo o requisito específico de persistência de estado com tempo limitado.

Sou muito grato pela oportunidade de participar deste desafio, e sou grato pela chance de ter trabalhado nele, independentemente do resultado final do processo seletivo.

---