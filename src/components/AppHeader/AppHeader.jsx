import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const propTypes = {
  title: PropTypes.string.isRequired,
  guildHeaderColor: PropTypes.string.isRequired,
  toggleMatsDrawer: PropTypes.func.isRequired,
  matsDrawerOpen: PropTypes.bool,
}

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  }
}))

const AppHeader = ({ title, guildHeaderColor, toggleMatsDrawer, matsDrawerOpen }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: guildHeaderColor }}
    >
      <Toolbar>
        <Avatar src="/images/hammer-and-anvil.png" />
        <Typography style={{ color: 'black', paddingLeft: '0.5rem', flexGrow: '1' }} variant="h5">{title}</Typography>
        <Button
          variant="contained"
          onClick={() => toggleMatsDrawer(!matsDrawerOpen)}
          className={clsx(matsDrawerOpen && classes.hide)}
        >
          Mats List
        </Button>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = propTypes;

const mapStateToProps = state => ({
  guildHeaderColor: state.guildData.colors.header,
});

export default connect(mapStateToProps)(AppHeader);
