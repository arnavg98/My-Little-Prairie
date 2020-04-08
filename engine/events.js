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
	switch (eventdefs[eventstate.name]) {
		case "Kudzu-pocolypse":
		
		break;
	}
	//eventstate.objective = ;
	// TODO: update html display of this somewhere
	// Kay- done in render.js
}

evaluateEvent(gamestate, eventstate) {
	if (eventstate.objective == "Complete!") {
		gameState.score += 500;
	}
	for(let ev of this.arr) {

	}
}

createActiveEvent(event, gamestate) {
	this.addActiveEvent(event, gamestate);

}

addActiveEvent(event, gamestate) {
	alert("event added");
	this.arr.push({
		name: event.name,
		description: event.description,
		start: gamestate.actions,
		end: event.calc.period(gamestate.actions),
		objective: event.text.objective,
		startState: gamestate
	});
}


}