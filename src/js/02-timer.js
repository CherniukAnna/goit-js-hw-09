import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  backEl: document.querySelector('p'),
  bodyEl: document.querySelector('body'),
  timerEl: document.querySelector('.timer'),
  textEl: document.querySelectorAll('.field'),
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      refs.start.disabled = true;
      Notiflix.Notify.failure(
        'Please choose a date in the future! Do not look back..'
      );
      return;
    }
    if (selectedDates[0] > new Date()) {
      refs.start.disabled = false;
    }

    refs.start.addEventListener('click', () => {
      intervalId = setInterval(() => {
        const differenceInTime = selectedDates[0] - new Date();

        if (differenceInTime < 1000) {
          clearInterval(intervalId);
        }
        const result = convertMs(differenceInTime);
        viewOfTimer(result);
      }, 1000);
    });
  },
};
refs.start.setAttribute('disabled', '');
refs.backEl.style = `color:#D2B48C`;
refs.bodyEl.style = `background-color: #FFEFD5`;
refs.input.style = `color: #BC8F8F;border:0px;box-shadow: inset 0 3px 4px #ffffff, inset 0 3px 4px #c4b59d;width: 188px;
  height: 30px;`;
refs.start.style = `border:1px;border-radius: 50%;color: #BC8F8F;box-shadow: inset 0 3px 4px #ffffff, inset 0 -3px 4px #c4b59d;width: 68px;
  height: 38px;`;
refs.timerEl.style = `display: flex;  justify-content: center; gap: 30px; margin-top: 50px;text-shadow: 1px 2px 3px #000`;
refs.textEl.forEach(
  elem =>
    (elem.style = `display: flex;flex-direction: column; align-items: center; font-weight: 500; font-size: 32px; color: #BC8F8F `)
);

flatpickr('#datetime-picker', options);

function viewOfTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
