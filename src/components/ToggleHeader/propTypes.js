import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  align: PropTypes.string,
  paddingTop: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default propTypes;
