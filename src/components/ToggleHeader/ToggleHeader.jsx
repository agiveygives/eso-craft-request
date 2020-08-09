import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

const propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  align: PropTypes.string,
  paddingTop: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const useStyles = (paddingTop, alignment) => makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: alignment,
    alignItems: 'center',
    paddingTop,
  },
  icon: {
    color: '#dcddde',
  },
  text: {
    cursor: 'pointer',
    color: '#dcddde',
  },
}));

const ToggleHeader = ({
  title, variant, align, paddingTop, children,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
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
