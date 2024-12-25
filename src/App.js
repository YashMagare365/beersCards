import React, { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./Components/CardList";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(`https://api.sampleapis.com/beers/ale`);
      setData(response.data); // Load all data at once
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter the data based on the search query
  const filteredSuggestions = searchQuery
    ? data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedItem(null); // Reset the selected item when typing
  };

  const handleSuggestionClick = (item) => {
    setSearchQuery(item.name); // Update search bar with the selected item's name
    setSelectedItem(item); // Set the selected item
  };

  // If an item is selected, show only that item, otherwise show all or filtered data
  const displayedData = selectedItem
    ? [selectedItem]
    : searchQuery
    ? filteredSuggestions
    : data;

  return (
    <div>
      <h1>BEERS</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        {filteredSuggestions.length > 0 && (
          <div className="dropdown">
            {filteredSuggestions.map((item) => (
              <div
                key={item.id}
                className="dropdown-item"
                onClick={() => handleSuggestionClick(item)} // Handle suggestion click
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <CardList data={displayedData} />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
