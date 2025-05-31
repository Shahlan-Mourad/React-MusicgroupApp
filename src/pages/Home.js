import React from 'react';
import { Container } from 'react-bootstrap';
import Statistics from '../components/Statistics';

function Home() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Welcome to Music Groups</h1>
      <Statistics />
    </Container>
  );
}

export default Home; 