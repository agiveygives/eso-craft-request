import PropTypes from 'prop-types';

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

export default propTypes;
