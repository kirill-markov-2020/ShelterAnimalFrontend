import React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Добро пожаловать в приют для животных
      </Typography>
      
      <Typography variant="body1" paragraph align="center">
        Наш приют помогает бездомным животным найти новый дом и любящих хозяев.
      </Typography>

      {/* Форма авторизации */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 6 
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            maxWidth: 400 
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Вход в систему
          </Typography>
          
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2 
            }}
          >
            <TextField
              label="Логин"
              variant="outlined"
              fullWidth
            />
            
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
            />
            
            <Button 
              variant="contained" 
              size="large" 
              sx={{ mt: 2 }}
            >
              Войти
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Кнопка регистрации */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 16, 
        right: 16 
      }}>
        <Button
          component={RouterLink}
          to="/register"
          variant="outlined"
          size="large"
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;