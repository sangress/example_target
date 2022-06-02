import { useEffect, useState } from "react";
import styled from "styled-components";

const ListItem = styled.li`
  color: #ffffff;
  font-size: 1.4rem;
  &:before {
    margin-right: 5px;
    content: "${({ checked }) => (checked ? "\\2611" : "\\2610")}";
  }
  margin-bottom: 20px;
`;

const ListItemLabel = styled.span`
  color: #ffffff;
  font-size: 1.4rem;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "")};
`;

const ChildrenTodos = styled.ul`
  margin: 0;
  list-style: none;
`;

function Todo({ todo, checkTodo, checkTodoChild }) {
  return (
    <ListItem
      checked={todo.checked}
      onClick={checkTodo}
      contentEditable={false}
    >
      <ListItemLabel checked={todo.checked}>{todo.title}</ListItemLabel>
      {!!todo.children.length && (
        <ChildrenTodos>
          {todo.children.map((child) => (
            <ListItem
              contentEditable={false}
              key={child.title}
              onClick={(evt) => {
                evt.stopPropagation();
                if (todo.checked) {
                  return;
                }
                child.checked = !child.checked;
                checkTodoChild && checkTodoChild(todo);
              }}
              checked={child.checked || todo.checked}
            >
              <ListItemLabel checked={child.checked}>
                {child.title}
              </ListItemLabel>
            </ListItem>
          ))}
        </ChildrenTodos>
      )}
    </ListItem>
  );
}

export default Todo;
