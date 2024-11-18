import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery} from '@apollo/client';
import ResponsiveAppBarNormal from '../../../assets/ResponsiveAppBarLogged';
import '../Style/CreateNewItem.css';
import { CREATE_ITEM_MUTATION } from '../Query/CreateNerItemQuery';
import { GET_ITEMS, GET_TODOLIST_ID } from '../../TaskTable/Query/TaskTableQuery';




const CreateNewItem = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { loading: loadingUserId, error: userError, data: userData } = useQuery(GET_TODOLIST_ID, {
    variables: { userId: parseInt(userId) }, 
  });

  const { loading: loadingItems, error: itemsError, data: itemsData } = useQuery(GET_ITEMS, {
    variables: { id_todolist: userData?.users[0]?.id_todolist },
    skip: loadingUserId || !userData, // No ejecutar la consulta hasta que tengamos el userId
  });



  const [createItem, { loading, error: mutationError }] = useMutation(CREATE_ITEM_MUTATION, {
    update(cache, { data: { insert_item_one } }) {
      if (itemsData && itemsData.item) {
        const newItem = insert_item_one;
        const existingItems = itemsData.item || [];

        // Actualiza el caché con el nuevo item
        cache.writeQuery({
          query: GET_ITEMS,
          variables: { id_todolist: userData?.users[0]?.id_todolist },
          data: {
            item: [...existingItems, newItem],
          },
        });
      }
    },
    refetchQueries: [{ query: GET_ITEMS, variables: { id_todolist: userData?.users[0]?.id_todolist } }],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !status || !priority) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Ejecutamos la mutación pasando las variables necesarias
      const { data } = await createItem({
        variables: {
          name_item: taskTitle,
          description_item: taskDescription,
          state_item: status,   // Asegúrate de que estos valores coincidan con los valores esperados por tu GraphQL API
          priority_item: priority,
          id_todolist: userData?.users[0]?.id_todolist, // Asumiendo que el ID del todo list es 1, reemplaza esto con el ID correspondiente si es necesario
        },
        
      });

      if (data) {
        // Si la mutación es exitosa, redirigimos o mostramos un mensaje
        alert("Task created successfully!");
        navigate("/HomeLogged/todolist"); // Redirige a la página de inicio
      } else {
        setError("There was an error creating the task.");
      }
    } catch (err) {
      setError("There was an error creating the task.");
      console.error(err);
    }


  };

  if (loadingUserId || loadingItems) return <p>Loading...</p>;


  return (
    <div className="task-form-container">
      <ResponsiveAppBarNormal />
      <div className="task-form">
        <h1 className="title">Crear Tarea</h1>
        <p className="text">Por favor, ingresa los detalles de la tarea</p>

        <form onSubmit={handleFormSubmit} className='formBigContainer'>
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
          {mutationError && <Typography color="error" variant="body2">{mutationError.message}</Typography>} {/* Mostrar el error de la mutación */}

          <div className="button-container-form">
            <Button type="submit" className="task-form button" sx={{ backgroundColor: '#2196f3', color: 'black' }}>
              {loading ? 'Creando tarea...' : 'Crear tarea'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewItem;
