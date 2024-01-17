console.log("hello");

player1Rule = {
  route: [
    21, 22, 23, 24, 25, 17, 14, 11, 8, 5, 1, 2, 3, 7, 10, 13, 16, 19, 29, 30,
    31, 32, 33, 34, 49, 64, 63, 62, 61, 60, 59, 68, 72, 75, 78, 81, 84, 83, 82,
    79, 76, 73, 70, 66, 55, 54, 53, 52, 51, 50, 35, 36, 37, 38, 39, 40, 41,
  ],
  lastCells: [36, 37, 38, 39, 40],
  winningCell: 41,
  currentPosition: null,
};
player2Rule = {
  route: [
    7, 10, 13, 16, 19, 29, 30, 31, 32, 33, 34, 49, 64, 63, 62, 61, 60, 59, 68,
    72, 75, 78, 81, 84, 83, 82, 79, 76, 73, 70, 66, 55, 54, 53, 52, 51, 50, 35,
    20, 21, 22, 23, 24, 25, 17, 14, 11, 8, 5, 1, 2, 6, 9, 12, 15, 18, 27,
  ],
  lastCells: [6, 9, 12, 15, 18],
  winningCell: 27,
  currentPosition: null,
};
player3Rule = {
  route: [
    79, 76, 73, 70, 66, 55, 54, 53, 52, 51, 50, 35, 20, 21, 22, 23, 24, 25, 17,
    14, 11, 8, 5, 1, 2, 3, 7, 10, 13, 16, 19, 29, 30, 31, 32, 33, 34, 49, 64,
    63, 62, 61, 60, 59, 68, 72, 75, 78, 81, 84, 83, 80, 77, 74, 71, 67, 57,
  ],
  lastCells: [80, 77, 74, 71, 67],
  winningCell: 57,
  currentPosition: null,
};
player4Rule = {
  route: [
    63, 62, 61, 60, 59, 68, 72, 75, 78, 81, 84, 83, 82, 79, 76, 73, 70, 66, 55,
    54, 53, 52, 51, 50, 35, 20, 21, 22, 23, 24, 25, 17, 14, 11, 8, 5, 1, 2, 3,
    7, 10, 13, 16, 19, 29, 30, 31, 32, 33, 34, 49, 48, 47, 46, 45, 44, 43,
  ],
  lastCells: [48, 47, 46, 45, 44],
  winningCell: 43,
  currentPosition: null,
};

var safeCells = [
  player1Rule.route[0],
  player2Rule.route[0],
  player3Rule.route[0],
  player4Rule.route[0],
  8,
  32,
  52,
  78,
];

const p1Color = "rgba(0, 0, 255,1)";
const p2Color = "rgba(0, 200, 0,1)";
const p3Color = "rgba(255, 0, 0,1)";
const p4Color = "rgba(255, 200, 0,1)";

var parentDiv = document.createElement("div");
var parentDiv2 = document.createElement("div");
for (var i = 0; i < 85; i++) {
  var newdiv = document.createElement("div");
  var span = document.createElement("span");
  newdiv.classList.add("gridElement");
  newdiv.id = `g${i}`;
  // newdiv.textContent = `${i}`;

  if (i == 0 || i == 4 || i == 65 || i == 69) {
    newdiv.classList.add("teritory");
  } else if (safeCells.includes(i)) {
    newdiv.classList.add("safe");
  } else {
    newdiv.classList.add("playcell");
    if (player1Rule.route[0] == i) {
      newdiv.style.backgroundColor = "rgba(0, 0, 255,0.4)";
    } else if (player1Rule.lastCells.includes(i)) {
      newdiv.style.backgroundColor = p1Color;
    } else if (player2Rule.route[0] == i) {
      newdiv.style.backgroundColor = "rgba(0, 200, 0,0.4)";
    } else if (player2Rule.lastCells.includes(i)) {
      newdiv.style.backgroundColor = p2Color;
    } else if (player3Rule.route[0] == i) {
      newdiv.style.backgroundColor = "rgba(255, 0, 0,0.4)";
    } else if (player3Rule.lastCells.includes(i)) {
      newdiv.style.backgroundColor = p3Color;
    } else if (player4Rule.route[0] == i) {
      newdiv.style.backgroundColor = "rgba(255, 200, 0,0.4)";
    } else if (player4Rule.lastCells.includes(i)) {
      newdiv.style.backgroundColor = p4Color;
    }
  }

  span.classList.add("parent-div-wraper");

  newdiv.appendChild(span);
  
  parentDiv2.classList.add("parent-div");
  parentDiv2.appendChild(newdiv);
}
parentDiv.classList.add("console");

parentDiv.appendChild(parentDiv2);

document.body.appendChild(parentDiv);

// // for checking the route in animation
// player2Rule.route.forEach((id,index) => {
//   setTimeout(()=>{
//   var cells = document.getElementById(`g${id}`);
//   cells.style.backgroundColor = "blue";},index*130);
// });

// logic starts here

var randomNumber = 0;
var noPlayers = 2;
var turn = 0;
var madeMove = false;

function randomNo() {
  randomNumber = Math.floor(Math.random() * 6) + 1;
  madeMove=false;
  return randomNumber;
}

function randButtonClicked(e) {
  const prevRandomNo = randomNumber;
  e.target.textContent = randomNo();
  if (prevRandomNo != 6) {
    if (turn == noPlayers) {
      turn = 1;
    } else {
      turn++;
    }
  }
  pTurnDiv.textContent = `Player${turn}`;
  // console.log("turns ",turn)
}
function isFucked(player) {
  const currentPlayerPos = player.route[player.currentPosition];
  for (let key in players) {
    if (key != turn - 1) {
      console.log(`key is ${key} ${currentPlayerPos}`);
      for (const [key2, value] of Object.entries(players[key])) {
        const currentPUnsafes =
          players[key][key2].route[players[key][key2].currentPosition];
        console.log(`key2 is ${key2} ${value} ${currentPUnsafes}`);
        if (currentPUnsafes == currentPlayerPos) {
          const fuckedT = document.getElementById(key2);
          fuckedT.parentNode.removeChild(fuckedT);
          document
            .getElementById(players[key][key2].initialPt)
            .appendChild(fuckedT);
          players[key][key2].currentPosition = null;
        }
      }
    }
  }
}
function clickedToken(e) {
  // console.log("clicked parent " + e.target.parentNode.id);

  if (randomNumber > 0) {
    var player;
    if (typeof players[turn - 1][e.target.id] != "undefined"&&!madeMove) {
      // console.log("found it", players[turn-1][e.target.id]);
      player = players[turn - 1][e.target.id];

      if (player.currentPosition == null && randomNumber == 6) {
        // console.log(e.target.parentNode.id);
        e.target.parentNode.removeChild(e.target);

        var newParent = document.getElementById(`g${player.route[0]}`).firstChild;
        newParent.appendChild(e.target);
        player.currentPosition = 0;
        madeMove = true;
      } else if (player.currentPosition != null) {
        const newPosition = player.currentPosition + randomNumber;
        if (newPosition < player.route.length) {
          e.target.parentNode.removeChild(e.target);
          var newParent = document.getElementById(
            `g${player.route[newPosition]}`
          ).firstChild;
          newParent.appendChild(e.target);
          player.currentPosition = newPosition;
          if (!safeCells.includes(player.route[player.currentPosition]))
            isFucked(player);
          
          // players.forEach((unSafeP, index) => {
          //   if (index != turn - 1) {
          //     console.log(`checking unsafe token ${typeof unSafeP}`);
          //     unSafeP.forEach((unSafeT) => {
          //       console.log(`unsafe token ${unSafeT} and player ${unSafeP}`);
          //     });
          //   }
          // });
        }
        madeMove = true;
      }
    } else {
      console.log("undefined");
    }
  }
}

function CreateToken(id, parentId, colr) {
  var player1Token = document.createElement("div");
  player1Token.classList.add("token");
  player1Token.style.border = `2px ${colr} solid`;
  player1Token.id = id;
  player1Token.onclick = clickedToken;
  parentPlayerDiv = document.getElementById(parentId).firstChild;
  parentPlayerDiv.appendChild(player1Token);
}

var randomDice = document.getElementById("randButton");
var pTurnDiv = document.getElementById("pTurn");
randomDice.onclick = randButtonClicked;

class Token {
  constructor(route, lastCells, winningCell, currentPosition, initialPt, safe) {
    this.route = route;
    this.lastCells = lastCells;
    this.winningCell = winningCell;
    this.currentPosition = currentPosition;
    this.initialPt = initialPt;
    this.safe = safe;
  }
  createTokens(player, tkn) {
    var g = 0;
    var colr = p1Color;
    if (player == 2) {
      g = 4;
      colr = p2Color;
    } else if (player == 3) {
      g = 65;
      colr = p3Color;
    } else if (player == 4) {
      g = 69;
      colr = p4Color;
    }
    this.initialPt = `g${g}`;
    CreateToken(`t${tkn}p${player}`, `g${g}`, colr);
    return `t${tkn}p${player}`;
  }
}

function Player(p) {
  var p1 = [];
  var player = player1Rule;
  if (p == 2) {
    player = player2Rule;
  } else if (p == 3) {
    player = player3Rule;
  } else if (p == 4) {
    player = player4Rule;
  }
  for (i = 0; i < 4; i++) {
    let newToken = new Token(
      player.route,
      player.lastCells,
      player.winningCell,
      null
    );
    p1[`${newToken.createTokens(p, i)}`] = newToken; //in createTokens: p is the player number and i is the 4 tokens
  }
  return p1;
}
var players = [Player(1), Player(4)];
// for (i = 1; i <= noPlayers; i++) {
//   players[`p${i}`] = Player(i);
//   console.log(`p${i}`)
// }
console.log(players[0]);
