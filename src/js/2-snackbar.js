import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
const inputState = form.elements.state;

inputDelay.addEventListener('input', () =>
  localStorage.setItem('delay', inputDelay.value)
);
inputState.forEach(radio => {
  radio.addEventListener('input', () => {
    localStorage.setItem('state', inputState.value);
  });
});

form.addEventListener('submit', handleSubmit);

function createPromise() {
  const delay = localStorage.getItem('delay');
  if (localStorage.getItem('state') === `fulfilled`) {
    return Promise.resolve(delay);
  } else {
    return Promise.reject(delay);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  form.reset();
  createPromise()
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      setTimeout(() => {
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay} ms`,
          backgroundColor: '#59a10d',
          messageColor: '#fff',
          position: `topRight`,
        });
      }, delay);
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      setTimeout(() => {
        iziToast.show({
          message: `❌ Rejected promise in ${delay} ms`,
          backgroundColor: '#ef4040',
          messageColor: '#fff',
          position: `topRight`,
        });
      }, delay);
    });
}
