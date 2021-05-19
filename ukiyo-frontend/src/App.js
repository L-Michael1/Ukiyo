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
import swal from 'sweetalert';

// Contexts
import { UserContext } from './contexts/user-context';
import { PostsContext } from './contexts/posts-context';

// API
import { getPosts } from './api';
import { getUserWithExpiry } from './global';

const App = () => {

  const initialUserState = {
    uid: '',
    nickname: '',
    email: ''
  }

  const [user, setUser] = useState(getUserWithExpiry());

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
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

  // Get page + indices of posts to display...ex. 5-10
  const lastPostIdx = currentPage * postsPerPage;
  const firstPostIdx = lastPostIdx - postsPerPage;
  const currentPosts = posts.slice(firstPostIdx, lastPostIdx);
  const totalPosts = posts.length;

  useEffect(() => {
    if (getUserWithExpiry().uid === '') {
      setUser(initialUserState);
      swal('You have been logged out', 'Log back in to continue', 'warning')
    }
  }, [localStorage.getItem('user')])

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={{ user, setUser, userLoading, setUserLoading }}>
          <PostsContext.Provider value={{ currentPosts, postsPerPage, totalPosts, paginate, setPosts, postsLoading, setPostsLoading, error, setError }}>
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
