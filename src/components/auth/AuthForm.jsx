import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

export const AuthForm = ({ mode = 'login', onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: ''
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <Box sx={{ p: 4, width: '300px' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {mode === 'login' ? 'Iniciar Sesión' : 'Regístrate'}
      </Typography>
      
      <form onSubmit={onSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        {mode === 'register' && (
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
        )}
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ width: '100%' }}>
          {mode === 'login' ? 'Ingresar' : 'Crear Cuenta'}
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Navigate to={mode === 'login' ? '/register' : '/login'} />
        </Box>
      </form>
    </Box>
  );
};