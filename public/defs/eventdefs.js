/**
 * exports eventdefs
 *
 */

/**
 * eventdefs: {array} of objects that have the following properties
 *   name - name of the event
 *   description - description of the event
 *
 * 	 text - {object} with properties of {strings} that do not affect the game logic.
 *     trigger - text of when or how this event is triggered
 *     period - when event ends or how long the event will last
 *     objective - goal for the user to complete before event ends
 *
 *   calc - {object} with properties of {functions} that are called in events.js
 *     trigger - @param gamestate object (see render.js) with any property this function needs 
 *               @returns {boolean} if event should become active or not
 *     period - @param eventstate object (see events.js) with any property this function needs
 *              @returns {number} what time this active event should end
 *     objective - TBD
 */

 let eventdefs = [
 	{
 		name: "Monarch Migration",
 		description: "butterflies migrate bro",
 		text: {
	 		trigger: "at beginning of the year",
	 		period: "one season",
	 		objective: "plant 17 flowers",
	 	},
	 	calc: {
	 		trigger: function(gamestate) {
	 			return gamestate.actions == 30;
	 		},
	 		period: function(eventstate) {
	 			return eventstate.start + 30;
	 		},
	 		objective: function() {},
	 	},
 	},
 	{
 		name: "Zombie Apocalypse",
 		description: "a deadly virus has broken out",
 		text: {
	 		trigger: "at end of the year",
	 		period: "unknown",
	 		objective: "survive",
	 	},
	 	calc: {
	 		triggerfunc: function(gamestate) {},
	 		requirements: function(eventstate) {},
	 		objective: function() {},
	 	},
 	},
 	{
 		name: "Random Chimp Event",
 		description: "an organized attack by a group of chimpanzees",
 		text: {
	 		trigger: "incoming",
	 		period: "are you prepared",
	 		objective: "survive",
	 	},
	 	calc: {
	 		triggerfunc: function(gamestate) {},
	 		requirements: function(eventstate) {},
	 		objective: function() {},
	 	},
 	},

 ];


export { eventdefs };