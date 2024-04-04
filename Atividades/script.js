

window.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const evolucao = urlParams.get('evolucao');
  
    if (evolucao) {
      document.title = `Página do ${evolucao}`;
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${evolucao}`)
        .then(response => response.json())
        .then(data => {
          const pokemonImg = document.createElement('img');
          pokemonImg.src = data.sprites.front_default;
          pokemonImg.alt = `Imagem de ${evolucao}`;
  
          pokemonImg.setAttribute('aria-label', `Imagem de ${evolucao}`);
  

          document.body.appendChild(pokemonImg);
        })
        .catch(error => console.error('Erro ao obter dados do Pokémon:', error));
    }
  });
  