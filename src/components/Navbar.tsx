import React from 'react';
import { AppBar, Toolbar, Typography, Button, useTheme, Avatar, Box, IconButton, Fade, Zoom } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';

const Navbar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const { isAuthenticated, userLogin, userRole, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
          Приют для животных
        </Typography>

        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              backgroundColor: isActive('/') ? theme.palette.background.paper : 'inherit',
              color: isActive('/') ? theme.palette.text.primary : 'inherit',
              '&:hover': {
                backgroundColor: isActive('/') ? theme.palette.action.selected : theme.palette.action.hover,
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.3s ease',
            }}
          >
            Главная
          </Button>
        </Zoom>

        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <Button
            color="inherit"
            component={Link}
            to="/animals"
            sx={{
              backgroundColor: isActive('/animals') ? theme.palette.background.paper : 'inherit',
              color: isActive('/animals') ? theme.palette.text.primary : 'inherit',
              '&:hover': {
                backgroundColor: isActive('/animals') ? theme.palette.action.selected : theme.palette.action.hover,
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.3s ease',
            }}
          >
            Животные
          </Button>
        </Zoom>

        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Button
            color="inherit"
            component={Link}
            to="/shelter-info"
            sx={{
              backgroundColor: isActive('/shelter-info') ? theme.palette.background.paper : 'inherit',
              color: isActive('/shelter-info') ? theme.palette.text.primary : 'inherit',
              '&:hover': {
                backgroundColor: isActive('/shelter-info') ? theme.palette.action.selected : theme.palette.action.hover,
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.3s ease',
            }}
          >
            О приюте
          </Button>
        </Zoom>

        {(userRole === 'Сотрудник' || userRole === 'Администратор') && (
          <>
            <Zoom in={true} style={{ transitionDelay: '400ms' }}>
              <Button
                color="inherit"
                component={Link}
                to="/active-applications"
                sx={{
                  backgroundColor: isActive('/active-applications') ? theme.palette.background.paper : 'inherit',
                  color: isActive('/active-applications') ? theme.palette.text.primary : 'inherit',
                  '&:hover': {
                    backgroundColor: isActive('/active-applications') ? theme.palette.action.selected : theme.palette.action.hover,
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.3s ease',
                }}
              >
                Активные заявки
              </Button>
            </Zoom>

            
          </>
        )}

        {!isAuthenticated ? (
          <Zoom in={true} style={{ transitionDelay: '600ms' }}>
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
                  backgroundColor: isActive('/register') ? theme.palette.primary.dark : theme.palette.action.hover,
                  transform: 'scale(1.1)',
                },
                transition: 'transform 0.3s ease',
              }}
            >
              Регистрация
            </Button>
          </Zoom>
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
                  color: theme.palette.error.contrastText,
                  transform: 'scale(1.1)',
                },
                transition: 'transform 0.3s ease',
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
