import React, { useEffect, useState } from 'react'
import axios from "axios";
import TodoList from './TodoList'

const NewTodo = () => {

    const [newTodoInput, setNewTodoInput] = useState('')
    const [allTodos, setAllTodos] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState({})

    useEffect(()=> {
        const getTodos = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/todo')
                console.log(res.data)
                setAllTodos(res.data)
            } catch(err) {
                console.log(err)
            }
            
        }
        getTodos()
    }, [])

    const handleChange = (e) => {
        setNewTodoInput(e.target.value)
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(editMode) {
            editTodos()
            setEditMode(false)
            
        } else {
            const list = {
                todo: newTodoInput
            }
            sendPostRequest(list)
            setAllTodos((prev) => [...prev, list])
        }
        setNewTodoInput('')
        sendGetRequest()
    }

    const editTodos = () => {
        const editedList = allTodos.map(todo=> {
            if(todo.id === editData.id){
                sendPutRequest(editData._id, {todo: newTodoInput})
                return {...todo, text : newTodoInput}
            }else {
                return todo
            }})
            setAllTodos(editedList)
    }

    const sendGetRequest = async() => {
        try {
            const res = await axios.get('http://localhost:5000/api/todo')
            setAllTodos(res.data)
        } catch(err) {
            console.log(err)
        }
    }
    const sendPostRequest = async(list) => {
        console.log(list)
        try {
            const res = await axios.post('http://localhost:5000/api/todo', list)
            console.log(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const sendPutRequest = async(id, todo) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/todo?id=${id}`, todo)
            console.log(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const sendDeleteRequest = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/todo?id=${id}`)
            console.log(res.data)
        } catch(err) {
            console.log(err)
        }

        try {
            const res = await axios.get('http://localhost:5000/api/todo')
            setAllTodos(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const handleDeleteTodo = (e,id) => {
        e.preventDefault()
        setAllTodos((prev)=>prev.filter((list)=>list.id !== id))
        sendDeleteRequest(id)
    }
    
    const handleEditTodo = (e,todo) => {
        e.preventDefault()
        setEditMode(true)
        setNewTodoInput(todo.todo)
        setEditData(todo)
    }

  return (
    <div>
        <form>
            <input value={newTodoInput} onChange={handleChange}/>
            <button onClick={handleSubmit}>Add</button>
            { !editMode && <TodoList allTodos={allTodos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>}
        </form>
    </div>
  )
}

export default NewTodo