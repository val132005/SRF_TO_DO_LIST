// PhotoGalleryList.js
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Card, Button } from '@mui/material';
import { GET_PHOTOGALLERY_ID, GET_PHOTOS, DELETE_PHOTO } from '../Query/PhtoGalleryListQuery';
import ResponsiveAppBarLogged from '../../../assets/ResponsiveAppBarLogged';
import { useNavigate } from 'react-router-dom';
import DeletePhotoDialog from './DeletePhotoDialog';

const PhotoGalleryList = () => {
  const userId = Number(localStorage.getItem('userId'));
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // Obtener ID de la galería
  const { data: galleryData, loading: galleryLoading, error: galleryError } = useQuery(GET_PHOTOGALLERY_ID, {
    variables: { userId },
  });

  // Obtener fotos de la galería
  const { data: photoData, loading: photoLoading, error: photoError } = useQuery(GET_PHOTOS, {
    skip: !galleryData,
    variables: { id_photogallery: galleryData?.photogallery[0]?.id_photogallery },
  });

  useEffect(() => {
    if (photoData?.photo) {
      setPhotos(photoData.photo);
    }
  }, [photoData]);

  // Eliminar foto
  const [deletePhoto] = useMutation(DELETE_PHOTO, {
    onCompleted: () => {
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id_photo !== selectedPhoto.id_photo));
      setSelectedPhoto(null);
    },
    onError: (error) => console.error('Error al eliminar la foto:', error.message),
  });

  const handleDeletePhoto = (photo) => {
    deletePhoto({ variables: { id_photo: photo.id_photo } });
  };

  if (galleryLoading || photoLoading) return <p>Cargando...</p>;
  if (galleryError || photoError) return <p>Error al cargar los datos.</p>;

  return (
    <div>
      <ResponsiveAppBarLogged />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          padding: '16px',
          margin: '50px auto',
          maxWidth: '1200px', // Centrar y limitar el ancho del contenedor
        }}
      >
        {photos.map((photo) => (
          <Card
            key={photo.id_photo}
            style={{
              cursor: 'pointer',
              border: selectedPhoto === photo ? '3px solid #1976d2' : 'none',
              boxShadow: selectedPhoto === photo ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
              transition: 'transform 0.5s, box-shadow 0.3s',
              transform: selectedPhoto === photo ? 'scale(1.02)' : 'none',
              height: '300px', // Altura fija del contenedor
              display: 'flex', // Usamos flexbox para centrar
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.content_photo}
              alt={`Photo ${photo.id_photo}`}
              style={{
                maxHeight: '100%', // La imagen no puede exceder la altura del contenedor
                maxWidth: '100%', // La imagen no puede exceder el ancho del contenedor
                objectFit: 'contain', // Escala la imagen manteniendo la proporción
              }}
            />
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {/* Botón Agregar */}
        <Button
          variant="contained"
          onClick={() => navigate('/homeLogged/photogallery/createphoto')}
          style={{ backgroundColor: '#1976d2', color: 'white', borderRadius: 10 }}
        >
          Agregar
        </Button>

        {/* Botones Editar y Eliminar */}
        {selectedPhoto && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="contained"
              onClick={() => navigate(`/homeLogged/photogallery/editphoto/${selectedPhoto.id_photo}`)}
              style={{ backgroundColor: '#1976d2', color: 'white', borderRadius: 10 }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenConfirmDialog(true)}
              style={{ backgroundColor: '#1976d2', color: 'white', borderRadius: 10 }}
            >
              Eliminar
            </Button>
          </div>
        )}
      </div>

      {/* Diálogo de confirmación */}
      <DeletePhotoDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onDelete={handleDeletePhoto}
        photo={selectedPhoto}
      />
    </div>
  );
};

export default PhotoGalleryList;
