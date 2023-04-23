import React from 'react';
import classNames from 'classnames';
import { CardPropTypes } from './types';
import styles from './styles.module.css';

const Card = ({ title, className, children }: CardPropTypes) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>{title}</div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Card;
