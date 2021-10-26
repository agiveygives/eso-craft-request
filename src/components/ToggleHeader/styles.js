import { makeStyles } from '@material-ui/core/styles';

const useStyles = (paddingTop, alignment) => makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: alignment,
    alignItems: 'center',
    paddingTop,
  },
  icon: {
    color: '#dcddde',
  },
  text: {
    cursor: 'pointer',
    color: '#dcddde',
  },
}));

export default useStyles;
