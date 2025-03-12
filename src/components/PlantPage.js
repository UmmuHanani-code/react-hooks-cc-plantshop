import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);

  // Fetch plants from the backend
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Function to update the price of a plant
  const updatePrice = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        const updatedPlants = plants.map((plant) =>
          plant.id === id ? updatedPlant : plant
        );
        setPlants(updatedPlants);
      })
      .catch((error) => console.error("Error updating price:", error));
  };

  // Function to delete a plant
  const deletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedPlants = plants.filter((plant) => plant.id !== id);
        setPlants(updatedPlants);
      })
      .catch((error) => console.error("Error deleting plant:", error));
  };

  return (
    <main>
      <NewPlantForm />
      <Search />
      <PlantList
        plants={plants}
        updatePrice={updatePrice} 
        deletePlant={deletePlant}
      />
    </main>
  );
}

export default PlantPage;
