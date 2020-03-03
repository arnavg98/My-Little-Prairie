import Game from "./game.js";

let game = {};
let tileState = []; //array that will have a zero or a 1 depending on if it has weed or not
let actions = 0;
let growthCounter = [];
let weedCounter = [];
for(let i = 0; i<59; i++) {
    growthCounter[i]=0;
    weedCounter[i]=0;
}
let currenttool = 0;
let currentplant = 0;
/*
tileState UPDATE:
0: Empty
1: Empty with weed
2: Baby Plant
3: Baby plant with weed
4: Medium plant
5: Medium Plant with weed
6: Adult Plant
7: Adult Plant with weed
*/

export const renderGame = function(game) {
    let board = game.gameState.board;
    let score = game.gameState.score;

    let string = `<button id="weed" class="large blue button">Weed</button>
    <button class="large blue button" id="plant">Plant</button>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        
        if(tileState[i]==1) {
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" onclick="popup(this)">
            <img src="public/assets/weeds.jpg" alt="" />
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
            <img src="public/assets/dirt.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i]==2){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/sproutPlaceholder.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i]==3){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/weeds.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i]==4){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/mediumPlaceholder.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i]==5){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/mediumWithWeedsPlaceholder.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i]==6){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/grass.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i]==7){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/adultPlantPlaceholder.jpg" alt="" />
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
    
    
    let string = `<button class="large blue button" id="finish">Finish Weeding</button>
    <br> <button class="button1" value="1" id="tool"></button>
    <button class="button2" value="2" id="tool"></button>
    <button class="button3" value="3" id="tool"></button>
    <button class="button4" value="4" id="tool"></button>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i]==1) {
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/weeds.jpg" alt="" />
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
            <img src="public/assets/dirt.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
    //weedCount++;
        }
        else if(tileState[i]==2){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/sproutPlaceholder.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i]==3){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/weeds.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i]==4){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/mediumPlaceholder.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i]==5){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/mediumWithWeedsPlaceHolder.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i]==6){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/grass.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i]==7){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/adultPlantPlaceholder.jpg" alt="" />
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
    $root.on('click', '#tool', handleToolButtonPress);
    return string;

}

export const renderPlantingBoard = function(game) {

    const $root = $('#root');
    let board = game.gameState.board;
    let score = game.gameState.score;
    

    let string = `<button class="large blue button" id="finish">Finish Planting</button>
    <br> <button class="buttonplant1" value="1" id="tool"></button>
    <button class="buttonplant2" value="2" id="tool"></button>
    <button class="buttonplant3" value="3" id="tool"></button>
    <button class="buttonplant4" value="4" id="tool"></button>
    <ul id="hexGrid">`;

    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i]==1) {
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/weeds.jpg" alt="" />
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
            <img src="public/assets/dirt.jpg" alt="" />
            <h1>Plant Here</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
    //weedCount++;
        }
        else if(tileState[i]==2){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/sproutPlaceholder.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i]==3){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/weeds.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i]==4){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/mediumPlaceholder.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i]==5){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/mediumWithWeedsPlaceHolder.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i]==6){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/grass.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i]==7){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/adultPlantPlaceholder.jpg" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
    }
    string+=`</ul>`;
    
    $root.on('click', '#finish', handleFinishWeedingButtonPress);
    $root.on('click', '#tool', handlePlantPress);

    return string;


}

export const handleWeedActionClick = function(event) {
    if (currenttool == 0) { 
        alert("Please select a tool!");
    } else {
    let currentTile = event.currentTarget.getAttribute("id");
    console.log("Tile " + currentTile + " is in plant state " + tileState[currentTile]);
    if(tileState[currentTile]%2==1) {
        tileState[currentTile]--;
        weedCounter[currentTile]=0;
        alert("Tile " + currentTile + " weeded!");
        actions = actions + 1;
        console.log(actions);
        if (actions % 2 == 0) {
            let i = Math.floor(Math.random() * 59);
            let random = Math.floor(Math.random() * 5);
            if(random == 2 && i != currentTile) {
                if (tileState[i] == 2) {
                    tileState[i] = 3;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i] == 4) {
                    tileState[i] = 5;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i] == 6) {
                    tileState[i] = 7
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i] == 0){
                    tileState[i] = 1;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                }
            } 
        }
    }   else {
        alert("Tile " + currentTile +" does not have weeds!");
    }

    for(let i = 0; i<59; i++) {
        //if it has a weed
        if(tileState[i]%2==1) {
            //Countdown to plant death gets closer
            weedCounter[i]++;

            //If it is this plant's time to die
            if(weedCounter[i]>5) {
                //It dies and becomes an Empty with Weed space
                tileState[i]=1;
                weedCounter[i]=0;
            }
        }
        //If it does not have a weed
        else {

            //If it has a plant there that is not fully grown
            if(tileState[i]>0 && tileState[i]!=6) {

                //It will grow
                growthCounter[i]++;

                //If it has grown enough
                if(growthCounter[i]>3){

                    //It transforms into a new phase
                    tileState[i]+=2;
                    growthCounter[i]=0;
                }

            }

        }

        
    }

    const $root = $('#root');
    $root.off();
    
    handleWeedButtonPress();
}

}

export const handlePlantActionClick = function(event) {
    let currentTile = event.currentTarget.getAttribute("id");
    console.log(currentTile);
    if (currentplant == 0) { 
        alert("Please select a plant!");
    } else {
    if(tileState[currentTile]==1) {
        alert("Cannot plant on Tile " + currentTile + "!");
    }
    else {
        tileState[currentTile]=2;
        alert("Planted on Tile " + currentTile +".");
        actions = actions + 1;
        console.log(actions);
        if (actions % 2 == 0) {
            let i = Math.floor(Math.random() * 59);
            let random = Math.floor(Math.random() * 5);
            if(random == 2 && i != currentTile) {
                if (tileState[i] == 2) {
                    tileState[i] = 3;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i] == 4) {
                    tileState[i] = 5;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i] == 6) {
                    tileState[i] = 7
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i] == 0){
                    tileState[i] = 1;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                }
            } 
        }
    }

        //This next section has will be in the plant method and the weed method.
    //It involves updating each individual weed and plant state for each tile.
    for(let i = 0; i<59; i++) {
        //if it has a weed
        if(tileState[i]%2==1) {
            //Countdown to plant death gets closer
            weedCounter[i]++;

            //If it is this plant's time to die
            if(weedCounter[i]>5) {
                //It dies and becomes an Empty with Weed space
                tileState[i]=1;
                weedCounter[i]=0;
            }
        }
        //If it does not have a weed
        else {

            //If it has a plant there that is not fully grown
            if(tileState[i]>0 && tileState[i]!=6) {

                //It will grow
                growthCounter[i]++;

                //If it has grown enough
                if(growthCounter[i]>3){

                    //It transforms into a new phase
                    tileState[i]+=2;
                    growthCounter[i]=0;
                }

            }

        }

        
    }

    const $root = $('#root');
    $root.off();
    
    handlePlantButtonPress();
    
    }
}

export const handleFinishWeedingButtonPress = function(event) {
    currenttool = 0;
    currentplant = 0;
    const $root = $('#root');
    $root.off();
    $root.empty();
    let game = new Game(59);
    main(game);

}

export const handleToolButtonPress = function(event) {
    currenttool = event.target.value;
    console.log(currenttool);
}

export const handlePlantPress = function(event) {
    currentplant = event.target.value;
    console.log(currentplant);
}


export const renderSite = function() {
    return `<header><img class="logo" src="public/assets/logo.png"></img></header>`;
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