import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div<{ topPos?: number }>`
  position: absolute;
  top: ${(props) => props.topPos}%;
  left: 51%;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 6px solid rgba(255, 0, 0, 1);
  border-radius: 50%;
  border-top-color: #0417f9;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;