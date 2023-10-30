import axios from 'axios';

const refreshAllFilms = () => {
  axios.get('/api/films')
  .then(results => {
    // data from API will be in results.data
    let container = document.getElementById('all-films');
    container.innerHTML = '';
    let allFilms = results.data;

    allFilms.map(film => {
      film = 
        `<li>
          <h2>${film.title}</h2>
          <h3>Summary:</h3>
          <p>${film.summary}</p>
        </li>`;
      container.innerHTML += film;
    });

    // allFilms.forEach(film => {
    //   let filmItem = document.createElement('li');
    //   let h2 = document.createElement('h2');
    //   h2.textContent = film.title;
    //   filmItem.appendChild(h2);
    //   let h3 = document.createElement('h3');
    //   filmItem.appendChild(h3);
    //   h3.textContent = 'Summary: ';
    //   let summary = document.createElement('p');
    //   summary.textContent = film.summary;
    //   filmItem.appendChild(summary);

    //   container.appendChild(filmItem);
    // });
  })
  .catch(error=>console.log(error));
}

const refreshFeaturedFilm = ()=>{
  axios.get('/api/films')
  .then(results => {
    addFeaturedFilm(results.data);
    setInterval(addFeaturedFilm, 3000, results.data);//!
  })
}

const addFeaturedFilm = films => {
  let container = document.getElementById('featured-film');
  container.innerHTML = '';
  const filmChosen = films[chooseRandomFilm(films)];
  let title = document.createElement('h2');
  title.textContent = `Featured Film: ${filmChosen.title}`;
  container.appendChild(title);
  let summary = document.createElement('p');
  summary.textContent = filmChosen.summary;
  container.appendChild(summary);
}

const chooseRandomFilm = films => {
  const numOfFilms = films.length;
  const result = Math.floor(Math.random() * numOfFilms);
  return result;
}

export {refreshAllFilms, refreshFeaturedFilm};//syntax?