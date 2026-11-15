const API_URL = "https://rickandmortyapi.com/api/character";

const characterGrid = document.getElementById("characterGrid");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const apiStatus = document.getElementById("apiStatus");
const resultsInfo = document.getElementById("resultsInfo");
const pageInfo = document.getElementById("pageInfo");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentPage = 1;
let totalPages = 1;
let currentCharacters = [];

function translateStatus(status) {
  const translations = { Alive: "Vivo", Dead: "Morto", unknown: "Desconhecido" };
  return translations[status] || status;
}

function createCharacterCard(character) {
  // Os elementos são criados via JavaScript: não existem cards fixos no HTML.
  const card = document.createElement("article");
  card.className = "character-card";

  const image = document.createElement("img");
  image.src = character.image;
  image.alt = `Imagem de ${character.name}`;
  image.loading = "lazy";

  const content = document.createElement("div");
  content.className = "card-content";

  const name = document.createElement("h3");
  name.textContent = character.name;

  const status = document.createElement("p");
  status.className = `status ${character.status.toLowerCase()}`;
  status.textContent = translateStatus(character.status);

  const species = document.createElement("p");
  species.className = "card-detail";
  const speciesLabel = document.createElement("strong");
  speciesLabel.textContent = "Espécie: ";
  species.append(speciesLabel, document.createTextNode(character.species || "Não informada"));

  const origin = document.createElement("p");
  origin.className = "card-detail";
  const originLabel = document.createElement("strong");
  originLabel.textContent = "Origem: ";
  origin.append(originLabel, document.createTextNode(character.origin?.name || "Desconhecida"));

  content.append(name, status, species, origin);
  card.append(image, content);
  return card;
}

function renderCharacters(characters) {
  characterGrid.innerHTML = "";

  if (characters.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Nenhum personagem encontrado com esses filtros.";
    characterGrid.appendChild(empty);
    return;
  }

  characters.forEach((character) => {
    const card = createCharacterCard(character);
    characterGrid.appendChild(card); // Insere cada card dinamicamente no DOM.
  });
}

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  const filteredCharacters = currentCharacters.filter((character) => {
    const matchesName = character.name.toLowerCase().includes(searchTerm);
    const matchesStatus = selectedStatus === "all" ||
      character.status.toLowerCase() === selectedStatus;
    return matchesName && matchesStatus;
  });

  renderCharacters(filteredCharacters);
  resultsInfo.textContent = `${filteredCharacters.length} personagem(ns) nesta página`;
}

async function loadCharacters(page = 1) {
  characterGrid.innerHTML = '<div class="loading">Abrindo portal dimensional...</div>';
  apiStatus.textContent = "Consultando API...";
  nextButton.disabled = true;
  prevButton.disabled = true;

  try {
    // fetch realiza uma requisição HTTP à API pública.
    const response = await fetch(`${API_URL}?page=${page}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    currentCharacters = data.results;
    currentPage = page;
    totalPages = data.info.pages;

    apiStatus.textContent = "API conectada";
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevButton.disabled = !data.info.prev;
    nextButton.disabled = !data.info.next;

    applyFilters();
  } catch (error) {
    console.error("Falha ao carregar personagens:", error);
    apiStatus.textContent = "Falha na conexão";
    characterGrid.innerHTML = "";
    const message = document.createElement("div");
    message.className = "error-state";
    message.textContent = "Não foi possível carregar os personagens. Verifique sua conexão e tente novamente.";
    characterGrid.appendChild(message);
    resultsInfo.textContent = "Erro ao consultar a API";
  }
}

searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
prevButton.addEventListener("click", () => {
  if (currentPage > 1) loadCharacters(currentPage - 1);
});
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) loadCharacters(currentPage + 1);
});

// Carrega a primeira página assim que o arquivo JavaScript é executado.
loadCharacters();
