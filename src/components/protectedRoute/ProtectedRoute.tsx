import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../services/auth.service';

const ProtectedRoute = ({ component: Component, protect, ...rest }: any) => {
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        let targetPath = props.location.pathname.toLocaleLowerCase();
        return authService.getLoggedUser().mobileNumber &&
          (targetPath === '/login' || targetPath === '/register' || targetPath === '/language') ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : authService.getLoggedUser().mobileNumber || !protect ? (
          <Component exact {...rest} {...props}></Component>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
      }}
    ></Route>
  );
};

export default ProtectedRoute;
