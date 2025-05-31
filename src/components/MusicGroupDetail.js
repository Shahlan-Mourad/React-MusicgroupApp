import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, ListGroup, Button, Alert } from 'react-bootstrap';

function BandDetails() {
  const [band, setBand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = "https://seido-webservice-307d89e1f16a.azurewebsites.net/api";

  useEffect(() => {
    fetchBandDetails();
  }, [id]);

  const fetchBandDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching band details for ID:', id);
      
      // Fetch the band details
      const response = await fetch(
        `${API_BASE_URL}/MusicGroup/Read?seeded=true&flat=false&pageNr=0&pageSize=1000`
      );
      
      if (!response.ok) {
        throw new Error("Could not fetch bands");
      }
      
      const data = await response.json();
      console.log('All bands data:', data);
      
      const foundBand = data.pageItems.find(group => String(group.musicGroupId) === String(id));
      
      if (foundBand) {
        console.log('Found band:', foundBand);
        
        // Get the band's artists directly from the band data
        const bandArtists = foundBand.artists || [];
        console.log('Band artists from band data:', bandArtists);
        
        // If we have artists in the band data, use them
        if (bandArtists.length > 0) {
          // Log the structure of the first artist to understand the data format
          console.log('First artist structure:', bandArtists[0]);
          foundBand.artists = bandArtists;
        } else {
          // If no artists in band data, try to fetch them
          const artistsResponse = await fetch(
            `${API_BASE_URL}/Artist/Read?seeded=true&flat=false&pageNr=0&pageSize=1000`
          );
          
          if (!artistsResponse.ok) {
            throw new Error("Could not fetch artists");
          }
          
          const artistsData = await artistsResponse.json();
          console.log('All artists data:', artistsData);
          
          const artistsInBand = artistsData.pageItems.filter(artist => {
            const artistGroups = artist.musicGroups || [];
            return artistGroups.some(group => String(group.musicGroupId) === String(id));
          });
          
          console.log('Artists found in artists list:', artistsInBand);
          foundBand.artists = artistsInBand;
        }
        
        setBand(foundBand);
      } else {
        throw new Error(`No band found with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error fetching band details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading band details...</div>;
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Button variant="primary" onClick={() => navigate('/groups')}>
          Back to List
        </Button>
      </Alert>
    );
  }

  if (!band) {
    return (
      <Alert variant="warning" className="mt-4">
        <Alert.Heading>Band Not Found</Alert.Heading>
        <p>The requested band could not be found.</p>
        <Button variant="primary" onClick={() => navigate('/groups')}>
          Back to List
        </Button>
      </Alert>
    );
  }

  return (
    <div>
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate('/groups')}
      >
        Back to List
      </Button>

      <Card>
        <Card.Header as="h2">{band.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Genre:</strong> {band.genre}
          </Card.Text>
          <Card.Text>
            <strong>Established:</strong> {band.establishedYear}
          </Card.Text>

          <Card.Title className="mt-4">Artists</Card.Title>
          <ListGroup variant="flush">
            {band.artists && band.artists.length > 0 ? (
              band.artists.map((artist) => (
                <ListGroup.Item key={artist.artistId}>
                  {artist.firstName} {artist.lastName}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No artists found for this band.</ListGroup.Item>
            )}
          </ListGroup>

          <Card.Title className="mt-4">Albums</Card.Title>
          <ListGroup variant="flush">
            {band.albums && band.albums.length > 0 ? (
              band.albums.map((album) => (
                <ListGroup.Item key={album.albumId}>
                  {album.name} ({album.releaseYear})
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No albums found for this band.</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BandDetails; 