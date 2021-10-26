import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appStyle: {
    height: '100%',
    backgroundColor: '#26262b',
    color: '#dddacb',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    fallbacks: {
      /* https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/ */
      height: '-webkit-fill-available',
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.4,
  },
  hide: {
    display: 'none',
  },
  wrapper: {
    margin: '1.4rem',
  },
  userNameInput: {
    marginBottom: 'auto',
  },
}));

export default useStyles;
