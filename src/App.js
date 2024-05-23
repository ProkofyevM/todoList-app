import { Routes, Route } from 'react-router-dom'
import './App.css'
import { FormTodo } from './components/form-todo-component.jsx'
import { SearchTodo } from './components/search-todo-component.jsx'
import { ListTodo } from './components/list-todo-component.jsx'
import { PageTodo } from './components/page-todo-component.jsx'

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
