import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import ToDoList from './ToDo/ToDoList';
import Context from './context';
import Loader from './Loader';

const AddTodo = React.lazy(
  () => 
      new Promise(resolve => {
        setTimeout(() => {
          resolve(import('./ToDo/AddToDo'))
        }, 0)
      })  
  )

function App() {
  let[ todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=0')
      //'https://jsonplaceholder.typicode.com/todos?_limit=3')
      .then(response => response.json())
      .then(todos => {
        setTimeout(()=> {
          setTodos(todos)
          setLoading(false)
        }, 0)
        
      })
  }, [])

  function toggleTodo(id) {
    setTodos(todos = todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    }))
  }
  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !==id ))
  }

  function addTodo (title) {
    setTodos(todos.concat([{
      title,
      id:`${Math.random()}`,
      completed: false,
    }]))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>To Day to do list</h1>
        <React.Suspense fallback={<p>Loading.....</p>}>
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        
        {loading && <Loader/>}
        {todos.length ? (
        <ToDoList todos={todos} onToggle={toggleTodo}/>
        ) : (
          loading ? null : <p>No to do on day</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
