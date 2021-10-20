import { makeStyles } from '@material-ui/core/styles';

const useStyles = (guildFooterColor) => makeStyles(() => ({
  appBar: {
    paddingTop: '0.25rem',
    top: 'auto',
    bottom: 0,
    borderStyle: 'hidden',
    backgroundColor: guildFooterColor,
  },
  disabled: {
    color: 'white',
  },
  footerActions: {
    textAlign: 'right',
    justifyContent: 'center',
  },
  guildBranding: {
    display: 'flex',
    alignItems: 'center',
  },
  rightMargin: {
    marginRight: '0.7rem',
    display: 'flex',
  },
  wrapper: {
    display: 'inline-flex',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
}));

export default useStyles;
