import { plantdefs } from "../public/defs/plantdefs.js";
import { renderCatalog } from "./rendercatalog.js";
import { addGameState } from "./actionslog.js";
import ActiveEvents from "./events.js";

//for reference src="${plantdefs[tileState[i].name].image}" is how to refer to plant's image

let tileState = []; //array that will have a zero or a 1 depending on if it has weed or not
let actions = 0;
let growthCounter = [];
let weedCounter = [];
let plantAge = [];

for(let i = 0; i<59; i++) {
    growthCounter[i]=0;
    weedCounter[i]=0;
    plantAge[i]=0;
}
let currenttool = 0;
let currentplant = 0;
let year = 1;
let season = "";
let score = 0;
let activeEvents = new ActiveEvents();
activeEvents.updateEvents(logGameState());
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
    <button id="events" class="large blue button">Events</button>
    <button class="large blue button" id="catalogbutton">Catalog</button>
    <div id="eventDIV"></div>
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
            <img class="baby" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            <img class="med" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            string+=handleSeason(i);
        }
        else if(tileState[i].state==7){
            string+=handleSeason(i);
        }
    }
    string+=`</ul>`
    const $root = $('#root');
    $root.on('click', '#weed', handleWeedButtonPress);
    $root.on('click', '#plant', handlePlantButtonPress);
    $root.on('click', '#catalogbutton', handleCatalogButtonPress);
    $root.on('click', '#events', handleEvents);
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

export const handleCatalogButtonPress = function(e) {
    $('#catalog').toggle();
};

export const renderWeedingBoard = function() {

    const $root = $('#root');
    
    //Using Placeholder plants for each value! They will be more extensive when we combine them with the seasons.
    let string = `<button class="large blue button" id="finish">Finish Weeding</button>
    <br> <button class="button1" value="pickaxe" id="tool"></button>
    <button class="button2" value="burn" id="tool"></button>
    <button class="button3" value="gloves" id="tool"></button>
    <button class="button4" value="pull" id="tool"></button>
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
            <img class="baby" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            <img class="med" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            string+=handleSeason(i);
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==7){
            string+=handleSeason(i);
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
            <img class="baby" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            <img class="med" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            string+=handleSeason(i);
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==7){
            string+=handleSeason(i);
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
    //if(currenttool==tileState[currentTile].weedName)
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

            //console.log("Score: " + score + " because its weed count was " + localWeedCount);

        }
        console.log("Weeded a " + tileState[currentTile].weedName);
        //alert("Tile " + currentTile + " weeded!");
        actions = actions + 1;
        logGameState();
        console.log(actions);
        if (actions % 2 == 0) {
            let i = Math.floor(Math.random() * 59);
            let random = Math.floor(Math.random() * 5);
            if(random <= 3 && i != currentTile) {
                if (tileState[i].state == 2) {
                    tileState[i].state = 3;
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 4) {
                    tileState[i].state = 5;
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 6) {
                    tileState[i].state = 7
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 0){
                    tileState[i].state = 1;
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
                }
            } 
        }
    }   else {
        alert("Tile " + currentTile +" did not have weeds!");
        if(tileState[currentTile].state>0) {
            tileState[currentTile].state=0;
            growthCounter[currentTile]=0;
            plantAge[i]=0;
            score=score-300;
        }
    }

    for(let i = 0; i<59; i++) {
        //plantAge[i]++;
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
                plantAge[i]=0;
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
                if(tileState[i].state>0) {
                    plantAge[i]++;
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
        plantAge[currentTile]=0;
        tileState[currentTile].name=currentplant;
        console.log("You just planted a " + tileState[currentTile].name);
        //alert("Planted on Tile " + currentTile +".");

        //score+=50*plantdefs[currentplant].growthrate;
        actions = actions + 1;
        logGameState();
        console.log(actions);
        if (actions % 2 == 0) {
            let i = Math.floor(Math.random() * 59);
            let random = Math.floor(Math.random() * 5);
            if(random <= 3 && i != currentTile) {
                if (tileState[i].state == 2) {
                    tileState[i].state = 3;
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 4) {
                    tileState[i].state = 5;
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 6) {
                    tileState[i].state = 7
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
                } else if (tileState[i].state == 0){
                    tileState[i].state = 1;
                    weedType(i);
                    console.log(i + "added a " + tileState[i].weedName);
                    //handleFinishWeedingButtonPress();
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
                plantAge[i]=0;
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
                if(tileState[i].state>0) {
                    plantAge[i]++;
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
    console.log(this.id);
}

//Updates score after actions
export const scoreUpdate = function() {



}

export function logGameState() {
    return {
        tileState: tileState,
        actions: actions,
        growthCounter: growthCounter,
        weedCounter: weedCounter,
        currenttool: currenttool,
        currentplant: currentplant,
        year: year,
        season: season,
        score: score,
    };
}
export const handleSeason = function(i) {
    let string = ``;
    if (actions%120 < 30) {
        season = "Spring";
        console.log("Spring");
    } else if (actions%120 < 60) {
        season = "Summer";
        console.log("Summer");
    } else if (actions%120 < 90) {
        season = "Fall";
        console.log("Fall");
    } else if (actions%120 < 120){
        season = "Winter";
        console.log("Winter")
        year++;
    }
    switch(season) {
        case "Spring":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img class="adult" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            <img class="adult" src="${plantdefs[tileState[i].name].image}" alt="" />
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
            <img class="adult" src="${plantdefs[tileState[i].name].image}" alt="" />
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
};

export const handleEvents = function () {
    let string = ``;
    string += `<div id="overlay">
    <h>Events</h><button stlye="color: blue" class="delete">X</button>`;
    for (let i = 0; i < activeEvents.arr.length; i++) {
        string+= `<div class=eventBox>
        <h>${activeEvents.arr[i].name}</h>
        <p>${activeEvents.arr[i].description}</p>
        <p>${activeEvents.arr[i].objective}</p>
        </div>`;
    }
    string += `</div>`;
    $('#eventDIV').append(string);
    $('#root').on('click', '.delete', handleCloseEvent);
}

export const handleCloseEvent = function () {
    $('#eventDIV').empty();
}

export const gameEnd = function() {
    if (year==4) {
        // TO DO: end the game 
        // TO DO: add score to leaderboard
        // TO DO: switch to end screen
    }
}

export const renderSite = function() {
    return `<header><img class="logo" src="public/assets/logo.png"></img><div class="score">Score: ${score}</div></header>`;
};

export const weedType = function(i) {
    console.log("Value of i is " + i);
    let random = Math.floor(Math.random() * 9);
        switch(random) {

            case 0:
                tileState[i].weedName = "Kudzu";
                break;
            case 1: 
                tileState[i].weedName = "Johnson Grass"
                break;
            case 2:
                tileState[i].weedName = "Star Vine"
                break;
            case 3:
                tileState[i].weedName = "Mouse-ear Chickweed";
                break;
            case 4:
                tileState[i].weedName = "Sorrel";
                break;
            case 5:
                tileState[i].weedName = "Common Chickweed";
                break;
            case 6:
                tileState[i].weedName = "Hairy Cress";
                break;
            case 7:
                tileState[i].weedName = "Common Vetch";
                break;
            case 8:
                tileState[i].weedName = "Kudzu";
                break;
            case 9:
                tileState[i].weedName = "Kudzu";
                break;
        }
}

export const main = function() {
    const $root = $('#root');
    $root.append(renderSite());
    $root.append(renderGame());
    renderCatalog();
};

$(function () {
  
  for(let i =0; i<59; i++) {
    //   if(i%3==0) {
          //IT IS NOW AN OBJECT
          tileState[i]= new Object();
          tileState[i].state = 1;
          tileState[i].name = "Empty";
          

          //let i = Math.floor(Math.random() * 59);
        let random = Math.floor(Math.random() * 9);
        switch(random) {

            case 0:
                tileState[i].weedName = "Kudzu";
                break;
            case 1: 
                tileState[i].weedName = "Johnson Grass"
                break;
            case 2:
                tileState[i].weedName = "Star Vine"
                break;
            case 3:
                tileState[i].weedName = "Mouse-ear Chickweed";
                break;
            case 4:
                tileState[i].weedName = "Sorrel";
                break;
            case 5:
                tileState[i].weedName = "Common Chickweed";
                break;
            case 6:
                tileState[i].weedName = "Hairy Cress";
                break;
            case 7:
                tileState[i].weedName = "Common Vetch";
                break;
            case 8:
                tileState[i].weedName = "Kudzu";
                break;
            case 9:
                tileState[i].weedName = "Kudzu";
                break;
        }
          
      //}

      //MAKING IT SO ALL TILES HAVE WEEDS AT FIRST
    //   else {
    //       //CHANGED THESE FOR TESTING PURPOSES, MAKE SURE TO CHANGE THE SECOND STATEMENT SO IT EQUALS 0 AND THE THIRD
    //       //SO THAT IT EQUALS "Empty"
    //       tileState[i]=new Object();
    //       tileState[i].state = 0;
    //       tileState[i].name = "Empty";
    //       tileState[i].weedName = "Empty"
    //   }
  }
  
  main();

  });