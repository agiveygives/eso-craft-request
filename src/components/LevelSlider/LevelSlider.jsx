import 'rc-slider/assets/index.css';
import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import { Typography } from '@material-ui/core';
import craftLevels from '../../constants/craftableLevels';
import { UPDATE_GEAR_LEVEL } from '../../store/constants';
import propTypes from './propTypes';
import useStyles from './styles';

const LevelSlider = ({ label, craftableLevels, updateGearLevel }) => {
  const intl = useIntl();
  const classes = useStyles();
  const TooltipSlider = Slider.createSliderWithTooltip(Slider);
  const levels = [];

  const sliderLevels = craftableLevels ? craftLevels : levels;

  function updateLevelLabel(level) {
    document.getElementById('level-label').innerHTML = `${intl.formatMessage({ id: 'user.level' })} ${level}`;
  }

  return (
    <div className={classes.wrapper}>
      <Typography variant="h6">{label}</Typography>
      <TooltipSlider
        id="level-slider"
        className={classes.tooltipSlider}
        trackStyle={{ backgroundColor: '#27a745' }}
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
