import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    padding: '1rem',
    maxWidth: '90vw',
  },
  card: {
    color: 'black',
    backgroundColor: '#e8e9ea',
    overflow: 'visible',
  },
  content: {
    width: 'fit-content',
    maxWidth: '30em',
  },
  centered: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPadding: {
    padding: '2rem',
  },
});

export default useStyles;
