import React from 'react';
import { ThemeProvider, CssBaseline, Container, Button } from '@mui/material';
import theme from '../../../assets/theme';
import ResponsiveAppBarLogged from '../../../assets/ResponsiveAppBarLogged';
import '../Style/HomeLogged.css';
import { useNavigate } from 'react-router-dom';

function HomeLogged() {

  const navigate = useNavigate();
  

  const handleTareasClick = () => {
    navigate('/homeLogged/todolist'); 
  };

  const handleGaleriaClick = () => {
    navigate('/'); 
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <div className='nav-var-1'>
          <ResponsiveAppBarLogged />
        </div>
        <Container className="container">
          <div className="content">
            <h1 className="title">Maneja tus tareas eficientemente</h1>
            <p className="text">
              Manejar de manera efectiva los tiempos y las tareas es crucial para alcanzar metas de forma eficiente y reducir el estrés. La capacidad de organizar las actividades, establecer prioridades y asignar el tiempo adecuado a cada tarea permite no solo cumplir con los plazos, sino también mejorar la calidad del trabajo realizado.
            </p>

            <div className="button-container">

              <Button variant="contained" className="button" disableElevation onClick={handleTareasClick}>
                Tareas
              </Button>
              <Button variant="contained" className="button" disableElevation onClick={handleGaleriaClick}>
                Galería
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}


export default HomeLogged;
