import 'rc-slider/assets/index.css';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import { Typography } from '@material-ui/core';
import craftLevels from '../../constants/craftableLevels';
import { UPDATE_GEAR_LEVEL } from '../../store/constants';

const propTypes = {
  label: PropTypes.string,
  craftableLevels: PropTypes.bool.isRequired,

  // from redux
  updateGearLevel: PropTypes.func.isRequired,
};

const LevelSlider = ({ label, craftableLevels, updateGearLevel }) => {
  const intl = useIntl();
  const TooltipSlider = Slider.createSliderWithTooltip(Slider);
  const levels = [];

  const sliderLevels = craftableLevels ? craftLevels : levels;

  function updateLevelLabel(level) {
    document.getElementById('level-label').innerHTML = `${intl.formatMessage({ id: 'user.level' })} ${level}`;
  }

  return (
    <div style={{ width: 'fit-content', marginLeft: 50 }}>
      <Typography variant="h6">{label}</Typography>
      <TooltipSlider
        id="level-slider"
        trackStyle={{ backgroundColor: '#27a745' }}
        style={{ width: 200, marginTop: 10, marginBottom: 10 }}
        min={0}
        max={sliderLevels.length - 1}
        tipFormatter={(value) => `${intl.formatMessage({ id: 'user.level' })} ${sliderLevels[value]}`}
        onChange={(value) => {
          updateLevelLabel(sliderLevels[value]);
          updateGearLevel(sliderLevels[value]);
        }}
      />
      <Typography
        id="level-label"
        variant="body1"
      >
        {`${intl.formatMessage({ id: 'user.level' })} ${sliderLevels[0]}`}
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
