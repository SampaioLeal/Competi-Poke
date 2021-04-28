import { PaginationItem } from "@material-ui/lab";
import styled from "styled-components";

export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const PokePaginationItem = styled(PaginationItem)`
  color: white;
  border: solid 2px black;
  border-radius: 8px;

  background-color: ${(props) => {
    console.log(props);
    if (props.type === "page") {
      if (props.selected) {
        return props.theme.palette.secondary.main;
      } else return props.theme.palette.primary.main;
    }

    return props.theme.palette.primary.light;
  }} !important;

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary.main};
  }
`;
