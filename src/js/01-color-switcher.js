function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let intervalId = null;

btnStart.addEventListener('click', onClickBtnStart);

btnStop.addEventListener('click', onClickBtnStop);
btnStop.disabled = true;

function onClickBtnStart() {
  intervalId = setInterval(bodyColorChange, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function onClickBtnStop() {
  clearInterval(intervalId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}

function bodyColorChange() {
  let color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}
