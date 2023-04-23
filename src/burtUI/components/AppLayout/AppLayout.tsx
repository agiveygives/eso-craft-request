import React from 'react';
import classNames from 'classnames';
import { AppHeader } from '../AppHeader';
import { PropTypes } from './types';
import styles from './styles.module.css';

const AppLayout = ({ className, children, footer, header, centered }: PropTypes) => {
  return (
    <main className={classNames(styles.appContainer, className)}>
      <AppHeader logoUri={header.logoUri} navLinks={header.navLinks} menu={header.menu} />

      <article className={classNames(styles.contentContainer, {[styles.centered]: centered})}>
        {children}
      </article>

      <footer className={styles.footer}>
        {footer}
      </footer>
    </main>
  );
}

AppLayout.defaultProps = {
  className: '',
  centered: true,
  header: {
    logoUri: '',
    navLinks: [],
    menu: {
      presentation: 'auto'
    }
  },
}

export default AppLayout;
