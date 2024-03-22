import { useEffect, useState, useRef } from 'react'
import './App.css'
import { ref, onValue, push, set, remove } from 'firebase/database'
import { db } from './firebase'

export const App = () => {
	const [todoList, setTodolist] = useState({})
	const [updateTodo, setUpdateTodo] = useState('')
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false)
	const [isSorted, setIsSorted] = useState(false)
	const [isSearching, setIsSearching] = useState('')

	//const refreshTodos = () => {
	//	setRefreshTodoFlag(!refreshTodoFlag)
	//}

	const handleInputChange = ({ target }) => {
		setIsButtonDisabled(target.value === '' ? true : false)
	}

	useEffect(() => {
		const todosDbRef = ref(db, 'todos')

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {}

			setTodolist(loadedTodos)
		})
	}, [])

	const requestPostTodo = ({ target }) => {
		const todosDbRef = ref(db, 'todos')

		push(todosDbRef, {
			title: target.todo.value,
		})
	}

	const requestUpdatingTodo = (id) => {
		const todosDbRef = ref(db, `todos/${id}`)

		set(todosDbRef, { title: updateTodo })
	}

	const deleteTodo = (id) => {
		console.log(id)
		const todosDbRef = ref(db, `todos/${id}`)

		remove(todosDbRef)
	}

	const sortedTodos = () => {
		setIsSorted(!isSorted)
		const sortedTodos = Object.values(todoList).sort((a, b) =>
			a.title.localeCompare(b.title),
		)
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
				value={isSearching}
				className="inpSearch"
				placeholder="Поиск...."
				onChange={searchTodo}
			></input>
			<ul>
				{Object.entries(todoList)
					.filter(([id, todo]) => todo.title.includes(isSearching))
					.map(([id, { title }]) => (
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
								className="btnEdit"
								onClick={() => requestUpdatingTodo(id)}
							>
								Изменить
							</button>
							<button className="btnDel" onClick={() => deleteTodo(id)}>
								Удалить
							</button>
						</li>
					))}
			</ul>
		</div>
	)
}
