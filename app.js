const boxs = document.querySelectorAll(".box");
const possibilitiesToWin = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
let boxNumbers = [1,2,3,4,5,6,7,8,9];
let firstPlayer = [], computer = [];
/*******************************************************/
function check(array){
  let finalResult = false;
  for(let item of possibilitiesToWin){
    let res = item.every(val => array.indexOf(val) !== -1);
    if(res){
        finalResult = true;
      break;
    }
  }
  return finalResult;
}
/*******************************************************/
function checkForBlock(){
  let finalResult = -1;
  for(let item of possibilitiesToWin){
    let a = item[0] , b = item[1] , c = item[2];
    if(firstPlayer.includes(a) && firstPlayer.includes(b) && !computer.includes(c)){
      finalResult = c;
      break;
    } else if(firstPlayer.includes(b) && firstPlayer.includes(c) && !computer.includes(a)){
      finalResult = a;
      break;
    } else if(firstPlayer.includes(a) && firstPlayer.includes(c) && !computer.includes(b)){
      finalResult = b;
      break;
    }
  }
  return finalResult;
}
/*******************************************************/
function winnerpleyr(p){
  const modal = document.createElement("div");
  const player = document.createTextNode(p);
  const replay = document.createElement("button");
  modal.classList.add("winner");
  modal.appendChild(player);
  replay.appendChild(document.createTextNode("Replay"));
  replay.setAttribute("onclick","rep()");
  modal.appendChild(replay);
  document.body.appendChild(modal);
}
/*******************************************************/
function draw(){
  if(this.classList == "box"){
    this.classList.add("x");
    let boxIndx = Number(this.dataset.index);
    let arrayIndx = boxNumbers.indexOf(boxIndx);
    boxNumbers.splice(arrayIndx,1);
    firstPlayer.push(boxIndx);
    if(check(firstPlayer)){
      winnerpleyr("congrats, you win 🎉🎉");
      return;
    }
    if(boxNumbers.length == 0){
      winnerpleyr("Draw");
      return;
    }
    boxIndx = checkForBlock();
    if(boxIndx !== -1){
      arrayIndx = boxNumbers.indexOf(boxIndx);
      boxNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${boxIndx}"]`);
      computerDraw.classList.add("o");
      computer.push(Number(computerDraw.dataset.index));
    } else{
      let boxNumbersLength = boxNumbers.length;
      let random = Math.floor(Math.random() * boxNumbersLength);
      boxIndx = boxNumbers[random];
      arrayIndx = boxNumbers.indexOf(boxIndx);
      boxNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${boxIndx}"]`);
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
function rep(){
  const w = document.querySelector(".winner");
  boxs.forEach(box => box.classList = "box");
  boxNumbers = [1,2,3,4,5,6,7,8,9]
  firstPlayer = [];
  computer = [];
  w.remove();
}
/*******************************************************/
boxs.forEach(box => box.addEventListener("click", draw));
