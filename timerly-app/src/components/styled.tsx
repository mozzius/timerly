import styled from 'styled-components';

export const Input = styled.input`
  padding: 8px;

  font-size: 16px;
  font-family: inherit;

  border: 2px solid #eee;
  border-radius: 5px;

  &:hover,
  &:focus {
    border-color: #ccc;
  }

  &[type='submit'] {
    align-self: flex-end;

    padding: 8px 16px;

    background-color: #4c84db;
    color: white;

    border: none !important;
    border-radius: 5px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
