import PropTypes from 'prop-types';
import { stateShape } from '../../propShapes';

const propTypes = {
  // from redux
  currentState: stateShape.isRequired,
  sendMessage: PropTypes.func.isRequired,
  closeReview: PropTypes.func.isRequired,
};

export default propTypes;
