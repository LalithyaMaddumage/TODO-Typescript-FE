'use client'
// Import statements for necessary dependencies and components
import Image from 'next/image';
import { useState, useEffect } from "react";
import styles from './page.module.css';
import AddTodo from '../../components/AddTodo';
import TodoList from '../../components/TodoList';
import { Todo } from '../../api/services/todos';
import { fetchTodos } from '../../api/services/todoServices';

// Main component for the home page
export default function Home() {
  // Define state variables for todos and changes
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  // Use an effect to fetch data when 'isChanged' changes
  useEffect(() => {
    fetchData(); // Fetch data when 'isChanged' changes
  }, [isChanged]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const data: Todo[] = await fetchTodos(); // Fetch todos
      console.log('Fetched data:', data);
      setTodos(data); // Update the todos state with the fetched data
      if (data) {
        setIsChanged(false); // Reset 'isChanged' if data is successfully fetched
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  // Render the main content
  return (
    <div className="App">
      <div className="list-wrapper">
        <div className="list">
          <h1>My To-Do List</h1>

          {/* AddTodo component with 'setIsChanged' prop */}
          <AddTodo setIsChanged={setIsChanged} />

          {/* TodoList component with 'todos' and 'setIsChanged' props */}
          <TodoList todos={todos} setIsChanged={setIsChanged} />
        </div>
      </div>
    </div>
  );
}
