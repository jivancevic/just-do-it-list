import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import React, {useState} from 'react';
import useToken from '../hooks/useToken';

const addTodo = async (input, token) => {
  if (input.length < 1) {
    alert('Todo field cannot be empty.');
    return;
  }

  const options = {
    headers: {
      'authorization': `${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  axios.post(
    `${process.env.BACKEND_URL}/todos`,
    JSON.stringify({
      title: input,
      desc: '',
      isComplete: false,
    }), options
  );
};

const AddTodoForm = () => {
  const [formInput, setFormInput] = useState('');
  const [token] = useToken();

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
