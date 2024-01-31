import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import apiRequest from "./apiRequest";
import UpdateContent from "./updateContent";
import AddContent from "./AddContent";

const Todos = ({ id, user }) => {
  const API_URL = "http://localhost:8000/todos";

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [displayOption, setDisplayOption] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [displayOption, searchTerm]);

  const fetchTodos = async () => {
    try {
      const updateOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: `${user.username}:${user.website}`,
        },
      };
      const response = await fetch(`${API_URL}/${user.id}`, updateOptions);
      let data = await response.json();

      data = applyFilters(data);

      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleFilter = (option) => {
    setDisplayOption(option);
  };

  const applyFilters = (data) => {
    switch (displayOption) {
      case "completed":
        data = data.filter((todo) => todo.completed);
        break;
      case "uncompleted":
        data = data.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    if (searchTerm) {
      data = data.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  };

  const handleUpdate = async (todo) => {
    setEditing((editing) => (editing ? null : todo));
  };

  const handleUpdateContent = async (updatedTodo) => {
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        auth: `${user.username}:${user.website}`,
      },
      body: JSON.stringify({
        todoId: updatedTodo.id,
        title: updatedTodo.title,
      }),
    };
    const reqUrl = `${API_URL}/updateTitle/${user.id}`;
    const result = await apiRequest(reqUrl, updateOptions);

    if (result) {
      console.error("Error updating todo:", result);
    } else {
      const updatedTodos = todos.map((t) =>
        t.id === updatedTodo.id ? { ...t, title: updatedTodo.title } : t
      );
      setTodos(updatedTodos);
      setEditing(null);
    }
  };

  const handleCheck = async (id) => {
    const listTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(listTodos);
    const [myItem] = listTodos.filter((item) => item.id === id);

    try {
      const response = await axios.patch(
        `${API_URL}/updateCompleted/${myItem.userId}`,
        { itemId: myItem.id },
        {
          headers: {
            auth: `${user.username}:${user.website}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (userId, todoId) => {
    const validate = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (!validate) {
      return;
    }
    const listTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(listTodos);

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: `${user.username}:${user.website}`,
      },
      body: JSON.stringify({ itemId: todoId }),
    };
    const reqUrl = `${API_URL}/deleteTodo/${userId}`;
    const result = await apiRequest(reqUrl, deleteOptions);
  };

  return (
    <>
      <div className="todoContainer">
        <h2>Todos</h2>

        <div className="filtering">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sortTodos">
          <button className="sortTodoButton" onClick={() => handleFilter("all")}>
            Show All
          </button>
          <button className="sortTodoButton" onClick={() => handleFilter("completed")}>
            Show Completed
          </button>
          <button className="sortTodoButton" onClick={() => handleFilter("uncompleted")}>
            Show Uncompleted
          </button>
        </div>

        <AddContent
          user={user}
          id={id}
          todos={todos}
          setTodos={setTodos}
          API_URL={API_URL}
          fetchTodos={fetchTodos}
        />
        {todos.map((todo, index) => (
          <div className="todoBox" key={index}>
            <input
              type="checkbox"
              className="checkBox"
              checked={todo.completed}
              onChange={() => handleCheck(todo.id)}
            />
            <h3>Note.{todo.id}</h3>
            {editing && editing.id === todo.id ? (
              <UpdateContent todo={todo} onUpdate={handleUpdateContent} />
            ) : (
              <div className="updateContentClick">
                <div
                  style={
                    todo.completed
                      ? { textDecoration: "line-through" }
                      : null
                  }
                >
                  {todo.title}
                </div>
              </div>
            )}
            <div className="todosIcons">
              <FaEdit
                className="editIcon"
                onClick={() => handleUpdate(todo)}
                role="button"
                tabIndex="0"
                aria-label={`Edit`}
              />
              <FaTrashAlt
                className="trashIcon"
                onClick={() => handleDelete(user.id, todo.id)}
                role="button"
                tabIndex="0"
                aria-label={`Delete`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
