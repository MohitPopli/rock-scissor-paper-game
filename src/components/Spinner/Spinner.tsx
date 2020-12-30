import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from '../StyledComponents/Spinner';

interface SpinnerProps {
  id: string;
  top?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ id, top }) => (
  <SpinnerOverlay id={id}>
    <SpinnerContainer topPos={top} />
  </SpinnerOverlay>
);
