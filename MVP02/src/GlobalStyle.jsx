import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.inter-<uniquifier> {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: <weight>;
    font-style: normal;
    font-variation-settings:
      "slnt" 0;
  }
  body{
    color: #6c7983;
    font-size: 1.2rem;
    &::-webkit-scrollbar{
      width: 7px;
  }
  &::-webkit-scrollbar-thumb{
      background-color: #27AE60;
      border-radius: 10px;
  }
  &::-webkit-scrollbar-track{
      background-color: #EDEDED;
  }
}
  }
`;

export default GlobalStyle;
