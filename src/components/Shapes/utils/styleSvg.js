export default function styleSvg(sourceProps, style = {}) {
  if (sourceProps === undefined) return style;

  const styledSvg = style;

  if (sourceProps.fill) {
    styledSvg.fill = sourceProps.fill.color;
    styledSvg.fillOpacity = sourceProps.fill.alpha ? sourceProps.fill.alpha / 100 : 1;
  }
  if (sourceProps.stroke) {
    styledSvg.stroke = sourceProps.stroke.color;
    styledSvg.strokeOpacity = sourceProps.stroke.alpha ? sourceProps.stroke.alpha / 100 : 1;
  }
  if (sourceProps.strokeWidth) styledSvg.strokeWidth = sourceProps.strokeWidth;

  return styledSvg;
}
