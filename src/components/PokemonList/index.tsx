import firebase from "firebase/app";
import useStore from "../../stores";
import { useList } from "react-firebase-hooks/database";
import { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import MyPokemon from "../../components/PokemonView/MyPokemon";
import NotFound from "../NotFound";

export default function PokemonList({ uid }: { uid: string }) {
  const store = useStore();
  const [snapshots, loading, error] = useList(
    firebase.database().ref("pokedex/" + uid)
  );

  useEffect(() => {
    store.setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (error)
      store.setAlert("Ocorreu um erro ao resgatar os pokemons!", "error");
  }, [error]);

  const pokemons =
    snapshots
      ?.map((value) => {
        const key = value.key;
        const pokemon = value.val();

        pokemon.types = Object.keys(pokemon.types).map((typeKey) => {
          return pokemon.types[typeKey];
        });

        return { key, pokemon };
      })
      .filter((item) => item.pokemon.name.includes(store.filters.name)) || [];

  return pokemons.length ? (
    <>
      <Grid container spacing={0}>
        <Grid item xs={2} style={{ display: "flex", justifyContent: "center" }}>
          <Typography color="secondary">Foto</Typography>
        </Grid>
        <Grid item xs={3} style={{ display: "flex", justifyContent: "center" }}>
          <Typography color="secondary">Nome</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography color="secondary">Tipo</Typography>
        </Grid>
        <Grid item xs={3} style={{ display: "flex", justifyContent: "center" }}>
          <Typography color="secondary">Ações</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {pokemons.map((item) => (
          <Grid item xs={12} key={item.key}>
            <MyPokemon pokeKey={item.key} pokemon={item.pokemon} />
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
    <NotFound />
  );
}
