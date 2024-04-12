import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MakeupDataService from '../services/makeupDataService';
import { Card, Container } from 'react-bootstrap';

const MakeupDetail = () => {
  const { id } = useParams(); 
  const [makeup, setMakeup] = useState(null);

  useEffect(() => {
    const fetchMakeup = async () => {
      try {
        const response = await MakeupDataService.get(id);
        setMakeup(response.data);
      } catch (error) {
        console.error('Error fetching makeup data:', error);
      }
    };

    fetchMakeup();
  }, [id]); 

  return (
    <Container>
      {makeup ? (
        <Card>
          <Card.Body>
            <Card.Title>{makeup.title}</Card.Title>
            <Card.Text>Description: {makeup.description}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default MakeupDetail;
