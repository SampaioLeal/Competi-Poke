import { darken, IconButton } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const View = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  border: solid 2px black;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  position: relative;

  width: 200px;
  height: 200px;
`;

export const Name = styled.div`
  color: white;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 10px;
  border-radius: 10px;
  border: solid 2px black;
  margin-top: -25px;
  position: relative;
  z-index: 2;
`;

export const Order = styled.div`
  z-index: 2;
  position: absolute;
  left: -30px;
  top: 0;

  background-image: url("/assets/order.svg");
  background-repeat: no-repeat;
  background-size: cover;

  width: 60px;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  margin-top: -30px;
`;

export const Type = styled.div`
  z-index: 2;
  background-color: ${(props) => props.color};

  padding: 5px;
  color: white;
  margin-top: -30px;
  margin: 0 3px;

  border-radius: 5px;
`;

export const TypesContainer = styled.div`
  display: flex;
  position: absolute;
  right: 5px;
  top: -15px;
`;

interface ActionButtonProps {
  bgColor: string;
}
export const ActionButton = styled(IconButton)<ActionButtonProps>`
  color: white;
  background-color: ${({ bgColor }) => bgColor};
  margin: 0 6px;

  &:hover {
    background-color: ${({ bgColor }) => darken(bgColor, 0.3)};
  }
`;
