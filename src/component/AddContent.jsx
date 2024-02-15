import { useState } from "react";

const AddContent = ({ API_URL, user, todos, setTodos, fetchTodos }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      const todoToAdd = {
        title: newTodo,
      };

      const addOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `${user.username}:${user.website}`,
        },
        body: JSON.stringify(todoToAdd),
      };
      try {
        const response = await fetch(`${API_URL}/addTodo/${user.id}`, addOptions);
        const data = await response.json();
        setTodos([...todos, todoToAdd]);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }  
    fetchTodos();
  };
  return (
    <form className="addTodoForm" onSubmit={handleAddTodo}>
      <input
        className="addTodo"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add todo..."
      />
      <button className="addTodoSubmit" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default AddContent;
