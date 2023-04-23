import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TextInput } from '../../Inputs';
import { Popover } from '../../Popover';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useOnFocusOutside from '../../../hooks/useOnFocusOutside';
import { StyledSelectPropTypes } from './types';
import sharedStyled from '../styles.module.css';
import styles from './styles.module.css';

const StyledSelect: React.FC<StyledSelectPropTypes> = (
  { className, options, searchable, placeholder, defaultValue }
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(defaultValue);
  const [displayValue, setDisplayValue] = useState<string | number | undefined>(
    options.find((option) => (option.value === defaultValue))?.display
  );
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  useOnClickOutside(containerRef, () => setShowOptions(false));
  useOnFocusOutside(containerRef, () => setShowOptions(false));

  const selectOption = (value: string | number, display: string) => {
    setSelectedValue(value);
    setDisplayValue(display);
    setShowOptions(false);
  }

  const checkPlacement = () => {
    if (containerRef?.current && optionsContainerRef?.current && popoverRef?.current) {
      // { top, right, bottom, left, width, height, x, y }
      const { top, bottom, left, height, width, x, y } = containerRef.current.getBoundingClientRect();
      const optionsContainerBounds = optionsContainerRef.current.getBoundingClientRect();

      if (window.innerHeight < top) {
        // the element is offscreen so we don't care
        return;
      }

      const availableSpaceBelow = window.innerHeight - bottom - height;
      const availableSpaceAbove = window.innerHeight - availableSpaceBelow;

      popoverRef.current.style['left'] = `${containerRef.current.offsetLeft}px`;
      popoverRef.current.style['minWidth'] = `${width}px`;
      optionsContainerRef.current.style['width'] = `fit-content`;
      popoverRef.current.style['width'] = `fit-content`;

      // set max-height
      if (availableSpaceAbove > availableSpaceBelow) {

        console.log(optionsContainerRef.current.clientHeight);
        if (availableSpaceAbove <= 300) {
          popoverRef.current.style['maxHeight'] = `${availableSpaceAbove}px`;
          optionsContainerRef.current.style['maxHeight'] = `${availableSpaceAbove}px`;
          popoverRef.current.style['top'] = `${containerRef.current.offsetTop - optionsContainerRef.current.clientHeight}px`;
        } else {
          popoverRef.current.style['maxHeight'] = '300px';
          optionsContainerRef.current.style['maxHeight'] = '300px';
          popoverRef.current.style['top'] = `${containerRef.current.offsetTop - 300}px`;
        }

        optionsContainerRef.current.style['height'] = `fit-content`;
      } else {
        if (availableSpaceAbove <= 300) {
          optionsContainerRef.current.style['maxHeight'] = `${availableSpaceBelow}px`;
        } else {
          optionsContainerRef.current.style['maxHeight'] = '300px';
        }

        popoverRef.current.style['top'] = `${containerRef.current.offsetTop}px`;
      }
    }
  }

  useEffect(() => {
    if (showOptions) {
      checkPlacement();
    }
  }, [showOptions])

  useEffect(() => {
    const listener = () => {
      checkPlacement()
    }

    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    }
  }, [])

  return (
    <div className={classNames(styles.container, className)} ref={containerRef}>
      <div
        tabIndex={0}
        className={classNames(
          sharedStyled.select,
          {
            [styles.inputFocused]: showOptions,
            [styles.placeholder]: !displayValue,
          }
        )}
        onFocus={() => setShowOptions(true)}
      >
        {displayValue || placeholder}
      </div>

      <Popover ref={popoverRef} show={showOptions} contentClassName={styles.optionsContainer}>
        <div ref={optionsContainerRef}>
          {
            searchable ? (
              <div className={styles.searchContainer} >
                <TextInput
                  placeholder="Search"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </div>
            ) : null
          }
          {
            options?.filter((option) => (
              option.display.toLowerCase().includes(searchText.toLowerCase())
            ))?.map(({ value, display }) => (
              <button className={styles.option} key={value} onClick={() => selectOption(value, display)}>{display}</button>
            ))
          }
        </div>
      </Popover>
    </div>
  )
}

StyledSelect.defaultProps = {
  searchable: false,
  placeholder: '',
}

export default StyledSelect;
