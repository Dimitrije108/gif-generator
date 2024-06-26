// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';

const fetchButton = document.querySelector('.fetch-button');
const img = document.querySelector('img');
const errorMsg = document.querySelector('.error-msg');

const getData = () => {
  const inputVal = document.querySelector('#search-gif').value;
  let encoded = encodeURI(inputVal);
  return encoded;
};

const handleResponse = (response) => {
  img.src = response.data.images.original.url;
};

const handleError = (error) => {
  if (getData() === '') {
    errorMsg.textContent = "You've searched nothing";
    img.src =
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFhdnc2Zmdzems0a2RnNnRpYjFhdnQwbmxkdTY4cHk5dWk4b2pnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f4DGnGf6xwFonJUI0D/giphy.gif';
  } else {
    errorMsg.textContent = error;
    img.src =
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGl1NzFmb2Z5MWl2MzF6NDAzdDdmaHR1ZjRwcndubWRoZHNpenRoNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vKz8r5aTUFFJu/giphy.gif';
  }
};

const getGif = () => {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=tc9YKXRZLVTOZ2yw9L0nDU9zCpWXdHRi&s=${getData()}`,
    { mode: 'cors' }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.length === 0) {
        throw new Error('GIF Not Found');
      }
      handleResponse(response);
    })
    .catch((error) => {
      handleError(error);
    });
};

const clearError = () => {
  errorMsg.textContent = '';
};

fetchButton.addEventListener('click', () => {
  clearError();
  getGif();
});
