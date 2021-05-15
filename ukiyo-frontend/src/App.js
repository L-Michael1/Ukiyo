import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './App.css';

// Pages
import HomePage from './pages/home';
import SignUpPage from './pages/signup';
import SignInPage from './pages/login';
import ProfilePage from './pages/profile';

// Components
import PrivateRoute from './components/privateRoute';

// Contexts
import { UserContext } from './contexts/user-context';
import { PostsContext } from './contexts/posts-context';

// API
import { getPosts } from './api';

const App = () => {

  const [user, setUser] = useState({
    uid: '',
    nickname: '',
    email: ''
  });

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <PostsContext.Provider value={{ posts, setPosts }}>
            <PrivateRoute path='/Profile' component={ProfilePage} />
            <Route exact path='/SignUp' component={SignUpPage} />
            <Route exact path='/SignIn' component={SignInPage} />
            <Route exact path='/' component={HomePage} />
          </PostsContext.Provider>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
