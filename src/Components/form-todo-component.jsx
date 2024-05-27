import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectButtonDisable, selectUpdateTodo, selectTodoList } from './../selectors'
import { addTodoAction, sortTodoAction } from '../actions'

export const FormTodo = () => {
	const dispatch = useDispatch()

	const isButtonDisabled = useSelector(selectButtonDisable)
	const updateTodo = useSelector(selectUpdateTodo)
	const todoList = useSelector(selectTodoList)

	const handleInputChange = ({ target }) => {
		dispatch({ type: 'BUTTON_DISABLED', payload: target.value === '' })
		dispatch({ type: 'UPDATE_TODO', payload: target.value })
	}

	const requestPostTodo = (event) => {
		event.preventDefault()
		const todoValue = event.target.elements.todo.value
		dispatch(addTodoAction(todoValue))
		dispatch({ type: 'UPDATE_TODO' })
	}

	const sortedTodos = () => {
		dispatch(sortTodoAction(todoList))
	}

	return (
		<>
			<form className="form" onSubmit={requestPostTodo}>
				<input
					name="todo"
					className="input"
					placeholder="Введите задачу...."
					type="text"
					value={updateTodo}
					onChange={handleInputChange}
				></input>
				<button type="submit" className="btnAdd" disabled={!isButtonDisabled}>
					Добавить
				</button>
				<button type="button" className="btnSort" onClick={sortedTodos}>
					A-Я
				</button>
			</form>
		</>
	)
}
