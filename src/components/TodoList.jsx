import React, { useState } from 'react'

const TodoList = (props) => {

  return (
    <div>
        { props.allTodos && props.allTodos.map((list)=> 
            <div key={list._id} style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{margin: '15px'}}>{list.todo}</p>
                <button style={{margin: '5px'}} onClick={e=>props.handleEditTodo(e,list)}>Edit</button>
                <button style={{margin: '5px'}} onClick={e=>props.handleDeleteTodo(e,list._id)}>Delete</button>
            </div>)
            }
    </div>
  )
}

export default TodoList