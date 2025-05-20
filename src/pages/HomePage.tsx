import React from 'react';
import { Typography, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Добро пожаловать в приют для животных
      </Typography>
      <Typography variant="body1">
        Наш приют помогает бездомным животным найти новый дом и любящих хозяев.
      </Typography>
    </Container>
  );
};

export default HomePage;