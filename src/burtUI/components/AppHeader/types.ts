export type AppHeaderPropTypes = {
  className?: string
  logoUri: string,
  navLinks: {
    href: string,
    display: string,
  }[];
  menu: {
    icon: JSX.Element,
    options: {
      display: string,
      action: () => void;
    }[],
    presentation?: 'auto' | 'drawer' | 'popover';
  };
}
