import { Snackbar } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Alert as MuiAlert } from "@material-ui/lab";
import useStore from "../../stores";

function Alert() {
  const store = useStore();

  function handleClose(): void {
    store.clearAlert();
  }

  return (
    <Snackbar
      open={!!store.alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={"bottom, center"}
      style={{ zIndex: 99 }}
    >
      <MuiAlert
        variant="filled"
        onClose={handleClose}
        severity={store.alert.severity}
      >
        {store.alert.text}
      </MuiAlert>
    </Snackbar>
  );
}

export default observer(Alert);
