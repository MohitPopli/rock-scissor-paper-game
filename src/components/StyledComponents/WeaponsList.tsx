import styled from 'styled-components';

export const WeaponsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }

  li {
    display: flex;
  }

  label {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    margin: 1rem 0 1rem 0;
  }
`;
