import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN", Meiryo, "メイリオ", Helvetica, Arial, Sans-Serif;
    margin: 0;
    padding: 0;
    font-size: 13px;
  }
  body {
    background-color: rgb(0, 10, 23);
    margin: 0;
    padding: 0;
    color: rgb(250, 250, 250);
    width: 100%;
    height: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    font-family: inherit;
    font-size: 1em;
  }
  table {
    border-collapse: separate;
    border-spacing: 0;
}
#__next {
    height: 100%;
  }
  p{
    margin:0;
  }
`;

export default GlobalStyle;
