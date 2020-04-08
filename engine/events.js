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
	// did this because it was throwing null pointers without it
	if (this.arr.length != 0) {
	for(let ev of this.arr) {
		// update objectives for each active event
		this.updateObjective(gamestate, ev);

		// check which active events should end and evaluate them
		if(gamestate.actions >= ev.end) {
			this.evaluateEvent(gamestate, ev);
			// delete this event from activeEvents
			
			// TODO: update html display of objectives
		}
	}
	}

	

	// update objectives for each newly active event
}

updateObjective(gamestate, eventstate) {
	switch (eventstate.name) {
		case "Kudzu-pocolypse":
			let count = 0;
			for (let i = 0; i < 59; i++){
				// this is a disaster but it works for now
				if(gamestate.tileState[i].state != 1 && gamestate.tileState[i].weedName == "Kudzu") {
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
	if (eventstate.objective == "Complete!") {
		gamestate.score += 500; // should we give points? if so we'd have to return this gamestate...

	}
	for(let ev of this.arr) {

	}
}

createActiveEvent(event, gamestate) {
	this.addActiveEvent(event, gamestate);

}

addActiveEvent(event, gamestate) {
	alert("event add run");
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