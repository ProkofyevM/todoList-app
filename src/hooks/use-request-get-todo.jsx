import React from 'react'
import { useEffect } from 'react'

export const useRequestGetTodo = (refreshTodoFlag, setTodolist, ) => {

  useEffect(() => {
		fetch('http://localhost:3007/todos')
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodolist(response)
			})
	}, [refreshTodoFlag])

  return (
    {
      setTodolist
    }
  )
}

