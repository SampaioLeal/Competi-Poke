import { Paper } from "@material-ui/core";
import styled from "styled-components";

const Panel = styled(Paper).attrs({
  elevation: 4,
})`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: #d4c3a3;
`;

export default Panel;

export const PanelContent = styled.div`
  padding: 35px;
`;
