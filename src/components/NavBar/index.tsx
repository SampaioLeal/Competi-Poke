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
import { useHistory } from "react-router";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MouseEvent, useState } from "react";
import { observer } from "mobx-react-lite";

function NavBar() {
  const store = useStore();
  const history = useHistory();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    store.setFilters({ ...store.filters, name: event.target.value });
  }

  async function handleLogin() {
    store.setLoading(true);
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(
        () => null,
        () =>
          store.setAlert("Ocorreu um erro no login. Tente novamente.", "error")
      );
    store.setLoading(false);
  }

  function handleGoTo(path: string) {
    return () => {
      handleCloseMenu();
      if (path.includes("http")) {
        return (window.location.href = path);
      }

      return history.push(path);
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
    <PokeBar color="secondary" position="fixed">
      <Toolbar>
        <PokemonLogo onClick={handleGoTo("/")} alt="Pokemon Logo" />

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

        {store.user ? (
          <IconButton onClick={handleMenuClick} color="inherit">
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <PokeButton onClick={handleLogin} variant="contained" color="primary">
            Login
          </PokeButton>
        )}

        <Menu
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem disabled>{store.user?.name}</MenuItem>
          <MenuItem onClick={handleGoTo("/pokedex")}>Pokedex</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>

        <CompetiLogo
          onClick={handleGoTo("https://competisistemas.com.br/")}
          alt="Competi Logo"
        />
      </Toolbar>
    </PokeBar>
  );
}

export default observer(NavBar);
