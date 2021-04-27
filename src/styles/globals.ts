import { Theme } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";

interface GlobalStylesProps {
  theme: Theme;
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  #root {
    position: relative;
    min-height: 100vh;
  }

  body {
    background-color: ${({ theme }) => theme.palette.background.default}
  }
`;

export default GlobalStyles;
