const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const colorChanger = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      bodyColorChanger();
    }, 1000);
    this.startBtn.disabled = true;
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    startBtn.disabled = false;
  },
};
startBtn.addEventListener('click', () => {
  colorChanger.start();
});
stopBtn.addEventListener('click', () => {
  colorChanger.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bodyColorChanger() {
  body.style.backgroundColor = getRandomHexColor();
}
