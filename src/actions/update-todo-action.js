export const updateTodoAction = (id, updateTodoTitle) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`http://localhost:3005/todos/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title: updateTodoTitle }),
			})
			const data = await response.json()
			dispatch({ type: 'UPDATE_TODO', payload: { id, title: data.title } })
			//dispatch({ type: 'REFRESH_TODO_FLAG' })
		} catch (error) {
			console.log('Error updating todo:', error)
		}
	}
}
