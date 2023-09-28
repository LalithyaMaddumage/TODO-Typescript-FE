'use client'
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../api/services/todoServices";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const data: Todo[] = await fetchTodos();
        console.log('Fetching data...ssss',data);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  console.log('Rendered Todos:', todos);
  return (
    <div>
      <ul>
        {todos && todos.length > 0 ? (
          todos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <li>No todos available</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
