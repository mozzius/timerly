import * as React from 'react';
import { userContext } from '../App';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const user = React.useContext(userContext);
  if (!user) return null; // TS workaround
  return (
    <div>
      <h1>Hello, {user.username}</h1>
      <Link to="/signout">Sign out</Link>
    </div>
  );
};

export default Dashboard;
