import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/user-context';

// Wrapper to redirect user to login if unauthenticated
const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={props => {
                return user.uid !== '' ? <Component {...props} /> : <Redirect to='/SignIn' />
            }}
        />
    )
}

export default PrivateRoute;
