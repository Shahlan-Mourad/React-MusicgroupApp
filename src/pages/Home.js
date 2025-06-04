import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MusicNote } from 'react-bootstrap-icons';
import '../css/home.css';
import Statistics from '../components/statistics';

function Home() {
  return (
    <Container className="home-container py-5">
      <Row className="justify-content-center mb-5">
        <Col md={10} className="text-center">
          <div className="welcome-section">
            <MusicNote size={60} className="text-primary mb-4 animate-icon" />
            <h1 className="display-3 mb-4 fw-bold">Welcome to Music Groups</h1>
            <p className="lead mb-4">
              Discover and explore the world of music through our comprehensive collection of music groups
            </p>
            <div className="developer-info mb-5">
            <p className="text-muted">Developed by Shahlan Mourad</p>
            </div>
            
          </div>
        </Col>
      </Row>

      <Statistics />
    </Container>
  );
}

export default Home; 