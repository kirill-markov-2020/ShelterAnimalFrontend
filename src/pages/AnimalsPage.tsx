import React from 'react';
import { Container } from '@mui/material';
import AnimalList from '../components/AnimalList';

const AnimalsPage: React.FC = () => {
  return (
    <Container>
      <AnimalList />
    </Container>
  );
};

export default AnimalsPage;