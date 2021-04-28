import { AppBar, TextField } from "@material-ui/core";
import styled from "styled-components";

export const PokeBar = styled(AppBar)`
  height: 86px;
  justify-content: center;
`;

export const PokemonLogo = styled.img.attrs({
  src: "/assets/poke_logo.svg",
})`
  cursor: pointer;
`;

export const CompetiLogo = styled.img.attrs({
  src: "/assets/competi_logo.svg",
})`
  margin-left: 30px;
  cursor: pointer;
`;

export const SearchInput = styled(TextField)`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  height: 55px;

  margin: 0 30px;

  label.Mui-focused {
    color: green;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border: none;
    }
  }
`;
