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
		if(this.arr.length >= 2) break; // dont return or it screws a lot of things up

		// skip those that are already active
		if(this.arr.some((ele) => ele.name === ev.name)) continue;

		if(ev.calc.trigger == gamestate.actions) 
			this.createActiveEvent(ev, gamestate);
			
	}

	let index = 0; // needed an index for splice
	for(let ev of this.arr) {
		// update objectives for each active event
		this.updateObjective(gamestate, ev);
		console.log(this.arr);
		// check which active events should end 
		if(gamestate.actions >= ev.end) {
			this.arr.splice(index,1);
			// deletes this event from activeEvents
			
		}
		index++;
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
				if(gamestate.tileState[i].name != eventstate.startState[i].name && gamestate.tileState[i].name == "Swamp Milkweed") {
					count1++;

				}

				if(gamestate.tileState[i].name != eventstate.startState[i].name && gamestate.tileState[i].name == "Splitbeard Broomsedge") {
					count2++;
				}
			}

			if (count1 < 6 && count1 > 0 && count2 < 6 && count2 > 0 && eventstate.objective != "Complete!") {
				eventstate.objective = "You planted "+ count1 +" Swamp Milkweed and " + count2 +" Splitbeard Broomsedge!";
				
			}

			if (count1 >= 6 && count2 >= 6) {
				eventstate.objective = "Complete!";
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
				if(gamestate.tileState[i].state >= 2 && gamestate.tileState[i] != eventstate.startState[i]) {
					count3++;

				}
				if (count3 < 10 && count3 > 0 && eventstate.objective != "Complete!") {
					eventstate.objective = "You have planted " +count3+ " flowering grasses.";
					
				}
				if (count3 >= 10) {
					eventstate.objective = "Complete!";
				}
			}
		eventstate.objective = "";
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Cool Spring":
			let count4 = 0;
			for(let i = 0; i < 59; i++){
				if (gamestate.tileState[i].name == "Something"){
					count4++;

				}
			}
		eventstate.objective = "You have "+ count4 +"dormant plants!";
		if(count4 >= 10) {
			eventstate.objective = "Complete! Make sure to take care of them to keep this status!";
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
				if (gamestate.tileState[i].name != eventstate.tileState[i].name && gamestate.tileState[i].state >= 2){
					count5++;

				}
			}
		eventstate.objective = "You have planted "+ count5 +"grasses!";
		if(count5 >= 10) {
			eventstate.objective = "Complete!";
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Cultural Arts Festivals":
			let count6 = 0;
			for(let i = 0; i < 59; i++){
				if (gamestate.tileState[i].name == "Something"){
					count6++;

				}
			}
		eventstate.objective = "You have "+ count6 +" plants!";
		if(count6 >= 4) {
			eventstate.objective = "Complete!";
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
				if (gamestate.tileState[i].name == "Something"){
					count7++;

				}
			}
		eventstate.objective = "You have "+ count7 +" dormant plants!";
		if(count7 >= 10) {
			eventstate.objective = "Complete! Make sure to take care of them to keep this status!";
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
				if (gamestate.tileState[i].name == "Something"){
					count8++;

				}
			}
		eventstate.objective = "You have "+ count8 +"dormant plants!";
		if(count8 >= 10) {
			eventstate.objective = "Complete! Make sure to take care of them to keep this status!";
		}
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Harvest Festivals":
		eventstate.objective = "";
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Warm Winter":
		eventstate.objective = "";
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "Snow-pocolypse":
		eventstate.objective = "";
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
		case "The Burning":
		eventstate.objective = "";
		for(let ev of this.arr) {
			if (ev.name == eventstate.name) {
				ev = eventstate;
			}
		}
		break;
	}
}

// evaluateEvent(gamestate, eventstate) {
// 	for(let i = 0; i < this.arr.length; i++) {
// 			if (gamestate.actions >= eventstate.end) {
// 				this.arr.splice(i,1);
// 				console.log("event removed");
// 			} 
// 	}
// }

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