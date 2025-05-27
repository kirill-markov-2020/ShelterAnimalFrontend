import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface AnimalCardProps {
  animal: {
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
  };
  onAdopt?: (animalId: number) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onAdopt }) => {
  const { isAuthenticated } = useAuth();

  const handleAdopt = () => {
    if (onAdopt) {
      onAdopt(animal.id);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={animal.photo || 'https://via.placeholder.com/300'}
        alt={animal.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {animal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Вид: {animal.typeAnimal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пол: {animal.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Возраст: {animal.age} лет
        </Typography>
        <Chip
          label={animal.animalStatus.name}
          color={
            animal.animalStatus.name === 'Готов к усыновлению' 
              ? 'success' 
              : 'default'
          }
          sx={{ marginTop: 1 }}
        />
        {isAuthenticated && animal.animalStatus.name === 'Готов к усыновлению' && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleAdopt}
          >
            Усыновить
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalCard;