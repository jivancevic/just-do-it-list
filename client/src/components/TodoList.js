import React, {Fragment, useState} from 'react';
import useToken from '../hooks/useToken';
import AddTodoForm from '../components/AddTodoForm';
import List from '../components/List';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Paper, Grid, Typography} from '@material-ui/core';
import axios from 'axios';

const styles = {
  Paper: {
    padding: 20,
    margin: 'auto',
    textAlign: 'center',
    width: 500,
  },
};

function TodoList {
  const [list, setList] = useState({});
  const [token, setToken] = useToken();

  addToList = todo => {
    let list = {...this.state.list};
    list[`todo${Date.now()}`] = {
      todo: todo,
      status: 'active',
    };

    this.setState({list});
  };

  deleteTodo = key => {
    let helpList = list;
    helpList[key] = null;

    setList({list});
  };

  updateTodo = key => {
    let list = {...this.state.list};
    list[key]['status'] = 'editing';

    this.setState({list});
  };

  saveTodo = (key, todo) => {
    let list = {...this.state.list};
    list[key] = {
      todo: todo,
      status: 'active',
    };

    this.setState({list});
  };

  componentWillMount() {
    this.getTodos();
  }

  getTodos() {
    axios
      .get('http://localhost:3000/todos', {
        headers: {
          'authorization': your_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        this.setState({items: response.data}, () => {
          //console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: '',
          key: '',
        },
      });
    }
  }
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }
  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  }
  setUpdate(text, key) {
    console.log('items:' + this.state.items);
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        console.log(item.key + '    ' + key);
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      token: {token} = useToken()
    };
  }

  addToList = todo => {
    let list = {...this.state.list};
    list[`todo${Date.now()}`] = {
      todo: todo,
      status: 'active',
    };

    this.setState({list});
  };

  deleteTodo = key => {
    let list = {...this.state.list};
    list[key] = null;

    this.setState({list});
  };

  updateTodo = key => {
    let list = {...this.state.list};
    list[key]['status'] = 'editing';

    this.setState({list});
  };

  saveTodo = (key, todo) => {
    let list = {...this.state.list};
    list[key] = {
      todo: todo,
      status: 'active',
    };

    this.setState({list});
  };

  componentWillMount() {
    this.getTodos();
  }

  getTodos() {
    axios
      .get('http://localhost:3000/todos', {
        headers: {
          'authorization': your_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        this.setState({items: response.data}, () => {
          //console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: '',
          key: '',
        },
      });
    }
  }
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }
  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  }
  setUpdate(text, key) {
    console.log('items:' + this.state.items);
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        console.log(item.key + '    ' + key);
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }

  render() {
    return (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper style={styles.Paper}>
              <AddTodoForm addToList={this.addToList} />
            </Paper>
          </Grid>
          <Grid item xs={12} style={styles.Paper}>
            <List
              deleteTodo={this.deleteTodo}
              list={this.state.list}
              updateTodo={this.updateTodo}
              saveTodo={this.saveTodo}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default TodoList;
