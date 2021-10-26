import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  select: {
    background: '#e8e9ea',
    borderRadius: 3,
    color: 'black',
    padding: '0.2rem',
    minWidth: '7rem',
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
  helperText: {
    color: '#dddacb',
    maxWidth: '7rem',
    paddingLeft: '0.5rem',
  },
  wrapper: {
    paddingLeft: '0.5rem',
  },
}));

export default useStyles;
