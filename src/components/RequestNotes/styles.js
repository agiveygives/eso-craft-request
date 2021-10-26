import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: '1rem',
  },
  requestNotes: {
    width: '50%',
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
