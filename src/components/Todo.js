import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Unstable_Grid2';

import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { useContext } from 'react';
import { TodosContexts } from '../contexts/todosContexts';
import { useState } from 'react';


// PopUp Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';



export default function Todo({ todo, handleCheck }) {
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [editTodo, setEditTodo] = useState({ title: todo.title, details: todo.details })
  const { todos, setTodos } = useContext(TodosContexts);


  // Event Handlers

  // Delete Handler
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      console.log("clicked")
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      } else {
        return true;
      }
    })
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

  }

  function handleDeleteClick() {
    setShowDeletePopUp(true);
  };

  function handleDeleteDialogClose() {
    setShowDeletePopUp(false);
  };


  // ======Delete Handler======


  //Edit Handler
  function handleEditClick() {
    setShowEditPopUp(true);
  }

  function handleEditClose() {
    setShowEditPopUp(false);
  }

  function handleEditConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: editTodo.title, details: editTodo.details }
      } else {
        return t;
      }
    })
    setTodos(updatedTodos);
    setShowEditPopUp(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

  }


  // ======Edit Handler======

  // ======Event Handlers======
  return (
    <>
      {/* Delete PopUp */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeletePopUp}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot undo the deletion after it is complete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Close</Button>
          <Button
            style={{ color: "red" }}
            onClick={handleDeleteConfirm}
          >Yes Delete</Button>
        </DialogActions>
      </Dialog>
      {/* ======Delete PopUp====== */}

      {/* Edit PopUp Field */}
      <Dialog
        onClose={handleEditClose}
        open={showEditPopUp}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-title">Edit this task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task title"
            fullWidth
            variant="standard"
            value={editTodo.title}
            onChange={(e) => { setEditTodo({ ...editTodo, title: e.target.value }) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task details"
            fullWidth
            variant="standard"
            value={editTodo.details}
            onChange={(e) => { setEditTodo({ ...editTodo, details: e.target.value }) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Close
          </Button>
          <Button autoFocus onClick={handleEditConfirm}
          >Confirm Edits</Button>
        </DialogActions>
      </Dialog>
      {/* ======Edit PopUp Field====== */}

      <Card className="todoCard" sx={{ minWidth: 275, background: "#5e35b1", color: "white", marginTop: 5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography variant='h5' sx={{
                textAlign: "left",
                textDecoration: todo.isCompleted ? "line-through" : "none"
              }}>
                {todo.title}
              </Typography>

              <Typography variant='h6' sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            {/* Action Buttons */}
            <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center">

              {/* Check Icon Button */}
              <IconButton
                onClick={() => { handleCheckClick() }}
                className="iconButton"
                aria-label="delete"
                style={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "solid #8bc34a 3px"
                }}>
                <CheckIcon />
              </IconButton>
              {/* ======Check Icon Button====== */}

              {/* Edit Button */}
              <IconButton
                onClick={handleEditClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px"
                }}>
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* ======Edit Button====== */}

              {/* Delete Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px"
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ======Delete Button====== */}
            </Grid>
            {/* ======Action Buttons====== */}
          </Grid>

        </CardContent>
      </Card>
    </>
  )
};

