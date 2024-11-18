import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material"; // Importamos íconos
import { useNavigate } from "react-router-dom";
import "../Style/TaskTable.css";
import ResponsiveAppBarLogged from '../../../assets/ResponsiveAppBarLogged';
import { useQuery, gql } from "@apollo/client";
import { GET_TODOLIST_ID, GET_ITEMS } from '../Query/TaskTableQuery';


const TaskTable = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Obtener el ID del usuario desde el localStorage
  const [idTodolist, setIdTodolist] = useState(null);

  const { data: todoListData, loading: loadingTodolist, error: errorTodolist } = useQuery(GET_TODOLIST_ID, {
    variables: { userId: parseInt(userId) },
    skip: !userId, // ejecuta la consulta si el ID del usuario está disponible
  });

  useEffect(() => {
    if (todoListData && todoListData.users.length > 0) {
      setIdTodolist(todoListData.users[0].id_todolist);
    }
  }, [todoListData]);

  // Obtener los items de la lista de tareas 
  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { id_todolist: idTodolist },
    skip: !idTodolist, 
  });

  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    // Cuando los datos se obtienen de la query, los asignamos al estado 'tasks'
    if (data && data.item) {
      const fetchedTasks = data.item.map((item) => ({
        id: item.id_item, // Aquí asumimos que 'id_todolist' es el identificador único
        title: item.name_item,
        description: item.description_item,
        status: item.state_item,
        priority: item.priority_item,
        selected: false,
      }));
      setTasks(fetchedTasks);
    }
  }, [data]);

  // Manejar cambio de selección
  const handleSelect = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, selected: !task.selected } : task
      )
    );
  };

  if (loadingTodolist || loading) return <p>Loading...</p>;
  if (errorTodolist || error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ResponsiveAppBarLogged />

      <div className='tableClassDiv tableDivCont'>
        <TableContainer component={Paper} className="taskTableContainerTT">
          <Table className="taskTableTT">
            <TableHead className="taskTableHeadTT">
              <TableRow>
                <TableCell>Seleccionar</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Prioridad</TableCell>
                <TableCell>
                  Acciones
                  <span style={{ marginLeft: "10px" }}> {/* Espacio entre "Acciones" e ícono */}
                    <IconButton
                      color="default"
                      onClick={() => navigate("/homeLogged/todolist/createnewitem")}
                      aria-label="Agregar tarea"
                      style={{ color: "black" }} // Aseguramos que el ícono sea negro
                    >
                      <Add />
                    </IconButton>
                  </span>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  style={{
                    backgroundColor: task.selected ? "#006400" : "",
                    color: task.selected ? "#fff" : "",
                  }}
                  className="taskRow"
                >
                  <TableCell>
                    <Checkbox
                      checked={task.selected}
                      onChange={() => handleSelect(task.id)}
                      className="checkbox"
                    />
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell
                    className={`${task.priority === "Alta"
                      ? "taskPriorityHighTT"
                      : task.priority === "Media"
                        ? "taskPriorityMediumTT"
                        : "taskPriorityLowTT"
                      }`}
                  >
                    {task.priority}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate("/")}
                      aria-label="Ver tarea"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => navigate(`/homeLogged/todolist/edititem/${task.id}`)}
                      aria-label="Editar tarea"
                    >
                      <Edit className="iconNumber1" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => navigate("/")}
                      aria-label="Borrar tarea"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TaskTable;
