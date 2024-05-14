import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import fetchGridShows from "../../api/fetchGridShows";
import fetchGridMovies from "../../api/fetchGridMovies";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("shows");
  const [gridItems, setGridItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let items;
        if (selectedTab === "movies") {
          items = await fetchGridMovies();
        } else {
          items = await fetchGridShows();
        }
        setGridItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedTab]);

  useEffect(() => {
    console.log(gridItems[0]);
    const newItems = gridItems.filter((item: any) =>
      selectedTab === "movies"
        ? item.title?.toLowerCase().includes(searchTerm.toLowerCase())
        : item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(newItems);
  }, [gridItems, searchTerm]);

  const handleCardClick = async (movieId: string) => {
    try {
      navigate(`/${selectedTab}/${movieId}`);
    } catch (error) {
      console.error("Error navigating to movie details:", error);
    }
  };

  const renderCard = (item: any) => {
    const title = selectedTab === "movies" ? item.title : item.name;

    return (
      <div
        key={item.id}
        className="card"
        onClick={() => handleCardClick(item.id)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
        />
        <div className="card-content">
          <h3>{title}</h3>
        </div>
      </div>
    );
  };

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
