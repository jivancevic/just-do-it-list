import React, {Component, Fragment, useState} from 'react';
import useToken from '../hooks/useToken';
import {Delete, Build} from '@material-ui/icons';
import {Grid, Paper} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';

const styles = {
  Icon: {
    marginLeft: 'auto',
  },
  Paper: {
    margin: 'auto',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    width: 500,
  },
};

const deleteTodo = async (id, token) => {
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(true);
    }, 500);
  })
  .then(() => {
    axios
    .delete(`${process.env.BACKEND_URL}/todos/${id}`, {
      headers: {
        'authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then(async response => {
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        alert(error);
        return Promise.reject(error);
      }

      return data;
    });
  });
}

const updateTodo = (todo) => {
  todo.status = 'editing';
}

const Todo = (key, todo, token) => {
  const [fade, setFade] = useState(false);

  const gridClass = fade ? 'fade-out' : '';

  return (
    <Grid xs={12} className={`${gridClass}`} item key={key}>
      <Paper elevation={2} style={styles.Paper}>
        <span style={styles.Todo}>{this.props.todo}</span>
        <IconButton
          color="primary"
          aria-label="Edit"
          style={styles.Icon}
          onClick={() => updateTodo(todo)}
        >
          <Build fontSize="small" />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={deleteTodo(todo.id, token)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default Todo;
