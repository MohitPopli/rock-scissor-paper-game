import styled from 'styled-components';

export const WeaponsContainer = styled.span`
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 50%;
  display: flex;
  color: #4b6a90;
  padding: 20px;
  text-align: center;

  &.empty {
    background-color: white;
    border-radius: 50%;
    padding: 1.25rem;
  }
`;

export const WeaponIcon = styled.img<{ cursorType: string }>`
  width: 120px;
  height: 120px;
  cursor: ${(props) => props.cursorType};
`;
