const pokeHistory = [];
const maxHistory = 4;
let currentIndex = 0;

const url = `https://pokeapi.co/api/v2/pokemon/pikachu`;

function loadNextPoke() {
  currentIndex = 0;
  const random = Math.floor(Math.random() * 151) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${random}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(`.imgContainer`);
      container.innerHTML = "";
      const containerName = document.getElementById("pokeName-container");
      containerName.innerHTML = "";
      const nameElement = document.createElement(`h2`);
      nameElement.className = "pokeInfo";
      nameElement.textContent = `Nom : ${data.name}`;

      const typeElement = document.createElement("h3");
      typeElement.className = "pokeInfo";
      typeElement.textContent = `Type : ${data.types[0].type.name}`;

      const imageElement = document.createElement(`img`);
      imageElement.src = data.sprites.front_default;
      imageElement.alt = data.name;

      containerName.appendChild(nameElement);
      containerName.appendChild(typeElement);
      container.appendChild(imageElement);

      const currentPoke = {
        name: data.name,
        type: data.types[0].type.name,
        image: data.sprites.front_default,
      };
      pokeHistory.unshift(currentPoke);

      if (pokeHistory.length > maxHistory) {
        pokeHistory.pop();
      }
      displayHistory();
    })

    .catch((error) => {
      console.error(`Erreur :`, error);
    });
}

loadNextPoke();
nextBtn.addEventListener("click", loadNextPoke);

/*-----PreviousPoke-----*/

function loadPreviousPoke() {
  if (currentIndex < pokeHistory.length - 1) {
    currentIndex++;
    const previousPoke = pokeHistory[currentIndex];

    const container = document.querySelector(`.imgContainer`);
    container.innerHTML = "";
    const containerName = document.getElementById("pokeName-container");
    containerName.innerHTML = "";
    const nameElement = document.createElement(`h2`);
    nameElement.className = "pokeInfo";
    nameElement.textContent = `Nom : ${previousPoke.name}`;

    const typeElement = document.createElement("h3");
    typeElement.className = "pokeInfo";
    typeElement.textContent = `Type : ${previousPoke.type}`;

    const imageElement = document.createElement(`img`);
    imageElement.src = previousPoke.image;
    imageElement.alt = previousPoke.name;

    containerName.appendChild(nameElement);
    containerName.appendChild(typeElement);
    container.appendChild(imageElement);
  }
}

loadPreviousPoke();

/*-----History-----*/

function displayHistory() {
  const containerDisplay = document.querySelector(`.historyDisplay`);
  containerDisplay.innerHTML = "";

  pokeHistory.forEach((poke) => {
    const card = document.createElement("div");
    card.classList.add("history-card");

    card.innerHTML = `
        <h5>${poke.name}</h5>
        <p>Type : ${poke.type}</p>
        <img src="${poke.image}" alt="${poke.name}" width="80">
        
      `;

    containerDisplay.appendChild(card);
  });
}
/*-----RemovePoke-----*/

function removePoke() {
  const removePoke = document.querySelector(".history-card:last-child");
  removePoke.remove();
}
