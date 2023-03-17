import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSummitForm);

function onSummitForm(event) {
  event.preventDefault();

  const amount = parseInt(form.amount.value);
  const step = parseInt(form.step.value);
  const delay = parseInt(form.delay.value);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;

    createPromise(position, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
