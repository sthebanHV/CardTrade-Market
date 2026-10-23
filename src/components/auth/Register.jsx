import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    // Simulación de registro
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  
  return (
    <div className="register-page">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Nombre</label>
          <input 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};