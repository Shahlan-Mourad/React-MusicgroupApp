import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Github, Envelope, Linkedin } from 'react-bootstrap-icons';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start">
            <div className="developer-info">
              <img 
                src="https://github.com/Shahlan-Mourad.png" 
                alt="Shahlan Mourad" 
                className="profile-image mb-2"
              />
              <h5 className="mb-1">Shahlan Mourad</h5>
              <p className="text-muted mb-0">Full Stack Developer</p>
            </div>
          </Col>
          
          <Col md={4} className="text-center my-3 my-md-0">
            <div className="social-links">
              <a 
                href="https://github.com/Shahlan-Mourad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Github size={24} />
              </a>
              <a 
                href="mailto:shahlan.mourad@gmail.com" 
                className="social-link"
              >
                <Envelope size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/shahlan-mourad-30256a335" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </Col>
          
          <Col md={4} className="text-center text-md-end">
            <p className="mb-0">
              © {new Date().getFullYear()} Music Groups
              <br />
              <small className="text-muted">All rights reserved</small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 