import React, {useState, useEffect} from 'react';
import AddTodoForm from './AddTodoForm';

import axios from 'axios';

const TodoList = (token) => {
  const [fetchedTodos, setFetchedTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/todos`, {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          alert(error);
          return Promise.reject(error);
        }

        data.map((todo) => (
          todo.status = 'normal'
        ))

        setFetchedTodos(data);
        setLoadingTodos(false);
      });
  });

  return (
    <>
      <AddTodoForm />
      <TodoList fetchedTodos={fetchedTodos} loadingTodos={loadingTodos} token={token} />
    </>
  );
}

export default TodoList;
