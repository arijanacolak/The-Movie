import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchMovieDetails from "../../api/fetchMovieDetails";
import "./index.css";
import fetchShowDetails from "../../api/fetchShowDetails";
import { useStore } from "../../store/store";

const Details = () => {
  let { id } = useParams();
  let { type } = useParams();
  const [details, setDetails] = useState<any>(null);
  const setItem = useStore((state) => state.setItem);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        console.log(id);
        return;
      }

      try {
        let fetchedDetails;
        if (type === "movies") {
          fetchedDetails = await fetchMovieDetails(id);
        } else if (type === "shows") {
          fetchedDetails = await fetchShowDetails(id);
        }
        setDetails(fetchedDetails);
        setItem(fetchedDetails);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchMovie();
  }, [id, type, setItem]);

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
          src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
          alt={details?.title}
          className="cover-image"
        />
        <div className="movie-info">
          {type === "movies" ? (
            <h2>{details?.title}</h2>
          ) : (
            <h2>{details?.name}</h2>
          )}
          <p>{details?.overview}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
