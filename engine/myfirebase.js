// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC1-bX1z7bzd8LwWE0_CB7Mhub1ZoHLLWQ",
    authDomain: "my-little-prairie.firebaseapp.com",
    databaseURL: "https://my-little-prairie.firebaseio.com",
    projectId: "my-little-prairie",
    storageBucket: "my-little-prairie.appspot.com",
    messagingSenderId: "143808746635",
    appId: "1:143808746635:web:9569a5a53d8c401b4ff08e",
    measurementId: "G-R0ZSF3QWEK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var leaderboard = db.collection("leaderboard");
var user_saved_game = db.collection("user_saved_game");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("signed in");
    } else {
        console.log("signed out");
    }
});

// adds a new callback function to be called when authstatechanged
export const addauthlistener = function(f) {
    firebase.auth().onAuthStateChanged(f);
}

export const signout = function() {
    firebase.auth().signOut().then(function() {
        console.log("signout successful");
    }).catch(function(error) {
        console.log("error signing out")
    });
}

export const isloggedin = function() {
    return firebase.auth().currentUser !== null;
}

/** 
 * returns a promise with parameter: doc
 *   doc.exists - true/false depending on if it exists
 *   doc.data() - gives the data for that doc
 */
export const getsavedgame = function() {
    return user_saved_game.doc(firebase.auth().currentUser.uid).get();
    //.then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         console.log("No document");
    //     }
    // })   
}

export const setsavedgame = function(data) {
    if(!isloggedin()) return false;
    user_saved_game.doc(firebase.auth().currentUser.uid).set(data);
}

/** gets the top n high scores in descending order
 * returns a promise with parameter: result
 *   result.exists - true/false depending on if it exists
 *   result.size - gives the size of "result"
 *   result.docs - an array of docs. you can retrieve the contents of
 *                 each doc by calling .data() on each element. the data
 *                 should have two properties: name and score
 */
export const gettopn = function(n) {
    return leaderboard.orderBy('score', 'desc').limit(n).get();
}

/** gets the user's high score
 * returns a promise with parameter: doc
 *   doc.exists - true/false depending on if it exists
 *   doc.data() - gives the data for the docs. the data should have two
 *                properties: name and score
 */
export const gethighscore = function() {
    if(!isloggedin()) return false;
    return leaderboard.doc(firebase.auth().currentUser.uid).get();
}

// sets the user's high score
export const sethighscore = function(name, score) {
    if(!isloggedin()) return false;
    leaderboard.doc(firebase.auth().currentUser.uid).set({ name: name, score: score });;
}
