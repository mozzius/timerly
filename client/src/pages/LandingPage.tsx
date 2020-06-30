import * as React from 'react';
import styled from 'styled-components';
import { Form, Input } from '../components/styled';

export interface LandingPageProps {
  auth: (username: string, password: string) => Promise<boolean>;
}

const Error = styled.p`
  transition: opacity 0.2s ease;
  opacity: ${(props: { show: boolean }) => (props.show ? '1' : '0')};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 100vh;

  ${Form} {
    width: 100%;
    max-width: 300px;

    background-color: white;

    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

    overflow: hidden;

    div {
      background-color: #4c84db;
      color: white;
      padding: 15px;

      h1,
      ${Error} {
        margin: 0;
      }
    }

    ${Input} {
      margin: 10px;
    }

    ${Input}[type='submit'] {
      align-self: flex-end;
    }
  }
`;

const LandingPage: React.SFC<LandingPageProps> = ({ auth }) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  return (
    <Container>
      <Form
        onSubmit={async (evt) => {
          evt.preventDefault();
          setError(false);
          const success = await auth(username, password);
          if (!success) setError(true);
        }}
      >
        <div>
          <h1>Timerly</h1>
          <Error show={error}>
            Invalid username or password, please try again
          </Error>
        </div>
        <Input
          type="text"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          placeholder="Password"
        />
        <Input type="submit" value="Login" />
      </Form>
    </Container>
  );
};

export default LandingPage;
