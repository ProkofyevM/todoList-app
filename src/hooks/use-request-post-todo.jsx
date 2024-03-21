import React from 'react'

export const useRequestPosttodo = (todoList, setTodolist) => {
  
	const requestPostTodo = ({ target }) => {
		fetch('http://localhost:3007/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: target.todo.value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodolist([...todoList], response)
			})
	}
	return {
		requestPostTodo,
	}
}
