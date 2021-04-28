import NavBar from "./components/NavBar";
import pokeTheme from "./styles/pokeTheme";
import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import { CssBaseline } from "@material-ui/core";
import GlobalStyles from "./styles/globals";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import Alert from "./components/Alert";

import { DBConfig } from "./services/indexedDb";
import { initDB } from "react-indexed-db";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";

initDB(DBConfig);

export default function App() {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />

      <MuiThemeProvider theme={pokeTheme}>
        <ThemeProvider theme={pokeTheme}>
          <Router>
            <NavBar />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokedex" component={Dashboard} />
            </Switch>
          </Router>

          <Footer />
          <Alert />
          <Loader />
          <GlobalStyles />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
