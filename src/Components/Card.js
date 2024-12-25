import React from "react";
import { Rate } from "antd";
import notfound from "../assets/notfound.jpg"; // Import the fallback image

const Card = ({ data }) => {
  return (
    <>
      <div className="container">
        <h3 className="removerUnderline">{data.name}</h3>
        <img
          src={data.image}
          alt="Product"
          className="image"
          onError={(e) => {
            e.target.src = notfound; // Fallback image
          }}
        />
        <h2>Price: {data.price}</h2>
        <p>
          Rating: <Rate disabled defaultValue={data.rating.average} />
        </p>
        <p>Total Reviews: {data.rating.reviews}</p>
      </div>
    </>
  );
};

export default Card;
