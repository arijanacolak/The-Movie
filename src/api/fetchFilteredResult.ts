import axios from "axios";

export const fetchFilteredResult = async (
  term: string,
  selectedTab: string,
  setSearchResults: Function
) => {
  const type = selectedTab === "movies" ? "movie" : "tv";
  try {
    const url = `https://api.themoviedb.org/3/search/${type}?query=${term}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
    setSearchResults(response.data.results);
  } catch (error) {
    console.error("Error searching:", error);
  }
};
