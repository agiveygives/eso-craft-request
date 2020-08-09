import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import { Fade, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Colors from '../../constants/colors';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  TransitionComponent: PropTypes.elementType,
  placement: PropTypes.string,
  maxWidth: PropTypes.string,
  fontSize: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

const defaultProps = {
  TransitionComponent: Fade,
  placement: 'bottom',
  maxWidth: '12rem',
  fontSize: '0.8rem',
  backgroundColor: Colors.warning,
  textColor: 'black',
};

const arrowGenerator = (color) => ({
  '&[x-placement*="bottom"] $arrow': {
    top: 0,
    left: 0,
    marginTop: '-0.95em',
    width: '2em',
    height: '1em',
    '&::before': {
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent ${color} transparent`,
    },
  },
  '&[x-placement*="top"] $arrow': {
    bottom: 0,
    left: 0,
    marginBottom: '-0.95em',
    width: '2em',
    height: '1em',
    '&::before': {
      borderWidth: '1em 1em 0 1em',
      borderColor: `${color} transparent transparent transparent`,
    },
  },
  '&[x-placement*="right"] $arrow': {
    left: 0,
    marginLeft: '-0.95em',
    height: '2em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 1em 1em 0',
      borderColor: `transparent ${color} transparent transparent`,
    },
  },
  '&[x-placement*="left"] $arrow': {
    right: 0,
    marginRight: '-0.95em',
    height: '2em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 0 1em 1em',
      borderColor: `transparent transparent transparent ${color}`,
    },
  },
});

const CustomTooltip = React.forwardRef(({
  title,
  TransitionComponent,
  placement,
  children,
  maxWidth,
  fontSize,
  textColor,
  backgroundColor,
}, ref) => {
  const useStyles = makeStyles(() => ({
    tooltip: {
      backgroundColor,
      color: textColor,
      maxWidth,
      fontSize,
      position: 'relative',
    },
    arrow: {
      position: 'absolute',
      fontSize: 6,
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    popper: arrowGenerator(backgroundColor),
  }));

  const { arrow, ...classes } = useStyles();

  return (
    <Tooltip
      classes={classes}
      TransitionComponent={TransitionComponent}
      title={(
        <>
          {title}
          <span className={arrow} ref={ref} />
        </>
      )}
      placement={placement}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(ref),
              element: ref,
            },
          },
        },
      }}
      ref={ref}
    >
      {children}
    </Tooltip>
  );
});

CustomTooltip.defaultProps = defaultProps;

CustomTooltip.propTypes = propTypes;

export default CustomTooltip;
