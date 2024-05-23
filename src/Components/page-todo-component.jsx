import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodoList, selectRefreshTodoFlag, selectUpdateTodo } from './../selectors'
import { updateTodoAction, deletedTodoAction } from '../actions/'

export const PageTodo = () => {
	const dispatch = useDispatch()
	const todoList = useSelector(selectTodoList)
	const updateTodo = useSelector(selectUpdateTodo)
	const refreshTodoFlag = useSelector(selectRefreshTodoFlag)

	const params = useParams()
	const navigate = useNavigate()

	//const displayTodo = (id) => {
	//	return todoList.find((todo) =>
	//		todo.id === id ? { ...todo, title: updateTodo } : todo,
	//	)
	//}

	const requestUpdatingTodo = (id) => {
		dispatch(updateTodoAction(id, updateTodo))
	}

	const deleteTodo = ({ target }) => {
		dispatch(deletedTodoAction({ target }))
	}

	const handleClick = () => {
		navigate(-1)
	}

	const selectedTodo = todoList.find((todo) => todo.id === Number(params.id))

	return (
		<>
			{selectedTodo ? (
				<>
					<li key={selectedTodo.id} className="item">
						<input
							className="inpEdit"
							type="text"
							defaultValue={selectedTodo.title}
							disabled={refreshTodoFlag}
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
