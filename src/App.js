import './App.css';
import TodoList from './components/TodoList';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { TodosContexts } from './contexts/todosContexts';

import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: ["Kode-Mono"],
  },
  palette: {
    primary: {
      main: "#1b5e20",
    }
  }
})

const initialTodos = [
  {
    id: uuidv4(),
    title: "Gym Time",
    details: "go to the gym at 10:00",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "Read Book",
    details: "Algorithms Analysis page: 94",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "Cooking Dinner",
    details: "meat + rice + vegetables + spices",
    isCompleted: false
  }
]

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#191b1f",
          padding: "50px 0"
        }}>
        <TodosContexts.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContexts.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
