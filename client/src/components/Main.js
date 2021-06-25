import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import TodoPage from './TodoPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import useToken from '../hooks/useToken';

const Main = () => {
  const {token, setToken} = useToken();

  return (
    <main>
      <Switch>
        <Route exact path="/">
          {token !== undefined ? <TodoPage/> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          <SignIn setToken={setToken} />
        </Route>
        <Route exact path="/signup">
          <SignUp setToken={setToken} />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
