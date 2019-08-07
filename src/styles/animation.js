import { css, keyframes } from 'styled-components';

const fadeInKeyFrames = keyframes`
  from {
    filter: blur(5px);
    opacity: 0;
  }

  to{
    filer: blur(0);
    opacity: 1;
  }
`;

export const fadeIn = ({ time= '1s', type='ease'} = {}) => css`animation: 1s ${fadeInKeyFrames} ease;` 
