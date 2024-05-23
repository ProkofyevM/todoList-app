const initialState = {
	todo: {
		todoList: [],
		updateTodo: '',
		isButtonDisabled: true,
		refreshTodoFlag: false,
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
				todoList: [...state.todoList, payload],
			}
		case 'UPDATE_TODO':
      console.log('UPDATE_TODO action dispatched:', action.payload)
			return {
				...state,
				updateTodo: payload,
			}
		case 'BUTTON_DISABLED':
			return {
				...state,
				isButtonDisabled: payload,
			}
		case 'REFRESH_TODO_FLAG':
			return {
				...state,
				refreshTodoFlag: !state.refreshTodoFlag,
			}
		case 'SORTED_TODO_LIST':
			return { ...state, todoList: payload, isSorted: true }
		case 'IS_SORTED':
			return {
				...state,
				isSorted: !state.isSorted,
			}
		case 'IS_SEARCHING':
			return {
				...state,
				isSearching: payload,
			}
		default:
			return state
	}
}
