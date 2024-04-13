//import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import { LiTodo } from './li-todo-component'
//import { DeleteBtn } from './delete-button'
//import { AppContext } from '../app-context'

export const PageTodo = ({
	todoList,
	//requestUpdatingTodo,
	//deleteTodo,
	//refreshTodoFlag,
	//setUpdateTodo,
}) => {
	const params = useParams()
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(-1)
	}

	const selectedTodo = todoList.find((todo) => todo.id === Number(params.id))
	console.log(selectedTodo)

	return (
		<>
			{selectedTodo ? (
				<>
					<LiTodo selectedTodo={selectedTodo} />
					{/*<li className="item">
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
						<button
							name={selectedTodo.id}
							className="btnDel"
							onClick={deleteTodo}
						>
							Удалить
						</button>
					</li>*/}
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
