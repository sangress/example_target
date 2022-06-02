import { useEffect, useState } from "react";
import styled from "styled-components";

const ListItem = styled.li`
  color: #ffffff;
  font-size: 1.4rem;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "")};
  &:before {
    margin-right: 5px;
    content: "${({ checked }) => (checked ? "\\2713" : "\\2610")}";
  }
`;

const ChildrenTodos = styled.ul`
  margin: 0;
  list-style: none;
`;

function Todo({ todo, checkTodo, checkTodoChild }) {
  return (
    <ListItem checked={todo.checked} onClick={checkTodo}>
      {todo.title}
      {!!todo.children.length && (
        <ChildrenTodos>
          {todo.children.map((child) => (
            <ListItem
              contentEditable={false}
              key={child.title}
              onClick={(evt) => {
                evt.stopPropagation();
                child.checked = !child.checked;
                checkTodoChild && checkTodoChild(todo);
              }}
              checked={child.checked || todo.checked}
            >
              {child.title}
            </ListItem>
          ))}
        </ChildrenTodos>
      )}
    </ListItem>
  );
}

export default Todo;
