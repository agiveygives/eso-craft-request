import React, { forwardRef } from 'react';
import { Fade, Tooltip } from '@material-ui/core';
import Colors from '../../constants/colors';
import propTypes from './propTypes';
import useStyles from './styles';

const CustomTooltip = forwardRef(({
  title, TransitionComponent, placement, children, maxWidth, fontSize,
  textColor, backgroundColor,
}, ref) => {
  const classes = useStyles(maxWidth, fontSize, textColor, backgroundColor)();

  return (
    <Tooltip
      classes={classes}
      TransitionComponent={TransitionComponent}
      title={(
        <>
          {title}
          <span className={classes.arrow} ref={ref} />
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

CustomTooltip.defaultProps = {
  TransitionComponent: Fade,
  placement: 'bottom',
  maxWidth: '12rem',
  fontSize: '0.8rem',
  backgroundColor: Colors.warning,
  textColor: 'black',
};

CustomTooltip.propTypes = propTypes;

export default CustomTooltip;
