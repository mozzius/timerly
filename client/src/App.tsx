import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import * as API from './api';
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
  // user info, null if not logged in, undefined if unknown
  const [user, setUser] = React.useState<User | null>();

  // get jwt
  React.useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const temp = JSON.parse(stored);
      API.get('auth', 'GET').then((res) => {
        if (res.success) {
          setUser(temp);
        } else {
          setUser(null);
        }
      });
    } else {
      setUser(null);
    }
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const strUser = JSON.stringify(user);

  // set jwt
  React.useEffect(() => {
    if (strUser && strUser !== 'null') {
      localStorage.setItem('user', strUser);
    }
  }, [strUser]);

  if (user === undefined) return null;

  return (
    <userContext.Provider value={user}>
      <Router>
        <Switch>
          <Route
            path="/signout"
            render={() => {
              localStorage.removeItem('user');
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
