import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodoList, selectUpdateTodo } from '../selectors'
import { updateTodoAction, deletedTodoAction } from '../actions'

export const PageTodo = () => {
	const dispatch = useDispatch()
	const todoList = useSelector(selectTodoList)
	const updateTodo = useSelector(selectUpdateTodo)

	const params = useParams()
	const navigate = useNavigate()

	const selectedTodo = todoList.find((todo) => todo.id === Number(params.id))

	const requestUpdatingTodo = (id) => {
		dispatch(updateTodoAction(id, updateTodo))
	}

	const deleteTodo = () => {
		dispatch(deletedTodoAction(selectedTodo.id))
	}

	const handleClick = () => {
		navigate(-1)
	}

	return (
		<>
			{selectedTodo ? (
				<>
					<li key={selectedTodo.id} className="item">
						<input
							className="inpEdit"
							type="text"
							defaultValue={selectedTodo.title}
							onChange={({ target }) =>
								dispatch({
									type: 'UPDATE_TODO',
									payload: target.value,
								})
							}
						/>
						<button
							name={selectedTodo.id}
							className="btnEdit"
							onClick={() => requestUpdatingTodo(selectedTodo.id)}
						>
							Изменить
						</button>
						<button
							name={selectedTodo.id}
							className="btnDel"
							onClick={deleteTodo}
						>
							Удалить
						</button>
					</li>
				</>
			) : (
				<p>Task not found</p>
			)}
			<button className="btnBack" onClick={handleClick}>
				BACK
			</button>
		</>
	)
}
