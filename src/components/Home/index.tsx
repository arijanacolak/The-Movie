import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchGridShows from "../../api/fetchGridShows";
import fetchGridMovies from "../../api/fetchGridMovies";
import { debounce } from "lodash";
import { useSearchTermStore } from "../../store/searchTermStore";
import { fetchFilteredResult } from "../../api/fetchFilteredResult";
import Card from "../Card";
import Loader from "../Loader";
import "./index.css";

const DEBOUNCE_DELAY = 1000;
const MIN_SEARCH_LENGTH = 3;

const Home = () => {
  const { type } = useParams();
  const [selectedTab, setSelectedTab] = useState(type || "shows");
  const [gridItems, setGridItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTerm = useSearchTermStore((state) => state.searchTerm);
  const setSearchTerm = useSearchTermStore((state) => state.setSearchTerm);

  const navigate = useNavigate();

  const fetchData = async (tab: string) => {
    try {
      let items;
      if (tab === "movies") {
        items = await fetchGridMovies();
      } else {
        items = await fetchGridShows();
      }
      setGridItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTabChange = async (tab: string) => {
    if (selectedTab === tab) {
      return;
    }
    setSelectedTab(tab);
    navigate(`/${tab}`);
    setSearchResults([]);
  };

  useEffect(() => {
    const triggerSearch = async (term: string, selectedTab: string) => {
      if (term.length >= MIN_SEARCH_LENGTH) {
        setIsLoading(true);
        await fetchFilteredResult(term, selectedTab, setSearchResults);
        setIsLoading(false);
      } else {
        fetchData(selectedTab);
      }
    };

    triggerSearch(searchTerm, selectedTab);
  }, [selectedTab, searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedHandleChange(term);
  };

  useEffect(() => {
    const triggerSearch = async (term: string, selectedTab: string) => {
      if (term.length >= MIN_SEARCH_LENGTH) {
        setIsLoading(true);
        await fetchFilteredResult(term, selectedTab, setSearchResults);
        setIsLoading(false);
      } else {
        fetchData(selectedTab);
      }
    };

    triggerSearch(searchTerm, selectedTab);
  }, []);

  const debouncedHandleChange = debounce((term: string) => {
    if (term.length >= MIN_SEARCH_LENGTH) {
      setIsLoading(true);
      fetchFilteredResult(term, selectedTab, setSearchResults);
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  }, DEBOUNCE_DELAY);

  const handleCardClick = async (movieId: string) => {
    try {
      navigate(`/${selectedTab}/${movieId}`);
    } catch (error) {
      console.error("Error navigating to movie details:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="tab-buttons">
        <button
          type="button"
          onClick={() => handleTabChange("movies")}
          className={selectedTab === "movies" ? "active" : ""}
        >
          Movies
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("shows")}
          className={selectedTab === "shows" ? "active" : ""}
        >
          TV Shows
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="grid-container">
        {isLoading && <Loader />}
        {!isLoading &&
          (searchResults.length > 0
            ? searchResults.map((item) => (
                <Card
                  item={item}
                  selectedTab={selectedTab}
                  handleCardClick={handleCardClick}
                />
              ))
            : gridItems.map((item) => (
                <Card
                  item={item}
                  selectedTab={selectedTab}
                  handleCardClick={handleCardClick}
                />
              )))}
      </div>
    </div>
  );
};
export default Home;
