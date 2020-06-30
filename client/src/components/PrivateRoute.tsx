import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { userContext } from '../App';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const user = React.useContext(userContext);
  return (
    <Route
      {...props}
      render={({ location }) =>
        user !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
