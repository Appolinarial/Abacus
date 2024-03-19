document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(event) {
    let target = event.target;
    if (!target.classList.contains('circle')) {
      return;
    } else {
      calculateSum(target);
    };
  });
  render();
});

function calculateSum(target) {
  let lines = Array.from(document.querySelectorAll(".line")).reverse();
  let parentIndex = lines.findIndex((elem)=> elem == target.parentNode);
  const childIndex = Array.from(target.parentNode.children).indexOf(target);
  let y = childIndex +1;
  let numOfRightBalls = 0;
  let numOfLeftBalls = 0;
  if(target.classList.contains("right") == true){
    while(y > 1 && target.parentNode.children[y-1].classList.contains("right")){
      numOfRightBalls++;
      y--;
    } 
  } else {
    for(;y <= target.parentNode.children.length; y++) {
      if(target.parentNode.children[y] && target.parentNode.children[y].classList.contains("right") == true) {
      } else {
        numOfLeftBalls++;
      }
    }
  }
  let newSumAfterClick = 1;
  newSumAfterClick = (newSumAfterClick*10**parentIndex)*(numOfLeftBalls - numOfRightBalls);
  document.getElementById("value").value = +document.getElementById("value").value + newSumAfterClick;
  let sum = document.getElementById("value").value;
  renderAfterClick(sum);
}

function renderAfterClick(sum) {
  render();
  let numsArray =  sum.split("").reverse();
  let lines = document.querySelectorAll(".line");
  let linesArray = Array.from(lines).reverse();
  numsArray.forEach(function(element, index){
    if (element == undefined) return;
    else {
      let num = element;
      i = index;
      currentLine = linesArray[i];
      moveBallstoLeft(linesArray, i, num);
    }
  })
}

function moveBallstoLeft(linesArray, i, num) {
  let balls = linesArray[i].querySelectorAll(".circle");
  let ballsArray = Array.from(balls);
  for(j=0; j < num; j++) {
    ballsArray[ballsArray.length - 1 - j].style.removeProperty('left');
    ballsArray[ballsArray.length - 1 - j].style.right = j*19 + "px";
    ballsArray[ballsArray.length - 1 - j].classList.add("right");
  };
}

//function measure { Определяет размер бусин и тд*}
function render() {
  let lines = document.querySelectorAll(".line");
  Array.from(lines).forEach(function(element) {
    let balls = element.querySelectorAll(".circle");
    Array.from(balls).forEach(function(element, index) {
      element.style.left = index*19 + "px";
      element.classList.remove("right");
    });
  })
}


