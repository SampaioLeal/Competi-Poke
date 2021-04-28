import { createMuiTheme } from "@material-ui/core";

const pokeTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#7E7394",
      light: "#b4adbe",
    },
    secondary: {
      main: "#524153",
    },
    background: {
      default: "#E0D7EC",
    },
  },
});

export default pokeTheme;
