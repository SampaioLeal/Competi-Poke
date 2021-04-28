import { Divider } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Container from "../../components/Container";
import Panel, { PanelContent, PanelTitle } from "../../components/Panel";
import PokemonList from "../../components/PokemonList";
import useStore from "../../stores";

function Dashboard() {
  const store = useStore();

  return (
    <Container>
      <Panel>
        <PanelContent>
          <PanelTitle>Minha Pokedex</PanelTitle>
        </PanelContent>

        <Divider style={{ width: "100%" }} />

        <PanelContent>
          <PokemonList uid={store.user?.uid || ""} />
        </PanelContent>
      </Panel>
    </Container>
  );
}

export default observer(Dashboard);
