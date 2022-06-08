import styled from "styled-components";
import { AddButton, AddButtonLabel } from "../App";

const ListItem = styled.li`
  color: #ffffff;
  font-size: 1.4rem;
  &:before {
    margin-right: 5px;
    content: "${({ checked }) => (checked ? "\\2611" : "\\2610")}";
  }
  margin-bottom: 20px;
  position: relative;
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

function updateChild(todo, newText, isChecked, i) {
  return {
    ...todo,
    children: todo.children.map((c, j) => {
      if (j === i) {
        return { title: newText || c.title, checked: isChecked };
      }
      return c;
    }),
  };
}

function Todo({ todo, checkTodo, checkTodoChild, addChildTodo, updateTodo }) {
  return (
    <ListItem checked={todo.checked} onClick={checkTodo}>
      <ListItemLabel
        onClick={(evt) => evt.stopPropagation()}
        contentEditable={!todo.checked}
        suppressContentEditableWarning={true}
        checked={todo.checked}
        onKeyPress={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            evt.target.blur();
          }
        }}
        onBlur={(evt) => {
          updateTodo && updateTodo({ ...todo, title: evt.target.innerText });
        }}
      >
        {todo.title}
      </ListItemLabel>
      {!!todo.children.length && (
        <ChildrenTodos>
          {/* TODO: fix duplication */}
          {todo.children.map((child, i) => (
            <ListItem
              key={`${child.title}.${i}`}
              onClick={(evt) => {
                evt.stopPropagation();
                if (todo.checked) {
                  return;
                }
                child.checked = !child.checked;
                checkTodoChild && checkTodoChild(todo);
                updateTodo &&
                  updateTodo(updateChild(todo, null, child.checked, i));
              }}
              checked={child.checked || todo.checked}
            >
              <ListItemLabel
                checked={child.checked || todo.checked}
                contentEditable={!child.checked}
                suppressContentEditableWarning={true}
                onKeyPress={(evt) => {
                  if (evt.key === "Enter") {
                    evt.preventDefault();
                    evt.target.blur();
                  }
                }}
                onClick={(evt) => evt.stopPropagation()}
                onBlur={(evt) => {
                  updateTodo &&
                    updateTodo(
                      updateChild(todo, evt.target.innerText, child.checked, i)
                    );
                }}
              >
                {child.title}
              </ListItemLabel>
            </ListItem>
          ))}
        </ChildrenTodos>
      )}
      <ChildrenTodos>
        <AddButton
          size={"small"}
          positioned={false}
          onClick={(evt) => {
            evt.stopPropagation();
            addChildTodo(todo, { title: "new sub" });
          }}
        >
          <AddButtonLabel size={"small"}></AddButtonLabel>
        </AddButton>
      </ChildrenTodos>
    </ListItem>
  );
}

export default Todo;
