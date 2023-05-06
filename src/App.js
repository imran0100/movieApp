import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./component/SignIn";
import { fetchMovies, deleteMovie } from "./Redux/MoviesSlice";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditInput, setShowEditInput] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // default sort order is ascending

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

  // create a new array and copy the data from the Redux store array into it
  const movies = [...data];

  // sort the new array based on sort order
  movies.sort((a, b) => {
    const titleA = a.original_title || a.name;
    const titleB = b.original_title || b.name;
    return sortOrder === "asc"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  return (
    <div>
      <SignIn />
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Sort by title {sortOrder === "asc" ? "↑" : "↓"}
      </button>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title or overview..."
      />
      {movies
        .filter(
          (movie) =>
            movie.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.overview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.original_title
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
        .map((movie) => (
          <div key={movie.id}>
            <p>{movie.name || movie.original_title}</p>

            {userEmail ? (
              <>
                <button onClick={() => dispatch(deleteMovie(movie.id))}>
                  delete
                </button>
                <button
                  onClick={() => {
                    setShowEditInput(true);
                  }}
                >
                  Edit Movie Name
                </button>
                {showEditInput && (
                  <>
                    {" "}
                    <input value={movie.name}></input>
                    <button>Save</button>
                  </>
                )}
              </>
            ) : null}
            <p>{movie.overview}</p>
            {/* <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          /> */}
          </div>
        ))}
    </div>
  );
};

export default App;
