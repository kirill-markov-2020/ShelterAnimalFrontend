import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Приют для животных
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Главная
        </Button>
        <Button color="inherit" component={Link} to="/animals">
          Животные
        </Button>
        <Button color="inherit" component={Link} to="/shelter-info">
          О приюте
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;