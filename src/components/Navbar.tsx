import React from 'react';
import { AppBar, Toolbar, Typography, Button, useTheme, Avatar, Box, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';

const Navbar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const { isAuthenticated, userLogin, logout } = useAuth();

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
        
        {!isAuthenticated ? (
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
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton color="inherit">
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                <PersonIcon fontSize="small" />
              </Avatar>
            </IconButton>
            <Typography variant="body1" sx={{ mx: 1 }}>
              {userLogin}
            </Typography>
            <Button 
              color="inherit"
              onClick={logout}
              sx={{
                border: '1px solid',
                borderColor: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: theme.palette.error.dark,
                  color: theme.palette.error.contrastText
                }
              }}
            >
              Выход
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;