import { eventsarr, eventdefs } from "../public/defs/eventdefs.js";
import { handleEvents, addPoints, shuffle } from "./render.js";
import { plants } from "../public/defs/plantdefs.js";

export default class ActiveEvents {
	constructor(ae) {
    if(!Array.isArray(ae)) ae = [];
		this.arr = ae;
	}
// this is how we will export the event engine, by turning it into an object


/**
 * eventstate: an object with the following properties
 *   name - {string} name of the event. key to eventdefs
 *   start - {number} what turn this event started on
 *   end - {number} what turn this event will end on
 *   objective - {object} what requirements are fulfilled to what extent
 */

 updateEvents(gamestate) {

	let index = 0; // needed an index for splice array
	for(let ev of this.arr) {
		// update objectives for each active event
		this.updateObjective(gamestate, ev);
		
		// check which active events should end 
		if(gamestate.actions >= ev.end) {
			this.arr.splice(index,1);
			// deletes this event from activeEvents
			
		}
		index++;
	}
	// check which inactive events should trigger and become active
	for(let ev of eventsarr) {
		// maximum two events at a time; dont activate any new events
		if(this.arr.length >= 2) break; // dont return or it screws a lot of things up

		// skip those that are already active
		if(this.arr.some((ele) => ele.name === ev.name)) continue;

		if(ev.calc.trigger == gamestate.actions) 
			this.createActiveEvent(ev, gamestate);
			
	}


	// update objectives for each newly active event
}

updateObjective(gamestate, eventstate) {
	switch (eventstate.name) {
		case "Kudzu-pocolypse":
			let count = 0;
			for (let i = 0; i < 59; i++){
				// checks past event start state
				if(gamestate.tileState[i].state != 1 && eventstate.startState[i].weedName == "Kudzu") {
					count++;

				}
			}
		if (count < 8 && count > 0 && eventstate.objective != "Complete!") {
			eventstate.objective = "you have removed " + count + " of 8 Kudzu!";
			
		}
		if (count >= 8 && eventstate.objective != "Complete!") {
			eventstate.objective = "Complete!";
			addPoints(1500);
		}

		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}

		break;
		case "Monarch Migration":
			let count1 = 0;
			let count2 = 0;
			for (let i = 0; i < 59; i++){
				// checks past event start state
				if(gamestate.tileState[i].name == "Swamp Milkweed") {
					count1++;
					
				}

				if(gamestate.tileState[i].name == "Splitbeard Broomsedge") {
					count2++;
				}
			}

			if (count1 > 0 || count2 > 0 && eventstate.objective != "Complete!") {
				eventstate.objective = "You planted "+ count1 +" Swamp Milkweed and " + count2 +" Splitbeard Broomsedge!";
				
			}

			if (count1 >= 6 && count2 >= 6 && eventstate.objective != "Complete!") {
				eventstate.objective = "Complete!";
				addPoints(1500);
			}

			for(let ev of this.arr) {
				if (ev.name == eventstate.name) {
					ev = eventstate;
				}
			}
			
		break;
		case "Pollinator Picks":
			let count3 = 0;
			for (let i = 0; i < 59; i++){
				// TO DO: need to input the correct flowering grasses
				if(gamestate.tileState[i].state >= 2 && (gamestate.tileState[i].name == "Wild indigo" ||  gamestate.tileState[i].name ==  "Languid coneflower" || gamestate.tileState[i].name == "Piney woods phlox")) {
					count3++;

				}
				
			}
			if (count3 < 10 && count3 > 0 && eventstate.objective != "Complete! Keep your plants healthy to keep this status!") {
				eventstate.objective = "You have planted " +count3+ " polinator favorites!";
				
			}
			if (count3 >= 10 && eventstate.objective != "Complete! Keep your plants healthy to keep this status!") {
				eventstate.objective = "Complete! Keep your plants healthy to keep this status!";
				addPoints(1500);
			}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Cool Spring":
			let count4 = 0;
			for(let i = 0; i < 59; i++){
				if (gamestate.tileState[i].state >= 2 && (gamestate.tileState[i].name == "Prairie Dropseed" || gamestate.tileState[i].name =="Indian Grass" || gamestate.tileState[i].name =="Durham Grass")){
					count4++;

				}
			}
		eventstate.objective = "You have "+ count4 +"of 10 winter grasses!";
		if(count4 >= 10 && eventstate.objective !="Complete! Make sure to take care of them to keep this status!") {
			eventstate.objective = "Complete! Make sure to take care of them to keep this status!";
			addPoints(1500);
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Garden Snakes":
			let count5 = 0;
			for(let i = 0; i < 59; i++){
				if (gamestate.tileState[i].name == "Rattlesnake Master" && gamestate.tileState[i].state >= 2){
					count5++;

				}
			}
		eventstate.objective = "You have planted "+ count5 +" Rattlesnake Master!";
		if(count5 >= 10 && eventstate.objective != "Complete!") {
			eventstate.objective = "Complete!";
			addPoints(1500);
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Cultural Arts Festivals":
			let indigo = false;
			let languid = false;
			let rattle = false;
			let swamp = false;

			for(let i = 0; i < 59; i++){
				if (gamestate.tileState[i].name == "Wild Indigo" && gamestate.tileState[i].state >= 2) {
					indigo = true;
				} 
				if (gamestate.tileState[i].name ==  "Languid Coneflower" && gamestate.tileState[i].state >= 2){
					languid = true;
				}
				if (gamestate.tileState[i].name == "Rattlesnake Master" && gamestate.tileState[i].state >= 2){
					rattle = true;
				}
				if (gamestate.tileState[i].name == "Swamp Milkweed" && gamestate.tileState[i].state >= 2) {
					swamp = true;
				}
			}
		if(indigo && languid && rattle && swamp && eventstate.objective != "Complete!") {
			eventstate.objective = "Complete!";
			addPoints(1500);
		} 
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
				
			}
		}
		break;
		case "Buffalo Blitz":
			let count7 = 0;
			for(let i = 0; i < 59; i++){
				if (gamestate.tileState[i].name == "Purple Lovegrass" && gamestate.tileState[i].state >= 2){
					count7++;

				}
			}
		eventstate.objective = "You have "+ count7 +" Purple Lovegrass!";
		if(count7 >= 6 && eventstate.objective != "Complete! Make sure to take care of them to keep this status!") {
			eventstate.objective = "Complete! Make sure to take care of them to keep this status!";
			addPoints(1500);
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Hibernation":
			let count8 = 0;
			for(let i = 0; i < 59; i++){
				if (gamestate.tileState[i].state >= 2 && (gamestate.tileState[i].name == "Southern Sundrops" 
				|| gamestate.tileState[i].name == "Frost aster"
				|| gamestate.tileState[i].name == "Purple Lovegrass" 
				|| gamestate.tileState[i].name == "Goldenrod" 
				|| gamestate.tileState[i].name ==  "Eastern silver aster")){
					count8++;

				}
			}
		eventstate.objective = "You have "+ count8 +"plants!";
		if(count8 >= 8 && eventstate.objective != "Complete! Make sure to take care of them to keep this status!") {
			eventstate.objective = "Complete! Make sure to take care of them to keep this status!";
			addPoints(1500);
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Harvest Festivals":
			let golden = 0;
		for (let i = 0; i < 59; i++) {
			if (gamestate.tileState[i].name == "Goldenrod" && gamestate.tileState[i].state >= 2) {
				golden++;
			}
		}
		if (golden > 0 && eventstate.objective != "Complete!") {
			eventstate.objective = "You have planted " + golden + " Goldenrods!";
		}
		if (golden >= 4 && eventstate.objective != "Complete!") {
			eventstate.objective = "Complete!";
			addPoints(1500);
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Warm Winter":
			let drop = false;
			let indian = false;
			let durham = false;
			for (let i = 0; i < 59; i++) {
				if (gamestate.tileState[i].name == "Prairie Dropseed" && gamestate.tileState[i].state >= 2) {
					drop = true;
				} 
				if(gamestate.tileState[i].name == "Indian Grass" && gamestate.tileState[i].state >= 2) {
					indian = true;
				}
				if(gamestate.tileState[i].name == "Durham Grass" && gamestate.tileState[i].state >= 2) {
					durham = true;
				}
			}
		if (drop && indian && durham && eventstate.objective != "Complete!") {
			eventstate.objective = "Complete!";
			addPoints(1500);
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Snow-pocolypse":
		let count11 =0;
		for (let i = 0; i < 59; i++) {
			if ((gamestate.tileState[i].name == "Durham Grass" || gamestate.tileState[i].name == "Prairie Dropseed") && gamestate.tileState[i].state >= 2){
				count11++;
			}
		}
		if (count11 > 0 && eventstate.objective != "Complete!") {
			
		}
		if (count11 >= 6 && eventstate.objective != "Complete!") {
			eventstate.objective = "Complete!";
			addPoints(1500);
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "The Burning":
			let count12;
		for (let i = 0; i < 59; i++) {
			if (gamestate.tileState[i].state >= 6) {
				count12++;
			}
		}
		if (gamestate.actions >= 359) {
			addPoints(50*count12);
		}
		break;
		case "Heavy Rain":
			for (let i = 0; i < 59; i++) {
				if(Math.floor(10*Math.random()) > 7) {
					gamestate.tileState[i].state = 0;
					gamestate.tileState[i].name = "Empty";
					gamestate.tileState[i].weedName = "Empty";
				}
			}
		break;
		case "Windy Day":
			let random = Math.floor(10*Math.random());
			for (let i = 0; i < 59; i++) {
				if(random > 7) {
					gamestate.tileState[i].state = 1;
					gamestate.tileState[i].name = "Empty";
			switch (random) {
			case 0:
                gamestate.tileState[i].weedName = "Kudzu";
                break;
            case 1: 
			gamestate.tileState[i].weedName = "Johnson Grass"
                break;
            case 2:
                gamestate.tileState[i].weedName = "Star Vine"
                break;
            case 3:
                gamestate.tileState[i].weedName = "Mouse-ear Chickweed";
                break;
            case 4:
                gamestate.tileState[i].weedName = "Sorrel";
                break;
            case 5:
                gamestate.tileState[i].weedName = "Common Chickweed";
                break;
            case 6:
                gamestate.tileState[i].weedName = "Hairy Cress";
                break;
            case 7:
                gamestate.tileState[i].weedName = "Common Vetch";
                break;
            case 8:
                gamestate.tileState[i].weedName = "Kudzu";
                break;
            case 9:
                gamestate.tileState[i].weedName = "Kudzu";
                break;
				}
			}
		}
		break;
		case "Deer":
			for (let i = 0; i < 59; i++) {
				if (Math.random()*10 > 7) {
					gamestate.tileState[i].name="Empty";
					gamestate.tileState[i].weedName="Empty";
					gamestate.tileState[i].state=0;
				}
			}
			break;
		case "Rabbits":
				shuffle(gamestate.tileState);
		break;
		case "Wildfire":
			for (let i = 0; i < 59; i++) {
				if (Math.random()*10 > 7 && gamestate.tileState[i].state == 1) {
					gamestate.tileState[i].name="Empty";
					gamestate.tileState[i].weedName="Empty";
					gamestate.tileState[i].state=0;
				} else if (Math.random()*10 > 7) {
					gamestate.tileState[i].name=plants[Math.floor(Math.random()*17)].commonname;
					gamestate.tileState[i].weedName="Empty";
					gamestate.tileState[i].state=2;
				}
			}
		break;
	}
}
createActiveEvent(event, gamestate) {
	this.addActiveEvent(event, gamestate);

}

addActiveEvent(event, gamestate) {
	this.arr.push({
		name: event.name,
		description: event.description,
		start: gamestate.actions,
		end: event.calc.period(gamestate.actions),
		objective: event.text.objective,
		startState: gamestate.tileState
	});
	handleEvents(); //to display after each event is added! I'm dumb and didn't think of it for 48 hours
}


}