import { Backdrop } from "@material-ui/core";
import { useState } from "react";
import { normalizeName } from "../../services/normalizeName";
import useStore from "../../stores";
import {
  View,
  Name,
  Order,
  Container,
  Type,
  TypesContainer,
  ActionButton,
} from "./styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import { observer } from "mobx-react-lite";
import firebase from "firebase/app";

interface PokemonViewProps {
  pokemon: Pokemon;
}

function PokemonView({ pokemon }: PokemonViewProps) {
  const store = useStore();
  const [backdropState, setBackdropState] = useState(false);

  function toggleBackdrop() {
    setBackdropState((prev) => !prev);
  }

  function handleAddPokemon() {
    const data = {
      image: pokemon.image,
      name: pokemon.name,
      order: pokemon.order,
      id: pokemon.id,
      types: {} as { [key: string]: unknown },
      added_on: new Date().toISOString(),
    };

    pokemon.types.forEach((type) => {
      data.types[type.type.name] = type;
    });

    firebase
      .database()
      .ref("pokedex/" + store.user?.uid)
      .push(data);
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
          {store.user ? (
            <ActionButton onClick={handleAddPokemon} $bgColor="#3AA05B">
              <AddIcon />
            </ActionButton>
          ) : null}
        </Backdrop>

        <Order>{pokemon.order}</Order>

        <TypesContainer>
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
      </View>
      <Name>{normalizeName(pokemon.name)}</Name>
    </Container>
  );
}

export default observer(PokemonView);
