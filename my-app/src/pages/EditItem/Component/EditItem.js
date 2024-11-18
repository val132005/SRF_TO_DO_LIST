import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarLogged';
import '../Style/EditItem.css';
import { UPDATE_ITEM } from '../Query/EditItemQuey';
import { GET_ITEMS, GET_TODOLIST_ID } from '../../TaskTable/Query/TaskTableQuery';

const EditItem = () => {
  const { id } = useParams();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [updateTask, { loading, error: mutationError }] = useMutation(UPDATE_ITEM, {
    update: (cache, { data: { update_item_by_pk } }) => {
      if (!update_item_by_pk) return;
  
      const idTodolist = 1; // Usa el ID correcto si lo obtienes dinámicamente
      const existingItems = cache.readQuery({
        query: GET_ITEMS,
        variables: { id_todolist: idTodolist },
      });
  
      if (existingItems?.item) {
        const updatedItems = existingItems.item.map((item) =>
          item.id_item === update_item_by_pk.id_item ? update_item_by_pk : item
        );
  
        cache.writeQuery({
          query: GET_ITEMS,
          variables: { id_todolist: idTodolist },
          data: { item: updatedItems },
        });
      }
    },
    onCompleted: () => {
      alert("¡Tarea actualizada con éxito!");
      navigate("/HomeLogged/todolist");
    },
    onError: (error) => {
      console.error("Error al actualizar la tarea:", error);
      setError("Hubo un error al actualizar la tarea. Intenta nuevamente.");
    },
  });
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !status || !priority) {
      setError("Please fill out all fields.");
      return;
    }

    console.log("Form data:", {
      id_item: parseInt(id),
      name_item: taskTitle,
      description_item: taskDescription,
      state_item: status,
      priority_item: priority,
      id_todolist: 1,
    });

    try {
      const { data } = await updateTask({
        variables: {
          id_item: parseInt(id),
          name_item: taskTitle,
          description_item: taskDescription,
          state_item: status,
          priority_item: priority,
          id_todolist: 1,
        },
      });

      console.log("Mutation response:", data);

      alert("¡Tarea actualizada con éxito!");
      navigate("/HomeLogged/todolist");
    } catch (err) {
      console.error("Error al actualizar la tarea:", err);
      setError("Hubo un error al actualizar la tarea. Intenta nuevamente.");
    }
  };

  return (
    <div className="task-form-container">
      <ResponsiveAppBarNormal />
      <div className="task-form">
        <h1 className="title">Editar Tarea</h1>
        <p className="text">Por favor, ingresa los detalles de la tarea</p>

        <form onSubmit={handleFormSubmit} className="formBigContainer">
          <TextField
            required
            label="Título de la tarea"
            variant="outlined"
            name="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="MuiTextField-root"
            sx={{ width: '80%', marginBottom: '15px' }}
          />

          <TextField
            required
            label="Descripción de la tarea"
            variant="outlined"
            name="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="MuiTextField-root"
            sx={{ width: '80%', marginBottom: '15px' }}
            multiline
            rows={4}
          />

          <FormControl required sx={{ width: '80%', marginBottom: '15px' }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Estado"
            >
              <MenuItem value={"undone"}>undone</MenuItem>
              <MenuItem value={"in_process"}>in_process</MenuItem>
              <MenuItem value={"done"}>done</MenuItem>
            </Select>
          </FormControl>

          <FormControl required sx={{ width: '80%', marginBottom: '15px' }}>
            <InputLabel>Nivel de prioridad</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Nivel de prioridad"
            >
              <MenuItem value={"high"}>high</MenuItem>
              <MenuItem value={"medium"}>medium</MenuItem>
              <MenuItem value={"low"}>low</MenuItem>
            </Select>
          </FormControl>

          {error && <Typography color="error" variant="body2">{error}</Typography>}
          {mutationError && <Typography color="error">Error: {mutationError.message}</Typography>}
          {loading && <Typography color="textSecondary">Actualizando...</Typography>}

          <div className="button-container-form">
            <Button type="submit" className="task-form button" sx={{ backgroundColor: '#2196f3', color: 'black' }} disabled={loading}>
              Editar tarea
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
