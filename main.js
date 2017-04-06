$(document).ready(function(){
var map = [
    ["W", " ", " ", " ", " ", " ", " ", "W"],
    ["W", " ", " ", " ", "W", "C", " ", " "],
    [" ", " ", "W", " ", " ", " ", " ", " "],
    [" ", "W", " ", " ", " ", "W", " ", "P2"],
    [" ", " ", "C", "W", " ", " ", "C", " "],
    ["P1", "W", " ", " ", "W", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "W", " "],
    ["W", " ", "C", " ", " ", " ", " ", "W"]
];
//convert map into objects
for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
        if (map[x][y] == "W") map[x][y] = {
            type: "W"
        };
        else if (map[x][y] == "C") map[x][y] = {
            type: "C"
        };
        else if (map[x][y] == "P1") map[x][y] = {
            type: "P1"
        };
        else if (map[x][y] == "P2") map[x][y] = {
            type: "P2"
        };
        else if (map[x][y] == " ") map[x][y] = {
            type: " "
        };
    }
}
//defining prize spots
map[5][0] = {
    type: "P1",
    prize: "copper coin"
}
map[3][7] = {
    type: "P2",
    prize: "water bottle"
}
//location of start and goal
var start;
var goal;
//placing start
var colR;
var rowR;
do {
    colR = Math.floor(Math.random() * 7);
    rowR = Math.floor(Math.random() * 7);
} while (map[colR][rowR].type == "C" || map[colR][rowR].type == "P1" || map[colR][rowR].type == "P2" || map[colR][rowR].type == "W");
start = {
    col: colR,
    row: rowR
};
map[colR][rowR] = {
    type: "S"
};
//placing goal
do {
    colR = Math.floor(Math.random() * 7);
    rowR = Math.floor(Math.random() * 7);
} while (map[colR][rowR].type == "C" || map[colR][rowR].type == "P1" || map[colR][rowR].type == "P2" || map[colR][rowR].type == "W" || map[colR][rowR].type == "S");
goal = {
    col: colR,
    row: rowR
};
map[colR][rowR] = {
    type: "G"
};
//setting character stats
var player = {
    locCol: start.col,
    locRow: start.row,
    prizes: [],
    hp: 20,
    magicNumber: 3
};
//dead or alive
var ongoing = true;
var healthCheck = function() {
    if (player.hp <= 0) {
        document.getElementById("event").innerHTML = "You have died!<br>Refresh the page to play again.";
        ongoing = false;
    }
}
//challenge mode
function runChallenge(monster) {
    var fiteMe = function(){
        var rng = Math.floor(Math.random() * 5);
        console.log("rng: " + rng);
        console.log("player magic: " + player.magicNumber);
        if (rng > player.magicNumber) {
            document.getElementById("fightResult").innerHTML = "You've been hit with " + rng + " dmg.";
            player.hp = player.hp - rng;
        } else {
            document.getElementById("fightResult").innerHTML = "You hit " + monster.name + " with " + player.magicNumber + " dmg.";
            monster.hp = monster.hp - player.magicNumber;
        };
        healthCheck();
        console.log(monster.hp);
        if (ongoing == true) reChallenge();
        else{
            document.getElementById("fightSeq").setAttribute("style", "visibility:hidden;");
            document.getElementById("YesNo").setAttribute("style", "visibility:hidden;");
        };
    };
    var reChallenge = function() {
        if (monster.hp > 0) {
            document.getElementById("fightText").innerHTML = "Would you like to challenge " + monster.name + " again?";
            $("#fightYes").on('click', function(){
                $("#fightYes").off('click');
                fiteMe();
            });
            $("#fightNo").click(function(){
                document.getElementById("fightSeq").setAttribute("style", "visibility:hidden;");
                document.getElementById("YesNo").setAttribute("style", "visibility:hidden;");
                document.getElementById("buttons").setAttribute("style", "visibility:visible;");
                document.getElementById("event").innerHTML = " ";
            });
        } else {
            document.getElementById("event").innerHTML = "You killed " + monster.name + "!";
            player.prizes.push(monster.prize);
            monster.type = " ";
            document.getElementById("fightSeq").setAttribute("style", "visibility:hidden;");
            document.getElementById("YesNo").setAttribute("style", "visibility:hidden;");
            document.getElementById("buttons").setAttribute("style", "visibility:visible;");
        }
    };
    document.getElementById("buttons").setAttribute("style", "visibility:hidden;");
    document.getElementById("fightSeq").setAttribute("style", "visibility:visible;");
    document.getElementById("YesNo").setAttribute("style", "visibility:visible;");
    document.getElementById("fightResult").innerHTML = " ";
    document.getElementById("fightText").innerHTML = "Would you like to fight " + monster.name + "?";
    $("#fightYes").on('click', function(){
        $("#fightYes").off('click');
        fiteMe();
    });
    $("#fightNo").click(function(){
        document.getElementById("event").innerHTML = " ";
        document.getElementById("fightSeq").setAttribute("style", "visibility:hidden;");
        document.getElementById("YesNo").setAttribute("style", "visibility:hidden;");
        document.getElementById("buttons").setAttribute("style", "visibility:visible;");
    });
    
}
//setting monster stats
map[1][5] = {
    type: "C",
    name: "D3",
    hp: 5,
    prize: "memes"
};
map[4][2] = {
    type: "C",
    name: "Gohma",
    hp: 6,
    prize: "Deku Stick"
};
map[4][6] = {
    type: "C",
    name: "Camilla",
    hp: 7,
    prize: "Gold Coin"
};
map[7][2] = {
    type: "C",
    name: "Ganondorf",
    hp: 8,
    prize: "Triforce"
};
//create HTML map
function createMap() {
    var tableBody = document.createElement('tbody');
    for (var x = 0; x < 8; x++) {
        var row = document.createElement('tr');
        for (var y = 0; y < 8; y++) {
            if (map[x][y].type == "S") {
                var cell = document.createElement('td');
                cell.setAttribute("id", "" + x + y);
                cell.appendChild(document.createTextNode(map[x][y].type));
                row.appendChild(cell);
            } else {
                var cell = document.createElement('td');
                cell.setAttribute("id", "" + x + y);
                cell.setAttribute("style", "visibility:hidden;");
                cell.appendChild(document.createTextNode(map[x][y].type));
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        };
        document.getElementById("map").appendChild(tableBody);
    }
}
//create game runner
var game = function() {
    createMap();
    document.getElementById("intro").innerHTML = "I want to play a game." + "<br/>You are placed in a random spot in a map. Your goal is to move around, gather 2 prizes, and exit this map." + "<br/>These prizes can be obtained by defeating monsters or from random areas in the map." + "<br/>Have fun!";
    //moves the player in the HTML table
    var tableMover = function(y, x, prevY, prevX) {
        document.getElementById("" + y + x).setAttribute("style", "visibility:visible;");
        document.getElementById("" + y + x).innerHTML = "P";
        document.getElementById("" + prevY + prevX).innerHTML = map[prevY][prevX].type;
    }
    //moves the player in the array
    var mover = function(y, x, prevY, prevX) {
        if (y < 0 || y > 7 || x < 0 || x > 7) {
            document.getElementById("event").innerHTML = "<h3>Out of bounds! Please choose a different direction.</h3>";
        } else if (map[y][x].type == " ") {
            tableMover(y, x, prevY, prevX);
            player.locCol = y;
            player.locRow = x;
        } else if (map[y][x].type == "S") {
            tableMover(y, x, prevY, prevX);
            player.locCol = y;
            player.locRow = x;
        } else if (map[y][x].type == "W") {
            document.getElementById("" + y + x).setAttribute("style", "visibility:visible;");
            document.getElementById("event").innerHTML = "<h3>You have hit a wall. Please choose a different direction.</h3>";
        } else if (map[y][x].type == "P1") {
            tableMover(y, x, prevY, prevX);
            document.getElementById("event").innerHTML = "<h3>You have found a " + map[y][x].prize + "!</h3>";
            player.prizes.push(map[y][x].prize);
            map[y][x].type = "  ";
            player.locCol = y;
            player.locRow = x;
        } else if (map[y][x].type == "P2") {
            tableMover(y, x, prevY, prevX);
            document.getElementById("event").innerHTML = "<h3>You have found a " + map[y][x].prize + "!</h3>";
            player.prizes.push(map[y][x].prize);
            map[y][x].type = "  ";
            player.locCol = y;
            player.locRow = x;
        } else if (map[y][x].type == "C") {
            tableMover(y, x, prevY, prevX);
            player.locCol = y;
            player.locRow = x;
            document.getElementById("event").innerHTML = "<h3>You have come upon " + map[y][x].name + "!</h3>";
            runChallenge(map[y][x]);
        } else if (map[y][x].type == "G") {
            tableMover(y, x, prevY, prevX);
            if (player.prizes.length >= 2) {
                ongoing = false;
                document.getElementById("event").innerHTML = "<h3>Congrats! You have obtained 2 reached the prizes and have reached the goal! <br>You win! <br>To Play again, please refresh the page.</h3>";
                document.getElementById("buttons").setAttribute("style", "display:none;");
            } else {
                player.locCol = y;
                player.locRow = x;
                document.getElementById("event").innerHTML = "<h3>You have reached the goal but have not obtained 2 prizes. Please come back again once you have obtained 2 prizes.</h3>";
            }
        }
    }
    var playerCol;
    var playerRow;
    playerCol = player.locCol + 1;
    playerRow = player.locRow + 1;
    document.getElementById("status").innerHTML = "<h3>Current Player Stats:" + "<br>" + "HP: " + player.hp + "<br>" + "Prize Count: " + player.prizes.length + "<br>" + "Prizes Holding: " + player.prizes + "<br>" + "Player Location: column " + playerCol + " row " + playerRow;
    $("#upB").click(function(){
        playerCol = player.locCol + 1;
        playerRow = player.locRow + 1;
        document.getElementById("status").innerHTML = "<h3>Current Player Stats:" + "<br>" + "HP: " + player.hp + "<br>" + "Prize Count: " + player.prizes.length + "<br>" + "Prizes Holding: " + player.prizes + "<br>" + "Player Location: column " + playerCol + " row " + playerRow;
        mover(player.locCol - 1, player.locRow, player.locCol, player.locRow);
    });
    $("#leftB").click(function(){
        playerCol = player.locCol + 1;
        playerRow = player.locRow + 1;
        document.getElementById("status").innerHTML = "<h3>Current Player Stats:" + "<br>" + "HP: " + player.hp + "<br>" + "Prize Count: " + player.prizes.length + "<br>" + "Prizes Holding: " + player.prizes + "<br>" + "Player Location: column " + playerCol + " row " + playerRow;
        mover(player.locCol, player.locRow - 1, player.locCol, player.locRow);
    });
    $("#downB").click(function(){
        playerCol = player.locCol + 1;
        playerRow = player.locRow + 1;
        document.getElementById("status").innerHTML = "<h3>Current Player Stats:" + "<br>" + "HP: " + player.hp + "<br>" + "Prize Count: " + player.prizes.length + "<br>" + "Prizes Holding: " + player.prizes + "<br>" + "Player Location: column " + playerCol + " row " + playerRow;
        mover(player.locCol + 1, player.locRow, player.locCol, player.locRow);
    });
    $("#rightB").click(function(){
        playerCol = player.locCol + 1;
        playerRow = player.locRow + 1;
        document.getElementById("status").innerHTML = "<h3>Current Player Stats:" + "<br>" + "HP: " + player.hp + "<br>" + "Prize Count: " + player.prizes.length + "<br>" + "Prizes Holding: " + player.prizes + "<br>" + "Player Location: column " + playerCol + " row " + playerRow;
        mover(player.locCol, player.locRow + 1, player.locCol, player.locRow);
    });
}
console.log(game());
});