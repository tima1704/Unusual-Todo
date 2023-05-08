import React from "react";
import Draggable from "react-draggable";
import randomColor from "randomcolor";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../Theme";

import cls from "./index.module.css";
import CardTheme from "../Theme/CardTheme";

export const Todo = () => {
  const [value, setValue] = React.useState("");
  const [todos, setTodos] = React.useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setDate() {
    return new Date().toLocaleTimeString()
  }

  const onChange_Input = (event) => setValue(event.target.value);

  const deleteTodo = (id) => setTodos(todos.filter((item) => item.id !== id));

  const editTodo = (todo) => {
    return todos.map((item) => {
      if (item.id === todo.id) {
        setTodos((prev) => [
          ...prev,
          {
            id: todo.id,
            createdDate: setDate(),
            color: todo.color,
            name: prompt("new title"),
          },
        ]);
      }
    });
  };

  const createTodo = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      setTodos((items) => [
        ...items,
        {
          id: uuidv4(),
          name: value,
          createdDate: setDate(),
          color: randomColor({
            luminosity: "bright",
          }),
        },
      ]);
      setValue("");
    } else {
      alert("Print somthing...");
    }
  };

  const { setTheme } = useTheme();

  return (
    <React.Fragment>
      <CardTheme setTheme={setTheme} />
      <form className={cls.todo_form}>
        <input
          type="text"
          placeholder="Enter something.."
          onChange={onChange_Input}
          value={value}
        />
        <button onClick={createTodo}>enter</button>
      </form>
      <div className={cls.todo_container}>
        {todos.map((todo) => (
          <Draggable key={todo.id}>
            <div
              className={cls.todo_card}
              style={{ backgroundColor: todo.color }}
            >
              <div className={cls.todo_card_header}>
                <p className={cls.todo_title}>title: {todo.name}</p>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={cls.todo_delete}
                >
                  x
                </button>
              </div>
              <div className={cls.todo_card_bottom}>
                <p className={cls.createdDate}>{todo.createdDate}</p>
                <button onClick={() => editTodo(todo)}>eddit</button>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </React.Fragment>
  );
};
