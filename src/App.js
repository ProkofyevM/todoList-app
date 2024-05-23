import { Routes, Route } from 'react-router-dom'
import './App.css'
import { FormTodo } from './Components/form-todo-component'
import { SearchTodo } from './Components/search-todo-component.jsx'
import { ListTodo } from './Components/list-todo-component.jsx'
import { PageTodo } from './Components/page-todo-component'

export const App = () => {
	return (
		<div className="app">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<FormTodo />
							<SearchTodo />
							<ListTodo />
						</>
					}
				/>
				<Route path="/task/:id" element={<PageTodo />} />
			</Routes>
		</div>
	)
}
