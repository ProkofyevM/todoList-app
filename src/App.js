import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { FormTodo } from './Components/form-todo'
import { SearchTodo } from './Components/search-todo'
import { ListTodo } from './Components/list-todo'
import { PageTodo } from './Components/page-todo'
import { AppContextProvider } from './app-context-provider'
//import { AppContext } from './app-context'

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

	const deleteTodo = (event) => {
		fetch(`http://localhost:3005/todos/${event.target.name}`, {
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
						<AppContextProvider
							requestUpdatingTodo={requestUpdatingTodo}
							deleteTodo={deleteTodo}
							refreshTodoFlag={refreshTodoFlag}
							setUpdateTodo={setUpdateTodo}
						>
							<PageTodo todoList={todoList} />
						</AppContextProvider>
					}
				/>
			</Routes>
		</div>
	)
}
