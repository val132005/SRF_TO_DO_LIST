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
import { Edit, Delete, Add, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../Style/TaskTable.css";
import ResponsiveAppBarLogged from '../../../assets/ResponsiveAppBarLogged';
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_TODOLIST_ID, GET_ITEMS, DELETE_ITEM } from '../Query/TaskTableQuery';
import TaskDetailsDialog from './TaskDetailsDialog'; // Importa el nuevo componente
import DeleteTaskDialog from './DeleteTaskDialog'; // Importa el nuevo componente de diálogo para eliminar tarea

const TaskTable = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [idTodolist, setIdTodolist] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Estado para el diálogo de detalles
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { data: todoListData, loading: loadingTodolist, error: errorTodolist } = useQuery(GET_TODOLIST_ID, {
    variables: { userId: parseInt(userId) },
    skip: !userId,
  });

  const { data, loading, error } = useQuery(GET_ITEMS, {
    variables: { id_todolist: idTodolist },
    skip: !idTodolist,
  });

  useEffect(() => {
    if (todoListData && todoListData.users.length > 0) {
      setIdTodolist(todoListData.users[0].id_todolist);
    }
  }, [todoListData]);

  useEffect(() => {
    if (data && data.item) {
      const fetchedTasks = data.item.map((item) => ({
        id: item.id_item,
        title: item.name_item,
        description: item.description_item,
        status: item.state_item,
        priority: item.priority_item,
        selected: false,
      }));
      setTasks(fetchedTasks);
    }
  }, [data]);

  const handleSelect = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const handleOpenConfirmDialog = (task) => {
    setSelectedTask(task);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedTask(null);
  };

  const handleOpenDetailsDialog = (task) => {
    setSelectedTask(task);
    setOpenDetailsDialog(true); // Abre el diálogo de detalles
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false); // Cierra el diálogo de detalles
    setSelectedTask(null);
  };

  const [deleteItem] = useMutation(DELETE_ITEM, {
    onCompleted: () => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
      handleCloseConfirmDialog();
    },
    onError: (error) => {
      console.error("Error al eliminar la tarea:", error.message);
    },
  });

  const handleDeleteTask = (task) => {
    deleteItem({ variables: { id_item: task.id } });
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
                  <span style={{ marginLeft: "10px" }}>
                    <IconButton
                      color="default"
                      onClick={() => navigate("/homeLogged/todolist/createnewitem")}
                      aria-label="Agregar tarea"
                      style={{ color: "black" }}
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
                    backgroundColor: task.selected ? "#ADD8E6" : "",
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
                  <TableCell className={`taskPriority${task.priority}`}>
                    {task.priority}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDetailsDialog(task)} // Abre el diálogo de detalles
                      aria-label="Ver tarea"
                    >
                      <Visibility /> {/* Icono de ver */}
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => navigate(`/homeLogged/todolist/edititem/${task.id}`)}
                      aria-label="Editar tarea"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenConfirmDialog(task)}
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

      {/* Diálogo de confirmación para eliminar tarea */}
      <DeleteTaskDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onDelete={handleDeleteTask}
        task={selectedTask}
      />

      {/* Diálogo de detalles de la tarea */}
      <TaskDetailsDialog
        open={openDetailsDialog}
        onClose={handleCloseDetailsDialog}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskTable;
