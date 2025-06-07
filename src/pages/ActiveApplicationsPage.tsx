import React, { useEffect, useState } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import apiClient from '../api/client';
import config from '../config';

interface Animal {
  name: string;
  photo?: string;
  typeAnimal?: {
    name?: string;
  };
  age?: number;
}

interface Application {
  id: number;
  user: {
    surname?: string;
    name?: string;
    patronymic?: string;
  };
  animal: Animal;
}

const ActiveApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await apiClient.get('/AdoptionApplication');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      {applications.map((application) => (
        <Card key={application.id} sx={{ display: 'flex', marginBottom: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={application.animal?.photo || `${config.apiBaseUrl}${config.defaultImagePath}`}
            alt={application.animal?.name || 'Animal Image'}
          />
          <CardContent>
            <Typography variant="h6">
              {application.user?.surname} {application.user?.name} {application.user?.patronymic}
            </Typography>
            <Typography variant="body1">
              Животное: {application.animal?.name || 'Unknown'}
            </Typography>
            <Typography variant="body2">
              Вид: {application.animal?.typeAnimal?.name || 'Unknown'}
            </Typography>
            <Typography variant="body2">
              Возраст: {application.animal?.age || 'Unknown'} лет
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ActiveApplicationsPage;
