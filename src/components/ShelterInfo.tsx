import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import apiClient from '../api/client';

const ShelterInfo: React.FC = () => {
  const [shelterInfo, setShelterInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShelterInfo = async () => {
      try {
        const response = await apiClient.get('/ShelterInfo');
        setShelterInfo(response.data);
      } catch (err) {
        setError('Ошибка при загрузке информации о приюте');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShelterInfo();
  }, []);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!shelterInfo) return null;

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {shelterInfo.Name}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Контактная информация:</Typography>
          <Typography>Адрес: {shelterInfo.Address}</Typography>
          <Typography>Телефон: {shelterInfo.Phone}</Typography>
          <Typography>Email: {shelterInfo.Email}</Typography>
        </Box>
        <Typography variant="body1">{shelterInfo.Description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ShelterInfo;