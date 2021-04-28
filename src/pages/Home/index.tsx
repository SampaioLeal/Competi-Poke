import { Divider, Grid } from "@material-ui/core";
import { Pagination, Skeleton } from "@material-ui/lab";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import {
  PaginationContainer,
  PokePaginationItem,
} from "../../components/Pagination/styles";
import Panel, { PanelContent } from "../../components/Panel";
import PokeCarousel from "../../components/PokeCarousel";
import PokemonView from "../../components/PokemonView";
import Select from "../../components/Select";
import useStore from "../../stores";

function Home() {
  const store = useStore();
  const pokemonsPerPage = 6;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [filters, setFilters] = useState<PokemonFilters>({
    type: "",
  });

  function handleTypeFilterChange(value: SelectRow["value"]) {
    setFilters((prev) => ({ ...prev, type: value }));
  }

  function handlePageChange(_event: unknown, page: number) {
    setPage(page - 1);
  }

  async function getPokemons() {
    const pokes = await store.getPokemons(pokemonsPerPage, page, filters);

    setTotalPokemons(pokes?.total || 0);
    setPokemons(pokes?.results || []);
  }

  async function sync() {
    store.setLoading(true);
    store.fetchTypes();
    await store.fetchAllPokemons();

    await getPokemons();
    store.setLoading(false);
  }

  useEffect(() => {
    sync();
  }, []);

  useEffect(() => {
    getPokemons();
  }, [page, filters]);

  return (
    <Container>
      <Panel>
        <PanelContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <Select
                label="Filter by type"
                value={filters.type}
                onChange={handleTypeFilterChange}
                options={store.types.map((type) => ({
                  label: type.name,
                  value: type.name,
                }))}
              />
            </Grid>
          </Grid>
        </PanelContent>

        <Divider style={{ width: "100%" }} />

        <PanelContent>
          <Grid container spacing={3}>
            {pokemons.length ? (
              pokemons.map((pokemon) => {
                return (
                  <Grid key={pokemon.name} item xs={12} sm={6} md={4}>
                    <PokemonView pokemon={pokemon} />
                  </Grid>
                );
              })
            ) : (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="rect" width={200} height={200} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="rect" width={200} height={200} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="rect" width={200} height={200} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="rect" width={200} height={200} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="rect" width={200} height={200} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="rect" width={200} height={200} />
                </Grid>
              </>
            )}
          </Grid>

          <PaginationContainer>
            <Pagination
              count={Math.ceil(totalPokemons / pokemonsPerPage)}
              onChange={handlePageChange}
              renderItem={(props) => <PokePaginationItem {...props} />}
            />
          </PaginationContainer>
        </PanelContent>
      </Panel>

      <PokeCarousel />
    </Container>
  );
}

export default observer(Home);
