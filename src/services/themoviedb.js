const URL = 'https://api.themoviedb.org/3/';
const language = '?language=en-US';
const errorText = 'Щось пішло не так :-( спробуйте ще раз!';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTg2YTIxZDVmYWQ2YjQ4NDQyMjgwNTVhMzRhNzFhNCIsInN1YiI6IjY1Yzc1YjdjOThmMWYxMDE2MmQ2OWEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L_8rlg8ILsxFKeMljqJDpIOjbcsP-UICwiRRB2lFeHY',
  },
};

export const getTrendingMovies = () => {
  return fetch(`${URL}trending/movie/day${language}`, options).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(errorText);
      }
    }
  );
};
export const getMovieFromId = id => {
  return fetch(`${URL}movie/${id}${language}`, options).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(errorText);
    }
  });
};
export const getCastMovieFromId = id => {
  return fetch(`${URL}movie/${id}/credits${language}`, options).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(errorText);
      }
    }
  );
};
export const getReviewsMovieFromId = id => {
  return fetch(`${URL}movie/${id}/reviews${language}`, options).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(errorText);
      }
    }
  );
};
export const getMovieFromQuery = query => {
  return fetch(
    `${URL}search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(errorText);
    }
  });
};
