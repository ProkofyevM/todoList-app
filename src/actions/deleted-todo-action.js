export const deletedTodoAction = (id) => {
	return async (dispatch) => {
		try {
			await fetch(`http://localhost:3005/todos/${id}`, {
				method: 'DELETE',
			})
			dispatch({ type: 'DELETE_TODO', payload: id })
		} catch (error) {
			console.error('Error deleting todo:', error)
		}
	}
}
