import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

function SearchBar({ searchTerm, setSearchTerm, onSearch, totalResults }) {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search music groups..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button variant="primary" type="submit">
          <Search /> Search
        </Button>
      </InputGroup>
      {totalResults > 0 && (
        <Form.Text className="text-muted">
          Found {totalResults} music groups
        </Form.Text>
      )}
    </Form>
  );
}

export default SearchBar; 