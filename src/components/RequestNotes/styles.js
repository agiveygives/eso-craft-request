import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: '1rem',
  },
  requestNotes: {
    '@media screen and (min-width: 600px)': {
      width: '50%',
    },
    '@media screen and (max-width: 600px)': {
      width: '80%',
    },
  },
  input: {
    backgroundColor: 'white',
    minHeight: '3rem',
    padding: '0.5rem',
    borderRadius: '4px',
  },
  label: {
    color: '#dddacb',
  },
}));

export default useStyles;
