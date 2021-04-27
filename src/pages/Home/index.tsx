import { Divider, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Panel, { PanelContent } from "../../components/Panel";
import Select from "../../components/Select";
import useStore from "../../stores";

interface ListFilters {
  type: SelectRow["value"];
}

function Home() {
  const store = useStore();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<ListFilters>({
    type: "",
  });

  function handleTypeFilterChange(value: SelectRow["value"]) {
    setFilters((prev) => ({ ...prev, type: value }));
  }

  useEffect(() => {
    store.fetchTypes();
    store.fetchPokemons();
  }, []);

  return (
    <Container>
      <Panel>
        <PanelContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
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
            {store.getPokemons(6, page).map((pokemon) => {
              return (
                <Grid key={pokemon.name} item xs={4}>
                  {pokemon.name}
                </Grid>
              );
            })}
          </Grid>
        </PanelContent>
      </Panel>
    </Container>
  );
}

export default observer(Home);
