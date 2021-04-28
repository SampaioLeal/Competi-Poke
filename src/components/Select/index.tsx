import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import { PokeInput } from "./styles";

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
    <FormControl fullWidth>
      <InputLabel id="select">{label}</InputLabel>
      <MuiSelect
        labelId="select"
        placeholder={label}
        value={value}
        onChange={handleChange}
        label={label}
        input={<PokeInput />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {values}
      </MuiSelect>
    </FormControl>
  );
}
