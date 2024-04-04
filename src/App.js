import { useEffect, useState } from 'react'
import { Routes, Route, link } from 'react-router-dom'
import './App.css'
import { FormTodo } from './Components/FormTodo'
import { SearchTodo } from './Components/SearchTodo'
import { ListTodo } from './Components/ListTodo'
import { PageTodo } from './Components/PageTodo'

export const App = () => {
	const [todoList, setTodolist] = useState([])
	const [updateTodo, setUpdateTodo] = useState('')
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false)
	const [isSorted, setIsSorted] = useState(false)
	const [isSearching, setIsSearching] = useState('')

	const refreshTodos = () => {
		setRefreshTodoFlag(!refreshTodoFlag)
	}

	const handleInputChange = ({ target }) => {
		setIsButtonDisabled(target.value === '' ? true : false)
	}

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodolist(response)
			})
	}, [refreshTodoFlag])

	const requestPostTodo = ({ target }) => {
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: target.todo.value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodolist([...todoList], response)
			})
	}

	const requestUpdatingTodo = (id) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: updateTodo }),
		})
			.then((rawResponse) => {
				rawResponse.json()
			})
			.then(() => {
				setTodolist(
					todoList.map((todo) =>
						todo.id === id ? { ...todo, title: updateTodo } : todo,
					),
				)
				refreshTodos()
			})
	}

	const deleteTodo = ({ target }) => {
		fetch(`http://localhost:3005/todos/${target.name}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodolist([...todoList], response)
				refreshTodos()
			})
	}

	const sortedTodos = () => {
		setIsSorted(!isSorted)
		const sortedTodos = todoList.sort((a, b) => a.title.localeCompare(b.title))
		setTodolist(sortedTodos)
	}

	const searchTodo = (e) => {
		setIsSearching(e.target.value)
	}

	return (
		<div className="app">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<FormTodo
								requestPostTodo={requestPostTodo}
								handleInputChange={handleInputChange}
								isButtonDisabled={isButtonDisabled}
								sortedTodos={sortedTodos}
							/>
							<SearchTodo searchTodo={searchTodo} />
							<ListTodo
								isSearching={isSearching}
								todoList={todoList}
								refreshTodoFlag={refreshTodoFlag}
								deleteTodo={deleteTodo}
								setUpdateTodo={setUpdateTodo}
								requestUpdatingTodo={requestUpdatingTodo}
							/>
						</>
					}
				/>
				<Route
					path="/task/:id"
					element={
						<PageTodo
							requestUpdatingTodo={requestUpdatingTodo}
							todoList={todoList}
							deleteTodo={deleteTodo}
							setUpdateTodo={setUpdateTodo}
							refreshTodoFlag={setUpdateTodo}
						/>
					}
				/>
			</Routes>
		</div>
	)
}
