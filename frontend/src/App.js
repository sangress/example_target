import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Todo from "./components/Todo";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const Todos = styled.ul`
  margin: 0;
  list-style: none;
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 64px;
  height: 64px;
  font-size: 2em;
`;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const { data } = await axios.get("/api/todo");
      console.log("__DATAT__", data);
      setTodos(data);
    }

    return () => {
      fetchTodos();
    };
  }, []);

  const onCheckTodo = useCallback((todoToCheck) => {
    // TODO: save
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoToCheck.id) {
          todo.checked = !todoToCheck.checked;
        }
        return todo;
      })
    );
  });

  const checkTodoChild = useCallback((todoToCheck) => {
    // TODO: save
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoToCheck.id) {
          todo = todoToCheck;
        }
        return todo;
      })
    );
  });

  return (
    <Container>
      <Content>
        <Todos>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              checkTodo={() => onCheckTodo(todo)}
              checkTodoChild={checkTodoChild}
            ></Todo>
          ))}
        </Todos>
        <AddButton>+</AddButton>
      </Content>
    </Container>
  );
}

export default App;
