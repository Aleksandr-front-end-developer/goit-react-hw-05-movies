import { getCastMovieFromId } from 'services/themoviedb';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const [movieDetails, setmovieDetails] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    getCastMovieFromId(movieId)
      .then(({ cast }) => {
        setmovieDetails(cast);
      })
      .catch(error => console.log(error.message));
  }, [movieId]);

  return (
    <>
      <ul>
        {movieDetails.map(({ profile_path, original_name, character }) => {
          const poster = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${profile_path}`;
          return (
            <li key={nanoid()}>
              <img src={poster} alt="" />
              <p>{original_name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Cast;
