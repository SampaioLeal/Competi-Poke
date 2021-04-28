import { Grid, Paper, Typography } from "@material-ui/core";
import { normalizeName } from "../../services/normalizeName";
import { View, SimpleType, ActionButton } from "./styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import useStore from "../../stores";

interface MyPokemonProps {
  pokemon: Pokemon;
}

export default function MyPokemon({ pokemon }: MyPokemonProps) {
  const store = useStore();

  return (
    <Paper elevation={0} style={{ padding: 10 }}>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={2}>
          <View width="80px">
            <img src={pokemon.image || ""} width="150px" />
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
          <ActionButton bgColor="#49DBDF">
            <VisibilityIcon />
          </ActionButton>
          <ActionButton bgColor="#F25D52">
            <DeleteIcon />
          </ActionButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
