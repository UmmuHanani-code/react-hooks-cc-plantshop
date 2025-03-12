import React, { useState } from "react";

function PlantCard({ name, image, price, inStock }) {
  const [soldOut, setSoldOut] = useState(false);

  const handleSoldOutClick = () => {
    setSoldOut(!soldOut);
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      <button onClick={handleSoldOutClick}>
        {soldOut ? "Sold Out" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;

