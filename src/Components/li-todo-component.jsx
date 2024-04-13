import React, { useContext } from 'react'
import { AppContextProvider } from '../app-context-provider'
//import { AppContext } from '../app-context'

export const LiTodo = ({ selectedTodo }) => {
	const { requestUpdatingTodo, deleteTodo, refreshTodoFlag, setUpdateTodo } =
		useContext(AppContextProvider)
	return (
		<li className="item">
			{refreshTodoFlag ? (
				<input
					className="inpEdit"
					type="text"
					defaultValue={selectedTodo.title}
					disabled={refreshTodoFlag}
					onChange={({ target }) => setUpdateTodo(target.value)}
				></input>
			) : (
				<span className="spanTodo">{selectedTodo.title}</span>
			)}

			<button
				name={selectedTodo.id}
				className="btnEdit"
				onClick={() => requestUpdatingTodo(selectedTodo.id)}
			>
				Изменить
			</button>
			<button name={selectedTodo.id} className="btnDel" onClick={deleteTodo}>
				Удалить
			</button>
		</li>
	)
}
