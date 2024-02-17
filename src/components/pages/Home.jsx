import { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/themoviedb';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendingMovies()
      .then(data => {
        const movies = data.results.map(({ id, title }) => ({
          id,
          title,
        }));
        setMovies(movies);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies.map(({ id, title }, index) => {
          const idLink = `/movies/${id}`;
          return (
            <li key={id}>
              <Link to={idLink} state={{ from: location }}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Home;
