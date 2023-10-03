'use client'
import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../api/services/todoServices";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

// Define the Todo interface
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>(todo.title);

  // Keep track of which task is being edited
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleUpdateTodo = async () => {
    try {
      const updatedCompleted: boolean = !completed;
      await updateTodo(todo.id, { title: updatedTitle, completed: updatedCompleted });
      setCompleted(updatedCompleted);
      setIsEditing(false); // Close the editing modal after updating
      // Reload the page after successful update
      // window.location.reload();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleUpdateTitle = async () => {
    try {
      await updateTodo(todo.id, {  title:updatedTitle,completed:completed }); // Call the function to update the title
      setIsEditing(false); // Close the editing modal after updating
      // window.location.reload();
       // Reload the page after successful update
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const handleDeleteTodo = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteTodo(todo.id);
        // You can also add a callback here to remove the item from the list.
        Swal.fire("Deleted!", "Your task has been deleted.", "success");

        // Reload the page after successful deletion
        window.location.reload();
      } catch (error) {
        console.error("Error deleting todo:", error);
        Swal.fire(
          "Oops...",
          "An error occurred while deleting the task.",
          "error"
        );
      }
    }
  };

  const handleEditClick = () => {
    // Close the editing modal for the previously edited task (if any)
    if (editingTaskId !== null) {
      setIsEditing(false);
    }

    // Set the task being edited
    setEditingTaskId(todo.id);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false); // Close the editing modal without updating
    setEditingTaskId(null); // Clear the task being edited
  };

  return (
    <li className={`todo-item ${completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-modal">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button className="update-btn" onClick={handleUpdateTitle}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="close-btn" onClick={handleEditCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ) : (
        <span onClick={handleEditClick}>{todo.title}</span>
      )}
      <div className="actions">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleUpdateTodo}
          />
          <span className="custom-checkmark"></span>
        </label>
        <button className="delete-button" onClick={handleDeleteTodo}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
