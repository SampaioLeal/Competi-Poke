import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { PokeSelect } from "./styles";

export default function Select({
  options,
  label,
  value,
  onChange,
}: SelectProps) {
  const values = options.map((option) => {
    const key = "type-" + option.value;
    const normalizedLabel =
      option.label.charAt(0).toUpperCase() + option.label.slice(1);

    return (
      <MenuItem key={key} value={option.value}>
        {normalizedLabel}
      </MenuItem>
    );
  });

  function handleChange(
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) {
    onChange(event.target.value as string | number);
  }

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="select">{label}</InputLabel>
      <PokeSelect
        color="primary"
        labelId="select"
        value={value}
        onChange={handleChange}
        label={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {values}
      </PokeSelect>
    </FormControl>
  );
}
