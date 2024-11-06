document.getElementById("search-button").addEventListener("click", function () {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  if (!searchInput) return alert("Please enter a Pokémon name or ID");

  fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
    .then((response) => {
      if (!response.ok) throw new Error("Pokémon not found");
      return response.json();
    })
    .then((data) => displayPokemonData(data))
    .catch((error) => alert("Pokémon not found"));
});

function displayPokemonData(pokemon) {
  document.getElementById("pokemon-name").innerText =
    pokemon.name.toUpperCase();
  document.getElementById("pokemon-id").innerText = `#${pokemon.id}`;
  document.getElementById("weight").innerText = `Weight: ${pokemon.weight}`;
  document.getElementById("height").innerText = `Height: ${pokemon.height}`;

  const typesContainer = document.getElementById("types");
  typesContainer.innerHTML = ""; // Clear previous types
  pokemon.types.forEach((typeInfo) => {
    const typeElement = document.createElement("p");
    typeElement.innerText = typeInfo.type.name.toUpperCase();
    typesContainer.appendChild(typeElement);
  });

  document.getElementById("hp").innerText = `HP: ${getStatValue(
    pokemon,
    "hp"
  )}`;
  document.getElementById("attack").innerText = `Attack: ${getStatValue(
    pokemon,
    "attack"
  )}`;
  document.getElementById("defense").innerText = `Defense: ${getStatValue(
    pokemon,
    "defense"
  )}`;
  document.getElementById(
    "special-attack"
  ).innerText = `Special Attack: ${getStatValue(pokemon, "special-attack")}`;
  document.getElementById(
    "special-defense"
  ).innerText = `Special Defense: ${getStatValue(pokemon, "special-defense")}`;
  document.getElementById("speed").innerText = `Speed: ${getStatValue(
    pokemon,
    "speed"
  )}`;

  const spriteContainer = document.getElementById("sprite-container");
  spriteContainer.innerHTML = ""; // Clear previous sprite
  const sprite = document.createElement("img");
  sprite.id = "sprite";
  sprite.src = pokemon.sprites.front_default;
  sprite.alt = `${pokemon.name} sprite`;
  spriteContainer.appendChild(sprite);
}

function getStatValue(pokemon, statName) {
  const stat = pokemon.stats.find((stat) => stat.stat.name === statName);
  return stat ? stat.base_stat : 0;
}
