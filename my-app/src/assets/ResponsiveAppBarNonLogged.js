import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TaskAltIcon from '@mui/icons-material/TaskAlt'; 
import { Link } from 'react-router-dom';



// Opciones de las páginas
const pages = [
  { name: 'Inicio', path: '/' }, 
];

const settings = [
  { name: 'Iniciar sesion', path: '/login' },];

function ResponsiveAppBarNormal() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo (solo se muestra en pantallas grandes) */}
          <TaskAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              
            }}
          >
            Mis Tareas
          </Typography>

          {/* Menú de navegación (solo en dispositivos grandes) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.path} style={{ textDecoration: 'none' }}>
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block', mx: 2, textTransform: 'none', fontSize: '1.09rem', }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Icono de usuario (siempre visible en la parte derecha) */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link to={setting.path} style={{ textDecoration: 'none', color: 'black' }}>
                      {setting.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBarNormal;
