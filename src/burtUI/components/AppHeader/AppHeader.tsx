import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import useScrollPosition from '../../hooks/useScrollPosition';
import { AppHeaderPropTypes } from '../AppHeader/types';
import styles from './styles.module.css';

const AppHeader = ({ logoUri, navLinks, menu }: AppHeaderPropTypes) => {
  const scrollPosition = useScrollPosition();
  const [headerHeight, setHeaderHeight] = useState(125);

  return (
    <header className={classNames(styles.header, { [`${styles.headerScroll}`]: scrollPosition > 0 })}>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logoUri} alt='' width={headerHeight} height={headerHeight} />
      </div>

      <div>
        {navLinks.map((navLink) => (
          <a href={navLink.href} key={navLink.href}>{navLink.display}</a>
        ))}
      </div>

      <div>
        {menu.icon}
      </div>
    </header>
  )
};

export default AppHeader;
