import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarNonLogged';
import '../../login/Style/Login.css';
import { CREATE_USERR_MUTATION, CREATE_TODOLIST_MUTATION, CREATE_PHOTOGALLERY_MUTATION } from '../Query/CreateNewUserQuery';

const CreateNewUser = () => {
  const [name_user, setName_user] = useState("");
  const [document_user, setDocument_user] = useState("");
  const [state_user, setState_user] = useState("");
  const [password_user, setPassword_user] = useState("");
  const [error, setError] = useState("");
  const [id_user, setId_user] = useState(null); 
  const [id_todolist, setId_todolist] = useState(null); // Estado para manejar el ID de la To-Do List
  const [id_photogallery, setId_Photogallery] = useState(null); // Estado para manejar el ID de la To-Do List


  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USERR_MUTATION);
  const [createToDoList] = useMutation(CREATE_TODOLIST_MUTATION);
  const [createPhotoGallery] = useMutation(CREATE_PHOTOGALLERY_MUTATION);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name_user || !document_user || !state_user || !password_user) {
      setError('Por favor, ingresa todos los campos.');
      return;
    }

    try {
      // Crear usuario
      const { data: userData } = await createUser({
        variables: {
          name_user,
          document_user,
          state_user,
          password_user,
        },
      });

      const newIdUser = userData?.insert_userr_one?.id_user;
      if (!newIdUser) {
        throw new Error("Error obteniendo el ID del usuario.");
      }

      setId_user(newIdUser); // Actualiza el estado del usuario

      // Crear to-do list
      const { data: todoListData } = await createToDoList({
        variables: { id_user: newIdUser },
      });

      const newIdToDoList = todoListData?.insert_todolist_one?.id_todolist;
      if (!newIdToDoList) {
        throw new Error("Error obteniendo el ID de la to-do list.");
      }

      setId_todolist(newIdToDoList);

      // Crear photogallery
      const { data: photoGalleryData } = await createPhotoGallery({
        variables: { id_user: newIdUser },
      });

      const newIdPhotoGallery = photoGalleryData?.insert_photogallery_one?.id_photogallery;
      if (!newIdPhotoGallery) {
        throw new Error("Error obteniendo el ID de la to-do list.");
      }

      setId_Photogallery(newIdPhotoGallery);

      // Guardar en localStorage
      localStorage.setItem('userId', newIdUser);
      localStorage.setItem('id_todolist', newIdToDoList);
      localStorage.setItem('id_photogallery', newIdPhotoGallery);


      console.log('Usuario, To-Do List y galeria creados exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error durante el registro. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <ResponsiveAppBarNormal />
      <div className="login-form">
        <h1 className="title">Registro</h1>
        <p className="text">Por favor, ingresa tus datos para registrarte</p>

        <form onSubmit={handleSubmit} className="formBigContainer">
          <TextField
            required
            label="Nombre del usuario"
            variant="outlined"
            name="name_user"
            value={name_user}
            onChange={(e) => setName_user(e.target.value)}
            className="MuiTextField-root"
            sx={{ width: '80%', marginBottom: '15px' }}
          />

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

          <FormControl required sx={{ width: '100%', marginBottom: '15px' }}>
            <InputLabel id="estado-user-label">Estado</InputLabel>
            <Select
              labelId="estado-user-label"
              value={state_user}
              label="Estado"
              onChange={(e) => setState_user(e.target.value)}
            >
              <MenuItem value="active">Activo</MenuItem>
              <MenuItem value="inactive">Inactivo</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            label="Contraseña"
            variant="outlined"
            type="password"
            name="password_user"
            value={password_user}
            onChange={(e) => setPassword_user(e.target.value)}
            className="MuiTextField-root"
            sx={{ width: '80%', marginBottom: '15px' }}
          />

          {error && <Typography color="error" variant="body2">{error}</Typography>}

          <div className="button-container-form">
            <Button
              type="submit" className="login-form button"
              sx={{ backgroundColor: '#2196f3', color: 'white' }}
            >
              Registrarme
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;
