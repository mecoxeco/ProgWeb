function changePageTitle(title) {
  document.title = title
}

function updateVisitCounter() {
  let visitData = localStorage.getItem('visitData');
  if (!visitData) {
    visitData = { count: 0, lastVisit: '' };
  } else {
    visitData = JSON.parse(visitData);
  }
  visitData.count++;
  visitData.lastVisit = new Date().toLocaleString('pt-BR');
  localStorage.setItem('visitData', JSON.stringify(visitData));

  const visitInfo = document.getElementById('visit-info');
  visitInfo.textContent = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;
}

updateVisitCounter();

function generateInfoSection(sprites, pokemonName) {
  const h2 = document.createElement('h2');
  h2.id = 'info-pokemon-label';
  h2.textContent = `Informações sobre ${pokemonName}`;

  const img = document.querySelector('img');
  const imgArray = Object.values(sprites).filter(url => typeof url === 'string');
  img.src = imgArray[0];
  img.alt = `Imagem do Pokémon ${pokemonName}`;

  let currentImgIndex = 0;
  img.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % imgArray.length;
    img.src = imgArray[currentImgIndex];
  });

  const section = document.querySelector('#info-pokemon');

  // Removendo o título anterior, caso exista
  const existingTitle = section.querySelector('h2');
  if (existingTitle) {
    existingTitle.remove();
  }

  section.appendChild(h2);
  section.appendChild(img);
}

async function getPokemonData(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const jsonData = await data.json();
    generateInfoSection(jsonData.sprites, name);
  } catch (error) {
    console.error(error);
  }
}

function getSearchParams() {
  if (!location.search) {
    return;
  }

  const urlSearchParams = new URLSearchParams(location.search);
  const pokemonName = urlSearchParams.get('name');

  changePageTitle(`Página do ${pokemonName}`);
  getPokemonData(pokemonName);
}

document.addEventListener('DOMContentLoaded', function () {
  getSearchParams();
});
