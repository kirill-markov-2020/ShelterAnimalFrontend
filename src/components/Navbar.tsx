import React from 'react';
import { AppBar, Toolbar, Typography, Button, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();

  // Функция для определения активной кнопки
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Приют для животных
        </Typography>
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/"
          sx={{
            backgroundColor: isActive('/') ? theme.palette.background.paper : 'inherit',
            color: isActive('/') ? theme.palette.text.primary : 'inherit',
            '&:hover': {
              backgroundColor: isActive('/') ? theme.palette.action.selected : theme.palette.action.hover
            }
          }}
        >
          Главная
        </Button>
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/animals"
          sx={{
            backgroundColor: isActive('/animals') ? theme.palette.background.paper : 'inherit',
            color: isActive('/animals') ? theme.palette.text.primary : 'inherit',
            '&:hover': {
              backgroundColor: isActive('/animals') ? theme.palette.action.selected : theme.palette.action.hover
            }
          }}
        >
          Животные
        </Button>
        
        <Button 
          color="inherit" 
          component={Link} 
          to="/shelter-info"
          sx={{
            backgroundColor: isActive('/shelter-info') ? theme.palette.background.paper : 'inherit',
            color: isActive('/shelter-info') ? theme.palette.text.primary : 'inherit',
            '&:hover': {
              backgroundColor: isActive('/shelter-info') ? theme.palette.action.selected : theme.palette.action.hover
            }
          }}
        >
          О приюте
        </Button>
        
        <Button 
          component={Link} 
          to="/register"
          sx={{
            ml: 2,
            border: '1px solid',
            borderColor: isActive('/register') ? theme.palette.primary.main : 'inherit',
            backgroundColor: isActive('/register') ? theme.palette.primary.main : 'transparent',
            color: isActive('/register') ? theme.palette.primary.contrastText : 'inherit',
            '&:hover': {
              backgroundColor: isActive('/register') ? theme.palette.primary.dark : theme.palette.action.hover
            }
          }}
        >
          Регистрация
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;