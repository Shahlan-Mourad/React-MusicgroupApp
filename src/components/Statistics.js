import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MusicNote, Disc, Person } from 'react-bootstrap-icons';
import { fetchStatistics } from '../services/api';
import ErrorMessage from './error-message';

const Statistics = () => {
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
      <ErrorMessage 
        error={error}
        title="Could not load statistics"
        onRetry={loadStatistics}
      />
    );
  }

  return (
    <Row className="features-section g-4">
      <Col md={4}>
        <Card className="h-100 feature-card">
          <Card.Body className="text-center">
            <MusicNote size={40} className="text-primary mb-3" />
            <h3>Music Groups</h3>
            <h2 className="display-5 mb-3">{stats.musicGroups.toLocaleString()}</h2>
            <p>Explore our extensive collection of music groups from various genres and eras.</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 feature-card">
          <Card.Body className="text-center">
            <Disc size={40} className="text-success mb-3" />
            <h3>Albums</h3>
            <h2 className="display-5 mb-3">{stats.albums.toLocaleString()}</h2>
            <p>Discover albums from your favorite artists and explore new releases.</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 feature-card">
          <Card.Body className="text-center">
            <Person size={40} className="text-info mb-3" />
            <h3>Artists</h3>
            <h2 className="display-5 mb-3">{stats.artists.toLocaleString()}</h2>
            <p>Learn about talented artists and their contributions to the music world.</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Statistics; 