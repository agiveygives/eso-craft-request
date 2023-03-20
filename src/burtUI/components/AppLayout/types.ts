import { AppHeaderPropTypes } from "../AppHeader/types";

export type PropTypes = {
  children: JSX.Element;
  header: AppHeaderPropTypes,
  footer: JSX.Element;
  centered?: boolean;
}
