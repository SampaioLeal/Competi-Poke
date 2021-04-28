import { Backdrop } from "@material-ui/core";
import { useState } from "react";
import { normalizeName } from "../../services/normalizeName";
import useStore from "../../stores";
import {
  View,
  Name,
  Container,
  Type,
  ActionButton,
  Order,
  TypesContainer,
} from "./styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";

interface PokemonViewProps {
  pokemon: Pokemon;
}

export default function PokemonViewCentered({ pokemon }: PokemonViewProps) {
  const store = useStore();
  const [backdropState, setBackdropState] = useState(false);

  function toggleBackdrop() {
    setBackdropState((prev) => !prev);
  }

  return (
    <Container>
      <View onMouseEnter={toggleBackdrop} onMouseLeave={toggleBackdrop}>
        <img src={pokemon.image || ""} width="150px" />

        <Backdrop
          style={{ zIndex: 1, color: "#fff", position: "absolute" }}
          open={backdropState}
        >
          <ActionButton $bgColor="#49DBDF">
            <VisibilityIcon />
          </ActionButton>
          <ActionButton $bgColor="#3AA05B">
            <AddIcon />
          </ActionButton>
        </Backdrop>

        <Order centered>{pokemon.order}</Order>
      </View>

      <Name>{normalizeName(pokemon.name)}</Name>

      <TypesContainer centered>
        {pokemon.types.map((type) => {
          return (
            <Type
              key={type.type.name}
              color={store.getTypeColor(type.type.name)}
            >
              {normalizeName(type.type.name)}
            </Type>
          );
        })}
      </TypesContainer>
    </Container>
  );
}
