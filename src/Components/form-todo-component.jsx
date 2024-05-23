import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectButtonDisable, selectTodoList } from './../selectors'
import { addTodoAction, sortTodoAction } from '../actions'
import { useNavigate } from 'react-router-dom'

export const FormTodo = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const isButtonDisabled = useSelector(selectButtonDisable)
	const todoList = useSelector(selectTodoList)

	const handleInputChange = ({ target }) => {
		dispatch({ type: 'BUTTON_DISABLED', payload: target.value === '' })
	}

	const requestPostTodo = ({ target }) => {
		const todoValue = target.elements.todo.value
		console.log(todoValue)
		dispatch(addTodoAction(todoValue))
		navigate('/')
		console.log('Navigating to /')
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
