import Game from "./game.js";

let game = {};

export const renderGame = function(game) {
    let board = game.gameState.board;
    let score = game.gameState.score;

    let string = `<h2>My Little Prairie</h2>
    <ul id="hexGrid">`;
    for (let i = 0; i < 59; i++){
        string+=`<li class="hex">
        <div class="hexIn">
        <a class="hexLink" href="#" onclick="popup(this)">
            <img src="pics/grass.jpg" alt="" />
            <h1>Plant Name Here</h1>
            <p>Description of plant</p>
        </a>
        </div>
    </li>`
    }
    string+=`</ul>`
    return string;

}


export const renderSite = function() {
    return `<div><h1>My Little Prairie</h1>`;
}

export const main = function(game) {
    const $root = $('#root');
    $root.append(renderSite());
    $root.append(renderGame(game));
}

$(function () {
  let game = new Game(59);
  main(game);

  });