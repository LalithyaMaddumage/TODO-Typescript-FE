import Image from 'next/image'
import styles from './page.module.css'
import AddTodo from '../../components/AddTodo'
import TodoList from '../../components/TodoList'

export default function Home() {
  return (
    <div className="App">
    <div className="list-wrapper">
      <div className="list">
        <h1>My To-Do List</h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  </div>
  )
}
