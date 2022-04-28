const ROWS = 6;
const name_input = document.getElementById("name_input");
const play_button = document.getElementById("play_button");
const finish_button = document.getElementById("finish_button");
const login_container = document.querySelector(".login_container");
const result_container = document.querySelector(".result_container");
const congratulation = document.getElementById("congratulation");
const score = document.getElementById("points");
const game = document.querySelector(".game");
const game_container = document.querySelector(".game_container");
const question = document.getElementById("question");
let points = 0;

createColumns();
getData();

play_button.addEventListener("click", () => {
  login_container.classList.add("hide");
  game.classList.remove("hide");
});

function getData() {
  try {
    const index = Math.floor(Math.random() * data.length);
    setData(data[index]);
    calculateWords(data[index]);
  } catch (e) {
    console.log(e);
  }
}

function createColumns() {
  for (let i = 0; i < ROWS; i++) {
    const game_column = document.createElement("div");
    game_column.classList.add("game_column");
    game_container.appendChild(game_column);
  }
}

function setData(data) {
  question.innerText = data.question[0].toUpperCase() + data.question.slice(1);
  const game_columns = document.querySelectorAll(".game_column");
  for (let i = 0; i < data.all_words.length; i++) {
    const span_element = document.createElement("span");
    span_element.innerText = data.all_words[i];
    span_element.addEventListener("click", (e) => {
      if (finish_button.innerText === "check answers") {
        e.target.classList.toggle("chosen");
      }
    });
    game_columns[Math.floor(Math.random() * ROWS)].appendChild(span_element);
  }
}

function calculateWords(data) {
  finish_button.addEventListener("click", () => {
    if (finish_button.innerText === "check answers") {
      const chosen_words = document.querySelectorAll(
        ".game .game_container .game_column .chosen"
      );
      let good_answers = 0,
        wrong_answers = 0;
      chosen_words.forEach((word) => {
        if (data.good_words.find((element) => element === word.innerText)) {
          good_answers++;
          word.innerHTML = `<span class = "good_answer"><span class = "good">Good<br></span>${word.innerText}</span>`;
        } else {
          wrong_answers++;
          word.innerHTML = `<span class = "wrong_answer"><span class = "wrong">Bad<br></span>${word.innerText}</span>`;
        }
      });
      points =
        good_answers * 2 -
        (wrong_answers +
          (good_answers === data.good_words.length
            ? 0
            : data.good_words.length - good_answers));

      finish_button.innerText = "finish game";
    } else if (finish_button.innerText === "finish game") {
      congratulation.innerText += ` ${name_input.value}!`;
      score.innerText = `${points} points`;
      game.classList.add("hide");
      result_container.classList.remove("hide");
    }
  });
}
