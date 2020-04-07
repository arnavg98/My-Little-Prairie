
var alog = [];
var subscribe = false; // if true, then any updates to alog will be printed to console

export const addGameState = function(obj) {
	alog.push(JSON.parse(JSON.stringify(obj)));

	if(subscribe) console.log(alog[alog.length-1]);
};

const getGameState = function(i) {
	if (i < 0 || i >= alog.length) console.log("Out of range 0 to "+(alog.length-1));
	else console.log(alog[i]);
};

const getActionCounter = function() {
	return alog.length;
};

const setSubscribe = function(b) {
	subscribe = b;
};

window.getGameState = getGameState;
window.getActionCounter = getActionCounter;
window.setSubscribe = setSubscribe;
