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
import Details from "./Details";

interface PokemonViewProps {
  pokemon: Pokemon;
}

function PokemonView({ pokemon }: PokemonViewProps) {
  const store = useStore();
  const [backdropState, setBackdropState] = useState(false);
  const [modal, setModal] = useState(false);

  function openBackdrop() {
    setBackdropState(true);
  }

  function closeBackdrop() {
    setBackdropState(false);
  }

  function handleAddPokemon() {
    store.addPokemon(pokemon);
  }

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <Container>
      <View onMouseEnter={openBackdrop} onMouseLeave={closeBackdrop}>
        <img src={pokemon.image || ""} width="150px" alt={pokemon.name} />

        <Backdrop
          style={{ zIndex: 1, color: "#fff", position: "absolute" }}
          open={backdropState}
        >
          <ActionButton onClick={openModal} $bgColor="#49DBDF">
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

      <Details pokemon={pokemon} open={modal} handleClose={closeModal} />
    </Container>
  );
}

export default observer(PokemonView);
