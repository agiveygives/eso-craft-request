import { PropsValue } from 'react-select';
import { SelectOptionType } from "@/types/selectOption"

export type PropTypes = {
  className?: string;
  placeholder?: string;
  defaultValue?: PropsValue<SelectOptionType>;
  options: SelectOptionType[];
}