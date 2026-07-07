import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;
