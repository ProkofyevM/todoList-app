import { Routes, Route } from 'react-router-dom'
import './App.css'
import { FormTodo } from './components/form-todo-component.jsx'
import { SearchTodo } from './components'
import { ListTodo } from './components'
import { PageTodo } from './components'

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
