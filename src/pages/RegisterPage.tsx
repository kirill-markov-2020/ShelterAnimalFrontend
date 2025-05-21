import React from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Box,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4 
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            maxWidth: 500 
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Регистрация
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
              label="Фамилия"
              variant="outlined"
              fullWidth
            />
            
            <TextField
              label="Имя"
              variant="outlined"
              fullWidth
            />
            
            <TextField
              label="Отчество"
              variant="outlined"
              fullWidth
            />
            
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
            
            <TextField
              label="Телефон"
              variant="outlined"
              fullWidth
            />
            
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
            
            <TextField
              label="Повторите пароль"
              type="password"
              variant="outlined"
              fullWidth
            />
            
            <Button 
              variant="contained" 
              size="large" 
              sx={{ mt: 3 }}
            >
              Зарегистрироваться
            </Button>
            
            <Typography variant="body2" sx={{ mt: 2 }} align="center">
              Уже есть аккаунт?{' '}
              <Link component={RouterLink} to="/">
                Войти
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;