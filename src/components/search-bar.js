import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  totalResults,
  showSearchInput,
  setShowSearchInput,
  toggleSearch,
}) {
  const searchBarRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
    }

    if (showSearchInput) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchInput, setShowSearchInput]);

  return (
    <div ref={searchBarRef}>
      {!showSearchInput ? (
        <div onClick={toggleSearch} style={{ cursor: 'pointer' }} className="text-primary">
          <Search size={30} />
        </div>
      ) : (
        <div className="d-flex flex-column align-items-end">
          <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-2">
            <Form.Control
              type="text"
              placeholder="Search MusicGroups..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          {totalResults > -1 && totalResults !== null && (
            <div className="mt-2 text-muted">
              Total bands found: {totalResults}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar; 