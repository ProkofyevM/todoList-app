import { RequestUpdatingTodo } from './Components/Context-components/request-updating-todo-context'
import { DeleteTodo } from './Components/Context-components/delete-todo-context'
import { RefreshTodoFlag } from './Components/Context-components/refresh-todo-flag-context'
import { SetUpdateTodo } from './Components/Context-components/set-update-todo-context'

export const AppContextProvider = ({
	children,
	requestUpdatingTodo,
	deleteTodo,
	refreshTodoFlag,
	setUpdateTodo,
}) => {
	return (
		<RequestUpdatingTodo.Provider value={{ requestUpdatingTodo }}>
			<DeleteTodo.Provider value={{ deleteTodo }}>
				<RefreshTodoFlag.Provider value={{ refreshTodoFlag }}>
					<SetUpdateTodo.Provider value={{ setUpdateTodo }}>
						{children}
					</SetUpdateTodo.Provider>
				</RefreshTodoFlag.Provider>
			</DeleteTodo.Provider>
		</RequestUpdatingTodo.Provider>
	)
}
