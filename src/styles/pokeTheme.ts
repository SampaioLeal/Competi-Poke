import { createMuiTheme } from "@material-ui/core";

const pokeTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#7E7394",
    },
    secondary: {
      main: "#524153",
    },
    background: {
      default: "#E0D7EC",
      // paper: "#D4C3A3",
    },
  },
});

export default pokeTheme;
