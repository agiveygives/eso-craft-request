import React from 'react';
import classNames from 'classnames';
import { AppHeader } from '../AppHeader';
import { PropTypes } from './types';
import styles from './styles.module.css';

const AppLayout = ({ children, footer, header, centered }: PropTypes) => {
  return (
    <main className={styles.appContainer}>
      <AppHeader logoUri={header.logoUri} navLinks={header.navLinks} menu={header.menu} />

      <article className={classNames(styles.contentContainer, {[styles.centered]: centered})}>
        {children}
      </article>

      <section className={styles.footer}>
        {footer}
      </section>
    </main>
  );
}

AppLayout.defaultProps = {
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
