import styled from 'styled-components';

export const GameContainer = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MainTitle = styled.h2`
  font-size: 3rem;
`;

export const PlayButton = styled.button`
  margin-top: 2rem;
  padding: 0.2rem;
  font-size: 1.5rem;
  width: 6rem;
  cursor: pointer;
  border-radius: 12px;
  font-style: italic;
`;

export const ModesSelectionList = styled.select`
  padding: 10px;
  font-size: 1rem;
  font-style: italic;
  border-radius: 12px;
`;
