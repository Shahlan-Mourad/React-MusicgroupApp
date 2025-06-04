import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

const ErrorMessage = ({ 
  error, 
  title = "Error", 
  onRetry, 
  onBack, 
  backText = "Back to List",
  backPath = "/music-groups"
}) => {
  return (
    <Container>
      <Alert variant="danger" className="mt-4 text-center">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{error}</p>
        <hr />
        <div className="d-flex justify-content-center gap-2">
          {onRetry && (
            <Button variant="outline-danger" onClick={onRetry}>
              Try Again
            </Button>
          )}
          {onBack && (
            <Button variant="primary" onClick={onBack}>
              {backText}
            </Button>
          )}
        </div>
      </Alert>
    </Container>
  );
};

export default ErrorMessage; 