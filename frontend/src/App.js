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
  position: ${({ positioned }) => (positioned ? "absolute" : "initial")};
  bottom: 50px;
  right: 50px;
  width: ${({ size }) => (size === "small" ? "24px" : "64px")};
  height: ${({ size }) => (size === "small" ? "24px" : "64px")};
  padding: 0;
`;

const AddButtonLabel = styled.span`
  font-size: ${({ size }) => (size === "small" ? "1rem" : "2rem")};
  &:before {
    content: "\\2795";
  }
`;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const { data } = await axios.get("/api/todo");
      setTodos(data);
    }

    return () => {
      fetchTodos();
    };
  }, []);

  const updateTodo = useCallback(async (todoToUpdate) => {
    await axios.put("/api/todo", {
      id: todoToUpdate.id,
      title: todoToUpdate.title,
      children: todoToUpdate.children,
      checked: todoToUpdate.checked,
    });
  }, []);

  const onCheckTodo = useCallback(
    (todoToCheck) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === todoToCheck.id) {
            todo.checked = !todoToCheck.checked;
          }
          return todo;
        })
      );
      updateTodo(todoToCheck);
    },
    [todos, updateTodo]
  );

  const checkTodoChild = useCallback(
    (todoToCheck) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === todoToCheck.id) {
            todo = todoToCheck;
          }
          return todo;
        })
      );
      updateTodo(todoToCheck);
    },
    [todos, updateTodo]
  );

  const addTodo = useCallback(() => {
    async function addNewTodo() {
      const { data } = await axios.post("/api/todo", {
        title: "new mission",
        children: [],
        checked: false,
      });

      setTodos([...todos, data]);
    }

    return () => {
      addNewTodo();
    };
  }, [todos]);

  const addChildTodo = useCallback(
    async (todoToUpdate, new_sub) => {
      const { data } = await axios.put("/api/todo/sub", {
        id: todoToUpdate.id,
        title: todoToUpdate.title,
        children: todoToUpdate.children,
        checked: todoToUpdate.checked,
        new_sub,
      });

      setTodos(
        todos.map((todo) => {
          if (todo.id === data.id) {
            return data;
          }
          return todo;
        })
      );
    },
    [todos]
  );

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
              addChildTodo={addChildTodo}
              updateTodo={updateTodo}
            ></Todo>
          ))}
        </Todos>
        <AddButton onClick={addTodo()} positioned={true}>
          <AddButtonLabel></AddButtonLabel>
        </AddButton>
      </Content>
    </Container>
  );
}

export default App;

export { AddButton, AddButtonLabel };
