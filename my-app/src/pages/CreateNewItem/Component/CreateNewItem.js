import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarLogged';
import '../Style/CreateNewItem.css';
import { CREATE_ITEM_MUTATION } from '../Query/CreateNerItemQuery';
import { GET_ITEMS, GET_TODOLIST_ID } from '../../TaskTable/Query/TaskTableQuery';

const CreateNewItem = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [formError, setFormError] = useState(""); // Renamed this to formError
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const id_todolistl = localStorage.getItem("id_todolist");
  console.log("idToDolist:", id_todolistl);

  const { data, loading: loadingItems, error: queryError } = useQuery(GET_ITEMS, {
    variables: { id_todolist: id_todolistl },
    skip: !id_todolistl,
  });

  const [createItem, { loading: loadingCreateItem, error: mutationError }] = useMutation(CREATE_ITEM_MUTATION, {
    update(cache, { data: { insert_item_one } }) {
      if (data && data.item) {
        const newItem = insert_item_one;
        const existingItems = data.item || [];

        cache.writeQuery({
          query: GET_ITEMS,
          variables: { id_todolist: id_todolistl },
          data: {
            item: [...existingItems, newItem],
          },
        });
      }
    },
    refetchQueries: [{ query: GET_ITEMS, variables: { id_todolist: id_todolistl } }],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de que todos los campos estén completos
    if (!taskTitle || !taskDescription || !status || !priority) {
      setFormError("Please fill out all fields."); // Updated to formError
      return;
    }

    try {
      // Ejecutamos la mutación pasando las variables necesarias
      const { data } = await createItem({
        variables: {
          name_item: taskTitle,
          description_item: taskDescription,
          state_item: status,
          priority_item: priority,
          id_todolist: id_todolistl,
        },
      });

      if (data) {
        alert("Task created successfully!");
        navigate('/homeLogged/todolist');
      } else {
        setFormError("There was an error creating the task."); // Updated to formError
      }
    } catch (err) {
      setFormError("There was an error creating the task."); // Updated to formError
      console.error(err);
    }
  };

  if (loadingItems) return <p>Loading...</p>;

  return (
    <div className="task-form-container">
      <ResponsiveAppBarNormal />
      <div className="task-form">
        <h1 className="title">Crear Tarea</h1>
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

          {formError && <Typography color="error" variant="body2">{formError}</Typography>} {/* Updated to formError */}
          {mutationError && <Typography color="error" variant="body2">{mutationError.message}</Typography>} {/* Mostrar el error de la mutación */}

          <div className="button-container-form">
            <Button type="submit" className="task-form button" sx={{ backgroundColor: '#2196f3', color: 'black' }}>
              {loadingCreateItem ? 'Creando tarea...' : 'Crear tarea'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewItem;
