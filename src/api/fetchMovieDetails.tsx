import axios from "axios";

const API_KEY = "API_KEY";

const fetchMovieDetails = async (movieId: string) => {
  const url = `https://api.themoviedb.org/3/tv/${movieId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchMovieDetails;
