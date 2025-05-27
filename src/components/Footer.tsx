import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Приют для животных. Все права защищены.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Разработан <Link href="https://vk.com/kirya.mogol" color="inherit">Марковым Кириллом</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
