import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Fade from '@material-ui/core/Fade';
import MaterialUITooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import Colors from '../../constants/colors';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  TransitionComponent: PropTypes.node,
  placement: PropTypes.string,
  maxWidth: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

const arrowGenerator = (color) => {
  return {
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
  };
}

const Tooltip = ({
  title, TransitionComponent, placement, children, maxWidth, fontSize,
  textColor, backgroundColor
}) => {
  const [arrowRef, setArrowRef] = React.useState(null);

  const useStyles = makeStyles(() => ({
    tooltip: {
      backgroundColor: backgroundColor,
      color: textColor,
      maxWidth: maxWidth,
      fontSize: fontSize,
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
    popper: arrowGenerator(backgroundColor)
  }));

  const { arrow, ...classes } = useStyles();

  return (
    <MaterialUITooltip
      classes={classes}
      TransitionComponent={TransitionComponent}
      title={
        <React.Fragment>
          {title}
          <span className={arrow} ref={setArrowRef} />
        </React.Fragment>
      }
      placement={placement}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      ref={setArrowRef}
    >
      {children}
    </MaterialUITooltip>
  );
};

Tooltip.defaultProps = {
  TransitionComponent: Fade,
  placement: 'bottom',
  maxWidth: '12rem',
  fontSize: '0.8rem',
  backgroundColor: Colors.warning,
  color: 'rgba(0, 0, 0, 0.87)',
};

Tooltip.propTypes = propTypes;

export default Tooltip;
