import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovieFromId } from 'services/themoviedb';

const Reviews = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [finishFetch, setFinishFetch] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    setFinishFetch(false);
    getReviewsMovieFromId(movieId)
      .then(({ results }) => {
        setMovieDetails(results);
        setFinishFetch(true);
      })
      .catch(error => console.log(error.message));
  }, [movieId]);
  return (
    <>
      <ul>
        {movieDetails.length
          ? movieDetails.map(({ author, content }) => {
              return (
                <li key={nanoid()}>
                  <h3>{author}</h3>
                  <p>{content}</p>
                </li>
              );
            })
          : finishFetch && <p>We don't have any reviews for this movie</p>}
        {}
      </ul>
    </>
  );
};
export default Reviews;
