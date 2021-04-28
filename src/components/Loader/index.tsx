import { Backdrop, CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import styled from "styled-components";
import useStore from "../../stores";

const Loader: React.FC = () => {
  const store = useStore();

  return (
    <StyledBackdrop open={store.loading}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <br />
        <p style={{ color: "white" }}>Procurando pokemons...</p>
      </div>
    </StyledBackdrop>
  );
};

export default observer(Loader);

const StyledBackdrop = styled(Backdrop)`
  z-index: 100000000 !important;
  svg {
    color: white;
  }
`;
