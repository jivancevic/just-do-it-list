import React from 'react';
import Todo from './Todo';
import EditTodo from './EditTodo';
import {Grid, CircularProgress} from '@material-ui/core';

const TodoList = ({fetchedTodos, loadingTodos, token}) => {
  return (
    <Grid container>
      {loadingTodos ? (
        <CircularProgress />
      ) : (
        fetchedTodos.map(todo =>
          todo.status === 'editing' ? (
            <EditTodo key={todo.id} todo={todo} token={token} />
          ) : (
            <Todo key={todo.id} todo={todo} token={token} />
          ),
        )
      )}
    </Grid>
  );
};

export default TodoList;
