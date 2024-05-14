import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchMovieDetails from "../../api/fetchMovieDetails";
import "./index.css";

const MovieDetails = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        console.log(id);
        return;
      }

      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="back-button" onClick={handleGoBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="back-icon"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="back-text">Back</span>
      </div>
      <div className="movie-details-container">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title}
          className="cover-image"
        />
        <div className="movie-info">
          <h2>{movie?.title}</h2>
          <p>{movie?.overview}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
