import React, { useState } from 'react';
import { Collapse, Container, Typography } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import useStyles from './styles';
import propTypes from './propTypes';

const ToggleHeader = ({
  title, variant, align, paddingTop, children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const classes = useStyles(paddingTop, align)();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Container className={classes.container}>
        {isOpen ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
        <Typography
          className={classes.text}
          onClick={handleToggle}
          align="center"
          display="inline"
          variant={variant}
          gutterBottom
        >
          {title}
        </Typography>
      </Container>

      <Collapse in={isOpen}>
        {children}
      </Collapse>
    </div>
  );
};

ToggleHeader.defaultProps = {
  variant: 'h4',
  align: 'center',
  paddingTop: '0rem',
};
ToggleHeader.propTypes = propTypes;

export default ToggleHeader;
