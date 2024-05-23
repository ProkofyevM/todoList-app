export const addTodoAction = (title) => {
	return async (dispatch) => {
		try {
			const response = await fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title,
				}),
			})
			const data = await response.json()

			dispatch({ type: 'TODO_LIST', payload: data })
		} catch (error) {
			console.log('Error adding todo:', error)
		}
	}
}
