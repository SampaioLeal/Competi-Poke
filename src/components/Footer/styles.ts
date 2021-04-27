import styled from "styled-components";

export const FooterBar = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  min-height: 48px;

  position: absolute;
  bottom: 0;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;
