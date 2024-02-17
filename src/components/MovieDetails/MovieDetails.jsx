import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { getMovieFromId } from 'services/themoviedb';
import { FaLongArrowAltLeft } from 'react-icons/fa';

const MovieDetails = () => {
  const [movieDetails, setmovieDetails] = useState({});
  const [error, setError] = useState('');
  const [finishFetch, setFinishFetch] = useState(false);

  const { movieId } = useParams();

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    setFinishFetch(false);
    getMovieFromId(movieId)
      .then(
        ({
          poster_path,
          title,
          release_date,
          vote_average,
          overview,
          genres,
        }) => {
          const movie = {
            poster: poster_path,
            title,
            date: release_date.slice(0, 4),
            score: Math.round(vote_average * 100) / 10,
            overview,
            genres: `${genres.map(item => item.name).join(', ')}`,
          };
          setmovieDetails(movie);
          setFinishFetch(true);
        }
      )
      .catch(error => setError(error.message));
  }, [movieId]);

  const { title, poster, date, score, overview, genres } = movieDetails;
  const posterLink = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${poster}`;
  return (
    <>
      {!error && finishFetch ? (
        <>
          <Link to={backLinkLocationRef.current} className="link-back">
            {' '}
            <FaLongArrowAltLeft /> Go Back
          </Link>
          <div className="info">
            <img src={posterLink} alt={title} />
            <div>
              <h1>
                {title} ({date})
              </h1>
              <p>User score: {score}%</p>
              <dl>
                <dt>Overview</dt>
                <dd>{overview}</dd>
              </dl>
              <dl>
                <dt>Genres</dt>
                <dd>{genres}</dd>
              </dl>
            </div>
          </div>
          <div className="additional">
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Review</Link>
              </li>
            </ul>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
};
export default MovieDetails;
