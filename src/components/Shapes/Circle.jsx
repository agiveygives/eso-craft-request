import React from 'react';
import PropType from 'prop-types';
import _ from 'lodash';
import SVGComponent from './SVGComponent';
import styleSvg from './utils/styleSvg';

const Circle = (props) => {
  const { r, strokeWidth, children } = props;

  const height = (r * 2) + 2 * strokeWidth;
  const width = (r * 2) + 2 * strokeWidth;

  const cx = r + (strokeWidth / 2);
  const cy = r + (strokeWidth / 2);
  const styledProps = styleSvg(_.omit(props, 'style'), props);

  return (
    <SVGComponent height={height} width={width}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <circle {...styledProps} cx={cx} cy={cy}>{children}</circle>
    </SVGComponent>
  );
};

Circle.propTypes = {
  strokeWidth: PropType.number,
  r: PropType.number,
  children: PropType.element,
};

Circle.defaultProps = {
  strokeWidth: 0,
  r: 0,
  children: null,
};

export default Circle;
