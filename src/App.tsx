import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AnimalsPage from './pages/AnimalsPage';
import ShelterInfoPage from './pages/ShelterInfoPage';
import RegisterPage from './pages/RegisterPage';
import { CssBaseline, Container } from '@mui/material';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Navbar />
        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animals" element={<AnimalsPage />} />
            <Route path="/shelter-info" element={<ShelterInfoPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
        
      </Router>
      <Footer/>
    </AuthProvider>
  );
};

export default App;