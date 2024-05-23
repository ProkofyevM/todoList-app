export const deletedTodoAction = ({ target }) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`http://localhost:3005/todos/${target.name}`, {
				method: 'DELETE',
			})
			const data = response.json()
			dispatch({ type: 'TODO_LIST', payload: data })
			dispatch({ type: 'REFRESH_TODO_FLAG' })
		} catch (error) {
			console.error('Error deleting todo:', error)
		}
	}
}
