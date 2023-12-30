const widthLength = 10;
const heightLength = 8;
const board = document.getElementById("board");
const currentText = document.getElementById("current");
const score1Text = document.getElementById("score1Text");
const score2Text = document.getElementById("score2Text");

let playerName1 = "";
let playerName2 = "";

let gameClick = 0;
let onPlayerOne = true;
let randomNumber = randomInt(1, 20);

let score1 = 0;
let score2 = 0;

let save = [];

// onStart();
currentText.innerHTML = "Current: " + randomNumber;
currentText.style.color = 'red';

function onStart() {
  for (let y = 0; y < heightLength; y++) {
    if (y % 2 == 0) {
      let right = document.createElement("div");
      right.classList.add("right");

      for (let x = 0; x < widthLength; x++) {
        let grid = document.createElement("div");
        grid.classList.add("hexa");
        right.appendChild(grid);
        right.id = x + "," + y;
        grid.innerHTML = x + "," + y;
      }
      board.appendChild(right);
    } else {
      let left = document.createElement("div");
      left.classList.add("left");

      for (let x = 0; x < widthLength; x++) {
        let grid = document.createElement("div");
        grid.classList.add("hexa");

        left.appendChild(grid);
        left.id = x + "," + y;
        grid.innerHTML = x + "," + y;
      }
      board.appendChild(left);
    }
  }
}

function playerClick(x, y) {
  let grid = document.getElementById(x + "," + y);

  if (!grid.classList.contains("none")) {
    return null;
  }
  document.getElementById('click').play();

  if (onPlayerOne) {
    grid.classList.add("player1");
    onPlayerOne = false;
    score1 += randomNumber;


    //check enemy
    checking(x,y, 'player2', 'player1');




  } else {
    grid.classList.add("player2");
    onPlayerOne = true;
    score2 += randomNumber;
    checking(x,y, 'player1', 'player2');
  }

  grid.classList.remove("none");
  grid.innerHTML = randomNumber;

  randomNumber = randomInt(1, 20);

  currentText.innerHTML = "Current: " + randomNumber;
  score1Text.innerHTML = playerName1 + ": " + score1;
  score2Text.innerHTML = playerName2 + ": " + score2;

  if(onPlayerOne)
    currentText.style.color = 'red';
  else
currentText.style.color = 'blue';


  gameClick++;

  if (gameClick >= widthLength * heightLength) {
    gameOver(playerName1, playerName2, score1, score2);
  }
}

function checking(x,y, pTarget, currentP)
{
    let grid = document.getElementById(x + "," + y);
    let topRight;
    let topLeft;
    let bottomLeft;
    let bottomRight;

    if(grid.parentElement.classList.contains('right'))
    {
        topRight = document.getElementById(x + "," + (y - 1));
        topLeft = document.getElementById((x - 1) + "," + (y - 1));

        bottomLeft = document.getElementById(x + "," + (y + 1));
        bottomRight = document.getElementById((x - 1) + "," + (y + 1));
    }else
    {
        topRight = document.getElementById(x + "," + (y - 1));
        topLeft = document.getElementById((x + 1) + "," + (y - 1));

        bottomLeft = document.getElementById(x + "," + (y + 1));
        bottomRight = document.getElementById((x + 1) + "," + (y + 1));
    }


    let left = document.getElementById((x - 1) + "," + y);

    let right = document.getElementById((x + 1) + "," + y);

    if(topLeft != null && topLeft.classList.contains(pTarget) && topLeft.innerHTML < randomNumber)
    {
        topLeft.classList.remove(pTarget);
        topLeft.classList.add(currentP);

        if(pTarget == 'player2')
        {
            score2 -= parseInt(topLeft.innerHTML);
            score1 += parseInt(topLeft.innerHTML);
        }else
        {
            score1 -= parseInt(topLeft.innerHTML);
            score2 += parseInt(topLeft.innerHTML);

        }
    }
    if(topRight != null && topRight.classList.contains(pTarget) && topRight.innerHTML < randomNumber)
    {
        topRight.classList.remove(pTarget);
        topRight.classList.add(currentP);

        if(pTarget == 'player2')
        {
            score2 -= parseInt(topRight.innerHTML);
            score1 += parseInt(topRight.innerHTML);
        }else
        {
            score1 -= parseInt(topRight.innerHTML);
            score2 += parseInt(topRight.innerHTML);

        }
    }
    if(left != null && left.classList.contains(pTarget) && left.innerHTML < randomNumber)
    {
        left.classList.remove(pTarget);
        left.classList.add(currentP);

        if(pTarget == 'player2')
        {
            score2 -= parseInt(left.innerHTML);
            score1 += parseInt(left.innerHTML);
        }else
        {
            score1 -= parseInt(left.innerHTML);
            score2 += parseInt(left.innerHTML);

        }
    }
    if(bottomLeft != null && bottomLeft.classList.contains(pTarget) && bottomLeft.innerHTML < randomNumber)
    {
        bottomLeft.classList.remove(pTarget);
        bottomLeft.classList.add(currentP);

        if(pTarget == 'player2')
        {
            score2 -= parseInt(bottomLeft.innerHTML);
            score1 += parseInt(bottomLeft.innerHTML);
        }else
        {
            score1 -= parseInt(bottomLeft.innerHTML);
            score2 += parseInt(bottomLeft.innerHTML);

        }
    }
    if(bottomRight != null && bottomRight.classList.contains(pTarget) && bottomRight.innerHTML < randomNumber)
    {
        bottomRight.classList.remove(pTarget);
        bottomRight.classList.add(currentP);

        if(pTarget == 'player2')
        {
            
            score2 -= parseInt(bottomRight.innerHTML);
            score1 += parseInt(bottomRight.innerHTML);
        }else
        {
            score1 -= parseInt(bottomRight.innerHTML);
            score2 += parseInt(bottomRight.innerHTML);

        }
    }
    if(right != null && right.classList.contains(pTarget) && right.innerHTML < randomNumber)
    {
        right.classList.remove(pTarget);
        right.classList.add(currentP);

        if(pTarget == 'player2')
        {
            score2 -= parseInt(right.innerHTML);
            score1 += parseInt(right.innerHTML);
        }else
        {
            score1 -= parseInt(right.innerHTML);
            score2 += parseInt(right.innerHTML);

        }
    }
}

function randomInt(min, max) {
  let i = Math.floor(Math.random() * (max - min - 1)) + min;
  return i;
}

function playButton() {
  document.getElementById("mainMenu").classList.add("hide");
  playerName1 = document.getElementById("player-1").value;
  playerName2 = document.getElementById("player-2").value;

  score1Text.innerHTML = playerName1 + ": " + score1;
  score2Text.innerHTML = playerName2 + ": " + score2;
}

function gameOver(p1, p2, s1, s2) {
  document.getElementById("gameOver").classList.remove("hide");

  if(s1 > s2)
  {
    document.getElementById('winName').innerHTML = p1 + " WIN";
    document.getElementById('winScore').innerHTML = "Score: " + s1;
  }else if(s2 > s1)
  {
    document.getElementById('winName').innerHTML = p2 + " WIN";
    document.getElementById('winScore').innerHTML = "Score: " + s2;
  }else
  {
    document.getElementById('winName').innerHTML = "DRAW";
    document.getElementById('winScore').innerHTML = "Score: " + s1;
  }

  saving();
}

function saving(id) {
  save.push({
    pName1: playerName1,
    pName2: playerName2,
    score1: score1,
    score2: score2,
  });

  console.log(save);

  let saveContainer = document.getElementById("save");
    let ig = document.createElement('div');
    let data = document.createElement('div');
    let h3 = document.createElement('h3');
    let h31 = document.createElement('h3');
    let button = document.createElement('button');


    ig.classList.add('input-group');
    data.classList.add('data');
    h3.innerHTML = playerName1 + " vs " + playerName2;
    h31.innerHTML = score1 + " - " + score2;
    button.innerHTML = "Detail";

    ig.appendChild(data);
    data.appendChild(h3);
    data.appendChild(h31);
    ig.appendChild(button);

    saveContainer.appendChild(ig);
}

function playAgain() {
  for (let y = 0; y < heightLength; y++) {
    for (let x = 0; x < widthLength; x++) {
      let grid = document.getElementById(x + "," + y);
      grid.classList.add("none");
      grid.classList.remove("player1");
      grid.classList.remove("player2");
      grid.innerHTML = "";
    }
  }
  gameClick = 0;
  document.getElementById("gameOver").classList.add("hide");
  document.getElementById("mainMenu").classList.remove("hide");
  currentText.innerHTML = "Current: " + randomNumber;

  score1 = 0;
  score2 = 0;
}


function detailButton()
{
    alert();
}