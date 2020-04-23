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
var user_saved_game = db.collection("user_saved_game");
var myuser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("signed in");
        myuser = user;
    } else {
        console.log("signed out");
        myuser = undefined;
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
    return myuser !== undefined;
}

/** 
 * returns a promise with parameter doc
 *   doc.exists - true/false depending on if it exists
 *   doc.data() - gives the data for that doc
 */
export const getsavedgame = function() {
    return user_saved_game.doc(myuser.uid).get();
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
    user_saved_game.doc(myuser.uid).set(data);
}
