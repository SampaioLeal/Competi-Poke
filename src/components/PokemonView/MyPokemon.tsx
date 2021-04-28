import { Grid, Paper, Typography } from "@material-ui/core";
import { normalizeName } from "../../services/normalizeName";
import { View, SimpleType, ActionButton } from "./styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import useStore from "../../stores";
import { useState } from "react";
import Details from "./Details";

interface MyPokemonProps {
  pokeKey: string | null;
  pokemon: Pokemon;
}

export default function MyPokemon({ pokeKey, pokemon }: MyPokemonProps) {
  const store = useStore();
  const [modal, setModal] = useState(false);

  function handleDeletePokemon() {
    store.removePokemon(pokeKey);
  }

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <Paper elevation={0} style={{ padding: 10 }}>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={2}>
          <View width="80px">
            <img src={pokemon.image || ""} width="80px" alt={pokemon.name} />
          </View>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" color="secondary">
            {normalizeName(pokemon.name)}
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ display: "flex" }}>
          {pokemon.types.map((type) => (
            <SimpleType
              key={type.type.name}
              color={store.getTypeColor(type.type.name)}
            >
              {normalizeName(type.type.name)}
            </SimpleType>
          ))}
        </Grid>
        <Grid
          item
          xs={3}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ActionButton onClick={openModal} $bgColor="#49DBDF">
            <VisibilityIcon />
          </ActionButton>
          <ActionButton onClick={handleDeletePokemon} $bgColor="#F25D52">
            <DeleteIcon />
          </ActionButton>
        </Grid>
      </Grid>

      <Details pokemon={pokemon} open={modal} handleClose={closeModal} />
    </Paper>
  );
}
