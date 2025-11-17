'use client'


import { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'
import * as client from './Client'

interface Todo {
  id: number | string
  title: string
  completed: boolean
}

export default function WorkingWithArraysAsynchronously() {
  // local list
  const [todos, setTodos] = useState<Todo[]>([])

  // load from server
  const loadTodos = async () => {
    const data = await client.fetchTodos()
    setTodos(data)
  }

  // create via get route
  const createNewTodo = async () => {
    const updated = await client.createNewTodo()
    setTodos(updated)
  }

  // create via post json
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: 'new posted todo',
      completed: false,
    })
    setTodos([...todos, newTodo])
  }

  // remove
  const deleteTodo = async (todo: Todo) => {
    await client.deleteTodo(todo)
    loadTodos()
  }

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <div id='wd-async-arrays' className='p-3'>
      <h3 className='mb-3'>working with arrays asynchronously</h3>

      <h4 className='mb-3'>
        todos
        {/* post new todo json */}
        <FaPlusCircle
          onClick={postNewTodo}
          className='text-primary float-end fs-3 ms-3'
          id='wd-post-todo'
        />
        {/* create via get */}
        <FaPlusCircle
          onClick={createNewTodo}
          className='text-success float-end fs-3'
          id='wd-create-todo'
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id} className='d-flex align-items-center'>
            <input
              type='checkbox'
              defaultChecked={todo.completed}
              className='form-check-input me-2'
            />

            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              className='flex-grow-1'
            >
              {todo.title}
            </span>

            <button
              onClick={() => deleteTodo(todo)}
              className='btn btn-link text-danger'
              id='wd-remove-todo'
            >
              🗑️
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
