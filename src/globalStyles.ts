import { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'styled-normalize';

const resetCSS = `
  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6,
  p,
  figure,
  blockquote,
  dl,
  dd,
  ul {
    margin: 0;
    padding: 0;
    border: 0;
  }

  ol, ul, menu {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${resetCSS}
  
  body {
    font-family: 'Montserrat', sans-serif;
    background: #000017;
  }
`;
