import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './App.css';

// Pages
import HomePage from './pages/home';
import SignUpPage from './pages/signup';
import SignInPage from './pages/login';
import ProfilePage from './pages/profile';
import ForgotPasswordPage from './pages/forgotPassword'

// Components
import PrivateRoute from './components/privateRoute';

// Contexts
import { UserContext } from './contexts/user-context';
import { PostsContext } from './contexts/posts-context';

// API
import { getPosts } from './api';

const App = () => {

  const initialUserState = {
    uid: '',
    nickname: '',
    email: ''
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || initialUserState);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    setPostsLoading(true);
    const response = await getPosts();
    response.data.reverse();
    setPosts(response.data);
    if (response.data.length === 0) {
      setError(true);
    }
    setPostsLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, [user.nickname])

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={{ user, setUser, userLoading, setUserLoading }}>
          <PostsContext.Provider value={{ posts, setPosts, postsLoading, setPostsLoading, error, setError }}>
            <PrivateRoute path='/Profile' component={ProfilePage} />
            <Route exact path='/SignUp' component={SignUpPage} />
            <Route exact path='/SignIn' component={SignInPage} />
            <Route exact path='/ForgotPassword' component={ForgotPasswordPage} />
            <Route exact path='/' component={HomePage} />
          </PostsContext.Provider>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
