import React, { useState } from "react";
import { useMutation } from "@apollo/client"; // Asegúrate de tener el hook de useMutation
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarNonLogged';
import '../../login/Style/Login.css'; 
import { CREATE_USERS_MUTATION } from '../Query/CreateNewUserQuery';

const CreateNewUser = () => {
    const [name_user, setName_user] = useState("");
    const [document_user, setDocument_user] = useState("");
    const [state_user, setState_user] = useState(""); // Cambié el nombre de esta variable para que sea coherente con el campo
    const [password_user, setPassword_user] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [createUser] = useMutation(CREATE_USERS_MUTATION);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name_user || !document_user || !state_user || !password_user) {
        setError('Por favor, ingresa todos los campos.');
        return;
      }

      try {
        await createUser({
          variables: {
            name_user, 
            document_user, 
            state_user,
            password_user,
          }
        });
        alert('Usuario creado exitosamente');
        navigate('/login'); // Redirigir al login después de crear el usuario
      } catch (error) {
        console.error('Error creando el usuario:', error);
        setError('Error creando el usuario');
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
              value={name_user} // Asignamos el valor de state correspondiente
              onChange={(e) => setName_user(e.target.value)} // Actualizamos el estado correcto
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
                <MenuItem value="inaactive">Inactivo</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              label="Contraseña"
              variant="outlined"
              type="password" // Asegúrate de usar el tipo password
              name="password_user"
              value={password_user}
              onChange={(e) => setPassword_user(e.target.value)}
              className="MuiTextField-root"
              sx={{ width: '80%', marginBottom: '15px' }}
            />

            {error && <Typography color="error" variant="body2">{error}</Typography>}

            <div className="button-container-form">
              <Button
                type="submit"
                className="login-form button"
                sx={{ backgroundColor: '#2196f3', color: 'black' }}
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
