import { InputBase, withStyles } from "@material-ui/core";

export const PokeInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    "&:focus": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
    },
  },
}))(InputBase);
