import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, ListGroup, Button, Container } from 'react-bootstrap';
import { fetchMusicGroupDetails } from '../services/api';
import ErrorMessage from './error-message';

function MusicGroupDetail() {
  const [band, setBand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadBandDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const bandData = await fetchMusicGroupDetails(id);
      setBand(bandData);
    } catch (error) {
      console.error('Error loading band details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBandDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading band details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Error Loading Band Details"
        onRetry={loadBandDetails}
        onBack={() => navigate('/music-groups')}
      />
    );
  }

  if (!band) {
    return (
      <ErrorMessage 
        error="The requested band could not be found."
        title="Band Not Found"
        onBack={() => navigate('/music-groups')}
      />
    );
  }

  return (
    <Container className="my-4">
      <div className="text-center mb-3">
        <Button
          variant="secondary"
          onClick={() => navigate('/music-groups')}
        >
          Back to List
        </Button>
      </div>

      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Header as="h2" className="text-center">{band.name}</Card.Header>
        <Card.Body className="text-center">
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
                <ListGroup.Item key={artist.artistId} className="text-center">
                  {artist.firstName} {artist.lastName}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center">No artists found for this band.</ListGroup.Item>
            )}
          </ListGroup>

          <Card.Title className="mt-4">Albums</Card.Title>
          <ListGroup variant="flush">
            {band.albums && band.albums.length > 0 ? (
              band.albums.map((album) => (
                <ListGroup.Item key={album.albumId} className="text-center">
                  {album.name} ({album.releaseYear})
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center">No albums found for this band.</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MusicGroupDetail; 