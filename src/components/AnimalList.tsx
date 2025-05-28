import React, { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import apiClient from '../api/client';
import AnimalCard from './AnimalCard';
import { useAuth } from '../context/AuthContext';

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { isAuthenticated, userRole } = useAuth();

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

  const handleAdopt = async (animalId: number) => {
    try {
      if (!isAuthenticated) {
        setSnackbarMessage('Для усыновления войдите в систему');
        setSnackbarOpen(true);
        return;
      }

      
      await apiClient.post('/Adoptions', { animalId });
      setSnackbarMessage('Заявка на усыновление отправлена!');
      setSnackbarOpen(true);

     
      const response = await apiClient.get('/Animals');
      setAnimals(response.data);
    } catch (error) {
      setSnackbarMessage('Ошибка при отправке заявки');
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleDelete = async (animalId: number) => {
    try {
      await apiClient.delete(`/Animals/${animalId}`);
      setSnackbarMessage('Животное успешно удалено');
      setSnackbarOpen(true);

    
      const response = await apiClient.get('/Animals');
      setAnimals(response.data);
    } catch (error) {
      setSnackbarMessage('Ошибка при удалении животного');
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
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
          padding: 3
        }}
      >
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onAdopt={handleAdopt}
            onDelete={userRole === 'Администратор' ? handleDelete : undefined}
          />
        ))}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AnimalList;
