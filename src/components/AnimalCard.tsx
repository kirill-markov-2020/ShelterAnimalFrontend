import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditAnimalForm from './EditAnimalForm';
import config from '../config';

interface AnimalCardProps {
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
  onAdopt?: (animalId: number) => void;
  onDelete?: (animalId: number) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onAdopt, onDelete }) => {
  const { isAuthenticated, userRole } = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editFormOpen, setEditFormOpen] = React.useState(false);

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

  const handleEdit = () => {
    setEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
  };

  return (
    <Card sx={{
      maxWidth: 345,
      margin: 2,
      border: '2px solid #1976d2',
      borderRadius: '8px'
    }}>
      <CardMedia
        component="img"
        height="140"
        image={animal.photo || `${config.apiBaseUrl}${config.defaultImagePath}`}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <IconButton aria-label="edit" onClick={handleEdit} sx={{ color: '#1976d2' }}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete} sx={{ color: '#d32f2f' }}>
              <DeleteIcon />
            </IconButton>
          </Box>
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
      <EditAnimalForm
        open={editFormOpen}
        onClose={handleCloseEditForm}
        animal={{
          id: animal.id,
          name: animal.name,
          typeAnimalId: animal.typeAnimal.id,
          gender: animal.gender,
          age: animal.age,
          animalStatusId: animal.animalStatus.id,
          description: animal.description,
          photo: animal.photo,
        }}
      />
    </Card>
  );
};

export default AnimalCard;
