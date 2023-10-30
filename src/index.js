import axios from 'axios';
import './style.css';

import {refreshAllFilms, refreshFeaturedFilm} from "./rendering.js";

refreshFeaturedFilm();
refreshAllFilms();

const formSubmit = event => {
  event.preventDefault();

  let newFilm = {
    title: document.getElementById('form-title').value,
    summary: document.getElementById('form-summary').value
  };

  axios.post('/api/films', newFilm)
  .then(() => refreshAllFilms())
  .catch(error => console.log(error));
}

let form = document.getElementById('form');
form.addEventListener('submit', formSubmit);