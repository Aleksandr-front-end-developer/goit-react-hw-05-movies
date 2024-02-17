import { useEffect, useState } from 'react';
import { getMovieFromQuery } from 'services/themoviedb';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    searchParams &&
      query &&
      getMovieFromQuery(query)
        .then(({ results }) => {
          setMovies(results);
        })
        .catch(error => {
          console.log(error.message);
        });
  }, [query, searchParams]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: e.target.children.query.value });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies.map(({ id, title }) => {
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
export default Movies;
