import styled from 'styled-components';

export const PlayerModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const PlayerDataContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 4rem;
  align-items: center;
  justify-content: center;
`;

export const BotDataContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
`;

export const NameLabel = styled.label`
  padding-right: 2rem;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
`;

export const StartGameButton = styled.button`
  font-style: italic;
  font-weight: bold;
  border-radius: 12px;
  font-size: 1.5rem;
  width: 10rem;
  text-align: center;
  margin-top: 5rem;
`;

export const BackButton = styled.button`
  font-style: italic;
  font-weight: bold;
  border-radius: 12px;
  font-size: 1.5rem;
  width: 10rem;
  cursor: pointer;
  text-align: center;
  margin-top: 5rem;
  margin-right: 2rem;
`;
