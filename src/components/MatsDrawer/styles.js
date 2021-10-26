import { makeStyles } from '@material-ui/core/styles';

const useStyles = (drawerWidth) => makeStyles((theme) => ({
  drawer: {
    '@media screen and (min-width: 1500px)': {
      width: drawerWidth,
    },
    flexShrink: 0,
  },
  drawerPaper: {
    '@media screen and (min-width: 1500px)': {
      width: drawerWidth,
    },
    backgroundColor: '#2f3136',
    minWidth: '15rem',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  closeIcon: {
    color: '#fafafa',
  },
  primaryText: {
    color: '#dcddde',
    paddingRight: '1.5rem',
  },
  sendToDiscord: {
    display: 'none',
  },
  table: {
    minWidth: '100%',
  },
  section: {
    paddingTop: '1rem',
  },
}));

export default useStyles;
