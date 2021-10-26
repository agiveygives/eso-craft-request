import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  select: {
    '@media screen and (min-width: 450px)': {
      minWidth: '10rem',
    },
    '@media screen and (max-width: 450px)': {
      width: '100%',
    },
  },
});

export default useStyles;
