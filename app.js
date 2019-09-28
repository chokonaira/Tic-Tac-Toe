const boxs = document.querySelectorAll(".box");
const possibilitiesToWin = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
let boxNumbers = [1,2,3,4,5,6,7,8,9];
let humanPlayer = [], computer = [];
/*******************************************************/
function check(array){
  let finalResult = false;
  for(let item of possibilitiesToWin){
    let result = item.every(value => array.indexOf(value) !== -1);
    if(result){
        finalResult = true;
      break;
    }
  }
  return finalResult;
}
/*******************************************************/
function checkForWinPostion(potentialWinner, blocker){
  let finalResult = -1;
  for(let item of possibilitiesToWin){
    let firstChance = item[0] , secondChance = item[1] , thirdChance = item[2];
    if(potentialWinner.includes(firstChance) && potentialWinner.includes(secondChance) && !blocker.includes(thirdChance)){
      finalResult = thirdChance;
      break;
    } else if(potentialWinner.includes(secondChance) && potentialWinner.includes(thirdChance) && !blocker.includes(firstChance)){
      finalResult = firstChance;
      break;
    } else if(potentialWinner.includes(firstChance) && potentialWinner.includes(thirdChance) && !blocker.includes(secondChance)){
      finalResult = secondChance;
      break;
    }
  }
  return finalResult;
}

/*******************************************************/
function winnerpleyr(message){
  const modal = document.createElement("div");
  const player = document.createTextNode(message);
  const replay = document.createElement("button");
  modal.classList.add("modal");
  modal.appendChild(player);
  replay.appendChild(document.createTextNode("Replay"));
  replay.setAttribute("onclick","playAgain()");
  modal.appendChild(replay);
  document.body.appendChild(modal);
}
/*******************************************************/
function draw(){
  let currentBoxIndex = Number(this.dataset.index);
  if(![...humanPlayer, ...computer].includes(currentBoxIndex)){
    this.classList.add("x");
    let arrayIndx = boxNumbers.indexOf(currentBoxIndex);
    boxNumbers.splice(arrayIndx,1);
    humanPlayer.push(currentBoxIndex);
    if(check(humanPlayer)){
      winnerpleyr("congrats, you win 🎉🎉");
      return;
    }
    if(boxNumbers.length == 0){
      winnerpleyr("Draw");
      return;
    }
    currentBoxIndex = checkForWinPostion(humanPlayer, computer);
    if(currentBoxIndex !== -1){
      const computerWinPosition = checkForWinPostion(computer, humanPlayer);
      currentBoxIndex = computerWinPosition !== -1 ? computerWinPosition : currentBoxIndex;
      arrayIndx = boxNumbers.indexOf(currentBoxIndex);
      boxNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${currentBoxIndex}"]`);
      computerDraw.classList.add("o");
      computer.push(Number(computerDraw.dataset.index));
    } else{
      let boxNumbersLength = boxNumbers.length;
      let random = Math.floor(Math.random() * boxNumbersLength);
      currentBoxIndex = boxNumbers[random];
      arrayIndx = boxNumbers.indexOf(currentBoxIndex);
      boxNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${currentBoxIndex}"]`);
      computerDraw.classList.add("o");
      computer.push(Number(computerDraw.dataset.index)); 
    }
    if(check(computer)){
      winnerpleyr("sorry, you lose 😢");
      return;
    }
  }
}
/*******************************************************/
function playAgain(){
  const modal = document.querySelector(".modal");
  boxs.forEach(box => box.classList = "box");
  boxNumbers = [1,2,3,4,5,6,7,8,9]
  humanPlayer = [];
  computer = [];
  modal.remove();
}
/*******************************************************/
boxs.forEach(box => box.addEventListener("click", draw));
