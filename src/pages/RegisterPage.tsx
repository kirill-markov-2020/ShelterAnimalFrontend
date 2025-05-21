import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Box,
  Link,
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';


const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


const validatePhone = (phone: string) => {
  return /^[\+\-\(\)\d\s]{1,20}$/.test(phone);
};


const validatePassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    patronymic: '',
    email: '',
    phone: '',
    login: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.surname.trim()) newErrors.surname = 'Фамилия обязательна';
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Некорректный телефон (только +-() и цифры, макс. 20 символов)';
    }
    
    if (!formData.login.trim()) newErrors.login = 'Логин обязателен';
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, заглавные и строчные буквы и цифры';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const userData = {
        surname: formData.surname,
        name: formData.name,
        patronymic: formData.patronymic || null,
        email: formData.email,
        phone: formData.phone,
        login: formData.login,
        password: formData.password,
        roleId: 3 // Роль "Клиент" (согласно вашему ТЗ)
      };
      
      await apiClient.post('/Users', userData);
      
      navigate('/', { state: { login: formData.login } });
      
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('Ошибка регистрации. Возможно, такой логин или email уже существует.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Регистрация
          </Typography>
          
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Фамилия"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              error={!!errors.surname}
              helperText={errors.surname}
              fullWidth
            />
            
            <TextField
              label="Имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            
            <TextField
              label="Отчество (необязательно)"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
              fullWidth
            />
            
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />
            
            <TextField
              label="Телефон"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
            />
            
            <TextField
              label="Логин"
              name="login"
              value={formData.login}
              onChange={handleChange}
              error={!!errors.login}
              helperText={errors.login}
              fullWidth
            />
            
            <TextField
              label="Пароль"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />
            
            <TextField
              label="Повторите пароль"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
            />
            
            <Button 
              type="submit"
              variant="contained" 
              size="large" 
              sx={{ mt: 3 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
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