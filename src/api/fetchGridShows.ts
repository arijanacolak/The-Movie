import axios from "axios";

const fetchGridShows = async () => {
  const url =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    const results = response.data.results.slice(0, 10);
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchGridShows;
