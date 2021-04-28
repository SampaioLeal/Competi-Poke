import { Typography } from "@material-ui/core";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src="/assets/notfound.svg" width="200px" />
      <Typography variant="h4">Você ainda não tem pokemons salvos!</Typography>
    </div>
  );
}
