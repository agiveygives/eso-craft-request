import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  guildHeaderColor: PropTypes.string.isRequired,
  toggleMatsDrawer: PropTypes.func.isRequired,
  matsDrawerOpen: PropTypes.bool.isRequired,
};

export default propTypes;
