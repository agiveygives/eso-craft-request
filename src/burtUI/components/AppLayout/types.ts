import { AppHeaderPropTypes } from "../AppHeader/types";

export type PropTypes = {
  className?: string;
  children: JSX.Element;
  header: AppHeaderPropTypes,
  footer: JSX.Element;
  centered?: boolean;
}
