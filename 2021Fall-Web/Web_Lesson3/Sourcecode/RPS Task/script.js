let user_choice;
var player_score = 0,
  comp_score = 0;
let playBtn = document.getElementsByClassName("play-btn");
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissor = document.getElementById("sciccor");

// This function will be called on click of any game button
function findResult(id) {
  // Random selection will be taken by computer. Math.random*3 will generate a random number between 0 to 3.
  const choices = ["rock", "paper", "scissor"];
  comp_choice = choices[Math.floor(Math.random() * 3)];
  user_choice = id;

  // Output will be hidden initially and displayed once user clicks any button
  document.getElementById("output").style.display = "block";

  if (user_choice === comp_choice) {
    output("Tied", user_choice, comp_choice, 0);
  } else if (user_choice === "rock") {
    if (comp_choice === "scissor") {
      output("You Win", user_choice, comp_choice, 1);
    } else {
      output("You Lose", user_choice, comp_choice, 2);
    }
  } else if (user_choice === "paper") {
    if (comp_choice === "rock") {
      output("You Win", user_choice, comp_choice), 1;
    } else {
      output("You Lose", user_choice, comp_choice, 2);
    }
  } else if (user_choice === "scissor") {
    if (comp_choice === "paper") {
      output("You Win", user_choice, comp_choice, 1);
    } else {
      output("You Lose", user_choice, comp_choice, 2);
    }
  }
}

function output(result, userchoice, compchoice, color) {
  // selected item is displayed respectively to user and computer
  document.getElementById("playerSelection").innerHTML = userchoice;
  document.getElementById("ComputerSelection").innerHTML = compchoice;
  document.getElementById("result").innerHTML = result;
  switch (color) {
    case 0:
      document.getElementById("result").style.color = "black";
      break;
    case 1:
      this.player_score++;
      document.getElementById("result").style.color = "green";
      document.getElementById("playerScore").innerHTML = player_score;
      break;
    case 2:
      this.comp_score++;
      document.getElementById("result").style.color = "red";
      document.getElementById("CompScore").innerHTML = comp_score;
      break;
    default:
      document.getElementById("result").style.color = "black";
  }
}

for (let i = 0; i < playBtn.length; i++) {
  playBtn[i].addEventListener("click", function () {
    findResult(this.id);
  });
}

$(document).ready(function () {
  // Bounce button
  $(".play-btn").click(function (event) {
    // const element = document.querySelector(".play-btn");
    event.currentTarget.classList.add("bounce");
    setTimeout(function () {
      event.currentTarget.classList.remove("bounce");
    }, 1000);

    console.log(event.currentTarget.classList);
  });
});
