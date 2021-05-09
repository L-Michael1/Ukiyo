import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { UserContext } from './contexts/user-context'
import './App.css';

const App = () => {

  const [user, setUser] = useState({
    uid: '',
    nickname: '',
    email: ''
  });

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path='/'>
            Home
          </Route>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
