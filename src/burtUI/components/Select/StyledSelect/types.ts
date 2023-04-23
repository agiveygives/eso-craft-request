import { BaseSelectPropTypes } from "../types";

export interface StyledSelectPropTypes extends BaseSelectPropTypes {
  searchable?: boolean;
  inputClassName?: string;
  optionClassName?: string;
  placeholder?: string;
}