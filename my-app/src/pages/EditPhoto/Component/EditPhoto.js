import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarLogged';
import '../../CreateNewItem/Style/CreateNewItem.css';
import { UPDATE_PHOTO, GET_PHOTO_BY_ID } from '../Query/EditPhotoQuery';
import { GET_PHOTOGALLERY_ID, GET_PHOTOS } from '../../PhotoGallery/Query/PhtoGalleryListQuery';





const EditPhoto = () => {
  const { id } = useParams();
  const [photoContent, setPhotoContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [successMessage, setSuccessMessage] = useState("");

  const { loading: loadingUserId, error: userError, data: userData } = useQuery(GET_PHOTOGALLERY_ID, {
    variables: { userId: parseInt(userId) }, 
  });

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_PHOTO_BY_ID, {
    variables: { id: parseInt(id) },
  });

  const [updatePhoto, { loading, error: mutationError }] = useMutation(UPDATE_PHOTO, {
    update: (cache, { data: { update_photo_by_pk } }) => {
      if (!update_photo_by_pk) return;
  
      const idPhotoGallery = userData?.photogallery?.[0]?.id_photogallery; // Usa el ID correcto si lo obtienes dinámicamente
      const existingPhotos = cache.readQuery({
        query: GET_PHOTOS,
        variables: { id_photogallery: idPhotoGallery },
      });
  
      if (existingPhotos?.photo) {
        const updatedPhotos = existingPhotos.photo.map((photo) =>
          photo.id_photo === update_photo_by_pk.id_photo ? update_photo_by_pk : photo
        );
  
        cache.writeQuery({
          query: GET_PHOTOS,
          variables: { id_photogallery: idPhotoGallery },
          data: { photo: updatedPhotos },
        });
      }
    },
    onCompleted: () => {
      alert("¡Tarea actualizada con éxito!");
      navigate("/homeLogged/photogallery");
    },
    onError: (error) => {
      console.error("Error al actualizar la photo:", error);
      setError("Hubo un error al actualizar la photo. Intenta nuevamente.");
    },
  });

  useEffect(() => {
    if (data?.photo_by_pk) {
      setPhotoContent(data.photo_by_pk.content_photo || "");
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!photoContent) {
      setError("Please fill out all fields.");
      return;
    }

    console.log("Form data:", {
      id_photo: parseInt(id),
      content_photo: photoContent,
      id_photogallery: userData?.photogallery?.[0]?.id_photogallery,
    });

    try {
      const { data } = await updatePhoto({
        variables: {
          id_photo: parseInt(id),
          content_photo: photoContent,
          id_photogallery: userData?.photogallery?.[0]?.id_photogallery,
        },
      });

      console.log("Mutation response:", data);

      alert("¡Tarea actualizada con éxito!");
      navigate("/homeLogged/photogallery");
    } catch (err) {
      console.error("Error al actualizar la tarea:", err);
      setError("Hubo un error al actualizar la tarea. Intenta nuevamente.");
    }
  };


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

export default EditPhoto;
