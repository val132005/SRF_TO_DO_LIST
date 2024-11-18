import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DeleteTaskDialog = ({ open, onClose, onDelete, task }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmación</DialogTitle>
      <DialogContent>
        <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => onDelete(task)} color="primary">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
