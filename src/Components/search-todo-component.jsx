import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearching } from '../selectors'

export const SearchTodo = () => {
	const dispatch = useDispatch()
	const searchingTodo = useSelector(selectSearching)

	const searchTodo = (e) => {
		dispatch({ type: 'IS_SEARCHING', payload: e.target.value })
	}

	return (
		<>
			<input
				value={searchingTodo}
				className="inpSearch"
				placeholder="Поиск...."
				onChange={searchTodo}
			></input>
		</>
	)
}
