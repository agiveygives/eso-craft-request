import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  guildHeaderColor: PropTypes.string.isRequired,
  toggleMatsDrawer: PropTypes.func.isRequired,
  matsDrawerOpen: PropTypes.bool.isRequired,
};

const AppHeader = ({
  title, guildHeaderColor, toggleMatsDrawer, matsDrawerOpen,
}) => {
  const classes = useStyles(guildHeaderColor)();
  const intl = useIntl();

  return (
    <AppBar
      position="sticky"
      className={classes.appBar}
    >
      <Toolbar>
        <Avatar src="/images/hammer-and-anvil.png" />
        <Typography className={classes.title} variant="h5">{title}</Typography>
        <Button
          variant="contained"
          onClick={() => toggleMatsDrawer(!matsDrawerOpen)}
          className={clsx(matsDrawerOpen && classes.hide)}
        >
          {intl.formatMessage({ id: 'header.materials' })}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = propTypes;

const mapStateToProps = (state) => ({
  guildHeaderColor: state.guildData.colors.header,
});

export default connect(mapStateToProps)(AppHeader);
