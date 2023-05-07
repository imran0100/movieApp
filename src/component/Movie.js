import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addComment } from "../Redux/commentSlice";
import axios from "axios";

export default function Movie({ movie, goBackToMovieList }) {
  const { commentData } = useSelector((state) => state.comments);
  const [inputComment, setInputComment] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);

  const dispatch = useDispatch();
  const { userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=85f1073d9949aa2ce5b5491a5be3334e&append_to_response=videos`
        );
        const videos = response.data.videos.results;
        const trailer = videos.find((video) => video.type === "Trailer");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  if (!trailerKey) {
    return null;
  }

  const handleComment = (movieId) => {
    dispatch(addComment({ movieId: inputComment }));
    setInputComment("");
  };

  return (
    <div>
      <button onClick={() => goBackToMovieList()}>Go back Movie list</button>
      <h1>{movie.name || movie.original_title}</h1>
      <div className="trailor-flex">
        <div>
          <img
            alt="Movie Poster"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          />
        </div>
        <p>{movie.overview}</p>
        <div className="trailer">
          <iframe
            title={`${movie.id}-trailer`}
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {userEmail && (
        <div>
          {commentData.map((comment) => (
            <p key={Math.random() * 456278985665588}>{comment.movieId}</p>
          ))}
          <input
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          ></input>
          <button onClick={() => handleComment(movie.id)}>Add Comment</button>
        </div>
      )}
    </div>
  );
}
