import { Divider, Grid, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Container from "../../components/Container";
import Panel, { PanelContent, PanelTitle } from "../../components/Panel";
import MyPokemon from "../../components/PokemonView/MyPokemon";
import useStore from "../../stores";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src="/assets/notfound.svg" width="200px" />
      <Typography variant="h4">Você ainda não tem pokemons salvos!</Typography>
    </div>
  );
}

function Dashboard() {
  const store = useStore();

  return (
    <Container style={{ height: "100vh" }}>
      <Panel style={{ height: "100%" }}>
        <PanelContent>
          <PanelTitle>Minha Pokedex</PanelTitle>
        </PanelContent>

        <Divider style={{ width: "100%" }} />

        <PanelContent>
          {store.user?.pokemons.length ? (
            <>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={2}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography color="secondary">Foto</Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography color="secondary">Nome</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="secondary">Tipo</Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography color="secondary">Ações</Typography>
                </Grid>
              </Grid>

              {store.user?.pokemons.map((pokemon) => (
                <MyPokemon key={pokemon.name} pokemon={pokemon} />
              ))}
            </>
          ) : (
            <NotFound />
          )}
        </PanelContent>
      </Panel>
    </Container>
  );
}

export default observer(Dashboard);
