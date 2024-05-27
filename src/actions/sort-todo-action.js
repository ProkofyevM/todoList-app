export const sortTodoAction = (todoList) => {
	const sortedTodos = [...todoList].sort((a, b) => a.title.localeCompare(b.title))
	return { type: 'IS_SORTED', payload: sortedTodos }
}
