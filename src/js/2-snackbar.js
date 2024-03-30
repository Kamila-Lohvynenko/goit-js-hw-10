import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
const inputStates = form.elements.state;

form.addEventListener('submit', handleSubmit);

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const delay = Number(inputDelay.value);
  const state = inputStates.value;

  form.reset();

  createPromise(delay, state)
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59a10d',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    });
}
