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

import { DBConfig } from "./services/indexedDb";
import { initDB } from "react-indexed-db";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import { firebaseConfig } from "./services/firebase";
import firebase from "firebase/app";

initDB(DBConfig);

export default function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <StylesProvider injectFirst>
        <CssBaseline />

        <MuiThemeProvider theme={pokeTheme}>
          <ThemeProvider theme={pokeTheme}>
            <Router>
              <NavBar />

              <Switch>
                <FirebaseAuthConsumer>
                  {({ isSignedIn }) => {
                    return (
                      <>
                        <Route exact path="/" component={Home} />

                        {isSignedIn ? (
                          <Route exact path="/pokedex" component={Dashboard} />
                        ) : (
                          <Redirect to="/" />
                        )}
                      </>
                    );
                  }}
                </FirebaseAuthConsumer>
              </Switch>
            </Router>

            <Footer />
            <Alert />
            <Loader />
            <GlobalStyles />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </FirebaseAuthProvider>
  );
}
