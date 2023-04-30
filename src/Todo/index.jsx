import React from "react";
import Draggable from "react-draggable";
import randomColor from "randomcolor";
import { v4 as uuidv4 } from "uuid";
import cls from "./index.module.css";

export const Todo = () => {
  
  const [value, setValue] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  const onChange_Input = (event) => setValue(event.target.value);

  const deleteTodo = (id) => setTodos(todos.filter((item) => item.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      setTodos((items) => [
        ...items,
        {
          id: uuidv4(),
          item: value,
          color: randomColor({
            luminosity: "light",
          }),
          defaultPos: {
            x: 500,
            y: 500,
          },
        },
      ]);
      setValue("");
    } else {
      alert("Print somthing...");
    }
  };

  return (
    <React.Fragment>
      <form className={cls.todo_form}>
        <input
          type="text"
          placeholder="some value.."
          onChange={onChange_Input}
          value={value}
        />
        <button onClick={handleSubmit}>enter</button>
      </form>
      <div className={cls.todo_container}>
        {todos.map((todo) => (
          <Draggable key={todo.id}>
            <div
              className={cls.todo_card}
              style={{ backgroundColor: todo.color }}
            >
              <p className={cls.todo_title}>{todo.item}</p>
              <button
                onClick={() => deleteTodo(todo.id)}
                className={cls.todo_delete}
              >
                x
              </button>
            </div>
          </Draggable>
        ))}
      </div>
    </React.Fragment>
  );
};
