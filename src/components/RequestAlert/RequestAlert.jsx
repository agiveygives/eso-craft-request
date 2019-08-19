import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Arrange from 'terra-arrange';
import Text from 'terra-text';
import IconSuccess from 'terra-icon/lib/icon/IconSuccess';
import IconError from 'terra-icon/lib/icon/IconError';
import { RESTART } from '../../store/constants';
import ContentContainer from 'terra-content-container';
import Spacer from 'terra-spacer';

const propTypes = {
  isSuccessful: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

const RequestAlert = ({
  isSuccessful,
  isFailed,
  reset
}) => {
  const bodyStyle={ color: 'black', paddingLeft: '2em' };
  let render = <ContentContainer />;

  const style = (backgroundColor, borderColor) => ({
    backgroundColor,
    borderLeft: `3px solid ${borderColor}`
  })

  if (isSuccessful) {
    reset();
    render = (
      <Arrange
        align='center'
        style={{ ...style('#f4f4f4', '#78c346'), margin: '1em'}}
        fitStart={
          <Spacer padding='small'>
            <div className='centered-div'>
              <IconSuccess />
              <Text style={{paddingLeft: '0.5em' }} color='black' weight={700} fontSize={16}>Success!</Text>
            </div>
          </Spacer>
        }
        fill={<Text style={bodyStyle} weight={400} fontSize={16}>Your request was sent to discord.</Text>}
      />
    );
  } else if (isFailed) {
    render = (
      <Arrange
        align='center'
        style={{ ...style('#fedcdc', '#cc0910'), margin: '1em' }}
        fitStart={
          <Spacer padding='small'>
            <div className='centered-div'>
              <IconError />
              <Text style={{ paddingLeft: '0.5em' }} color='#d00a10' weight={700} fontSize={16}>Error!</Text>
            </div>
          </Spacer>
        }
        fill={<Text style={bodyStyle} weight={400} fontSize={16}>Failed to send request, please try again. If the problem persists, contact @JukesMcGee on discord.</Text>}
      />
    );
  }

  return render;
}

RequestAlert.propTypes = propTypes;

const mapStateToProps = state => ({
  isSuccessful: state.success,
  isFailed: state.failed
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch({ type: RESTART })
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestAlert);
