import React from 'react'
import { NavLink } from 'react-router-dom'

export const ListTodo = ({ isSearching, todoList, refreshTodoFlag }) => {
	return (
		<>
			<ul>
				{todoList
					.filter((todo) => todo.title.includes(isSearching))
					.map(({ id, title }) => (
						<li key={id} className="item">
							{!refreshTodoFlag ? (
								<NavLink to={`/task/${id}`} className="inpEdit">
									{title}
								</NavLink>
							) : (
								<NavLink to={`/task/${id}`} className="inpEdit">
									{title}
								</NavLink>
							)}
						</li>
					))}
			</ul>
		</>
	)
}
