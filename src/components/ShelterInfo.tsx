import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ShelterInfo: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ 
      maxWidth: 800, 
      margin: '40px auto', 
      padding: 4,
      borderRadius: 2,
      backgroundColor: '#f9f9f9'
    }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#2c3e50',
          mb: 4
        }}
      >
        Приют для животных
      </Typography>

      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{
          textAlign: 'center',
          fontStyle: 'italic',
          color: '#7f8c8d',
          mb: 4
        }}
      >
        PetVille
      </Typography>

      <Box sx={{ 
        backgroundColor: 'white', 
        padding: 3, 
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#2c3e50',
            mb: 3
          }}
        >
          Контактная информация:
        </Typography>

        <Box component="ul" sx={{ 
          pl: 3, 
          '& li': { 
            mb: 1.5,
            listStyleType: 'none',
            display: 'flex',
            alignItems: 'center'
          } 
        }}>
          <Box component="li">
            <Typography variant="body1">
              <strong>Адрес:</strong> г. Вологда, ул. Козлёнская, д. 119
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body1">
              <strong>Телефон:</strong> +7 (900) 531-40-16
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body1">
              <strong>Email:</strong> kirill-markov-2020@bk.ru
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography 
        variant="body1" 
        sx={{ 
          mt: 4,
          lineHeight: 1.6,
          textAlign: 'justify'
        }}
      >
        Мы помогаем бездомным животным найти новый дом и заботливых хозяев. 
        В нашем приюте содержатся животные разных возрастов, 
        все животные проходят ветеринарный осмотр.
      </Typography>
    </Paper>
  );
};

export default ShelterInfo;