import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as Api from './api';
import LandingPage from './pages/LandingPage';

export type User = {
  username: string;
  id: string;
};

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);

  const authenticate = async (username: string, password: string) => {
    const user = await Api.get('auth', 'POST', { username, password });
    if (user !== null) {
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

  if (user === null) return <LandingPage auth={authenticate} />;

  return (
    <Router>
      <Switch>
        <Route>
          <p>Hello World</p>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
