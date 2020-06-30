import styled from 'styled-components';

export const Input = styled.input`
  height: 40px;
  max-height: ${(props) => (props.hidden ? 0 : 40)}px;

  padding: 0 8px;

  font-size: 16px;
  font-family: inherit;

  border: 2px solid #eee;
  border-radius: 5px;

  overflow: hidden;

  transition: max-height 1s ease;

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
