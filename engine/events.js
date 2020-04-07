import { eventsarr, eventdefs } from "../public/defs/eventdefs.js";


// somehow export this so its part of gamestate variable
// will have to export is as an object of some sort
// an array of eventstates
let activeEvents = [];

/**
 * eventstate: an object with the following properties
 *   name - {string} name of the event. key to eventdefs
 *   start - {number} what turn this event started on
 *   end - {number} what turn this event will end on
 *   objective - {object} what requirements are fulfilled to what extent
 */

function updateEvents(gamestate) {
	for(let ev of activeEvents) {
		// update objectives for each active event
		updateObjective(gamestate, ev);

		// check which active events should end and evaluate them
		if(gamestate.actions >= eventstate.end) {
			evaluateEvent(gamestate, eventstate);
			// TODO: delete this event from activeEvents
			// TODO: update html display of objectives
		}
	}

	// check which inactive events should trigger and become active
	for(let ev of eventsarr) {
		// maximum two events at a time; dont activate any new events
		if(activeEvents.length >= 2) return;

		// skip those that are already active
		if(activeEvents.some((ele) => ele.name === ev.name)) continue;

		if(ev.trigger(gamestate)) 
			createActiveEvent(ev, gamestate);
	}

	// update objectives for each newly active event
}

function updateObjective(gamestate, eventstate) {
	eventstate.objective = eventdefs[eventstate.name].objective(gamestate);
	// TODO: update html display of this somewhere
}

function evaluateEvent(gamestate, eventstate) {
}

function createActiveEvent(event, gamestate) {
	addActiveEvent(event, gamestate);
	// TODO: update html display of objectives somewhere

}

function addActiveEvent(event, gamestate) {
	activeEvents.push({
		name: event.name,
		start: gamestate.actions,
		end: event.period(gamestate.actions),
		objective: event.object
	});
}

function renderObjectives() {}

function renderNotice() {}