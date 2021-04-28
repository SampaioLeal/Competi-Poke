import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { PokeButton } from "../Buttons/styles";
import { CompetiLogo, PokeBar, PokemonLogo, SearchInput } from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import useStore from "../../stores";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { useHistory } from "react-router";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MouseEvent, useState } from "react";

export default function NavBar() {
  const store = useStore();
  const history = useHistory();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    store.setFilters({ ...store.filters, name: event.target.value });
  }

  function handleLogin() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }

  function handleGoTo(path: string) {
    return () => {
      history.push(path);
    };
  }

  function handleMenuClick(event: MouseEvent<HTMLButtonElement>) {
    setMenuAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setMenuAnchorEl(null);
  }

  function handleLogout() {
    handleCloseMenu();
    firebase.auth().signOut();
    history.push("/");
  }

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user }) => {
        return (
          <PokeBar color="secondary" position="fixed">
            <Toolbar>
              <PokemonLogo alt="Pokemon Logo" />

              <SearchInput
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                placeholder="Search Pokémon…"
                onChange={handleSearchChange}
              />

              {isSignedIn ? (
                <IconButton onClick={handleMenuClick} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              ) : (
                <PokeButton
                  onClick={handleLogin}
                  variant="contained"
                  color="primary"
                >
                  Login
                </PokeButton>
              )}

              <Menu
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem disabled>{user?.displayName}</MenuItem>
                <MenuItem onClick={handleGoTo("/pokedex")}>Pokedex</MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>

              <CompetiLogo alt="Competi Logo" />
            </Toolbar>
          </PokeBar>
        );
      }}
    </FirebaseAuthConsumer>
  );
}
