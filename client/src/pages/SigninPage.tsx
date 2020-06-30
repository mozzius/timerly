import * as React from 'react';
import styled from 'styled-components';

import * as API from '../api';
import { Form, Input } from '../components/styled';

import { User } from '../App';
import { useHistory, useLocation } from 'react-router-dom';

const Error = styled.p`
  transition: opacity 0.2s ease;
  opacity: ${(props: { show: boolean }) => (props.show ? '1' : '0')};
`;

const TextButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #4c84db;
  cursor: pointer;
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

    .blue {
      background-color: #4c84db;
      color: white;
      padding: 15px;

      h1,
      ${Error} {
        margin: 0;
      }
    }

    h3 {
      margin: 10px 0 0 10px;
    }

    ${Input} {
      margin: 10px 10px 0;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px;

      ${Input} {
        margin: 0;
      }
    }
  }
`;

export interface SigninPageProps {
  setUser: (user: User) => void;
}

const SigninPage: React.SFC<SigninPageProps> = ({ setUser }) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [isSignin, setIsSignin] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  const history = useHistory();
  const location = useLocation();

  return (
    <Container>
      <Form onSubmit={async (evt) => evt.preventDefault()}>
        <div className="blue">
          <h1>Timerly</h1>
          <Error show={error !== ''}>{error}</Error>
        </div>
        <h3>{isSignin ? 'Sign in' : 'Sign up'}</h3>
        <Input
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          placeholder="Email"
          hidden={isSignin}
          disabled={isSignin}
        />
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
        <div className="buttons">
          <TextButton onClick={() => setIsSignin((x) => !x)}>
            {isSignin ? 'Sign up' : 'Sign in'} instead
          </TextButton>
          <Input
            type="submit"
            value="Login"
            onClick={async (evt) => {
              evt.preventDefault();
              setError('');

              let res: API.RequestData;
              if (isSignin) {
                res = await API.get('signin', 'POST', {
                  username,
                  password,
                });
              } else {
                res = await API.get('signup', 'POST', {
                  username,
                  email,
                  password,
                });
              }
              if (res.success && res.data && res.data.success) {
                setUser({
                  jwt: res.data.message.jwt,
                  id: res.data.message.id,
                  username: res.data.message.username,
                });
                const { from } = (location.state as any) || {
                  from: { pathname: '/dashboard' },
                };
                history.push(from);
              } else if (res.success && res.data) {
                setError(res.data.message);
              } else {
                setError(
                  isSignin
                    ? 'Error: username or password were not found'
                    : 'Error: one or more fields are not valid'
                );
              }
            }}
          />
        </div>
      </Form>
    </Container>
  );
};

export default SigninPage;
