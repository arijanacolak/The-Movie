import { useState } from "react";
import "./index.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("shows");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  // Dummy data for grid view
  const movies = [
    { id: 1, name: "Movie 1" },
    { id: 2, name: "Movie 2" },
    { id: 3, name: "Movie 3" },
    { id: 4, name: "Movie 4" },
    { id: 5, name: "Movie 5" },
    { id: 6, name: "Movie 6" },
    { id: 7, name: "Movie 7" },
    { id: 8, name: "Movie 8" },
    { id: 9, name: "Movie 9" },
    { id: 10, name: "Movie 10" },
  ];

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

  const filteredItems =
    selectedTab === "movies"
      ? movies.filter((item) =>
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
        {filteredItems.map((item) => (
          <div key={item.id} className="grid-item">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
