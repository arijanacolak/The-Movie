import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const API_KEY = "API_KEY";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("shows");
  const [gridItems, setGridItems] = useState([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };
      try {
        const response = await axios.get(url, options);
        setGridItems(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shows = [
    { id: 1, name: "Show 1" },
    { id: 2, name: "Show 2" },
    { id: 3, name: "Show 3" },
    { id: 4, name: "Show 4" },
    { id: 5, name: "Show 5" },
    { id: 6, name: "Show 6" },
    { id: 7, name: "Show 7" },
    { id: 8, name: "Show 8" },
    { id: 9, name: "Show 9" },
    { id: 10, name: "Show 10" },
  ];

  const renderCard = (item: any) => {
    return (
      <div key={item.id} className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.name}
        />
        <div className="card-content">
          <h3>{item.name}</h3>
        </div>
      </div>
    );
  };

  const filteredItems =
    selectedTab === "movies"
      ? gridItems.filter((item: any) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : shows.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="home-container">
      <div className="tab-buttons">
        <button
          onClick={() => handleTabChange("movies")}
          className={selectedTab === "movies" ? "active" : ""}
        >
          Movies
        </button>
        <button
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
        {filteredItems.map((item) => renderCard(item))}
      </div>
    </div>
  );
};
export default Home;
