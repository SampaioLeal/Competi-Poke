import { Divider } from "@material-ui/core";
import Container from "../../components/Container";
import Panel, { PanelContent, PanelTitle } from "../../components/Panel";
import PokemonList from "../../components/PokemonList";

function Dashboard() {
  return (
    <Container>
      <Panel>
        <PanelContent>
          <PanelTitle>Minha Pokedex</PanelTitle>
        </PanelContent>

        <Divider style={{ width: "100%" }} />

        <PanelContent>
          <PokemonList />
        </PanelContent>
      </Panel>
    </Container>
  );
}

export default Dashboard;
