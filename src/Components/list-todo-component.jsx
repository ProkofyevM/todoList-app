import React from 'react'
import { Link } from 'react-router-dom'
import { selectSearching, selectTodoList } from '../selectors'
import { useSelector } from 'react-redux'

export const ListTodo = () => {
	const todoList = useSelector(selectTodoList)
	const isSearching = useSelector(selectSearching)

	const filteredTodos = todoList ? todoList.filter(todo => todo.title.includes(isSearching)) : []

	return (
		<>
			<ul>
				{filteredTodos
					.map(({ id, title }) => (
						<li key={id} className="item">
							<Link to={`/task/${id}`} className="inpEdit">
								{title}
							</Link>
						</li>
					))}
			</ul>
		</>
	)
}
