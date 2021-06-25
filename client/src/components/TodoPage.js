import React, {useState, useEffect} from 'react';
import AddTodoForm from './AddTodoForm';
import useToken from "../hooks/useToken";

import axios from 'axios';

const TodoList = () => {
  const [fetchedTodos, setFetchedTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const {token, setToken} = useToken();

  useEffect(() => {
    const fetchData = async () => {
      const result =  await axios
      .get(`${process.env.BACKEND_URL}/todos`, {
        headers: {
          authorization: `${token}`,
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

        //data.map(todo => (todo.status = 'normal'));

        console.log(data);

        setFetchedTodos(data);
        setLoadingTodos(false);

        return data;
      });
    }

    fetchData();
  }, [token]);

  return (
    <>
      <AddTodoForm />
      <TodoList fetchedTodos={fetchedTodos} loadingTodos={loadingTodos} />
    </>
  );
}

export default TodoList;
