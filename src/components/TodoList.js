import * as React from 'react';
import Container from '@mui/material/Container';

import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Grid from '@mui/material/Unstable_Grid2';

import TextField from '@mui/material/TextField';


import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";


// Compnents
import Todo from "./Todo"

// Other External Library

import { TodosContexts } from '../contexts/todosContexts';
import { useState } from 'react';

import { useContext } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

import { v4 as uuidv4 } from 'uuid';


export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContexts);
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");

  const [displayedTodosType, setDisplayedTodosType] = useState("all")


  // Filtration arrays


  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos])

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos])

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed-todos") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "not-completed-todos") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosTasks = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });



  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos)
  }, []);


  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value)
  }


  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: detailsInput,
      isCompleted: false,
    }

    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    setDetailsInput("");
  }

  return (
    <Container maxWidth="md">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}>
        <CardContent>
          <Typography variant='h2'>
            My Tasks List
          </Typography>
          <Divider />
          {/* Filter Buttons */}
          <ToggleButtonGroup
            style={{ marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="all">
              All
            </ToggleButton>
            <ToggleButton value="completed-todos">
              Done
            </ToggleButton>
            <ToggleButton value="not-completed-todos">
              Todo
            </ToggleButton>
          </ToggleButtonGroup>
          {/* ======Filter Buttons====== */}

          {/* All Todos */}
          {todosTasks}
          {/* ======All Todos====== */}

          {/* Add Button + Input */}
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid xs={5} display="flex" justifyContent="space-around" alignItems="center">
              <TextField id="outlined-basic" label="Task Title" variant="outlined" style={{ width: "100%" }} value={titleInput} onChange={(e) => { setTitleInput(e.target.value) }} />
            </Grid>

            <Grid xs={5} display="flex" justifyContent="space-around" alignItems="center">
              <TextField id="outlined-basic" label="Task Details" variant="outlined" style={{ width: "100%" }} value={detailsInput} onChange={(e) => { setDetailsInput(e.target.value) }} />
            </Grid>

            <Grid xs={2} display="flex" justifyContent="space-around" alignItems="center">
              <Button variant="contained" style={{ width: "100%", height: '100%' }} onClick={() => {
                handleAddClick()
              }}
                disabled={titleInput == 0}>Add</Button>
            </Grid>
          </Grid>
          {/* ======Add Button + Input====== */}

        </CardContent>
      </Card>
    </Container>
  )
};
