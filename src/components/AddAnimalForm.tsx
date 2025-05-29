// src/components/AddAnimalForm.tsx
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
  Typography
} from '@mui/material';
import apiClient from '../api/client';

interface AddAnimalFormProps {
  open: boolean;
  onClose: () => void;
}

const AddAnimalForm: React.FC<AddAnimalFormProps> = ({ open, onClose }) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeAnimalsResponse = await apiClient.get('/TypeAnimal');
        const animalStatusesResponse = await apiClient.get('/AnimalStatus');

        console.log('TypeAnimals:', typeAnimalsResponse.data);
        console.log('AnimalStatuses:', animalStatusesResponse.data);

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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

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
    onClose();
  } catch (err) {
    console.error('Error adding animal:', err);
  }
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
          />
          <TextField
            margin="dense"
            name="typeAnimalId"
            label="Тип животного"
            select
            fullWidth
            value={animal.typeAnimalId}
            onChange={handleChange}
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
          />
          <TextField
            margin="dense"
            name="animalStatusId"
            label="Статус животного"
            select
            fullWidth
            value={animal.animalStatusId}
            onChange={handleChange}
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
          <input type="file" onChange={handleFileChange} />
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
    </Dialog>
  );
};

export default AddAnimalForm;
