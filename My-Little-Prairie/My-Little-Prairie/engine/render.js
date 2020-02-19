import Game from "./game.js";

let game = {};
let tileState = []; //array that will have a zero or a 1 depending on if it has weed or not

export const renderGame = function(game) {
    let board = game.gameState.board;
    let score = game.gameState.score;

    let string = `<h2>My Little Prairie</h2>
    <button id="weed">Weed</button>
    <button id="plant">Plant</button>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        
        if(tileState[i]==1) {
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" onclick="popup(this)">
            <img src="pics/weeds.jpg" alt="" />
            <h1>This tile has a weed!</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`

        }
        else if(tileState[i]==0) {
        string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="pics/blankTile.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else {
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="pics/grass.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
    }
    string+=`</ul>`
    const $root = $('#root');
    $root.on('click', '#weed', handleWeedButtonPress);
    $root.on('click', '#plant', handlePlantButtonPress);
    return string;

}

export const handleWeedButtonPress = function(event) {

    //alert("button pressed");
    let game = new Game(59);
    const $root = $('#root');
    $root.empty();
    $root.append(renderSite());
    $root.append(renderWeedingBoard(game));
    

}

export const handlePlantButtonPress = function(event) {

    //alert("button pressed");
    let game = new Game(59);
    const $root = $('#root');
    $root.empty();
    $root.append(renderSite());
    $root.append(renderPlantingBoard(game));
    

}

export const renderWeedingBoard = function(game) {

    const $root = $('#root');
    let board = game.gameState.board;
    let score = game.gameState.score;
    
    
    let string = `<h2>My Little Prairie</h2>
    <button id="finish">Finish Weeding</button>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i]==1) {
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="pics/weeds.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i]==0){
        string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="pics/blankTile.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
    //weedCount++;
        }
        else {
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="pics/grass.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
    }
    string+=`</ul>`;
    
    $root.on('click', '#finish', handleFinishWeedingButtonPress);

    return string;

}

export const renderPlantingBoard = function(game) {

    const $root = $('#root');
    let board = game.gameState.board;
    let score = game.gameState.score;
    
    
    let string = `<h2>My Little Prairie</h2>
    <button id="finish">Finish Planting</button>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i]==1) {
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="pics/weeds.jpg" alt="" />
            <h1>Plant Here</h1>
            <p></p>
        </a>
        </div>
    </li>`
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i]==0){
        string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="pics/blankTile.jpg" alt="" />
            <h1>Plant Here</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
    //weedCount++;
        }
        else {
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="pics/grass.jpg" alt="" />
            <h1>Uproot</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
    }
    string+=`</ul>`;
    
    $root.on('click', '#finish', handleFinishWeedingButtonPress);

    return string;


}

export const handleWeedActionClick = function(event) {
    let currentTile = event.currentTarget.getAttribute("id");
    console.log(currentTile);
    if(tileState[currentTile]==1) {
        tileState[currentTile]=0;
        alert("Tile " + currentTile + " weeded!");
    }
    else {
        alert("Tile " + currentTile +" does not have weeds!");
    }

    const $root = $('#root');
    $root.off();
    
    handleWeedButtonPress();
    

}

export const handlePlantActionClick = function(event) {
    let currentTile = event.currentTarget.getAttribute("id");
    console.log(currentTile);
    if(tileState[currentTile]==1) {
        
        alert("Cannot plant on Tile " + currentTile + "!");
    }
    else {
        tileState[currentTile]=2;
        alert("Planted on Tile " + currentTile +".");
    }

    const $root = $('#root');
    $root.off();
    
    handlePlantButtonPress();
    

}

export const handleFinishWeedingButtonPress = function(event) {
    const $root = $('#root');
    $root.off();
    $root.empty();
    let game = new Game(59);
    main(game);

}


export const renderSite = function() {
    return `<div><h1>My Little Prairie</h1>`;
}

export const main = function(game) {
    const $root = $('#root');
    $root.append(renderSite());
    $root.append(renderGame(game));
}

$(function () {
  let game = new Game(59);
  for(let i =0; i<59; i++) {
      if(i%3==0) {
          tileState[i]=1;
      }
      else {
          tileState[i]=0;
      }
  }
  main(game);

  });