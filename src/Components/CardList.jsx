import React from "react";
import MovieCard from "./Card";

const CardList = ({ data }) => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap" }}
      className="prime-container"
    >
      {data.map((data) => (
        <MovieCard key={data.id} data={data} />
      ))}
    </div>
  );
};

export default CardList;
