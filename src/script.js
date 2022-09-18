const number = document.querySelectorAll(".num"),
  answerField = document.querySelector(".answer"),
  enter = document.querySelector(".enter"),
  escapeButton = document.querySelector(".escape"),
  reset = document.querySelector("#reset"),
  num1 = document.querySelector("#num1"),
  num2 = document.querySelector("#num2"),
  operation = document.querySelector("#operation"),
  score = document.querySelector("#score"),
  mainContainer = document.querySelector(".main-container"),
  timer = document.querySelector("#timer"),
  popup = document.querySelector(".summary-popup-container"),
  popupClose = document.querySelector(".popup-close"),
  popupScore = document.querySelector(".popup-score"),
  popupCorrect = document.querySelector(".popup-correct"),
  smsMessage = document.querySelector(".text-link"),
  twitterMessage = document.querySelector(".twitter-link"),
  facebookMessage = document.querySelector(".facebook-link"),
  emailMessage = document.querySelector(".email-link");

score.innerHTML = 0;
var countCorrect = 0;
var gameTimer = "";
var timerLimit = 60;

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newEquation() {
  const operations = ["+", "-", "*", "/"];

  operation.innerHTML =
    operations[Math.floor(Math.random() * operations.length)];

  switch (operation.innerHTML) {
    case "-":
      var number1 = randomIntBetween(0, 12);
      var number2 = randomIntBetween(0, 12);

      if (number1 < number2) {
        console.log("Uh oh, that's gonna be negative... hmmm...");
        num1.innerHTML = number2;
        num2.innerHTML = number1;
      } else {
        num1.innerHTML = number1;
        num2.innerHTML = number2;
      }
      break;
    case "/":
      number1 = randomIntBetween(0, 12);
      number2 = randomIntBetween(1, 12);

      console.log(number1, number2);
      while (number1 % number2 !== 0) {
        number1 = randomIntBetween(0, 12);
        number2 = randomIntBetween(1, 12);

        console.log(number1, number2);
      }

      num1.innerHTML = number1;
      num2.innerHTML = number2;
      break;
    default:
      var number1 = randomIntBetween(0, 12);
      var number2 = randomIntBetween(0, 12);

      num1.innerHTML = number1;
      num2.innerHTML = number2;
  }
}

function checkAnswer() {
  var answer = 0;
  var userAnswer = Number(answerField.innerHTML);

  console.log(
    Number(num1.innerHTML),
    operation.innerHTML,
    Number(num2.innerHTML)
  );

  switch (operation.innerHTML) {
    case "+":
      answer = Number(num1.innerHTML) + Number(num2.innerHTML);
      break;
    case "-":
      answer = Number(num1.innerHTML) - Number(num2.innerHTML);
      break;
    case "*":
      answer = Number(num1.innerHTML) * Number(num2.innerHTML);
      break;
    case "/":
      answer = Number(num1.innerHTML) / Number(num2.innerHTML);
      break;
  }

  if (answer == userAnswer) {
    console.log("User answered correctly!");
    score.innerHTML = Number(score.innerHTML) + 100;
    countCorrect++;

    answerField.classList.toggle("correct");
    mainContainer.classList.toggle("correct");

    setTimeout(() => {
      answerField.classList.toggle("correct");
      mainContainer.classList.toggle("correct");
      answerField.innerHTML = "";
    }, 300);

    newEquation();
  } else {
    console.log("Incorrect!!!");
    answerField.classList.toggle("wrong");
    mainContainer.classList.toggle("wrong");

    setTimeout(() => {
      answerField.classList.toggle("wrong");
      mainContainer.classList.toggle("wrong");
      answerField.innerHTML = "";
    }, 300);
  }
}

function resetGame() {
  console.log("Answer field cleared...");
  answerField.innerHTML = "";

  num1.innerHTML = "";
  num2.innerHTML = "";
  operation.innerHTML = "Ready?";

  score.innerHTML = "Start!";
  score.classList.add("start");

  timer.innerHTML = "Timer";
  timer.classList.remove("ten", "thirty", "sixty");

  clearInterval(gameTimer);
}

number.forEach((num) => {
  num.addEventListener("click", () => {
    answerField.innerHTML += num.innerHTML;
    console.log(answerField.innerHTML);
  });
});

enter.addEventListener("click", () => {
  if (score.innerHTML !== "Start!") {
    checkAnswer();
  }
});

escapeButton.addEventListener("click", () => {
  answerField.innerHTML = answerField.innerHTML.slice(0, -1);
  console.log(answerField.innerHTML);
});

reset.addEventListener("click", resetGame);

score.addEventListener("click", () => {
  if (score.innerHTML === "Start!") {
    score.innerHTML = 0;
    answerField.innerHTML = "";
    score.classList.remove("start");
    timer.classList.add("sixty");
    popup.classList.remove("show");

    newEquation();

    timer.innerHTML = timerLimit;

    gameTimer = setInterval(() => {
      timer.innerHTML--;

      switch (true) {
        case Number(timer.innerHTML) === 0:
          console.log("score:", score.innerHTML);
          console.log("count correct:", countCorrect);

          smsMessage.href = `sms:?&body=I just scored ${score.innerHTML} in this awesome math game! What's your high score? https://www.justmathgames.com`;
          emailMessage.href = `mailto:?subject=Just Math Games!&body=I just scored ${score.innerHTML} in this awesome math game! What's your high score? https://www.justmathgames.com`;
          twitterMessage.href = `https://twitter.com/intent/tweet?text=I%20just%20scored%20${score.innerHTML}%20in%20this%20awesome%20math%20game!%20What%20is%20your%20high%20score%3F%20https://www.justmathgames.com`;

          // gameCompletePopup();
          popupScore.innerHTML = score.innerHTML;
          popupCorrect.innerHTML = countCorrect;
          popup.classList.add("show");

          resetGame();
          break;
        case Number(timer.innerHTML) < 10:
          timer.classList.add("ten");
          break;
        case Number(timer.innerHTML) < 30:
          timer.classList.add("thirty");
          break;
        case Number(timer.innerHTML) <= 60:
          timer.classList.add("sixty");
          break;
      }
    }, 1000);
  }
});

popupClose.addEventListener("click", () => {
  popup.classList.remove("show");
});

operation.innerHTML = "Ready?";
score.innerHTML = "Start!";
score.classList.add("start");
