import React, { useState, useEffect } from 'react'
import './Todo.css'

const Todo = () => {
    // STATES
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState("all");

    // LOCAL STORAGE - GET TODOS FROM STORAGE
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    // LOCAL STORAGE - SAVE TODOS TO STORAGE
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;

        const newItem = {
            id: Date.now(),
            text: newTodo.trim(),
            completed: false,
        };

        setTodos([...todos, newItem]);
        // CLEAR INPUT
        setNewTodo('');
    };

    // DELETE
    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    // TOGGLE
    const handleToggle = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    };

    // CLEAR COMPLETED
    const handleClearComleted = () => {
        const updatedTodos = todos.filter(todo => !todo.completed);
        setTodos(updatedTodos);
        
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    // FILTERED TODOS
    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

  return (
    <>
        <section className="todoapp">
            {/* HEADER */}
            <header className="header">
                <h1>todos</h1>
            {/* FORM */}
            <form onSubmit={handleSubmit}>
                <input
                 className="new-todo" 
                 placeholder="What needs to be done?" 
                 autoFocus
                 value={newTodo}
                 onChange={(e) => setNewTodo(e.target.value)} 
                 />
            </form>
	        </header>
	
            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all">
                    Mark all as complete
                </label>

                {/* TODO LIST */}
                <ul className="todo-list">
                    {filteredTodos.map((todo) => (
                        <li key={todo.id} className={todo.completed ? "completed" : ""}>
                            <div className='view'>
                                <input 
                                className='toggle' 
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggle(todo.id)}
                                />
                                <label>{todo.text}</label>
                                <button className='destroy' onClick={() => handleDelete(todo.id)}></button>
                            </div>
                        </li>
                    ))}
                </ul>
	        </section>

	        <footer className="footer">
                {/* TODO COUNT */}
		        <span className="todo-count">
                    <strong>{todos.length}</strong> items left
		        </span>

                {/* FILTERS */}
		        <ul className="filters">
			        <li>
				        <a href="#/" className={filter === "all"? "selected" : ""} onClick={() => setFilter("all")}>All</a>
			        </li>
			        <li>
                        <a href="#/" className={filter === "active" ? "selected" : ""} onClick={() => setFilter("active")}>Active</a>
			        </li>
			        <li>
                        <a href="#/" className={filter === "completed" ? "selected" : ""} onClick={() => setFilter("completed")}>Completed</a>
			        </li>
		        </ul>

                {/* CLEAR COMPLETED BUTTON */}
		        <button className="clear-completed" onClick={handleClearComleted}>
			        Clear completed
		        </button>
	        </footer>
        </section>

        {/* INFO */}
        <footer className="info">
            <p>Click to edit a todo</p>
            <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </>
  )
}

export default Todo
