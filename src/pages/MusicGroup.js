import React, { useState, useEffect } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MusicGroupList from '../components/MusicGroupList';
import CustomPagination from '../components/CustomPagination';
import { fetchMusicGroups } from '../services/app';

function MusicGroup() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      <Container>
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Error Loading Music Groups</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => fetchGroups()}>
              Try Again
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-4">Music Groups</h1>
      
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTermChange}
        onSearch={() => handleSearch(searchTerm)}
        totalResults={totalResults}
      />

      {groups.length === 0 ? (
        <Alert variant="info">No music groups found matching your search criteria.</Alert>
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
