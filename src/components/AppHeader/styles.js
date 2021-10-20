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
  },
}));

export default useStyles;
