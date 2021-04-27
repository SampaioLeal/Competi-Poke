interface SelectRow {
  label: string;
  value: number | string;
}

interface SelectProps {
  label: string;
  options: SelectRow[];

  value: SelectRow["value"] | null;
  onChange(value: SelectRow["value"]): void;
}
