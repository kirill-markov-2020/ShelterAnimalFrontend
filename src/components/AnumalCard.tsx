import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';

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
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
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
            animal.animalStatus.name === 'Готов к усыновлению' ? 'success' : 'default'
          }
          sx={{ marginTop: 1 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {animal.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AnimalCard;