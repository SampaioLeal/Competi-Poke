type Color = "success" | "info" | "warning" | "error";

interface IAlert {
  open: boolean;
  text: string;
  severity?: Color;
}
