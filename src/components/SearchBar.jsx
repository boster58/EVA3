const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <label htmlFor="search">Buscar curso:</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        maxLength={50}
        placeholder="Buscar..."
      />
    </div>
  );
};

export default SearchBar;