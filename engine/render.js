import Game from "./game.js";
import { plantdefs } from "../public/defs/plantdefs.js";


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
let year = 1;
let season = "";
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

export const renderGame = function() {
    let string = `<button id="weed" class="large blue button">Weed</button>
    <button class="large blue button" id="plant">Plant</button>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        
        if(tileState[i].state==1) {
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
        else if(tileState[i].state==0) {
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
        else if(tileState[i].state==2){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].name].babyImg}" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i].state==3){
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
        else if(tileState[i].state==4){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].name].mediumImg}" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i].state==5){
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
        else if(tileState[i].state==6){
            string+=handleSeason();
        }
        else if(tileState[i].state==7){
            string+=handleSeason();
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
    
    const $root = $('#root');
    $root.empty();
    $root.append(renderSite());
    $root.append(renderWeedingBoard());
    

}

export const handlePlantButtonPress = function(event) {

    //alert("button pressed");
    const $root = $('#root');
    $root.empty();
    $root.append(renderSite());
    $root.append(renderPlantingBoard());
    

}

export const renderWeedingBoard = function() {

    const $root = $('#root');
    
    //Using Placeholder plants for each value! They will be more extensive when we combine them with the seasons.
    let string = `<button class="large blue button" id="finish">Finish Weeding</button>
    <br> <button class="button1" value="1" id="tool"></button>
    <button class="button2" value="2" id="tool"></button>
    <button class="button3" value="3" id="tool"></button>
    <button class="button4" value="4" id="tool"></button>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i].state==1) {
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
        else if(tileState[i].state==0){
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
        else if(tileState[i].state==2){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].name].babyImg}" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==3){
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
        else if(tileState[i].state==4){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].name].mediumImg}" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==5){
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
        else if(tileState[i].state==6){
            string+=handleSeason();
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==7){
            string+=handleSeason();
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
    }
    string+=`</ul>`;
    
    $root.on('click', '#finish', handleFinishWeedingButtonPress);
    $root.on('click', '#tool', handleToolButtonPress);
    return string;

}

export const renderPlantingBoard = function() {

    const $root = $('#root');
 
    

    let string = `<button class="large blue button" id="finish">Finish Planting</button>
    <br> <button class="buttonplant1" value="Carolina Anemone" id="tool"></button>
    <button class="buttonplant2" value="Common Milkweed" id="tool"></button>
    <button class="buttonplant3" value="Languid Coneflower" id="tool"></button>
    <button class="buttonplant4" value="Southern Sundrops" id="tool"></button>
    <ul id="hexGrid">`;

    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i].state==1) {
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
        else if(tileState[i].state==0){
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
        else if(tileState[i].state==2){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].name].babyImg}" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==3){
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
        else if(tileState[i].state==4){
            string+=`<li class="hex" id="${idString} data-id="${idString}">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].name].mediumImg}" alt="" />
            <h1>Remove Weed</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==5){
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
        else if(tileState[i].state==6){
            string+=handleSeason();
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==7){
            string+=handleSeason();
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
    console.log("Tile " + currentTile + " is in plant state " + tileState[currentTile].state);
    if(tileState[currentTile].state%2==1) {
        tileState[currentTile].state--;
        weedCounter[currentTile]=0;
        alert("Tile " + currentTile + " weeded!");
        actions = actions + 1;
        console.log(actions);
        if (actions % 2 == 0) {
            let i = Math.floor(Math.random() * 59);
            let random = Math.floor(Math.random() * 5);
            if(random == 2 && i != currentTile) {
                if (tileState[i].state == 2) {
                    tileState[i].state = 3;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 4) {
                    tileState[i].state = 5;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 6) {
                    tileState[i].state = 7
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 0){
                    tileState[i].state = 1;
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
        if(tileState[i].state%2==1) {
            //Countdown to plant death gets closer
            weedCounter[i]++;

            //If it is this plant's time to die
            if(weedCounter[i]>5) {
                //It dies and becomes an Empty with Weed space
                tileState[i].state=1;
                weedCounter[i]=0;
            }
        }
        //If it does not have a weed
        else {

            //If it has a plant there that is not fully grown
            if(tileState[i].state>0 && tileState[i].state!=6) {

                //It will grow
                growthCounter[i]++;

                //If it has grown enough
                if(growthCounter[i]>3){

                    //It transforms into a new phase
                    tileState[i].state+=2;
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
    if(tileState[currentTile].state%2==1) {
        alert("Cannot plant on Tile " + currentTile + "!");
    }
    else {
        tileState[currentTile].state=2;
        tileState[currentTile].name=currentplant;
        console.log("You just planted a " + tileState[currentTile].name);
        alert("Planted on Tile " + currentTile +".");
        actions = actions + 1;
        console.log(actions);
        if (actions % 2 == 0) {
            let i = Math.floor(Math.random() * 59);
            let random = Math.floor(Math.random() * 5);
            if(random == 2 && i != currentTile) {
                if (tileState[i].state == 2) {
                    tileState[i].state = 3;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 4) {
                    tileState[i].state = 5;
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 6) {
                    tileState[i].state = 7
                    console.log(i + "added weeds!")
                    handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 0){
                    tileState[i].state = 1;
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
        if(tileState[i].state%2==1) {
            //Countdown to plant death gets closer
            weedCounter[i]++;

            //If it is this plant's time to die
            if(weedCounter[i]>5) {
                //It dies and becomes an Empty with Weed space
                tileState[i].state=1;
                weedCounter[i]=0;
            }
        }
        //If it does not have a weed
        else {

            //If it has a plant there that is not fully grown
            if(tileState[i].state>0 && tileState[i].state!=6) {

                //It will grow
                growthCounter[i]++;

                //If it has grown enough
                if(growthCounter[i]>3){

                    //It transforms into a new phase
                    tileState[i].state+=2;
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
    main();

}

export const handleToolButtonPress = function(event) {
    currenttool = event.target.value;
    console.log(currenttool);
}

export const handlePlantPress = function(event) {
    currentplant = event.target.value;
    console.log(currentplant);
}
export const handleSeason = function() {
    let string = ``;
    if (actions < 30*year) {
        season = "Spring";
    } else if (actions < 60*year) {
        season = "Summer";
    } else if (actions < 90*year) {
        season = "Fall";
    } else {
        season = "Winter";
        year++;
    }
    switch(season) {
        case "Spring":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].name].adultImg}" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
            break;
        case "Summer":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].name].adultImg}" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
            break;
        case "Fall":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].name].adultImg}" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
            break;
        case "Winter":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/dormant-grass-1.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`;
            break;
    }
    return string;
}

export const renderSite = function() {
    return `<header><img class="logo" src="public/assets/logo.png"></img></header>`;
}

export const main = function() {
    const $root = $('#root');
    $root.append(renderSite());
    $root.append(renderGame());
}

$(function () {
  
  for(let i =0; i<59; i++) {
      if(i%3==0) {
          //IT IS NOW AN OBJECT
          tileState[i]= new Object();
          tileState[i].state = 1;
          tileState[i].name = "Weed";
          
      }
      else {
          tileState[i]=new Object();
          tileState[i].state = 0;
          tileState[i].name = "Empty";
      }
  }
  
  main();

  });