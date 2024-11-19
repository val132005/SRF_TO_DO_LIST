import React, { useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DeletePhotoDialog = ({ open, onClose, onDelete, photo }) => {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (open && cancelButtonRef.current) {
      cancelButtonRef.current.focus(); // Enfocar el botón "Cancelar" cuando se abre el diálogo
    }
  }, [open]);

  if (!photo) return null;

  return (
    <Dialog open={open} onClose={onClose} disableEnforceFocus>
      <DialogTitle>Confirmación</DialogTitle>
      <DialogContent>
        <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
      </DialogContent>
      <DialogActions>
        <Button
          ref={cancelButtonRef}
          onClick={onClose}
          color="primary"
        >
          Cancelar
        </Button>
        <Button onClick={() => onDelete(photo)} color="primary">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePhotoDialog;
