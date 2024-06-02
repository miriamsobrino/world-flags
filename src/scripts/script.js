import { flags } from "../constants/flags.js";
document.addEventListener("DOMContentLoaded", function () {
let remainingFlags = [...flags];
let score = 0;
let scoreElement = document.getElementById("score");
let adviceText = document.getElementById("advice");
const modalCointainer = document.getElementById("modalContainer");
const flagImage = document.getElementById("flagImage");
const optionsContainer = document.getElementById("options");
const btnRetry = document.getElementById("retryBtn");

function selectRemainingFlag() {
  const randomIndex = Math.floor(Math.random() * remainingFlags.length);
  return remainingFlags[randomIndex];
}

function selectRandomFlag() {
  const randomIndex = Math.floor(Math.random() * flags.length);
  return flags[randomIndex];
}

function removeFlag(flag) {
  const index = remainingFlags.indexOf(flag);
  if (index > -1) {
    remainingFlags.splice(index, 1);
  }
}

function openModal() {
  btnRetry.style.display = "none";
  scoreElement.innerText = `Score: ${score}/${flags.length}`;
  flagImage.classList.add("img");
  adviceText.style.display = "none";
  optionsContainer.innerHTML = "";
  const flag = selectRemainingFlag();
  if (!flag) {
    scoreElement.innerHTML = `Quiz completed!<br/> Your score is: ${score}/${flags.length}`;
    scoreElement.style.marginTop = "16px";
    adviceText.style.display = "flex";
    flagImage.style.display = "none";
    btnRetry.style.display = "flex";
    optionsContainer.style.display = "none";
    if (score < 50) {
      adviceText.innerText = "You should study harder...";
    } else if (score > 50 || score == 100) {
      adviceText.innerText = "Not bad...but you can do better";
    } else if (score > 100 && score < 190) {
      adviceText.innerText =
        "You're very good at this, you're not far from excellence!";
    } else {
      adviceText.innerText = "Excellent! You're the best at this!";
    }
    btnRetry.addEventListener("click", retryQuiz);

  }
  removeFlag(flag);
  console.log(remainingFlags);
  modalCointainer.style.display = "flex";
  flagImage.setAttribute("src", flag.image);
  const options = [];
  options.push(flag.name);
  while (options.length < 3) {
    const randomFlag = selectRandomFlag();
    if (!options.includes(randomFlag.name)) {
      options.push(randomFlag.name);
    }
  }

  options.sort(function () {
    return Math.random() - 0.5;
  });

  options.forEach(function (option) {
    const button = document.createElement("button");
    button.textContent = option;
    button.style.backgroundColor = "#d9d9e6";
    button.style.border = "none";
    button.style.padding = "10px";
    button.style.width = "300px";
    button.style.cursor = "pointer";
    button.style.fontFamily = "Poppins";
    button.style.fontSize = "1em";

    button.onclick = function () {
      const selectedOption = button.textContent;
      const correctAnswer = flag.name;
      optionsContainer.querySelectorAll("button").forEach(function (btn) {
        btn.disabled = true;
      });
      if (selectedOption == correctAnswer) {
        console.log("Has acertado");
        score += 1;

        button.style.backgroundColor = "green";
        button.style.color = "white";
      } else {
        button.style.backgroundColor = "red";
        button.style.color = "white";
        button.style.animation = "horizontal-shaking 0.3s";
        console.log("Has fallado");
      }
      setTimeout(openModal, 500);
    };
    optionsContainer.append(button);
  });
}
function retryQuiz() {
  score = 0;
  remainingFlags = [...flags]; 
  flagImage.style.display = "flex";
  optionsContainer.style.display="flex";
  scoreElement.innerText = `Score: ${score}/${flags.length}`;

  openModal();
}

document.getElementById("openModal").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modalContainer").style.display = "none";
  score = 0;
  remainingFlags = [...flags];
});
});