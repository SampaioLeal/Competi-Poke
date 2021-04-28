import { darken, IconButton } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ViewProps {
  width?: string;
  height?: string;
}
export const View = styled.div<ViewProps>`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  border: solid 2px black;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  position: relative;

  width: ${(props) => props.width || "200px"};
  height: ${(props) => props.width || "200px"};
`;

export const Name = styled.div`
  color: white;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 12px 25px;
  border-radius: 10px;
  border: solid 2px black;
  margin-top: -25px;
  position: relative;
  z-index: 2;
`;

interface OrderProps {
  centered?: boolean;
}
export const Order = styled.div<OrderProps>`
  z-index: 2;
  position: absolute;
  left: ${(props) => (props.centered ? undefined : "-30px")};
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

export const SimpleType = styled.div`
  background-color: ${(props) => props.color};

  padding: 5px;
  color: white;
  margin: 0 3px;
  width: fit-content;

  border-radius: 5px;
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

export const TypesContainer = styled.div<OrderProps>`
  display: flex;
  position: ${(props) => (props.centered ? "relative" : "absolute")};
  right: ${(props) => (props.centered ? undefined : "5px")};
  top: ${(props) => (props.centered ? "-65px" : "-15px")};
`;

interface ActionButtonProps {
  $bgColor: string;
}
export const ActionButton = styled(IconButton)<ActionButtonProps>`
  color: white;
  background-color: ${({ $bgColor }) => $bgColor};
  margin: 0 6px;

  &:hover {
    background-color: ${({ $bgColor }) => darken($bgColor, 0.3)};
  }
`;
