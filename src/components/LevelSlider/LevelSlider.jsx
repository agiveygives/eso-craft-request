import 'rc-slider/assets/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import { Typography } from '@material-ui/core';
import craftableLevels from '../../constants/craftableLevels';
import { UPDATE_GEAR_LEVEL } from '../../store/constants';

const propTypes = {
  label: PropTypes.string,

  // from redux
  updateGearLevel: PropTypes.func.isRequired,
};

const LevelSlider = ({ label, updateGearLevel }) => {
  const TooltipSlider = Slider.createSliderWithTooltip(Slider);

  function updateLevelLabel(level) {
    document.getElementById('level-label').innerHTML = `Level ${level}`;
  }

  return (
    <div style={{ width: 200, marginLeft: 50 }}>
      <Typography variant="h6">{label}</Typography>
      <TooltipSlider
        id="level-slider"
        trackStyle={{ backgroundColor: '#27a745' }}
        style={{ width: 200, marginTop: 10, marginBottom: 10 }}
        min={0}
        max={craftableLevels.length - 1}
        tipFormatter={(value) => `Level ${craftableLevels[value]}`}
        onChange={(value) => {
          updateLevelLabel(craftableLevels[value]);
          updateGearLevel(craftableLevels[value]);
        }}
      />
      <Typography
        id="level-label"
        variant="body1"
      >
        Level
        {' '}
        {craftableLevels[0]}
      </Typography>
    </div>
  );
};

LevelSlider.propTypes = propTypes;

LevelSlider.defaultProps = {
  label: '',
};

const mapDispatchToProps = (dispatch) => ({
  updateGearLevel: (level) => dispatch({ type: UPDATE_GEAR_LEVEL, level }),
});

export default connect(null, mapDispatchToProps)(LevelSlider);
