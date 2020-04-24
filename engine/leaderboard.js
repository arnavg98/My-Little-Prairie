import { addauthlistener, isloggedin, gettopn, gethighscore } from "./myfirebase.js";


function main() {
    //if(isloggedin()) {
    gettopn(10).then(function(result) {
        console.log(result);
        for(let i = 1; i <= result.size; i++) {
            let data = result.docs[i-1].data();
            $("#"+i).text(i+". "+data.name+" - "+data.score);
        }

    });
//} else {

//}
}

$(function () {
    // waits to hear back from firebase auth before loading
    addauthlistener(main);
});
