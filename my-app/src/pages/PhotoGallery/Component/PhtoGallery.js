import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../Style/PhotoGallery.css";

const CardList = ({ items = [], onAdd, onEdit, onDelete }) => {
  // Aseguramos que items tenga un valor predeterminado como un array vacío
  return (
    <div className="card-container">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="card-item" key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image || "https://via.placeholder.com/300"}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={() => onAdd(item.id)}
                >
                  Agregar
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(item.id)}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(item.id)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </div>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" style={{ textAlign: "center", marginTop: "20px" }}>
          No hay elementos para mostrar.
        </Typography>
      )}
    </div>
  );
};

export default CardList;
