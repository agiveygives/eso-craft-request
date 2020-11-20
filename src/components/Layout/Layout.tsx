import React, { useEffect, useState } from 'react';
import { connect, MapStateToProps } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { StateType } from '../../store/types';
import { SessionType, InfoType, GuildsType } from '../../store/user/types';
import NavLinks from '../../constants/NavigationLinks';
import { MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: '24px',
  },
  appBody: {
    backgroundColor: '#26262b',
    height: '100vh',
  }
}));

interface StateProps {
  session: SessionType;
  userInfo: InfoType;
  guilds: GuildsType[];
}

interface OwnProps {
  children: JSX.Element;
}

type Props = StateProps & OwnProps

const Layout = ({ session, userInfo, children, guilds }: Props): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [tabValue, setTabValue] = useState<number>(-1);
  const [selectedGuild, setSelectedGuild] = useState<number>()

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleGuildChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    setSelectedGuild(event.currentTarget.value as number);
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
    setTabValue(selectedLink);
  }, [location])

  let accountElement: JSX.Element;
  if (isAuthenticated) {
    accountElement = (
      <>
        {
          guilds.length > 0 ? (
            <Grid item >
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Guild"
                onChange={handleGuildChange}
                value={selectedGuild}
                defaultValue={guilds[0].id}
              >
                {guilds.map((guild) => (
                  <MenuItem key={guild.id} value={guild.id}>
                    <Grid container alignItems="center" justify="flex-end" spacing={1}>
                      <Grid item>
                        <Avatar src={guild.iconUrl} />
                      </Grid>
                      <Grid item>
                        <Typography color="secondary">{guild.name}</Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ) : <></>
        }
        <Grid item>
          <Avatar src={userInfo.avatarUrl} />
        </Grid>
        <Grid item>
          <Typography color="secondary">{userInfo.username}</Typography>
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
            <Tabs value={tabValue} onChange={handleTabChange} textColor="secondary">
              {NavLinks.map((navLink) => (
                <Tab
                  key={navLink.label}
                  label={navLink.label}
                  onClick={(event) => handleTabClick(event, navLink.location)}
                />
              ))}
            </Tabs>
          </Grid>
          <Grid container alignItems="center" justify="flex-end" spacing={1}>
            {accountElement}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.appBody}>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, StateType> = state => ({
  session: state.user.session,
  userInfo: state.user.info,
  guilds: state.user.guilds,
});

export default connect(mapStateToProps)(Layout);
