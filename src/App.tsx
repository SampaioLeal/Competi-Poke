import NavBar from "./components/NavBar";
import pokeTheme from "./styles/pokeTheme";
import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import { CssBaseline } from "@material-ui/core";
import GlobalStyles from "./styles/globals";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import Alert from "./components/Alert";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import useStore from "./stores";
import { useEffect } from "react";

export default function App() {
  const store = useStore();
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user) {
      store.setUser({
        uid: user.uid,
        name: user.displayName || "Usuário",
      });
    }
  }, [user]);

  useEffect(() => {
    store.setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (error) store.setAlert("Ocorreu um erro no login!", "error");
  }, [error]);

  return (
    <StylesProvider injectFirst>
      <CssBaseline />

      <MuiThemeProvider theme={pokeTheme}>
        <ThemeProvider theme={pokeTheme}>
          <Router>
            <NavBar />

            <Switch>
              <Route exact path="/" component={Home} />

              {user ? (
                <Route exact path="/pokedex" component={Dashboard} />
              ) : (
                <Redirect to="/" />
              )}
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
