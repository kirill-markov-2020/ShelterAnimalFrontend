import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
  Box
} from '@mui/material';
import config from '../config';

interface AnimalDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  animal: {
    id: number;
    name: string;
    typeAnimal: {
      id: number;
      name: string;
    };
    gender: string;
    age: number;
    animalStatus: {
      id: number;
      name: string;
    };
    description: string;
    photo: string;
  };
}

const AnimalDetailsDialog: React.FC<AnimalDetailsDialogProps> = ({ open, onClose, animal }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{animal.name}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CardMedia
            component="img"
            image={animal.photo || `${config.apiBaseUrl}${config.defaultImagePath}`}
            alt={animal.name}
            sx={{ width: 'auto', height: 300, objectFit: 'contain', marginBottom: 2 }}
          />
          <Typography variant="body1" gutterBottom>
            <strong>Тип:</strong> {animal.typeAnimal.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Пол:</strong> {animal.gender}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Возраст:</strong> {animal.age} лет
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Статус:</strong> {animal.animalStatus.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Описание:</strong> {animal.description}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnimalDetailsDialog;
