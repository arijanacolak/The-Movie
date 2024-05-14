import React from "react";
import "./index.css";

interface CardProps {
  item: any;
  selectedTab: string;
  handleCardClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ item, selectedTab, handleCardClick }) => {
  const title = selectedTab === "movies" ? item.title : item.name;
  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "/no-image.png";

  return (
    <div
      key={item.id}
      className="card"
      onClick={() => handleCardClick(item.id)}
    >
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Card;
