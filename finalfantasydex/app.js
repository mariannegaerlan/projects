const characters = [
{
    name: "Cloud Strife",
    game: "FF7",
    job: "Soldier",
    image: "cloud.png"
},

{
    name: "Zidane Tribal",
    game: "FF9",
    job: "Thief",
    image: "zidane.png"
},

{
    name: "Yuna",
    game: "FFX",
    job: "White Mage",
    image: "yuna.png"
},

{
    name: "Sephiroth",
    game: "FF7",
    job: "Soldier",
    image: "sephiroth.png"
},

{
    name: "Kafka Palazzo",
    game: "FF6",
    job: "Magitek Knight",
    image: "kafka.png"
},

{
    name: "Cecil Harvey",
    game: "FF4",
    job: "Paladin",
    image: "cecil.png"
},

{
    name: "Jack Garland",
    game: "Origin",
    job: "Blue Mage",
    image: "jack.png"
},

{
    name: "Squall Leonhart",
    game: "FF8",
    job: "Knight",
    image: "squall.png"
},
]


const grid = document.querySelector(".character-grid");

function displayCharacters(data) {

    grid.innerHTML = "";

    data.forEach(character => {

        grid.innerHTML += `

        <div class="character">

            <img src="${character.image}">

            <h2>${character.name}</h2>

            <div class="tags">

                <span>${character.game}</span>

                <span>${character.job}</span>

            </div>

        </div>

        `;
    });
}

displayCharacters(characters);

const searchbar = document.getElementById("searchbar");

searchbar.addEventListener("keyup", () => {

    const value = searchbar.value.toLowerCase();

    const filteredCharacters = characters.filter(character => {

        return (

            character.name.toLowerCase().includes(value) ||

            character.game.toLowerCase().includes(value) ||

            character.job.toLowerCase().includes(value)

        );

    });

    displayCharacters(filteredCharacters);

});

const gameFilter =
    document.getElementById("gameFilter");

const games = [
    ...new Set(
        characters.map(character => character.game)
    )
];

games.forEach(game => {

    gameFilter.innerHTML += `

        <option value="${game}">
            ${game}
        </option>

    `;
});

const jobFilter = document.getElementById("jobFilter");

const jobs = [
    ...new Set(
        characters.map(character => character.job)
    )
];

jobs.forEach(job => {

    jobFilter.innerHTML += `

        <option value="${job}">
            ${job}
        </option>

    `;
});


function filterCharacters() {

    const selectedGame = gameFilter.value;

    const selectedJob = jobFilter.value;

    const searchValue =
        searchbar.value.toLowerCase();

    const filteredCharacters = characters.filter(character => {

        const matchesSearch =

            character.name.toLowerCase().includes(searchValue) ||

            character.game.toLowerCase().includes(searchValue) ||

            character.job.toLowerCase().includes(searchValue);

        const matchesGame =

            selectedGame === "all" ||

            character.game === selectedGame;

        const matchesJob =

            selectedJob === "all" ||

            character.job === selectedJob;

        return (
            matchesSearch &&
            matchesGame &&
            matchesJob
        );

    });

    displayCharacters(filteredCharacters);
}

searchbar.addEventListener("keyup", filterCharacters);

gameFilter.addEventListener("change", filterCharacters);

jobFilter.addEventListener("change", filterCharacters);