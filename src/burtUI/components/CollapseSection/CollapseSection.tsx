import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { CollapseSectionPropTypes } from './types';
import styles from './styles.module.css';

const CollapseSection = ({ headerText, alignHeader, className, headerClassName, children }: CollapseSectionPropTypes) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const contentElementRef = useRef<HTMLDivElement>(null);

  const collapseSection = (element: HTMLDivElement) => {
    var sectionHeight = element.scrollHeight;

    var elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(() => {
        element.style.height = 0 + 'px';
      });
    });

    element.setAttribute('aria-hidden', 'true');
  }

  const expandSection = (element: HTMLDivElement, eventListener: () => void) => {
    var sectionHeight = element.scrollHeight;

    if (sectionHeight > 0) {
      element.style.height = sectionHeight + 'px';

      element.addEventListener('transitionend', eventListener, { once: true });

      element.setAttribute('aria-hidden', 'false');
    }
  }

  useEffect(() => {
    const contentElement = contentElementRef.current;

    const expandTransitionEndListener = () => {
      if (contentElement) {
        contentElement.style.height = 'auto'
      }
    }

    if (contentElement) {
      if (collapsed) {
        collapseSection(contentElement);
      } else {
        expandSection(contentElement, expandTransitionEndListener);
      }
    }

    return () => {
      contentElement?.removeEventListener('transitionend', expandTransitionEndListener)
    }
  }, [collapsed]);

  return (
    <article className={classNames(styles.container, className)}>
      <div
        className={
          classNames(
            styles.sectionHeader,
            {
              [styles.centered]: alignHeader === 'center',
            },
            headerClassName,
          )
        }
        tabIndex={0}
        onClick={() => setCollapsed((oldState) => !oldState)}
      >
        <h2>{headerText}</h2>
      </div>

      <div
        className={styles.content}
        ref={contentElementRef}
      >
        {children}
      </div>
    </article>
  );
}

CollapseSection.defaultProps = {
  alignHeader: 'center',
}

export default CollapseSection;
