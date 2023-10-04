
'use client'
import Image from 'next/image'
import { useState ,useEffect} from "react";
import styles from './page.module.css'
import AddTodo from '../../components/AddTodo'
import TodoList from '../../components/TodoList'
import { Todo } from '../../api/services/todos';
import { fetchTodos } from '../../api/services/todoServices';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [ischaged , setIsChanged] =useState<boolean>(false)
    
  useEffect(() => {
    fetchData();
  }, [ischaged]);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const data: Todo[] = await fetchTodos();
      console.log('Fetching data...ssss',data);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }


  return (
    <div className="App">
    <div className="list-wrapper">
      <div className="list">
        <h1>My To-Do List</h1>

        <AddTodo setIsChaged={setIsChanged} />
        <TodoList todos={todos} />
      </div>
    </div>
  </div>
  )
}
