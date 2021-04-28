import { InputAdornment, Toolbar } from "@material-ui/core";
import { PokeButton } from "../Buttons/styles";
import { CompetiLogo, PokeBar, PokemonLogo, SearchInput } from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import useStore from "../../stores";

export default function NavBar() {
  const store = useStore();

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    store.setFilters({ ...store.filters, name: event.target.value });
  }

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

        <PokeButton variant="contained" color="primary">
          Login
        </PokeButton>

        <CompetiLogo alt="Competi Logo" />
      </Toolbar>
    </PokeBar>
  );
}
