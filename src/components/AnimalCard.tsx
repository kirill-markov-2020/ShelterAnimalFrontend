import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  onDelete?: (animalId: number) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onAdopt, onDelete }) => {
  const { isAuthenticated, userRole } = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleAdopt = () => {
    if (onAdopt) {
      onAdopt(animal.id);
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(animal.id);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        {isAuthenticated && animal.animalStatus.name === 'Готов к усыновлению' && (userRole === 'Клиент' || userRole === 'Волонтер') && (
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
        {isAuthenticated && userRole === 'Администратор' && (
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleDelete}
          >
            Удалить
          </Button>
        )}
      </CardContent>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Подтверждение удаления"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить это животное?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AnimalCard;
