const searchInput = document.getElementById("search");
const pokemonCard = document.querySelector(".card");
const pokemonImg = document.querySelector(".pokemonCard__header img");
const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonType = document.querySelector("#energyType");

const hp = document.querySelector("#hp p");
const attack = document.querySelector("#attack p");
const defense = document.querySelector("#defense p");
const specialAttack = document.querySelector("#special-attack p");
const specialDefense = document.querySelector("#special-defense p");
const speed = document.querySelector("#speed p");

// function fetch - get by value
const pokemonSearch = (event) => {
    event.preventDefault();

    const inputValue = searchInput.value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
        .then((data) => data.json()) // convertir la data en json
        .then((resp) => {
            // récupérer la response
            pokemonCard.classList.add("pokemonCard");
            pokemonImg.setAttribute(
                "src",
                resp.sprites.other["official-artwork"].front_default
            );
            pokemonImg.setAttribute("alt", "Image pokémon");
            pokemonName.innerText = resp.name;
            pokemonId.innerText = `N°${resp.id}`;

            if (resp.types[1]?.type.name) {
                pokemonType.innerText = `${resp.types[0].type.name} - ${resp.types[1].type.name}`;
            } else if (resp.types[2]?.type.name) {
                pokemonType.innerText = `${resp.types[0].type.name} - ${resp.types[1].type.name} - ${resp.types[2].type.name}`;
            } else {
                pokemonType.innerText = `${resp.types[0].type.name}`;
            }

            hp.innerText = resp.stats[0].base_stat;
            attack.innerText = resp.stats[1].base_stat;
            defense.innerText = resp.stats[2].base_stat;
            specialAttack.innerText = resp.stats[3].base_stat;
            specialDefense.innerText = resp.stats[4].base_stat;
            speed.innerText = resp.stats[5].base_stat;
        });
};
