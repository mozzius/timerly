import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import { userContext } from '../App';

const Body = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  height: 100vh;
  width: 100%;

  ${Body} {
    flex-grow: 1;
  }
`;

const Dashboard: React.FC = () => {
  const user = React.useContext(userContext);
  if (!user) return null; // TS workaround
  return (
    <Container>
      <Sidebar />
      <Body>Hello World</Body>
    </Container>
  );
};

export default Dashboard;
