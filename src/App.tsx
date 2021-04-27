import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import NavBar from "./components/NavBar";
import pokeTheme from "./styles/pokeTheme";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={pokeTheme}>
        <ThemeProvider theme={pokeTheme}>
          <Router>
            <NavBar />

            <Switch>
              <Route exact path="/" />
              <Route exact path="/pokedex" />
            </Switch>
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;
