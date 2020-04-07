/**
 * exports eventsarr, eventdefs
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
 *     period - @param starttime what time this active event started
 *              @returns {number} what time this active event should end
 *     objective - TBD
 */

 let eventsarr = [
 	{
 		name: "Monarch Migration",
 		description: "Monarchs begin migrating to the prairie in May and throughout the summer. Make sure they have adequate food and places to lay eggs.",
 		text: {
	 		trigger: "Summer",
	 		period: "one season",
	 		objective: "Plants 6 Swamp Milkweed and 6 andropogon tennarius",
	 	},
	 	calc: {
	 		trigger: function(gamestate) {
	 			return gamestate.actions == 30;
	 		},
	 		period: function(starttime) {
	 			return start + 30;
	 		},
	 		objective: function() {},
	 	},
 	},
 	{
 		name: "Kudzu-pocolypse",
 		description: " Kudzu is growing wildly! Use the correct method of removal and keep your plants safe!",
 		text: {
	 		trigger: "Spring",
	 		period: "one season",
	 		objective: "Remove 12 kudzu",
	 	},
	 	calc: {
	 		triggerfunc: function(gamestate) {},
	 		requirements: function(starttime) {},
	 		objective: function() {},
	 	},
 	},
 	{
 		name: "Pollinator Picks",
 		description: "Bees are having trouble finding nectar in the city, plant some grasses that produce flowers.",
 		text: {
	 		trigger: "Spring",
	 		period: "one season",
	 		objective: "Plant 10 “flowering grasses”",
	 	},
	 	calc: {
	 		triggerfunc: function(gamestate) {},
	 		requirements: function(starttime) {},
	 		objective: function() {},
	 	},
 	},
	 {
		name: "Cool Spring",
		description: "Some of the plants that are normally dormant are not!",
		text: {
			trigger: "Spring",
			period: "one season",
			objective: "Keep 10 dormant plants",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Garden Snakes",
		description: "Prairie island would love to promote a healthy environment for snakes! Give them plenty of grasses for them to hide from predators in!",
		text: {
			trigger: "Summer",
			period: "one season",
			objective: "Plant 10 grasses",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Cultural Arts Festivals",
		description: "Durham, NC, home of Prairie Island, has many festivals promoting local heritage and proceeds often go toward local parks and reserves.",
		text: {
			trigger: "Summer",
			period: "one season",
			objective: "Plant 4 flowering grasses",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Buffalo Blitz",
		description: " Prairie island used to be home to Buffalo long ago. A lot of the native species on Prairie island are grasses as this was their natural food source.",
		text: {
			trigger: "Fall",
			period: "one season",
			objective: "Plant 4 grasses",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Hibernation",
		description: "As animals and insects start to go into hibernation they will need food sources to be able to be adequately fed.",
		text: {
			trigger: "Fall",
			period: "one season",
			objective: "Plant 8 grasses",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Harvest Festivals",
		description: "Lots of festivals supporting farms and local reserves are held during the fall in North carolina. Plant some grasses to pretty up the prairie.",
		text: {
			trigger: "Fall",
			period: "one season",
			objective: "Plant 4 grasses",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Warm Winter",
		description: " Some of the plants that are normally dormant are not.",
		text: {
			trigger: "Winter",
			period: "one season",
			objective: "Plant 2 dormant plants",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Snow-pocolypse",
		description: "In Durham, NC it snows very rarely, however this winter has yielded a few inches. We need some plants that will do well with this weather.",
		text: {
			trigger: "winter",
			period: "one season",
			objective: "Plant 6 grasses that will do well in cooler weather",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "The Burning",
		description: "In Durham, NC it snows very rarely, however this winter has yielded a few inches. We need some plants that will do well with this weather.",
		text: {
			trigger: "winter year 3",
			period: "one season",
			objective: "Plant as much as you can! You will recieve double points for planting this season!",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Heavy Rain",
		description: "Increased growth rate of plants this month!",
		text: {
			trigger: "Spring",
			period: "ten days",
			objective: "Plant slower growing plants",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Windy day",
		description: "Increased spawn rate of weeds this month!",
		text: {
			trigger: "Summer, Fall",
			period: "ten days",
			objective: "Remove 6 weeds",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Deer",
		description: "Deer have eaten some of your plants!",
		text: {
			trigger: "Fall",
			period: "one day",
			objective: "Some of your plants have disappeared",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Rabbits",
		description: "Rabbits have burrowed in the garden, some plants may be moved around.",
		text: {
			trigger: "Spring",
			period: "ten days",
			objective: "Plants have been moved around!",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
	{
		name: "Wildfire",
		description: "A fire broke out! Some plants have been destroyed but the ash promotes the growth of the plants that are left!",
		text: {
			trigger: "Summer",
			period: "ten days",
			objective: "Plants will be planted randomly!",
		},
		calc: {
			triggerfunc: function(gamestate) {},
			requirements: function(starttime) {},
			objective: function() {},
		},
	},
 ];

let eventdefs = {};
for(let ele of eventsarr)
	eventdefs[ele.name] = ele;

export { eventsarr, eventdefs };