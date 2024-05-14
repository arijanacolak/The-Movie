import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const fetchVideo = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
};

export default fetchVideo;
