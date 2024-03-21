import { useEffect, useState, useRef } from 'react'
import './App.css'

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
		fetch('http://localhost:3007/todos')
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodolist(response)
			})
	}, [refreshTodoFlag])

	const requestPostTodo = ({ target }) => {
		fetch('http://localhost:3007/todos', {
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
		fetch(`http://localhost:3007/todos/${id}`, {
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
		fetch(`http://localhost:3007/todos/${target.name}`, {
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
			<form className="form" onSubmit={requestPostTodo}>
				<input
					name="todo"
					className="input"
					placeholder="Введите задачу...."
					type="text"
					onChange={handleInputChange}
				></input>
				<button type="submit" className="btnAdd" disabled={isButtonDisabled}>
					Добавить
				</button>
				<button type="button" className="btnSort" onClick={sortedTodos}>
					A-Я
				</button>
			</form>
			<input
				className="inpSearch"
				placeholder="Поиск...."
				onChange={searchTodo}
			></input>
			<ul>
				{todoList
					.filter((todo) => todo.title.includes(isSearching))
					.map(({ id, title }) => (
						<li key={id} className="item">
							{!refreshTodoFlag ? (
								<input
									className="inpEdit"
									type="text"
									defaultValue={title}
									disabled={refreshTodoFlag}
									onChange={({ target }) => setUpdateTodo(target.value)}
								></input>
							) : (
								<span className="inpEdit">{title}</span>
							)}

							<button
								name={id}
								className="btnEdit"
								onClick={() => requestUpdatingTodo(id)}
							>
								Изменить
							</button>
							<button name={id} className="btnDel" onClick={deleteTodo}>
								Удалить
							</button>
						</li>
					))}
			</ul>
		</div>
	)
}
