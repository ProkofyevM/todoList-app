import React from 'react'

export const FormTodo = ({
	requestPostTodo,
	isButtonDisabled,
	handleInputChange,
	sortedTodos,
}) => {
	return (
		<>
			<form className="form" onSubmit={requestPostTodo}>
				<input
					name="todo"
					className="input"
					placeholder="Введите задачу...."
					type="text"
					onChange={handleInputChange}
				></input>
				<button type="submit" className="btnAdd" disabled={isButtonDisabled}>
					Добавить
				</button>
				<button type="button" className="btnSort" onClick={sortedTodos}>
					A-Я
				</button>
			</form>
		</>
	)
}
