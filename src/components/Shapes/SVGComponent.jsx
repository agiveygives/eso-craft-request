import React from 'react';

const SVGComponent = (props) => (
  // eslint-disable-next-line
  <svg {...props}>{props.children}</svg>
);

export default SVGComponent;
