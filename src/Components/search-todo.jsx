import React from 'react'

export const SearchTodo = ({ searchTodo }) => {
	return (
		<>
			<input
				className="inpSearch"
				placeholder="Поиск...."
				onChange={searchTodo}
			></input>
		</>
	)
}
