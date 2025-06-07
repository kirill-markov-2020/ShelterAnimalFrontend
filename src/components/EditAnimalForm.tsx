import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  CircularProgress,
  Slider,
  Box,
  Typography,
  Snackbar,
  Alert,
  CardMedia,
  Input
} from '@mui/material';
import apiClient from '../api/client';
import config from '../config';

interface EditAnimalFormProps {
  open: boolean;
  onClose: () => void;
  animal: {
    id: number;
    name: string;
    typeAnimalId: number;
    gender: string;
    age: number;
    animalStatusId: number;
    description: string;
    photo: string;
  };
  onAnimalUpdated?: () => void;
}

const EditAnimalForm: React.FC<EditAnimalFormProps> = ({
  open,
  onClose,
  animal,
  onAnimalUpdated
}) => {
  const [originalAnimal] = useState(animal);
  const [editedAnimal, setEditedAnimal] = useState({ ...animal });
  const [typeAnimals, setTypeAnimals] = useState<any[]>([]);
  const [animalStatuses, setAnimalStatuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeAnimalsResponse = await apiClient.get('/TypeAnimal');
        const animalStatusesResponse = await apiClient.get('/AnimalStatus');

        setTypeAnimals(typeAnimalsResponse.data);
        setAnimalStatuses(animalStatusesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAnimal(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (event: Event, newValue: number | number[]) => {
    const genderValue = newValue === 0 ? 'Мужской' : 'Женский';
    setEditedAnimal(prev => ({ ...prev, gender: genderValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedAnimal(prev => ({
          ...prev,
          photo: event.target?.result as string
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDeletePhoto = () => {
    setFile(null);
    setEditedAnimal(prev => ({
      ...prev,
      photo: `${config.apiBaseUrl}${config.defaultImagePath}`
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedAnimal.name.trim()) newErrors.name = 'Имя обязательно';
    if (!editedAnimal.typeAnimalId) newErrors.typeAnimalId = 'Тип животного обязателен';
    if (!editedAnimal.animalStatusId) newErrors.animalStatusId = 'Статус животного обязателен';

    if (editedAnimal.age < 0 || editedAnimal.age > 100) {
      newErrors.age = 'Возраст должен быть от 0 до 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let photoPath = editedAnimal.photo;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await apiClient.post('/FileUpload/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        photoPath = `${config.apiBaseUrl}${uploadResponse.data.filePath}`;
      }

      const animalData = {
        ...editedAnimal,
        photo: photoPath,
        typeAnimal: {
          id: editedAnimal.typeAnimalId,
          name: typeAnimals.find(t => t.id === editedAnimal.typeAnimalId)?.name || ''
        },
        animalStatus: {
          id: editedAnimal.animalStatusId,
          name: animalStatuses.find(s => s.id === editedAnimal.animalStatusId)?.name || ''
        }
      };

      await apiClient.put(`/Animals/${editedAnimal.id}`, animalData);

      setSnackbarMessage('Данные животного успешно обновлены!');
      setSnackbarOpen(true);

      if (onAnimalUpdated) {
        onAnimalUpdated();
      }

      onClose();
    } catch (err) {
      console.error('Error updating animal:', err);
      setSnackbarMessage('Ошибка при обновлении данных животного');
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setEditedAnimal(originalAnimal);
    setFile(null);
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Редактировать данные о животном</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Имя"
            type="text"
            fullWidth
            value={editedAnimal.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            name="typeAnimalId"
            label="Тип животного"
            select
            fullWidth
            value={editedAnimal.typeAnimalId}
            onChange={handleChange}
            error={!!errors.typeAnimalId}
            helperText={errors.typeAnimalId}
          >
            {typeAnimals.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ margin: '16px 0', px: 2 }}>
            <Typography gutterBottom>Пол</Typography>
            <Slider
              value={editedAnimal.gender === 'Мужской' ? 0 : 1}
              onChange={handleGenderChange}
              aria-labelledby="gender-slider"
              step={1}
              marks={[
                {
                  value: 0,
                  label: <span style={{ color: '#1976d2' }}>♂</span>,
                },
                {
                  value: 1,
                  label: <span style={{ color: '#d81b60' }}>♀</span>,
                },
              ]}
              min={0}
              max={1}
              sx={{
                color: editedAnimal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
                '& .MuiSlider-markLabel': {
                  fontSize: '1.5rem',
                },
                '& .MuiSlider-thumb': {
                  backgroundColor: editedAnimal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
                },
                '& .MuiSlider-track': {
                  backgroundColor: editedAnimal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: editedAnimal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
                  opacity: 0.5,
                },
              }}
            />
          </Box>
          <TextField
            margin="dense"
            name="age"
            label="Возраст"
            type="number"
            fullWidth
            value={editedAnimal.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
            inputProps={{
              min: 0,
              max: 100
            }}
          />
          <TextField
            margin="dense"
            name="animalStatusId"
            label="Статус животного"
            select
            fullWidth
            value={editedAnimal.animalStatusId}
            onChange={handleChange}
            error={!!errors.animalStatusId}
            helperText={errors.animalStatusId}
          >
            {animalStatuses.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="description"
            label="Описание"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedAnimal.description}
            onChange={handleChange}
          />
          <CardMedia
            component="img"
            height="140"
            image={editedAnimal.photo || `${config.apiBaseUrl}${config.defaultImagePath}`}
            alt={editedAnimal.name}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Input
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleFileChange}
              sx={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                sx={{ borderColor: '#1976d2', color: '#1976d2', '&:hover': { borderColor: '#1565c0', backgroundColor: 'rgba(25, 118, 210, 0.04)' } }}
              >
                Заменить фото
              </Button>
            </label>
            <Button
              variant="outlined"
              onClick={handleDeletePhoto}
              sx={{ borderColor: '#d32f2f', color: '#d32f2f', '&:hover': { borderColor: '#b71c1c', backgroundColor: 'rgba(211, 47, 47, 0.04)' } }}
            >
              Удалить фото
            </Button>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Сохранить изменения
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Ошибка') ? "error" : "success"} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EditAnimalForm;
