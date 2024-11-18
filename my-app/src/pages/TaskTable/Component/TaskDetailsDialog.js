// src/components/TaskDetailsDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const TaskDetailsDialog = ({ open, onClose, task }) => {
  if (!task) return null; // Si no hay tarea, no mostrar el diálogo.

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles de la tarea</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Título:</Typography>
        <Typography>{task.title}</Typography>
        <Typography variant="h6">Descripción:</Typography>
        <Typography>{task.description}</Typography>
        <Typography variant="h6">Estado:</Typography>
        <Typography>{task.status}</Typography>
        <Typography variant="h6">Prioridad:</Typography>
        <Typography>{task.priority}</Typography>
        <Typography variant="h6">ID:</Typography>
        <Typography>{task.id}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsDialog;
