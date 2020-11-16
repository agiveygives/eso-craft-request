import React, { useEffect, useState } from 'react';
import { connect, MapStateToProps } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { StateType } from '../../store/types';
import { SessionType, InfoType } from '../../store/user/types';
import NavLinks from '../../constants/NavigationLinks';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: '24px',
  },
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
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [value, setValue] = useState<number>(-1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleTabClick = (event: React.ChangeEvent<{}>, href: string) => {
    event.preventDefault();
    history.push(href);
  };

  useEffect(() => {
    if (!!session.accessToken && session.accessToken !== '' && !!userInfo && userInfo.avatarUrl !== '') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session, userInfo])

  useEffect(() => {
    const selectedLink = NavLinks.findIndex((navLink) => navLink.location === location.pathname);
    setValue(selectedLink);
  }, [location])

  let accountElement: JSX.Element;
  if (isAuthenticated) {
    accountElement = (
      <>
        <Grid item>
          <Avatar src={userInfo.avatarUrl} />
        </Grid>
        <Grid item >
          <Typography>{userInfo.username}</Typography>
        </Grid>
      </>
    );
  } else {
    accountElement = (
      <Grid item>
        <Button color="secondary" href="/Login">Login</Button>
      </Grid>
    )
  }

  return (
    <div>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <NavLink className={classes.icon} to="/" >
            <Avatar src="/images/hammer-and-anvil.png" />
          </NavLink>
          <Grid item xs={5}>
            <Tabs value={value} onChange={handleChange} textColor="secondary">
              {NavLinks.map((navLink) => (
                <Tab label={navLink.label} onClick={(event) => handleTabClick(event, navLink.location)} />
              ))}
            </Tabs>
          </Grid>
          <Grid container alignItems="center" justify="flex-end" spacing={1}>
            {accountElement}
          </Grid>
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
