import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 0;
  flex-shrink: 0;

  height: 100%;
  width: 300px;

  padding: 10px;

  background-color: #4c84db;
  color: white;
`;

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <Container {...props}>
      <h1>Timerly</h1>
    </Container>
  );
};

export default Sidebar;
