import axios from "axios";

const fetchMovieDetails = async (movieId: string) => {
  console.log("Movie id: ", movieId);
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
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
