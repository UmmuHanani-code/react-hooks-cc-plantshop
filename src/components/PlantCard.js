import React, { useState, useEffect } from "react";

function PlantCard({ id, name, image, price, inStock, updatePrice, deletePlant }) {
  const [soldOut, setSoldOut] = useState(inStock); 
  const [newPrice, setNewPrice] = useState(price);
  const [isEditing, setIsEditing] = useState(false);


  const handleSoldOutClick = () => {
    setSoldOut(!soldOut);

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inStock: !soldOut }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error updating sold out status:", error));
  };


  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };


  const handleSavePrice = () => {
    updatePrice(id, newPrice);
    setIsEditing(false);
  };


  const handleDelete = () => {
    deletePlant(id);
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>

      {isEditing ? (
        <div>
          <input
            type="number"
            value={newPrice}
            onChange={handlePriceChange}
          />
          <button onClick={handleSavePrice}>Save</button>
        </div>
      ) : (
        <p>Price: ${price}</p>
      )}

      <button onClick={handleSoldOutClick}>
        {soldOut ? "Sold Out" : "In Stock"}
      </button>

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit Price"}
      </button>

      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
