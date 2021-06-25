import React, {Component, useState} from 'react';
import {Save, Delete} from '@material-ui/icons';
import {Grid, Paper} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import axios from 'axios';

const styles = {
  Icon: {
    marginLeft: 'auto',
    width: '10%',
  },
  Paper: {
    margin: 'auto',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 500,
  },
};

const saveTodo = async (input, id, token) => {
  if (input.length < 1) {
    alert('Todo field cannot be empty.');
    return;
  }

  axios.patch(`${process.env.BACKEND_URL}/todos/${id}`, JSON.stringify(input), {
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

const EditTodo = (key, todo, token) => {
  const [input, setInput] = useState(todo.title);

  const handleInput = evt => {
    setInput(evt.target.value);
  };

  return (
    <Grid xs={12} item key={key}>
      <Paper elevation={2} style={styles.Paper}>
        <form
          onSubmit={() => {
            this.props.saveTodo(input, todo.id, token);
          }}
          style={{display: 'flex'}}
        >
          <Input
            style={{width: '90%'}}
            defaultValue={todo.title}
            onChange={handleInput}
          />
          <IconButton
            type="submit"
            color="primary"
            aria-label="Add"
            style={styles.Icon}
          >
            <Save fontSize="small" />
          </IconButton>
        </form>
      </Paper>
    </Grid>
  );
}

export default EditTodo;
