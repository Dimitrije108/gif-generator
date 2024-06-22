// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';

const img = document.querySelector('img');
const fetchButton = document.querySelector('.fetch-button');

const getGif = () => {
  fetch(
    'https://api.giphy.com/v1/gifs/translate?api_key=tc9YKXRZLVTOZ2yw9L0nDU9zCpWXdHRi&s=star%20wars',
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    });
};

getGif();

fetchButton.addEventListener('click', () => {
  getGif();
});
