import Game from "./game.js";
import { plantdefs } from "../public/defs/plantdefs.js";


//for reference src="${plantdefs[tileState[i].name].image}" is how to refer to plant's image

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
let score = 0;
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
            <img class="baby" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
            <img class="med" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
            <img class="baby" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
            <img class="med" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
            <img class="baby" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
            <img class="med" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
        let localWeedCount=weedCounter[currentTile];
        weedCounter[currentTile]=0;
        if(tileState[currentTile].state>0) {

            let lengthMultiplier=(tileState[currentTile].state)/2;
            let growthMultiplier=plantdefs[tileState[currentTile].name].growthrate;
            console.log("Length multiplier is " + lengthMultiplier);
            console.log("Growth multiplier is " + growthMultiplier);
            //SCORE GETS INCREASED WITH WEEDING MULTIPLIER, GROWTH MULTIPLIER, AND LENGTH MULTIPLIER
            if(localWeedCount>=5) {
                score+=100*growthMultiplier*lengthMultiplier;
            }
            else if(localWeedCount>=3){
                score+=100*2*growthMultiplier*lengthMultiplier;
            }
            else {
                score+=100*3*growthMultiplier*lengthMultiplier;
            }

        }
        else {

            //THERE IS NO PLANT HERE, SO SCORE IS ONLY INCREASED BY WEEDING MULTIPLIER
            if(localWeedCount>=5) {
                score+=100*1;
            }
            else if(localWeedCount>=3){
                score+=100*2;
            }
            else {
                score+=100*3;
            }

            console.log("Score: " + score + " because its weed count was " + localWeedCount);

        }
        //alert("Tile " + currentTile + " weeded!");
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
        alert("Tile " + currentTile +" did not have weeds!");
        if(tileState[currentTile].state>0) {
            tileState[currentTile].state=0;
            growthCounter[currentTile]=0;
            score=score-300;
        }
    }

    for(let i = 0; i<59; i++) {
        //if it has a weed
        if(tileState[i].state%2==1) {
            //Countdown to plant death gets closer
            weedCounter[i]++;

            //If it is this plant's time to die
            if(weedCounter[i]>5&&tileState[i].state>1) {
                //It dies and becomes an Empty with Weed space
                tileState[i].state=1;
                //weedCounter[i]=0;
                score=score-200*plantdefs[tileState[i].name].growthrate;
            }
        }
        //If it does not have a weed
        else {

            //If it has a plant there that is not fully grown
            if(tileState[i].state>0 && tileState[i].state!=6) {

                //It will grow
                growthCounter[i]++;

                //If it has grown enough
                if(growthCounter[i]>3*plantdefs[tileState[i].name].growthrate){

                    //It transforms into a new phase
                    tileState[i].state+=2;
                    growthCounter[i]=0;
                    score+=100*(plantdefs[tileState[i].name].growthrate)*(tileState[i].state/2);
                }

                if(actions%5==0) {
                    score+=50*(plantdefs[tileState[i].name].growthrate);
                }

            }

        }

        
    }

    if(score<0) {
        score=0;
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
        growthCounter[currentTile]=0;
        tileState[currentTile].name=currentplant;
        console.log("You just planted a " + tileState[currentTile].name);
        //alert("Planted on Tile " + currentTile +".");

        //score+=50*plantdefs[currentplant].growthrate;
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
            if(weedCounter[i]>5&&tileState[i].state>1) {
                //It dies and becomes an Empty with Weed space
                tileState[i].state=1;
                //weedCounter[i]=0;
                score=score-200*plantdefs[tileState[i].name].growthrate;
            }
        }
        //If it does not have a weed
        else {

            //If it has a plant there that is not fully grown
            if(tileState[i].state>0 && tileState[i].state!=6) {

                //It will grow
                growthCounter[i]++;

                //If it has grown enough
                if(growthCounter[i]>3*plantdefs[tileState[i].name].growthrate){

                    //It transforms into a new phase
                    tileState[i].state+=2;
                    growthCounter[i]=0;
                    score+=100*(plantdefs[tileState[i].name].growthrate)*(tileState[i].state/2);
                }
                if(actions%5==0) {
                    score+=50*(plantdefs[tileState[i].name].growthrate);
                }

            }

        }

        
    }

    if(score<0) {
        score=0;
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

//Updates score after actions
export const scoreUpdate = function() {



}
export const handleSeason = function() {
    let string = ``;
    if (actions < 30*year) {
        season = "Winter";
    } else if (actions < 60*year) {
        season = "Summer";
    } else if (actions < 90*year) {
        season = "Fall";
    } else if (action < 120*year){
        season = "Winter";
        year++;
    }
    switch(season) {
        case "Spring":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img class="adult" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
            <img class="adult" src="public/assets/sproutPlaceholder.jpg" alt="" />
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
            <img class="adult" src="public/assets/sproutPlaceholder.jpg" alt="" />
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

export const gameEnd = function() {
    if (year==4) {
        //end the game 
    }
}

export const renderSite = function() {
    return `<header><img class="logo" src="public/assets/logo.png"></img><div class="score">Score: ${score}</div></header>`;
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
          //CHANGED THESE FOR TESTING PURPOSES, MAKE SURE TO CHANGE THE SECOND STATEMENT SO IT EQUALS 0 AND THE THIRD
          //SO THAT IT EQUALS "Empty"
          tileState[i]=new Object();
          tileState[i].state = 0;
          tileState[i].name = "Empty";
      }
  }
  
  main();

  });