import React from 'react';
import Todo from './Todo';
import EditTodo from './EditTodo';
import {Grid, CircularProgress} from '@material-ui/core';

const TodoList = ({fetchedTodos, loadingTodos}) => {
  return (
    <Grid container>
      {loadingTodos ? (
        <CircularProgress />
      ) : (
        fetchedTodos.map((todo) => (
          {todo['status'] === 'editing' ? (
            <EditTodo
          key={key}
          index={key}
          todo={this.props.list[key]['todo']}
          saveTodo={this.props.saveTodo}
        />
          ) : (
            <Todo
          key={key}
          index={key}
          todo={this.props.list[key]['todo']}
          deleteTodo={this.props.deleteTodo}
          updateTodo={this.props.updateTodo}
        />
          )}
        ))
      )}
    </Grid>
  );
}

export default TodoList;
