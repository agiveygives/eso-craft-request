import { makeStyles } from '@material-ui/core/styles';

const useStyles = (guildHeaderColor) => makeStyles(() => ({
  hide: {
    display: 'none',
  },
  title: {
    color: 'black',
    paddingLeft: '0.5rem',
    flexGrow: '1',
  },
  appBar: {
    backgroundColor: guildHeaderColor,
    top: 0,
    left: 'auto',
    right: 0,
    position: 'sticky',
    zIndex: 1100,
  },
}));

export default useStyles;
