import { useEffect, useState } from 'react'
import './App.css'

export function App() {
	const [todoList, setTodolist] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((loadedList) => {
				setTodolist(loadedList)
			})
	}, [])

	const onChange = ({ target }) => {
		console.log(target.value)
	}

	return (
		<div className="app">
			<form className="form">
				<input
					className="input"
					placeholder="Введите задачу...."
					type="text"
					onChange={onChange}
				></input>
				<button className="btn1">Добавить</button>
			</form>
			{todoList.map(({ id, title }) =>
				id <= 7 ? (
					<div key={id} className="item">
						Задача: {title}
					</div>
				) : null,
			)}
		</div>
	)
}
