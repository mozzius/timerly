import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import SigninPage from './pages/SigninPage';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

export type User = {
  jwt: string;
  username: string;
  id: string;
};

export const userContext = React.createContext<User | null>(null);

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);

  // get jwt
  React.useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const strUser = JSON.stringify(user);

  // set jwt
  React.useEffect(() => {
    if (strUser !== 'null') {
      localStorage.setItem('user', strUser);
    }
  }, [strUser]);

  return (
    <userContext.Provider value={user}>
      <Router>
        <Switch>
          <Route
            path="/signout"
            render={() => {
              setUser(null);
              return <Redirect to="/" />;
            }}
          />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route exact path="/">
            <SigninPage setUser={setUser} />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
};

export default App;
