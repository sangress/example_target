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
    <ListItem checked={todo.checked} onClick={checkTodo}>
      <ListItemLabel
        onClick={(evt) => evt.stopPropagation()}
        contentEditable={!todo.checked}
        checked={todo.checked}
        onKeyPress={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            evt.target.blur();
            // TODO: save
          }
        }}
      >
        {todo.title}
      </ListItemLabel>
      {!!todo.children.length && (
        <ChildrenTodos>
          {todo.children.map((child) => (
            <ListItem
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
              <ListItemLabel
                checked={child.checked}
                contentEditable={!child.checked}
                onKeyPress={(evt) => {
                  if (evt.key === "Enter") {
                    evt.preventDefault();
                    evt.target.blur();
                    // TODO: save
                  }
                }}
                onClick={(evt) => evt.stopPropagation()}
              >
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
