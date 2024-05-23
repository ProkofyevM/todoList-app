import React from 'react'
import { useDispatch } from 'react-redux'

export const SearchTodo = () => {
	const dispatch = useDispatch()

	const searchTodo = (e) => {
		console.log(e)
		dispatch({ type: 'IS_SEARCHING', payload: e.target.value })
	}

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
