export type CollapseSectionPropTypes = {
  headerText: string;
  className?: string;
  headerClassName?: string;
  children: JSX.Element | string;
  alignHeader: 'center' | 'start' | 'end';
}