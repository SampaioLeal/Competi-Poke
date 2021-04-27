import { InputAdornment, Toolbar } from "@material-ui/core";
import { PokeButton } from "../Buttons/styles";
import { CompetiLogo, PokeBar, PokemonLogo, SearchInput } from "./styles";
import SearchIcon from "@material-ui/icons/Search";

export default function NavBar() {
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
        />

        <PokeButton variant="contained" color="primary">
          Login
        </PokeButton>

        <CompetiLogo alt="Competi Logo" />
      </Toolbar>
    </PokeBar>
  );
}
