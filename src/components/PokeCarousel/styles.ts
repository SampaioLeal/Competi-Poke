import { IconButton } from "@material-ui/core";
import styled from "styled-components";

export const CarouselButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: white;
  border: solid 2px black;

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

interface PageButtonProps {
  active?: boolean;
}
export const PageButton = styled(IconButton)<PageButtonProps>`
  border: solid 2px black;
  margin: 0 5px;

  background-color: ${({ active, theme }) =>
    active ? theme.palette.secondary.main : theme.palette.primary.main};

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.palette.secondary.main : theme.palette.primary.main};
  }
`;
