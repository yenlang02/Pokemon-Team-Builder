// Yen Lang
// Week 6 - Asynchronous JavaScript and Fetch
// CIS 4004
// March 3, 2026


// cache to store pior fetched pokemon data
var cache = {};

var currentPokemon = null;


document.getElementById("find-btn").addEventListener("click", function() {
    var nameOrId = document.getElementById("pokemon-name-input").value.trim().toLowerCase();
    if (nameOrId === "") {
        return;
    }

    // checks the cache first
    if (cache[nameOrId]) {
        displayPokemon(cache[nameOrId]);
    } else {
        fetch("https://pokeapi.co/api/v2/pokemon/" + nameOrId)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // save
                cache[nameOrId] = data;
                displayPokemon(data);
            })
            .catch(function(error) {
                alert("Pokemon not found. Please try again.");
            });
    }
});

function displayPokemon(data) {
    currentPokemon = data;

    // the image
    var img = document.getElementById("pokemon-image");
    img.src = data.sprites.front_default;
    img.alt = data.name;

    // the audio
    var audio = document.getElementById("pokemon-audio");
    var cryUrl = data.cries && data.cries.latest ? data.cries.latest : "";
    audio.src = cryUrl;
    audio.load();

    // load moves to dropdowns
    var moves = data.moves;
    var moveNames = [];
    for (var i = 0; i < moves.length; i++) {
        moveNames.push(moves[i].move.name);
    }

    var selectIds = ["move1", "move2", "move3", "move4"];
    for (var j = 0; j < selectIds.length; j++) {
        var select = document.getElementById(selectIds[j]);
        select.innerHTML = "";
        for (var k = 0; k < moveNames.length; k++) {
            var option = document.createElement("option");
            option.value = moveNames[k];
            option.text = moveNames[k];
            select.appendChild(option);
        }
    }
}

document.getElementById("add-btn").addEventListener("click", function() {
    if (currentPokemon === null) {
        return;
    }

    var move1 = document.getElementById("move1").value;
    var move2 = document.getElementById("move2").value;
    var move3 = document.getElementById("move3").value;
    var move4 = document.getElementById("move4").value;

    var spriteUrl = currentPokemon.sprites.front_default;

    var table = document.getElementById("team-list");

    var row = document.createElement("tr");

    var imgCell = document.createElement("td");
    var spriteImg = document.createElement("img");
    spriteImg.src = spriteUrl;
    spriteImg.alt = currentPokemon.name;
    spriteImg.className = "team-sprite";
    imgCell.appendChild(spriteImg);
    row.appendChild(imgCell);

    var movesCell = document.createElement("td");
    var ul = document.createElement("ul");

    var movesList = [move1, move2, move3, move4];
    
    for (var i = 0; i < movesList.length; i++) {
        var li = document.createElement("li");
        li.textContent = movesList[i];
        ul.appendChild(li);
    }

    movesCell.appendChild(ul);
    row.appendChild(movesCell);

    table.appendChild(row);
});
