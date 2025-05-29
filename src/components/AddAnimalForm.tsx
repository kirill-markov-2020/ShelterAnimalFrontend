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

interface AddAnimalFormProps {
  open: boolean;
  onClose: () => void;
  onAnimalAdded: () => void;
}

const AddAnimalForm: React.FC<AddAnimalFormProps> = ({ open, onClose, onAnimalAdded }) => {
  const [animal, setAnimal] = useState({
    name: '',
    typeAnimalId: '',
    gender: 'Мужской',
    age: '',
    animalStatusId: '',
    description: '',
    photo: '',
  });

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
    setAnimal(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (event: Event, newValue: number | number[]) => {
    const genderValue = newValue === 0 ? 'Мужской' : 'Женский';
    setAnimal(prev => ({ ...prev, gender: genderValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!animal.name.trim()) newErrors.name = 'Имя обязательно';
    if (!animal.typeAnimalId) newErrors.typeAnimalId = 'Тип животного обязателен';
    if (!animal.animalStatusId) newErrors.animalStatusId = 'Статус животного обязателен';

    if (animal.age) {
      const age = parseInt(animal.age, 10);
      if (isNaN(age)) {
        newErrors.age = 'Возраст должен быть числом';
      } else if (age > 100) {
        newErrors.age = 'Возраст не может быть больше 100';
      }
    } else {
      newErrors.age = 'Возраст обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setAnimal({
      name: '',
      typeAnimalId: '',
      gender: 'Мужской',
      age: '',
      animalStatusId: '',
      description: '',
      photo: '',
    });
    setFile(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let photoPath = 'http://localhost:5164/images/заглушка.png';

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await apiClient.post('/FileUpload/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        photoPath = `http://localhost:5164${uploadResponse.data.filePath}`;
      }

      const animalData = {
        ...animal,
        photo: photoPath,
      };

      await apiClient.post('/Animals', animalData);
      setSnackbarMessage('Животное успешно добавлено!');
      setSnackbarOpen(true);
      resetForm();
      onAnimalAdded();
      onClose();
    } catch (err) {
      console.error('Error adding animal:', err);
      setSnackbarMessage('Ошибка при добавлении животного');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавить новое животное</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Имя"
            type="text"
            fullWidth
            value={animal.name}
            onChange={handleChange}
            error={!!errors.name}
          />
          <TextField
            margin="dense"
            name="typeAnimalId"
            label="Тип животного"
            select
            fullWidth
            value={animal.typeAnimalId}
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
              value={animal.gender === 'Мужской' ? 0 : 1}
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
                color: animal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
                '& .MuiSlider-markLabel': {
                  fontSize: '1.5rem',
                },
                '& .MuiSlider-thumb': {
                  backgroundColor: animal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
                },
                '& .MuiSlider-track': {
                  backgroundColor: animal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: animal.gender === 'Мужской' ? '#1976d2' : '#d81b60',
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
            value={animal.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            margin="dense"
            name="animalStatusId"
            label="Статус животного"
            select
            fullWidth
            value={animal.animalStatusId}
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
            value={animal.description}
            onChange={handleChange}
          />
          <CardMedia
            component="img"
            height="140"
            image={animal.photo || 'http://localhost:5164/images/заглушка.png'}
            alt={animal.name}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
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
                Добавить фото
              </Button>
            </label>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Добавить
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

export default AddAnimalForm;
