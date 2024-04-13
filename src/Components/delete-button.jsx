import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../app-context'
import '../App.css'

export const DeleteBtn = ({ selectedTodo }) => {
	console.log(selectedTodo)
	const { deleteTodo } = useContext(AppContext)

	return (
		<button
			name={selectedTodo.id}
			className="btnDel"
			onClick={(event) => deleteTodo(event)}
		>
			Удалить
		</button>
	)
}
