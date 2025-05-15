import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import apiClient from '../api/client';
import AnimalCard from './AnimalCard';

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<any[]>([]);
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

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={2}>
      {animals.map((animal) => (
        <Grid item key={animal.id} xs={12} sm={6} md={4}>
          <AnimalCard animal={animal} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AnimalList;