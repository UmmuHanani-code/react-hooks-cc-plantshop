import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, updatePrice, deletePlant }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          id={plant.id}
          name={plant.name}
          image={plant.image}
          price={plant.price}
          inStock={plant.inStock}
          updatePrice={updatePrice} 
          deletePlant={deletePlant}
        />
      ))}
    </ul>
  );
}

export default PlantList;

