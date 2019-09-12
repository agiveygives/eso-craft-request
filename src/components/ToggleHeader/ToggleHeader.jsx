import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Typography } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const headerStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    cursor: 'pointer',
    color: '#dcddde',
  }
}

const ToggleHeader = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <React.Fragment>
      <Container style={headerStyles.container}>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
        <Typography
          style={headerStyles.text}
          onClick={handleToggle}
          align='center'
          display='inline'
          variant='h4'
          gutterBottom
        >
          {title}
        </Typography>
      </Container>

      <Collapse in={isOpen}>
        {children}
      </Collapse>
    </React.Fragment>
  )
};

ToggleHeader.propTypes = propTypes;

export default ToggleHeader;