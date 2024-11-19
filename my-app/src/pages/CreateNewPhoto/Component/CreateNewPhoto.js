import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarLogged';
import '../../CreateNewItem/Style/CreateNewItem.css';
import { CREATE_PHOTO_MUTATION } from '../Query/CreateNewPhotoQuery';
import { GET_PHOTOGALLERY_ID, GET_PHOTOS } from '../../PhotoGallery/Query/PhtoGalleryListQuery';

const CreateNewPhoto = () => {
  const [photoContent, setPhotoContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { loading: loadingUserId, error: userError, data: userData } = useQuery(GET_PHOTOGALLERY_ID, {
    variables: { userId: parseInt(userId) },
  });

  const photogalleryId = userData?.photogallery?.[0]?.id_photogallery;

  const [createPhoto, { loading, error: mutationError }] = useMutation(CREATE_PHOTO_MUTATION, {
    refetchQueries: [{ query: GET_PHOTOS, variables: { id_photogallery: photogalleryId } }],
    onError: (err) => setError(`Error al crear la foto: ${err.message}`), // Capturar errores en la mutación
    onCompleted: () => {
      setSuccessMessage("¡Foto añadida exitosamente!");
      setTimeout(() => navigate("/homeLogged/photogallery"), 2000);
    }
  });

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Verificar el valor de photoContent antes de hacer la mutación
    console.log("Valor de photoContent antes de enviar:", photoContent);

    if (!photogalleryId) {
      setError("No se encontró el ID de la galería de fotos. Por favor, intenta nuevamente.");
      return;
    }

    if (!photoContent.trim() || !isValidUrl(photoContent)) {
      setError("La URL de la foto es obligatoria y debe ser válida.");
      return;
    }

    // Verificar lo que se va a pasar en la mutación
    console.log("Datos de la mutación:", {
      content_photo: photoContent,
      id_photogallery: photogalleryId,
    });

    try {
      await createPhoto({
        variables: {
          content_photo: photoContent,
          id_photogallery: photogalleryId,
        },
      });
    } catch (err) {
      setError("Hubo un error al crear la foto.");
      console.error(err);
    }
  };

  if (loadingUserId) return <p>Loading...</p>;
  if (userError) return <p>Error al cargar la galería de fotos</p>;

  return (
    <div className="task-form-container">
      <ResponsiveAppBarNormal />
      <div className="task-form">
        <h1 className="title">Agregar Photo</h1>
        <p className="text">Por favor, ingresa la URL de la foto</p>

        <form onSubmit={handleFormSubmit} className="formBigContainer">
          <TextField
            required
            label="URL de la Foto"
            variant="outlined"
            name="photoContent"
            value={photoContent}
            onChange={(e) => setPhotoContent(e.target.value)}
            className="MuiTextField-root"
            sx={{ width: '80%', marginBottom: '15px' }}
          />

          {error && <Typography color="error" variant="body2">{error}</Typography>}
          {mutationError && <Typography color="error" variant="body2">{mutationError.message}</Typography>}
          {successMessage && <Typography color="primary" variant="body2">{successMessage}</Typography>}

          <div className="button-container-form">
            <Button type="submit" className="task-form button" sx={{ backgroundColor: '#2196f3', color: 'black' }}>
              {loading ? 'Añadiendo foto...' : 'Crear foto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPhoto;
