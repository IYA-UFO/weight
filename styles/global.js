import { createGlobalStyle } from 'styled-components';
import ressCss from './ressCss';

export default createGlobalStyle`
  ${ressCss}
  html {
    font-size:10px;
  }
  body {
    font-family: 
    'Hiragino Kaku Gothic Pro', /* iOS,Mac */
     meiryo, /* Windowsの日本語 */
     Helvetica,/* Windows,Androidの英数 */
     sans-serif;/* Androidを適当なゴシックに*/
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: unset;
    font-size: 15px;
    line-height: 1.6;
    min-width: 320px;
    width: 100%;
    height: 100%;
    font-feature-settings:"palt";
    overflow-x:hidden;
    color:#00214d;
  /* #00214d #ff5470 #00ebc7 #fde24f*/
    @media screen and (min-width:1024px) {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
  ul {
    list-style: none;
  }
  img  {
    border: none;
    vertical-align: top;
    max-width: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
    &:visited{
      color: inherit;
    }
  }
  tspan{
    font-size:13px;
  }
  #__next {
    height: 100%;
  }
`;
