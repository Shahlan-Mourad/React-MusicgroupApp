import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchMusicGroups } from '../services/api';
import MusicGroupList from '../components/music-group-list';
import SearchBar from '../components/search-bar';
import CustomPagination from '../components/custom-pagination';
import ErrorMessage from '../components/error-message';

function MusicGroup() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const groupsPerPage = 10;

  const fetchGroups = async (page = currentPage, search = searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchMusicGroups(page - 1, groupsPerPage, search);
      
      if (data.pageItems) {
        setGroups(data.pageItems);
        setTotalPages(Math.ceil(data.dbItemsCount / groupsPerPage));
        setTotalResults(data.dbItemsCount);
      } else {
        throw new Error('Received data is not in the expected format');
      }
    } catch (error) {
      console.error('Error fetching music groups:', error);
      setError(`Failed to fetch music groups: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchGroups();
  }, []);

  // Fetch when page changes
  useEffect(() => {
    fetchGroups();
  }, [currentPage]);

  const handleSearch = (term) => {
    setCurrentPage(1);
    fetchGroups(1, term);
  };

  const handleSearchTermChange = (newTerm) => {
    setSearchTerm(newTerm);
    if (!newTerm.trim()) {
      handleSearch('');
    }
  };

  const toggleSearch = () => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput) {
       setSearchTerm('');
       handleSearch('');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading music groups...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Error Loading Music Groups"
        onRetry={fetchGroups}
      />
    );
  }

  return (
    <Container>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Music Groups</h1>
        </Col>
        <Col xs="auto">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={handleSearchTermChange}
            onSearch={handleSearch}
            totalResults={totalResults}
            showSearchInput={showSearchInput}
            setShowSearchInput={setShowSearchInput}
            toggleSearch={toggleSearch}
          />
        </Col>
      </Row>

      {groups.length === 0 ? (
        <ErrorMessage 
          error="No music groups found matching your search criteria."
          title="No Results"
          variant="info"
        />
      ) : (
        <>
          <MusicGroupList groups={groups} />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
}

export default MusicGroup;
