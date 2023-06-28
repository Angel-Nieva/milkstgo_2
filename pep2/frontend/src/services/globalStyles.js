import { createGlobalStyle } from 'styled-components';
import img from '../banner-img.jpg';
 
const GlobalStyle = createGlobalStyle`
    body {
        background-image: url(${img});
        background-size: cover;
        min-height: 100vh;
    }
`;
 
export default GlobalStyle;