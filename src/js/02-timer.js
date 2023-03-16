import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const inputPicker = document.querySelector('#datetime-picker');
const timerDayValue = document.querySelector('span[data-days]');
const timerHoursValue = document.querySelector('span[data-hours]');
const timerMinutesValue = document.querySelector('span[data-minutes]');
const timerSecondsValue = document.querySelector('span[data-seconds]');

let timerId = null;
btnStart.disabled = true;

flatpickr(inputPicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      Notiflix.Notify.success('Let`s go?');
    }
  },
});

btnStart.addEventListener('click', onBtnSttartClick);

function onBtnSttartClick() {
  btnStart.disabled = true;

  timerId = setInterval(() => {
    const choosenDate = new Date(inputPicker.value);
    const timerToFinish = choosenDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timerToFinish);

    timerDayValue.textContent = days;
    timerHoursValue.textContent = hours;
    timerMinutesValue.textContent = minutes;
    timerSecondsValue.textContent = seconds;

    if (timerToFinish < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
