import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardMedia, Button } from '@mui/material';
import { GET_PHOTOGALLERY_ID, GET_PHOTOS } from '../Query/PhtoGalleryListQuery';
import ResponsiveAppBarLogged from '../../../assets/ResponsiveAppBarLogged';
import { useNavigate } from 'react-router-dom';

const PhotoGalleryList = () => {
  const userId = localStorage.getItem("userId");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { data: galleryData, loading: galleryLoading, error: galleryError } = useQuery(GET_PHOTOGALLERY_ID, {
    variables: { userId },
  });

  const { data: photoData, loading: photoLoading, error: photoError } = useQuery(GET_PHOTOS, {
    skip: !galleryData,
    variables: { id_photogallery: galleryData?.photogallery[0]?.id_photogallery },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (photoData && photoData.photo) {
      setPhotos(photoData.photo);
    }
  }, [photoData]);

  if (galleryLoading || photoLoading) return <p>Loading...</p>;
  if (galleryError) return <p>Error en la galería: {galleryError.message}</p>;
  if (photoError) return <p>Error en las fotos: {photoError.message}</p>;

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo); // Establece la foto seleccionada
  };

  // Funciones de redireccionamiento para cada botón
  const handleAddClick = () => {
    navigate("/homeLogged/photogallery/createphoto"); // Redirecciona a la página de agregar foto
  };

  const handleEditClick = () => {
    if (selectedPhoto) {
      navigate(`/homeLogged/photogallery/editphoto/${selectedPhoto.id_photo}`); // Redirecciona a la página de editar foto
    }
  };

  const handleDeleteClick = () => {
    if (selectedPhoto) {
      navigate(`/delete-photo/${selectedPhoto.id_photo}`); // Redirecciona a la página de eliminar foto
    }
  };

  return (
    
    <div>
      <ResponsiveAppBarLogged />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px', // Espacio entre las fotos
          padding: '16px',
          margin: '50px',
        }}
        onClick={() => setSelectedPhoto(null)} // Deselecciona la foto si haces clic en un área vacía
      >
        {photos.map((photo) => (
          <div
            key={photo.id_photo}
            style={{
              flex: '1 1 calc(33.333% - 16px)', // Se adapta al tamaño del contenedor
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic en la foto cierre la selección
              handlePhotoClick(photo);
            }}
          >
            <Card
              style={{
                border: selectedPhoto === photo ? '3px solid #1976d2' : 'none', // Borde azul cuando está seleccionada
                boxShadow: selectedPhoto === photo ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : 'none', // Sombra cuando está seleccionada
                transition: 'transform 0.5s, box-shadow 0.3s', // Transición suave
                transform: selectedPhoto === photo ? 'scale(1.02)' : 'none', // Efecto de escala cuando se selecciona
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={photo.content_photo} // La URL de la foto se usa aquí
                alt={`Photo ${photo.id_photo}`}
              />
            </Card>
          </div>
        ))}
      </div>
  
      
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Button
          variant="contained"
          onClick={handleAddClick}
          style={{
            backgroundColor: '#1976d2', // Azul
            color: 'black', // Texto negro
            borderRadius: 10,
            color: 'white',
          }}
        >
          Agregar
        </Button>
      </div>
  
      {/* Botones Modificar y Eliminar solo visibles si se selecciona una foto */}
      {selectedPhoto && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            variant="contained"
            onClick={handleEditClick}
            style={{
              backgroundColor: '#1976d2', // Azul
              color: 'white',
              borderRadius: 10,
            }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteClick}
            style={{
              backgroundColor: '#1976d2', // Azul oscuro
              color: 'white',
              borderRadius: 10,
            }}
          >
            Eliminar
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryList;
