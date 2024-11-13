import React, { useState, useEffect } from "react";
import {v4} from "uuid"
import "./App.css";


//rajesh
function TodoApp({ onLogout }) {
  const [todoList, setTodoList] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todoList"));
    if (savedTodos) {
      setTodoList(savedTodos);
    }
  }, []);

  const addTodo = () => {
    if (!userInput.trim()) {
      alert("ENTER VALID TEXT");
      return;
    }
    const newTodo = {
      text: userInput,
      uniqueNo: v4(),
      isChecked: false,
    };
    setTodoList([...todoList, newTodo]);
    setUserInput("");
  };

  const toggleTodo = (uniqueNo) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.uniqueNo === uniqueNo
          ? { ...todo, isChecked: !todo.isChecked }
          : todo
      )
    );
  };

  const deleteTodo = (uniqueNo) => {
    const updatedList = todoList.filter((todo) => todo.uniqueNo !== uniqueNo);
    setTodoList(updatedList);
  };

  const saveTodos = () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    alert("Todos saved!");
  };

  return (
    <div className="todo-container">
      <button onClick={onLogout} className="logoutBtn">
        Logout
      </button>
      <h1 className="heading1">Todo's Application</h1>
      <h1>Create Todo</h1>
      <input
        type="text"
        className="input"
        placeholder="What's need to be done?"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <br />
      <button className="addBtn" onClick={addTodo}>
        Add
      </button>
      <h1>My Tasks</h1>
      <ul id="todoItemsContainer">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.uniqueNo}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <button className="saveBtn" onClick={saveTodos}>
        Save
      </button>
    </div>
  );
}

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="todoLiElement">
      <input
        type="checkbox"
        checked={todo.isChecked}
        onChange={() => toggleTodo(todo.uniqueNo)}
        className="checkboxElement"
      />
      <div className="labelContainer">
        <label
          className={`labelElement ${todo.isChecked ? "checked" : ""}`}
        >
          {todo.text}
        </label>
        <button onClick={() => deleteTodo(todo.uniqueNo)} className="deleteBtn">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoApp;
