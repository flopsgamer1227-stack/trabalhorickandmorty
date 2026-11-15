# Portal Rick and Morty

Projeto acadêmico de Desenvolvimento Web Front-End. A aplicação consulta a API pública Rick and Morty e monta cards de personagens dinamicamente com JavaScript.

## Como executar
1. Extraia a pasta do projeto.
2. Abra `index.html` no navegador. Se preferir, use a extensão Live Server do Visual Studio Code.
3. É necessária conexão com a internet para consultar a API.

## Funcionalidades
- Consumo da API com `fetch` e `async/await`.
- Cards criados com `document.createElement()` e inseridos com `appendChild()`.
- Busca por nome e filtro por status.
- Paginação entre as páginas retornadas pela API.
- Layout responsivo e mensagens de carregamento/erro.

## Tecnologias
HTML5, CSS3 e JavaScript puro, sem frameworks.

## API
Rick and Morty API: https://rickandmortyapi.com/
Documentação: https://rickandmortyapi.com/documentation

A API pública não exige token para os endpoints utilizados neste projeto. A resposta de personagens contém `info` (paginação) e `results` (lista de personagens). Cada personagem fornece campos como `name`, `status`, `species`, `origin` e `image`.

## Estrutura
- `index.html`: estrutura da página.
- `style.css`: identidade visual e responsividade.
- `script.js`: requisição, filtros, paginação e criação dinâmica dos cards.
- `relatorio_teorico.pdf`: parte teórica solicitada no trabalho.
- `roteiro_video.txt`: sugestão de apresentação do vídeo pitch.

Projeto desenvolvido para fins acadêmicos.
