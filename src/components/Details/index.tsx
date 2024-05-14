import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchMovieDetails from "../../api/fetchMovieDetails";
import "./index.css";
import fetchShowDetails from "../../api/fetchShowDetails";
import { useStore } from "../../store/store";
import Loader from "../Loader";

const Details = () => {
  const { id, type } = useParams();
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setItem = useStore((state) => state.setItem);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        return;
      }

      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, type, setItem]);

  const handleGoBack = () => {
    navigate(`/${type}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  const imageUrl = details?.poster_path
    ? `https://image.tmdb.org/t/p/w500${details?.poster_path}`
    : "/no-image.png";

  return (
    <>
      <div className="back-button" onClick={handleGoBack}>
        <img src="/back-arrow.svg" alt=""></img>
        <span className="back-text">Back</span>
      </div>
      <div className="movie-details-container">
        <img src={imageUrl} alt={details?.title} className="cover-image" />
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
