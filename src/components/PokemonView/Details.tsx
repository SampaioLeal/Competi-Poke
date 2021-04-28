import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { normalizeName } from "../../services/normalizeName";
import { View } from "./styles";

interface Props {
  open: boolean;
  handleClose(): void;
  pokemon: Pokemon;
}

export default function Details({ open, handleClose, pokemon }: Props) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <View width="auto">
              <img width="200px" src={pokemon.image || ""} alt={pokemon.name} />
            </View>
          </Grid>

          <Grid item xs={6}>
            <Typography>Weight</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {pokemon.weight / 10} kg
            </Typography>

            <Typography>Height</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {pokemon.height / 10} m
            </Typography>

            <Typography>Abilities</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {pokemon.abilities
                .filter((ability) => !ability.is_hidden)
                .map((ability) => normalizeName(ability.ability.name))
                .join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Voltar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
