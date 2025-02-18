import React, { useState } from "react";
import PropTypes from "prop-types";

export default function HeaderSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="header-search">
      <input
        type="text"
        placeholder="Buscar canción o artista..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Buscar
      </button>
    </div>
  );
}

HeaderSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};