import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Alert } from 'react-bootstrap';
import { MusicNote, Disc, Person } from 'react-bootstrap-icons';
import { fetchStatistics } from '../services/app';

function Statistics() {
  const [stats, setStats] = useState({
    musicGroups: 0,
    albums: 0,
    artists: 0
  });
  const [error, setError] = useState(null);

  const loadStatistics = async () => {
    try {
      setError(null);
      const data = await fetchStatistics();
      setStats(data);
    } catch (error) {
      console.error('Error loading statistics:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  if (error) {
    return (
      <Row>
        <Col>
          <Alert variant="danger">
            <Alert.Heading>Kunde inte ladda statistik</Alert.Heading>
            <p>{error}</p>
            <hr />
            <Button variant="outline-danger" onClick={loadStatistics}>
              Försök igen
            </Button>
          </Alert>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="g-4">
      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Body className="text-center">
            <MusicNote size={40} className="text-primary mb-3" />
            <h2 className="display-5">{stats.musicGroups.toLocaleString()}</h2>
            <p className="h6 text-muted mb-0">Musikgrupper</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Body className="text-center">
            <Disc size={40} className="text-success mb-3" />
            <h2 className="display-5">{stats.albums.toLocaleString()}</h2>
            <p className="h6 text-muted mb-0">Album</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Body className="text-center">
            <Person size={40} className="text-info mb-3" />
            <h2 className="display-5">{stats.artists.toLocaleString()}</h2>
            <p className="h6 text-muted mb-0">Artister</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Statistics; 