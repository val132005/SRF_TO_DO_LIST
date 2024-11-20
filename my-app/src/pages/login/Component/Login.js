import React, { useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarNonLogged';
import '../Style/Login.css';
import { LOGIN_QUERY, GET_TODOLIST_ID, GET_PHOTOGALLERY_ID } from '../Query/LoginQuery';

const Login = () => {
  const [document_user, setDocument_user] = useState("");
  const [password_user, setPassword_user] = useState("");
  const [error, setError] = useState("");
  const client = useApolloClient();
  const navigate = useNavigate();
  const [id_user, setId_user] = useState(null);
  const [id_todolist, setId_todolist] = useState(null);




  const handleLogin = async (e) => {
    e.preventDefault();

    if (!document_user || !password_user) {
      setError("Please fill out all fields.");
      return;
    }
    try {
      const { data } = await client.query({
        query: LOGIN_QUERY,
        variables: { document_user, password_user },
      });
      if (data.userr.length > 0) {
        const loggedUser = data.userr[0]; 
        const { id_user} = loggedUser;

        // Guardar valores en localStorage
        localStorage.setItem("userId", id_user);
        
        const { data: todoListData } = await client.query({
          query: GET_TODOLIST_ID,
          variables: { userId: id_user },
        });
  
        if (todoListData.todolist.length > 0) {
          const { id_todolist } = todoListData.todolist[0];
          localStorage.setItem("id_todolist", id_todolist);
        }
  
        // Obtiene el ID de la galería de fotos asociada
        const { data: photoGalleryData } = await client.query({
          query: GET_PHOTOGALLERY_ID,
          variables: { userId: id_user },
        });
  
        if (photoGalleryData.photogallery.length > 0) {
          const { id_photogallery } = photoGalleryData.photogallery[0];
          localStorage.setItem("id_photogallery", id_photogallery);
        }



        alert("Logged in successfully!");
        navigate("/HomeLogged/");
      } else {
        alert("Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <ResponsiveAppBarNormal />
      <div className="login-form">
        <h1 className="title">Login</h1>
        <p className="text">Por favor, ingresa tus credenciales para continuar</p>

        <form onSubmit={handleLogin} className='formBigContainer'>
          <TextField
            required
            label="Documento de identidad"
            variant="outlined"
            name="document_user"
            value={document_user}
            onChange={(e) => setDocument_user(e.target.value)}
            className="MuiTextField-root"
            sx={{ width: '80%', marginBottom: '15px' }}
          />

          <TextField
            required
            label="Contraseña"
            variant="outlined"
            type="password"
            name="password"
            value={password_user}
            onChange={(e) => setPassword_user(e.target.value)}
            className="MuiTextField-root" // Asegura que el estilo de texto se aplique
          />

          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <div className="button-container-form">
            <Button type="submit" className="login-form button" sx={{ backgroundColor: '#2196f3', color: 'black' }}>
              Iniciar sesión
            </Button>
          </div>
        </form>

        <div className="register-link">
          <Typography variant="body2" color="textSecondary">
            ¿No tienes cuenta?
            <Button
              onClick={() => navigate('/login/register')}
              sx={{ textTransform: 'none', paddingLeft: '5px' }}
            >
              Regístrate aquí
            </Button>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
