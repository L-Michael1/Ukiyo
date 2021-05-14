import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { UserContext } from './contexts/user-context'
import './App.css';

// Pages
import HomePage from './pages/home'
import SignUpPage from './pages/signup'
import SignInPage from './pages/login'
import ProfilePage from './pages/profile'

// Components
import PrivateRoute from './components/privateRoute';

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
          <PrivateRoute path='/Profile' component={ProfilePage} />
          <Route exact path='/SignUp' component={SignUpPage} />
          <Route exact path='/SignIn' component={SignInPage} />
          <Route exact path='/' component={HomePage} />
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
