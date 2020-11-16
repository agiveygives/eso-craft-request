import React from 'react';
import { connect, MapStateToProps } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { StateType } from '../../store/types';
import { SessionType } from '../../store/user/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'black',
    paddingLeft: '0.5rem',
    flexGrow: 1,
  },
}));

interface StateProps {
  session: SessionType;
}

interface OwnProps {
  children: JSX.Element;
}

type Props = StateProps & OwnProps

const Layout = ({ children }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Avatar src="/images/hammer-and-anvil.png" />
          <Typography className={classes.title} variant="h5">ESO Craft Request</Typography>
          <Button color="secondary" href="/Login">Login</Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  )
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, StateType> = state => ({
  session: state.user.session,
});

export default connect(mapStateToProps)(Layout);
