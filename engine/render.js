import { plantdefs } from "../public/defs/plantdefs.js";
import { renderCatalog } from "./rendercatalog.js";
import { logGameState } from "./actionslog.js";
import { addauthlistener, isloggedin, getsavedgame, setsavedgame } from "./myfirebase.js";
import ActiveEvents from "./events.js";

//for reference src="${plantdefs[tileState[i].name].image}" is how to refer to plant's image

// GAME STATE VARIABLES

let tileState; /* An array of objects corresponding to each tile on the board.
each object has the following properties:
  state: a number that corresponds to the following
    0: Empty
    1: Empty with weed
    2: Baby Plant
    3: Baby plant with weed
    4: Medium plant
    5: Medium Plant with weed
    6: Adult Plant
    7: Adult Plant with weed
  name: string. corresponds to the common name of a plant inside plantdefs
  weedName: string. corresponds to the common name of a weed inside plantdefs
  growthCounter: number. keeps track of plant's growth in between stages
  weedCounter: number. how long a weed has been around a plant
  plantAge: number. how many actions a plant has been alive
*/
let actions; // number.
let score; // number.
let activeEvents; // class

let tester; // string. idk what this is for
let currenttool; // number. current tool selected
let currentplant; // number. current plant selected
let year; // number.
let season; // string.
let seasonid; // number.

resetGameState();

// resets all game state variables back to default
function resetGameState() {
    tileState = [];
    for(let i = 0; i < 59; i++) {
        tileState[i] = {
            state: 0,
            name: "Empty",
            weedName: "Empty",
            growthCounter: 0,
            weedCounter: 0,
            plantAge: 0,
        }
    }
    actions = 0;
    score = 0;
    activeEvents = new ActiveEvents();

    tester = "buttonplant1";
    currenttool = 0;
    currentplant = 0;
    year = 1;
    season = "";
    seasonid = 1;
}

function initializeGameState(save) {
    resetGameState();
    if(save === undefined) return;
    if(Array.isArray(save.tileState)) {
        const tsprops = [ // map of properties inside a tileState object to their types
            ["state", "number"],
            ["name", "string"],
            ["weedName", "string"],
            ["growthCounter", "number"],
            ["weedCounter", "number"],
            ["plantAge", "number"],
        ]
        for(let i = 0; i < 59; i++) {
            for(const [key, value] of tsprops) {
                if(typeof save.tileState[i][key] == value)
                    tileState[i][key] = save.tileState[i][key];
                else
                    console.error("incorrect type");
            }
        }
    } else {
        console.error("incorrect type");
    }
    if(typeof save.actions === "number") {
        actions = save.actions;
        year = calculateYear();
        season = calculateSeason();
        // TODO: add seasonid
    } else {
        console.error("incorrect type");
    }
    if(typeof save.score === "number") {
        score = save.score;
    } else {
        console.error("incorrect type");
    }
    // screw typechecking this
    activeEvents = new ActiveEvents(save.activeEvents)
}

// calculates the game year from the provided number
// if no number is provided as parameter, then it uses "actions" from game state
function calculateYear(a = actions) {
    return Math.floor(a/120) + 1;
}
// calculates the gmame season from the provided number
// if no number is provided as parameter, then it uses "actions" from game state
function calculateSeason(a = actions) {
    const seasons = ["Spring", "Summer", "Fall", "Winter"];
    const span = 30;
    return seasons[Math.floor(a%120 / span)];
}

export const renderGame = function() {
    let string = `<button id="weed" class="large blue button">Weed</button>
    <button class="large blue button" id="plant">Plant</button>
    <button id="events" class="large blue button">Events</button>
    <button class="large blue button" id="catalogbutton">Catalog</button>
    <div id="eventDIV"></div>
    <ul id="hexGrid">`;
    handleEvents();
    for (let i = 0; i < 59; i++){
        
        if(tileState[i].state==1) {
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>This tile has a ${plantdefs[tileState[i].weedName].commonname}!</h1>
            <p>${plantdefs[tileState[i].weedName].description}</p>
        </a>
        </div>
    </li>`

        }
        else if(tileState[i].state==0) {
        string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/dirt.jpg" alt="" />
            <h1>No Plants Here!</h1>
            <p>Plant here or wait for weeds to grow!</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i].state==2){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img class="baby" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i].state==3){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i].state==4){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img class="med" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
        }
        else if(tileState[i].state==5){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
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
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
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
    
    let string= `<button class="large blue button" id="finish">Finish Weeding</button>
    <br>`;
    let thisButton;
    let toolIncrement;
    //First we have to unselect the current selected tool
    for(let i=0; i<4; i++) {
        thisButton = ("button"+(i+1))
        switch (i) {
            case 0:
                toolIncrement="pickaxe";
                break;
            case 1:
                toolIncrement="burn";
                break;
            case 2:
                toolIncrement="gloves";
                break;
            case 3:
                toolIncrement="pull";
                break;
        }
        if(toolIncrement==currenttool) {
            string+=`<button class="${thisButton} selected-tool" value="${toolIncrement}" id="tool"></button>`;
        } else {
            string+=`<button class="${thisButton}" value="${toolIncrement}" id="tool"></button>`;
        }
    }

    string+=`<ul id="hexGrid">`;

    //Using Placeholder plants for each value! They will be more extensive when we combine them with the seasons.
    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i].state==1) {
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>Remove Weed!</h1>
            <p></p>
        </a>
        </div>
    </li>`
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==0){
        string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/dirt.jpg" alt="" />
            <h1>Nothing to Remove</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
    //weedCount++;
        }
        else if(tileState[i].state==2){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img class="baby" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==3){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==4){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img class="med" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handleWeedActionClick);
        }
        else if(tileState[i].state==5){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">

            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
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
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
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

export const renderPlantingBoard = function() {

    const $root = $('#root');
 
    let string;
    if (seasonid == 0) {
        string = `<button class="large blue button" id="finish">Finish Planting</button>
        <br>  <button class="buttonplant15" value="Prairie Dropseed" id="tool"></button>
        <button class="buttonplant16" value="Indian Grass" id="tool"></button>
        <button class="buttonplant17" value="Durham Grass" id="tool"></button>
        <div id="eventDIV"></div>
        <ul id="hexGrid">`;
    } 
    if (seasonid == 1) {
        string = `<button class="large blue button" id="finish">Finish Planting</button>
        <br> <button class="buttonplant1" value="Carolina Anemone" id="tool"></button>
        <button class="buttonplant2" value="Swamp Milkweed" id="tool"></button>
        <button class="buttonplant3" value="Common Milkweed" id="tool"></button>
        <button class="buttonplant4" value="Wild Indigo" id="tool"></button>
        <button class="buttonplant5" value="Languid Coneflower" id="tool"></button>
        <div id="eventDIV"></div>
        <ul id="hexGrid">`;
    }
    if (seasonid == 2) {
        string = `<button class="large blue button" id="finish">Finish Planting</button>
        <br> <button class="buttonplant6" value="Rattlesnake Master" id="tool"></button>
        <button class="buttonplant7" value="Southern Sundrops" id="tool"></button>
        <button class="buttonplant8" value="Piney woods Phlox" id="tool"></button>
        <button class="buttonplant9" value="Grey-headed Coneflower" id="tool"></button>
        <div id="eventDIV"></div>
        <ul id="hexGrid">`;
    }
    if (seasonid == 3) {
        string = `<button class="large blue button" id="finish">Finish Planting</button>
        <br> <button class="buttonplant10" value="Goldenrod" id="tool"></button>
        <button class="buttonplant11" value="Eastern silver aster" id="tool"></button>
        <button class="buttonplant12" value="Frost aster" id="tool"></button>
        <button class="buttonplant13" value="Splitbeard Broomsedge" id="tool"></button>
        <button class="buttonplant14" value="Purple Lovegrass" id="tool"></button>
        <div id="eventDIV"></div>
        <ul id="hexGrid">`;
    }

    for (let i = 0; i < 59; i++){
        //identifier=i;
        let idString=i;

        if(tileState[i].state==1) {
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>Remove Weed first!</h1>
            <p></p>
        </a>
        </div>
    </li>`
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==0){
        string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="public/assets/dirt.jpg" alt="" />
            <h1>Plant Here!</h1>
            <p></p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
    //weedCount++;
        }
        else if(tileState[i].state==2){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img class="baby" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==3){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==4){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img class="med" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
    $root.on('click', '#'+idString, handlePlantActionClick);
        }
        else if(tileState[i].state==5){
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
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
            string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="${plantdefs[tileState[i].weedName].image}" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
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
        event.preventDefault();
    var tempScrollTop = $(window).scrollTop();
        console.log("Class Id Is " + event.currentTarget.className)
    let currentTile = event.currentTarget.getAttribute("id");
    //if(currenttool==tileState[currentTile].weedName)
    console.log("Tile " + currentTile + " is in plant state " + tileState[currentTile].state);
    
    if(tileState[currentTile].state%2==1) {
        if(currenttool==plantdefs[tileState[currentTile].weedName].removetool) {
        tileState[currentTile].state--;
        let localWeedCount=tileState[currentTile].weedCounter;
        tileState[currentTile].weedCounter=0;
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
    }
    else {
        //this happens if you use the wrong tool
        alert("Wrong tool!");
        tileState.currentTile=1;
        score=score-300;
    }
    
        //alert("Tile " + currentTile + " weeded!");
        nextturn();
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
            tileState[currentTile].growthCounter=0;
            tileState[currentTile].plantAge=0;
            score=score-500;
        }
    }

    agePlants();

    if(score<0) {
        score=0;
    }
    const $root = $('#root');
    $root.off();
    
    handleWeedButtonPress();


    //updateCurrentTile(currentTile, tempScrollTop);
    

}

}

export const updateCurrentTile = function (tile, scroll) {

    var tempScrollTop = scroll;
    console.log("Scroll position is " + tempScrollTop);
    const $root = $('#root');
    let string=``;
    let idString=tile;
    console.log("Tile Number "+tile);

    if(tileState[tile].state==1) {
        string+=`
    <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
        <img src="${plantdefs[tileState[tile].weedName].image}" alt="" />
        <h1>Remove Weed</h1>
        <p></p>
    </a>
    `
$root.on('click', '#'+idString, handleWeedActionClick);
    }
    else if(tileState[tile].state==0){
    string+=`
    <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
        <img src="public/assets/dirt.jpg" alt="" />
        <h1>Remove Weed</h1>
        <p></p>
    </a>`;
$root.on('click', '#'+idString, handleWeedActionClick);
//weedCount++;
    }
    else if(tileState[tile].state==2){
        string+=`
    <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
        <img class="baby" src="${plantdefs[tileState[tile].name].image}" alt="" />
        <h1>Remove Weed</h1>
        <p></p>
    </a>
    `;
$root.on('click', '#'+idString, handleWeedActionClick);
    }
    else if(tileState[tile].state==3){
        string+=`
    <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
        <img src="${plantdefs[tileState[tile].weedName].image}" alt="" />
        <h1>Remove Weed</h1>
        <p></p>
    </a>
    `;
$root.on('click', '#'+idString, handleWeedActionClick);
    }
    else if(tileState[tile].state==4){
        string+=`
    <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
        <img class="med" src="${plantdefs[tileState[tile].name].image}" alt="" />
        <h1>Remove Weed</h1>
        <p></p>
    </a>
    `;
$root.on('click', '#'+idString, handleWeedActionClick);
    }
    else if(tileState[tile].state==5){
        string+=`
    <a class="hexLink" href="#" id="${idString}" data-id="${idString}">
        <img src="${plantdefs[tileState[tile].weedName].image}" alt="" />
        <h1>Remove Weed</h1>
        <p></p>
    </a>
    `;
$root.on('click', '#'+idString, handleWeedActionClick);
    }
    else if(tileState[tile].state==6){
        string+=handleSeason(tile);
$root.on('click', '#'+idString, handleWeedActionClick);
    }
    else if(tileState[tile].state==7){
        string+=`
    <a class="hexLink weedTile" href="#" onclick="popup(this)">
        <img src="${plantdefs[tileState[tile].weedName].image}" alt="" />
        <h1>Plant Name Here</h1>
        <p>Description of plant</p>
    </a>
    `;
$root.on('click', '#'+idString, handleWeedActionClick);
    }

    $('#'+idString).replaceWith(string);
    renderWeedingBoard();
    $(window).scrollTop(tempScrollTop);

}

export const agePlants = function() {

    for(let i = 0; i<59; i++) {
        //if it has a weed
        if(tileState[i].state%2==1) {
            //Countdown to plant death gets closer
            tileState[i].weedCounter++;

            //If it is this plant's time to die
            if(tileState[i].weedCounter>5&&tileState[i].state>1) {
                //It dies and becomes an Empty with Weed space
                tileState[i].state=1;
                //tileState[i].weedCounter=0;
                score=score-200*plantdefs[tileState[i].name].growthrate;
                tileState[i].plantAge=0;
            }
        }
        //If it does not have a weed
        else {

            //If it has a plant there that is not fully grown
            if(tileState[i].state>0 && tileState[i].state!=6) {

                //It will grow
                tileState[i].growthCounter++;

                //If it has grown enough
                if(tileState[i].growthCounter>3*plantdefs[tileState[i].name].growthrate){

                    //It transforms into a new phase
                    tileState[i].state+=2;
                    tileState[i].growthCounter=0;
                    score+=100*(plantdefs[tileState[i].name].growthrate)*(tileState[i].state/2);
                }
                if(actions%5==0) {
                    score+=50*(plantdefs[tileState[i].name].growthrate);
                }
                if(tileState[i].state>0) {
                    tileState[i].plantAge++;
                }

            }

        }

        
    }

}

export const handlePlantActionClick = function(event) {
    
    //console.log(currentTile);
    if (currentplant == 0) { 
        alert("Please select a plant!");
    } else {
        event.preventDefault();
    let currentTile = event.currentTarget.getAttribute("id");
    if(tileState[currentTile].state%2==1) {
        alert("Cannot plant on Tile " + currentTile + "!");
    }
    else {
        tileState[currentTile].state=2;
        tileState[currentTile].growthCounter=0;
        tileState[currentTile].plantAge=0;
        tileState[currentTile].name=currentplant;
        console.log("You just planted a " + tileState[currentTile].name);
        //alert("Planted on Tile " + currentTile +".");

        //score+=50*plantdefs[currentplant].growthrate;
        nextturn();
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
    agePlants();

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
    let thisButton;
    let toolIncrement;
    //First we have to unselect the current selected tool
    for(let i=0; i<4; i++) {
        thisButton = ("button"+(i+1))
        switch (i) {
            case 0:
                toolIncrement="pickaxe";
                break;
            case 1:
                toolIncrement="burn";
                break;
            case 2:
                toolIncrement="gloves";
                break;
            case 3:
                toolIncrement="pull";
                break;
        }
        $('.'+thisButton).replaceWith(`<button class="${thisButton}" value="${toolIncrement}" id="tool"></button>`);
    }

    //select new tool
    let buttonSelect = `<button class="${event.target.className} selected-tool" value="${currenttool}" id="tool"></button>`;
    let currentclass=event.target.className;
    console.log(event.target.className);
    $('.'+currentclass).replaceWith(buttonSelect);
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

export function assembleGameState() {
    return {
        tileState: tileState,
        actions: actions,
        currenttool: currenttool,
        currentplant: currentplant,
        year: year,
        season: season,
        score: score,
        activeEvents: activeEvents.arr,
    };
}
export function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export const handleSeason = function(i) {
    let string = ``;
    if (actions%120 < 30) {
        season = "Spring";
        seasonid = 1;
        console.log("Spring");
        handleEvents();
    } else if (actions%120 < 60) {
        season = "Summer";
        seasonid = 2;
        console.log("Summer");
        handleEvents();
    } else if (actions%120 < 90) {
        season = "Fall";
        seasonid = 3;
        console.log("Fall");
        handleEvents();
    } else if (actions%120 < 120){
        season = "Winter";
        seasonid = 0;
        console.log("Winter");
        handleEvents();
        year++;
    }
    switch(season) {
        case "Spring":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img class="adult" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
            break;
        case "Summer":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img class="adult" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;
            break;
        case "Fall":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img class="adult" src="${plantdefs[tileState[i].name].image}" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
        </a>
        </div>
    </li>`;

            break;
        case "Winter":
            string=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink weedTile" href="#" onclick="popup(this)">
            <img src="public/assets/dormant-grass-1.jpg" alt="" />
            <h1>${plantdefs[tileState[i].name].commonname}</h1>
            <p>${plantdefs[tileState[i].name].description}</p>
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

// increments actions and takes care of updating relevant stuff
function nextturn() {
    actions = actions + 1;
    activeEvents.updateEvents(clone(assembleGameState()));
    logGameState(assembleGameState());
    setsavedgame({
        tileState: tileState,
        actions: actions,
        score: score,
        activeEvents: activeEvents.arr,
    })
    console.log(actions);
}

export const gameEnd = function() {
    if (year==4) {
        // TO DO: end the game 
        // TO DO: add score to leaderboard
        // TO DO: switch to end screen
    }
}

/*export const renderSite = function() {
    return `<header><img class="logo" src="public/assets/logo.png"></img><div class="score">Score: ${score}</div></header>`;
};   REMOVED THE LOGO FROM THIS PAGE TO SAVE SPACE? THOUGHTS?*/ 

export const renderSite = function() {
    return `<header><div style="padding:5%" class="score">Score: ${score}</div></header>`;
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
    activeEvents.updateEvents(clone(assembleGameState()));
    
};

// temporarily named...
function infestation() {
    resetGameState();
    for(let i = 0; i < 59; i++) {
        tileState[i].state = 1;          

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
}

$(function () {

    // waits to hear back from firebase auth before loading the game
    addauthlistener(function() {
        if(isloggedin()) {
            getsavedgame().then((doc) => {
                if(doc.exists) {
                    initializeGameState(doc.data());
                } else {
                    infestation();
                }
                main();
            })
        } else {
            infestation();
            main();
        }
    });
});