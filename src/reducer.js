const initialState = {
	todo: {
		todoList: [],
		updateTodo: '',
		isButtonDisabled: true,
		isSorted: false,
		isSearching: '',
	},
}

export const reducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case 'TODO_LIST':
			return {
				...state,
				todo: {
					...state.todo,
					todoList: [...state.todo.todoList, payload],
					updateTodo: '',
				},
			}
		case 'DELETE_TODO':
			return {
				...state,
				todo: {
					...state.todo,
					todoList: state.todo.todoList.filter((todo) => todo.id !== payload),
				},
			}
		case 'UPDATE_TODO':
			return {
				...state.todo,
				todo: {
					...state.todo,
					updateTodo: payload,
				},
			}
		case 'BUTTON_DISABLED':
			return {
				...state,
				isButtonDisabled: payload,
			}

		case 'IS_SORTED':
			return {
				...state,
				todo: {
					...state.todo,
					todoList: payload,
				},
			}
		case 'IS_SEARCHING':
			return {
				...state,
				todo: {
					...state.todo,
					isSearching: payload,
				},
			}
		default:
			return state
	}
}
