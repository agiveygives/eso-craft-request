import React, { useEffect, useState } from 'react';
import { connect, MapStateToProps } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import { StateType } from '../../store/types';
import { SessionType, InfoType } from '../../store/user/types';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: '24px',
  }
}));

interface StateProps {
  session: SessionType;
  userInfo: InfoType;
}

interface OwnProps {
  children: JSX.Element;
}

type Props = StateProps & OwnProps

const Layout = ({ session, userInfo, children }: Props): JSX.Element => {
  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!!session.accessToken && session.accessToken !== '' && !!userInfo && userInfo.avatarUrl !== '') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session, userInfo])

  let accountElement: JSX.Element;
  if (isAuthenticated) {
    accountElement = (
      <Avatar src={userInfo.avatarUrl} />
    );
  } else {
    accountElement = (
      <Button color="secondary" href="/Login">Login</Button>
    )
  }

  return (
    <div>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <NavLink className={classes.icon} to="/">
            <Avatar src="/images/hammer-and-anvil.png" />
          </NavLink>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Configuration" />
            <Tab label="Requests" />
            <Tab label="Metrics" />
          </Tabs>
          {accountElement}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  )
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, StateType> = state => ({
  session: state.user.session,
  userInfo: state.user.info,
});

export default connect(mapStateToProps)(Layout);
