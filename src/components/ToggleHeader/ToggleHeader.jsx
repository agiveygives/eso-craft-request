import React from 'react';
import PropTypes from 'prop-types';

// Material-ui imports
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const headerStyles = {
  container: {
    'display': 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
    'align-items': 'center'
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