import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  subheader: {
    backgroundColor: '#e0e0e0',
    fontSize: '1em',
    fontColor: 'black',
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
  iconMargin: {
    marginRight: theme.spacing(1),
  },
  dialogContent: {
    '@media screen and (min-width: 600px)': {
      paddingRight: '5em',
      paddingLeft: '5em',
    },
  },
}));

export default useStyles;
