// frontend/src/components/SearchBar/SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSearchSuggestions,
  getPopularSearches,
} from "../../services/searchService";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  placeholder = "Caută produse...",
  initialValue = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fetch popular searches on mount
  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const popular = await getPopularSearches();
        setPopularSearches(popular);
      } catch (error) {
        console.error("Error fetching popular searches:", error);
      }
    };

    fetchPopularSearches();
  }, []);

  // Fetch suggestions when search term changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getSearchSuggestions(searchTerm);
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setSearchTerm("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentSuggestions =
      searchTerm.length < 2 ? popularSearches : suggestions;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < currentSuggestions.length - 1 ? prev + 1 : -1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > -1 ? prev - 1 : currentSuggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && currentSuggestions[selectedIndex]) {
          handleSearch(currentSuggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const displaySuggestions =
    searchTerm.length < 2 ? popularSearches : suggestions;

  return (
    <div ref={searchRef} className={`${styles.searchContainer} ${className}`}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`form-control ${styles.searchInput}`}
          autoComplete="off"
          aria-label="Search"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
        />
        <button
          type="submit"
          className={`btn btn-danger ${styles.searchButton}`}
        >
          <i className="bi bi-search d-lg-none"></i>
          <span className="d-none d-lg-block">Caută</span>
        </button>
      </form>

      {showSuggestions && displaySuggestions.length > 0 && (
        <div className={styles.suggestionsContainer}>
          {searchTerm.length < 2 && (
            <div className={styles.suggestionHeader}>
              <i className="bi bi-clock-history me-2"></i>
              Căutări populare
            </div>
          )}
          {isLoading && searchTerm.length >= 2 && (
            <div className={styles.loadingState}>
              <div className="spinner-border spinner-border-sm me-2"></div>
              Se caută...
            </div>
          )}
          {displaySuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`${styles.suggestionItem} ${
                selectedIndex === index ? styles.selected : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <i className="bi bi-search me-2"></i>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
