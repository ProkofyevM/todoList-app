export const fetchTodoAction = () => {
	return async (dispatch) => {
		try {
			const response = await fetch('http://localhost:3005/todos')
			const data = await response.json()
			dispatch({ type: 'TODO_LIST', payload: data })
		} catch (error) {
			console.error('Error fetching todo list:', error)
		}
	}
}
