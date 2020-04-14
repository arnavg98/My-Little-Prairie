import { eventsarr, eventdefs } from "../public/defs/eventdefs.js";

export default class ActiveEvents {
	constructor() {
		this.arr = [];
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

	// check which inactive events should trigger and become active
	for(let ev of eventsarr) {
		// maximum two events at a time; dont activate any new events
		if(this.arr.length >= 2) return;

		// skip those that are already active
		if(this.arr.some((ele) => ele.name === ev.name)) continue;

		if(ev.calc.trigger == gamestate.actions) 
			this.createActiveEvent(ev, gamestate);
			
	}

	let index = 0;
	for(let ev of this.arr) {
		// update objectives for each active event
		this.updateObjective(gamestate, ev);

		// check which active events should end and evaluate them
		if(gamestate.actions >= ev.end) {
			this.arr.splice(index,1);
			// deletes this event from activeEvents
			
		}
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
		if (count >= 8) {
			eventstate.objective = "Complete!";
		}

		for(let ev of this.arr){
			if (ev.name == eventstate.name) {
				ev = eventstate; // updates arr
			}
		}	

		break;
		case "Monarch Migration":
			let count1 = 0;
			let count2 = 0;
			for (let i = 0; i < 59; i++){
				// checks past event start state
				if(gamestate.tileState[i].state != 1 && eventstate.startState[i].weedName == "Kudzu") {
					count++;

				}
			}
		if (count < 8 && count > 0 && eventstate.objective != "Complete!") {
			eventstate.objective = "you have removed " + count + " of 8 Kudzu!";
			
		}
		if (count >= 8) {
			eventstate.objective = "Complete!";
		}

		for(let ev of this.arr){
			if (ev.name == eventstate.name) {
				ev = eventstate; // updates arr
			}
		}	
		eventstate.text.objective = "";
		break;
		case "Pollinator Picks":
		eventstate.text.objective = "";
		break;
		case "Cool Spring":
		eventstate.text.objective = "";
		break;
		case "Garden Snakes":
		eventstate.text.objective = "";
		break;
		case "Cultural Arts Festivals":
		eventstate.text.objective = "";
		break;
		case "Buffalo Blitz":
		eventstate.text.objective = "";
		break;
		case "Hibernation":
		eventstate.text.objective = "";
		break;
		case "Harvest Festivals":
		eventstate.text.objective = "";
		break;
		case "Warm Winter":
		eventstate.text.objective = "";
		break;
		case "Snow-pocolypse":
		eventstate.text.objective = "";
		break;
		case "The Burning":
		eventstate.text.objective = "";
		break;
		case "Heavy Rain":
		eventstate.text.objective = "";
		break;
		case "Windy day":
		eventstate.text.objective = "";
		break;
		case "Deer":
		eventstate.text.objective = "";
		break;
		case "Rabbits":
		eventstate.text.objective = "";
		break;
		case "Wildfire":
		eventstate.text.objective = "";
		break;

	}
}

evaluateEvent(gamestate, eventstate) {
	for(let i = 0; i < this.arr.length; i++) {
			if (gamestate.actions >= eventstate.end) {
				this.arr.splice(i,1);
				console.log("event removed");
			} 
	}
}

createActiveEvent(event, gamestate) {
	this.addActiveEvent(event, gamestate);

}

addActiveEvent(event, gamestate) {
	console.log("Event added");
	this.arr.push({
		name: event.name,
		description: event.description,
		start: gamestate.actions,
		end: event.calc.period(gamestate.actions),
		objective: event.text.objective,
		startState: gamestate.tileState
	});
}


}