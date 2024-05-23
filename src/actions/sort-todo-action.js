export const sortTodoAction = (todoList) => {
	return (dispatch) => {
		try {
			dispatch({ type: 'IS_SORTED' })
			const sortedTodos = [...todoList].sort((a, b) =>
				a.title.localeCompare(b.title),
			)
			dispatch({ type: 'SORTED_TODO_LIST', payload: sortedTodos })
		} catch (error) {
			console.error('Error sorting todos:', error)
		}
	}
}
