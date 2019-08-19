import 'rc-slider/assets/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import Text from 'terra-text';
import craftLevels from '../../constants/craftableLevels';
import { UPDATE_GEAR_LEVEL } from '../../store/constants';

const propTypes = {
  label: PropTypes.string,
  craftableLevels: PropTypes.bool.isRequired,

  // from redux
  updateGearLevel: PropTypes.func.isRequired
};

const LevelSlider = ({ label, craftableLevels, updateGearLevel }) => {
  const TooltipSlider = Slider.createSliderWithTooltip(Slider);
  const levels = [];

  const sliderLevels = craftableLevels ? craftLevels: levels;

  function updateLevelLabel(level) {
     document.getElementById('level-label').innerHTML = `Level ${level}`;
  }

  return (
    <div style={{ width: 200, marginLeft: 50 }}>
      <Text fontSize={18} weight={400}>{label}</Text>
      <TooltipSlider
        id="level-slider"
        trackStyle={{ backgroundColor: '#27a745' }}
        style={{ width: 200, 'marginTop': 10, 'marginBottom': 10 }}
        min={0}
        max={sliderLevels.length - 1}
        tipFormatter={value => `Level ${sliderLevels[value]}`}
        onChange={value => {
          updateLevelLabel(sliderLevels[value]);
          updateGearLevel(sliderLevels[value]);
        }}
      />
      <Text
        id='level-label'
        fontSize={16}
        weight={200}
      >
        Level {sliderLevels[0]}
      </Text>
    </div>
  );
};

LevelSlider.propTypes = propTypes;

LevelSlider.defaultProps = {
  label: '',
  craftableLevels: false
};

const mapDispatchToProps = dispatch => ({
  updateGearLevel: level => dispatch({ type: UPDATE_GEAR_LEVEL, level })
})

export default connect(null, mapDispatchToProps)(LevelSlider);
