import React, { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  try {
    const response = await apiClient.post('/auth/login', { login, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userLogin', login);
      window.location.reload(); 
    } else {
      setError('Ошибка при входе: не получен токен');
    }
  } catch (err: any) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError('Произошла ошибка при входе');
    }
    console.error('Login error:', err);
  }
};

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Добро пожаловать в приют для животных
      </Typography>
      
      <Typography variant="body1" paragraph align="center">
        Наш приют помогает бездомным животным найти новый дом и любящих хозяев.
      </Typography>

      {!isAuthenticated && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              Вход в систему
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Логин"
                variant="outlined"
                fullWidth
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              
              <TextField
                label="Пароль"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Button 
                type="submit"
                variant="contained" 
                size="large" 
                sx={{ mt: 2 }}
              >
                Войти
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;