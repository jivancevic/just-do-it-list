import React, {useState} from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import useToken from '../hooks/useToken';
import axios from 'axios';

const addTodo = async (todo, token) => {
  if (todo.length < 1) {
    alert('Todo field cannot be empty.');
    return;
  }

  axios.post(`${process.env.BACKEND_URL}/todos`, {
    headers: {
      'authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
};

const AddTodoForm = () => {
  const [formInput, setFormInput] = useState('');
  const [token, setToken] = useToken();

  const handleSubmit = async evt => {
    evt.preventDefault();

    await addTodo(formInput, token);
  };

  const handleInput = evt => {
    const newValue = evt.target.value;
    setFormInput(newValue);
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex'}}>
      <Input
        placeholder="Todo"
        inputProps={{
          'aria-label': 'Description',
        }}
        onChange={handleInput}
        style={{width: '90%'}}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{width: '10%'}}
      >
        Add
      </Button>
    </form>
  );
};

export default AddTodoForm;
