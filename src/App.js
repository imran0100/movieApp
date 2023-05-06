import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./component/SignIn";
import { fetchMovies, deleteMovie, editMovieName } from "./Redux/MoviesSlice";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditInput, setShowEditInput] = useState(false);
  const [editInputValue, setEditInputValue] = useState(""); // added state for input value
  const [sortOrder, setSortOrder] = useState("asc");

  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.movies);
  const { userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error fetching data: {error}</p>;
  }

  const movies = [...data];
  console.log(movies);
  movies.sort((a, b) => {
    const titleA = a.original_title || a.name;
    const titleB = b.original_title || b.name;
    return sortOrder === "asc"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  const handleEditMovieName = (movieId) => {
    dispatch(editMovieName({ id: movieId, name: editInputValue }));
    setShowEditInput(false);
  };

  return (
    <div className="container">
      <SignIn />
      <button
        className="sort-button"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Sort by title {sortOrder === "asc" ? "↑" : "↓"}
      </button>
      <input
        className="search-input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title or overview..."
      />
      <div className="movie-list">
        {movies
          .filter(
            (movie) =>
              movie.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              movie.overview
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              movie.original_title
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map((movie) => (
            <div className="movie" key={movie.id}>
              <h3 className="movie-title">
                {movie.name || movie.original_title}
              </h3>
              <div>
                {" "}
                <img
                  alt="Movie Poster"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                />
              </div>
              <p className="movie-overview">{movie.overview}</p>
              {userEmail ? (
                <>
                  <button
                    className="delete-button"
                    onClick={() => dispatch(deleteMovie(movie.id))}
                  >
                    delete
                  </button>
                  {!showEditInput && (
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditInputValue(movie.name || movie.original_title); // set the initial value of the input to the current movie name
                        setShowEditInput(true);
                      }}
                    >
                      Edit Movie Name
                    </button>
                  )}
                  {showEditInput && (
                    <>
                      <input
                        className="edit-input"
                        value={editInputValue}
                        onChange={(e) => setEditInputValue(e.target.value)}
                      ></input>
                      <button
                        className="save-button"
                        onClick={() => handleEditMovieName(movie.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => {
                          setShowEditInput(false);
                          setEditInputValue(movie.name || movie.original_title);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};
export default App;
