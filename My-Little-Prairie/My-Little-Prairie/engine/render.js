import Game from "./game.js";

let game = {};

export const renderGame = function(game) {
    let board = game.gameState.board;
    let score = game.gameState.score;

    return `<div id="replace"><center><table>
    <tr>
      <td height="40" onclick="popup(this);">${board[0]}</td>
      <td height="40" onclick="popup(this);">${board[1]}</td>
      <td height="40" onclick="popup(this);">${board[2]}</td>
      <td height="40" onclick="popup(this);">${board[3]}</td>
      <td height="40" onclick="popup(this);">${board[4]}</td>
        <td height="40" onclick="popup(this);">${board[5]}</td>
        <td height="40" onclick="popup(this);">${board[6]}</td>
        <td height="40" onclick="popup(this);">${board[7]}</td>
        <td height="40" onclick="popup(this);">${board[8]}</td>
      <tr>
      <td height="40" onclick="popup(this);">${board[9]}</td>
      <td height="40" onclick="popup(this);">${board[10]}</td>
      <td height="40" onclick="popup(this);">${board[11]}</td>
      <td height="40" onclick="popup(this);">${board[12]}</td>
      <td height="40" onclick="popup(this);">${board[13]}</td>
        <td height="40" onclick="popup(this);">${board[14]}</td>
        <td height="40" onclick="popup(this);">${board[15]}</td>
        <td height="40" onclick="popup(this);">${board[16]}</td>
        <td height="40" onclick="popup(this);">${board[17]}</td>
      </tr>
      <td height="40" onclick="popup(this);">${board[18]}</td>
      <td height="40" onclick="popup(this);">${board[19]}</td>
      <td height="40" onclick="popup(this);">${board[20]}</td>
      <td height="40" onclick="popup(this);">${board[21]}</td>
      <td height="40" onclick="popup(this);">${board[22]}</td>
        <td height="40" onclick="popup(this);">${board[23]}</td>
        <td height="40" onclick="popup(this);">${board[24]}</td>
        <td height="40" onclick="popup(this);">${board[25]}</td>
        <td height="40" onclick="popup(this);">${board[26]}</td>
    </tr>
    
    <tr>
    <td height="40" onclick="popup(this);">${board[27]}</td>
    <td height="40" onclick="popup(this);">${board[28]}</td>
    <td height="40" onclick="popup(this);">${board[29]}</td>
    <td height="40" onclick="popup(this);">${board[30]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[31]}</td>
    <td height="40" onclick="popup(this);">${board[32]}</td>
    <td height="40" onclick="popup(this);">${board[33]}</td>
    <td height="40" onclick="popup(this);">${board[34]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[35]}</td></center></div>
    </tr>

    <tr>
    <td height="40" onclick="popup(this);">${board[36]}</td>
    <td height="40" onclick="popup(this);">${board[37]}</td>
    <td height="40" onclick="popup(this);">${board[38]}</td>
    <td height="40" onclick="popup(this);">${board[39]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[40]}</td>
    <td height="40" onclick="popup(this);">${board[41]}</td>
    <td height="40" onclick="popup(this);">${board[42]}</td>
    <td height="40" onclick="popup(this);">${board[43]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[44]}</td></center></div>
    </tr>

    <tr>
    <td height="40" onclick="popup(this);">${board[45]}</td>
    <td height="40" onclick="popup(this);">${board[46]}</td>
    <td height="40" onclick="popup(this);">${board[47]}</td>
    <td height="40" onclick="popup(this);">${board[48]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[49]}</td>
    <td height="40" onclick="popup(this);">${board[50]}</td>
    <td height="40" onclick="popup(this);">${board[51]}</td>
    <td height="40" onclick="popup(this);">${board[52]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[53]}</td></center></div>
    </tr>

    <tr>
    <td height="40" onclick="popup(this);">${board[54]}</td>
    <td height="40" onclick="popup(this);">${board[55]}</td>
    <td height="40" onclick="popup(this);">${board[56]}</td>
    <td height="40" onclick="popup(this);">${board[57]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[58]}</td>
    <td height="40" onclick="popup(this);">${board[59]}</td>
    <td height="40" onclick="popup(this);">${board[60]}</td>
    <td height="40" onclick="popup(this);">${board[61]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[62]}</td></center></div>
    </tr>

    <tr>
    <td height="40" onclick="popup(this);">${board[63]}</td>
    <td height="40" onclick="popup(this);">${board[64]}</td>
    <td height="40" onclick="popup(this);">${board[65]}</td>
    <td height="40" onclick="popup(this);">${board[66]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[67]}</td>
    <td height="40" onclick="popup(this);">${board[68]}</td>
    <td height="40" onclick="popup(this);">${board[69]}</td>
    <td height="40" onclick="popup(this);">${board[70]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[71]}</td></center></div>
    </tr>

    <tr>
    <td height="40" onclick="popup(this);">${board[72]}</td>
    <td height="40" onclick="popup(this);">${board[73]}</td>
    <td height="40" onclick="popup(this);">${board[74]}</td>
    <td height="40" onclick="popup(this);">${board[75]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[76]}</td>
    <td height="40" onclick="popup(this);">${board[77]}</td>
    <td height="40" onclick="popup(this);">${board[78]}</td>
    <td height="40" onclick="popup(this);">${board[79]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[80]}</td></center></div>
    </tr>

    <tr>
    <td height="40" onclick="popup(this);">${board[81]}</td>
    <td height="40" onclick="popup(this);">${board[82]}</td>
    <td height="40" onclick="popup(this);">${board[83]}</td>
    <td height="40" onclick="popup(this);">${board[84]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[85]}</td>
    <td height="40" onclick="popup(this);">${board[86]}</td>
    <td height="40" onclick="popup(this);">${board[87]}</td>
    <td height="40" onclick="popup(this);">${board[88]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[89]}</td></center></div>
    </tr>

    <tr>
    <td height="40" onclick="popup(this);">${board[90]}</td>
    <td height="40" onclick="popup(this);">${board[91]}</td>
    <td height="40" onclick="popup(this);">${board[92]}</td>
    <td height="40" onclick="popup(this);">${board[93]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[94]}</td>
    <td height="40" onclick="popup(this);">${board[95]}</td>
    <td height="40" onclick="popup(this);">${board[96]}</td>
    <td height="40" onclick="popup(this);">${board[97]}</td></center></div>
    <td height="40" onclick="popup(this);">${board[98]}</td></center></div>
    </tr>`;
}

export const handleNewGame = function(game) {
    game = new Game(4);
    let object = renderGame(game);
    $('#replace').replaceWith(object);

}

export const renderSite = function() {
    return `<div><h1>My Little Prairie</h1>`;
}

export const main = function() {
    const $root = $('#root');
    $root.append(renderSite());
    $root.append(renderGame(game));
    $root.on("click", ".replace", handleNewGame);
    
    $(document).on("keydown", function(p) {
        p.preventDefault();
        if (p.keyCode == '39') {
            game.move('right');
            $('#replace').replaceWith(renderGame(game)); }
        if (p.keyCode == '37') {
            game.move('left');  
            $('#replace').replaceWith(renderGame(game));}
        if (p.keyCode == '40') {
            game.move('down');  
            $('#replace').replaceWith(renderGame(game));}
        if (p.keyCode == '38') {
            game.move('up'); 
            $('#replace').replaceWith(renderGame(game));}
        }); 
}

$(function () {
  game = new Game(4);
  main(game);

  });