import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import apiClient from '../api/client';
import AnimalCard from './AnimalCard';

interface Animal {
  id: number;
  name: string;
  typeAnimal: {
    name: string;
  };
  gender: string;
  age: number;
  animalStatus: {
    name: string;
  };
  description: string;
  photo: string;
}

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await apiClient.get('/Animals');
        setAnimals(response.data);
      } catch (err) {
        setError('Ошибка при загрузке данных о животных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h6">Загрузка данных о животных...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3,
        padding: 3,
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      {animals.map((animal) => (
        <Box
          key={animal.id}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease'
            }
          }}
        >
          <AnimalCard animal={animal} />
        </Box>
      ))}
    </Box>
  );
};

export default AnimalList;