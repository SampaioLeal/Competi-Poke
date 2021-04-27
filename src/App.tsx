import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import NavBar from "./components/NavBar";
import pokeTheme from "./styles/pokeTheme";
import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import { CssBaseline } from "@material-ui/core";
import GlobalStyles from "./styles/globals";
import Home from "./pages/Home";

function App() {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />

      <MuiThemeProvider theme={pokeTheme}>
        <ThemeProvider theme={pokeTheme}>
          <Router>
            <NavBar />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokedex" />
            </Switch>
          </Router>

          <Footer />
        </ThemeProvider>
      </MuiThemeProvider>

      <GlobalStyles />
    </StylesProvider>
  );
}

export default App;
