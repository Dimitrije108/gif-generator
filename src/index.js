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

const displayGif = (response) => {
  img.src = response.data.images.original.url;
};

const handleError = (error) => {
  errorMsg.textContent = error;
  img.src =
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGl1NzFmb2Z5MWl2MzF6NDAzdDdmaHR1ZjRwcndubWRoZHNpenRoNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vKz8r5aTUFFJu/giphy.gif';
};

const getGif = async () => {
  try {
    // Retrieve data
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=tc9YKXRZLVTOZ2yw9L0nDU9zCpWXdHRi&s=${getData()}`,
      { mode: 'cors' }
    );
    // Check response
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    // Extract data
    const gifData = await response.json();
    // Check for no gif found error
    if (gifData.data.length === 0) {
      throw new Error('GIF Not Found');
    }
    // Display data
    displayGif(gifData);
  } catch (error) {
    handleError(error);
  }
};

const clearError = () => {
  errorMsg.textContent = '';
};

const handleFetchRequest = () => {
  const inputVal = document.querySelector('#search-gif').value;
  if (inputVal === '') {
    errorMsg.textContent = 'Enjoy your meal.';
    img.src =
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFhdnc2Zmdzems0a2RnNnRpYjFhdnQwbmxkdTY4cHk5dWk4b2pnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f4DGnGf6xwFonJUI0D/giphy.gif';
  } else {
    clearError();
    getGif();
  }
};

fetchButton.addEventListener('click', () => {
  handleFetchRequest();
});
