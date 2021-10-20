import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import axios from 'axios';
import {
  Typography, Toolbar, AppBar, Avatar, Button, Grid,
} from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import useStyles from './styles';
import buttonDisabled from './utils';
import { RESTART, TOGGLE_REVIEW } from '../../store/constants';
import {
  armorAttributesShape, jewelryAttributesShape, weaponAttributesShape,
} from '../../propShapes';

const propTypes = {
  currentState: PropTypes.shape({
    esoName: PropTypes.string.isRequired,
    armorPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
    jewelryPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
    weaponPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
    armorAttributes: armorAttributesShape.isRequired,
    jewelryAttributes: jewelryAttributesShape.isRequired,
    weaponAttributes: weaponAttributesShape.isRequired,
  }).isRequired,
  restart: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired,
  guildName: PropTypes.string.isRequired,
  guildMnemonic: PropTypes.string.isRequired,
  guildWebsite: PropTypes.string.isRequired,
  guildFooterColor: PropTypes.string.isRequired,
};

const AppFooter = ({
  currentState, restart, review, guildName, guildMnemonic, guildWebsite, guildFooterColor,
}) => {
  const {
    esoName,
    armorPieces,
    jewelryPieces,
    weaponPieces,
    armorAttributes,
    jewelryAttributes,
    weaponAttributes,
  } = currentState;
  const classes = useStyles(guildFooterColor)();
  const intl = useIntl();
  const [guildImagePath, setGuildImagePath] = React.useState(`/guildImages/${guildMnemonic}.png`);
  const [imageExists, setImageExists] = React.useState(false);

  React.useEffect(() => {
    setGuildImagePath(`/guildImages/${guildMnemonic}.png`);
  }, [guildMnemonic]);

  React.useEffect(() => {
    axios.get(guildImagePath)
      .then((response) => {
        if (response.config.url === guildImagePath) {
          setImageExists(true);
        } else {
          setImageExists(false);
        }
      })
      .catch(() => {
        setImageExists(false);
      });
  }, [guildImagePath]);

  const guildBranding = (name, website, imagePath) => {
    let branding;

    if (imageExists) {
      branding = (
        <span className={classes.guildBranding}>
          <Avatar className={classes.avatar} src={imagePath} />
          <Typography display="inline" style={{ paddingLeft: '1rem' }}>{name}</Typography>
        </span>
      );
    } else {
      branding = (
        <span className={classes.guildBranding}>
          <Typography display="inline">{name}</Typography>
        </span>
      );
    }

    if (website) {
      return (
        <a
          href={website}
          rel="noopener noreferrer"
          target="_blank"
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {branding}
        </a>
      );
    }

    return branding;
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            {guildBranding(guildName, guildWebsite, guildImagePath)}
            <div>
              <a
                href="https://github.com/agiveygives/eso-craft-request/issues/new/choose"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                <Typography>{intl.formatMessage({ id: 'footer.report' })}</Typography>
              </a>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.footerActions}>
            <span className={classes.wrapper}>
              <span className={classes.rightMargin}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a data-for="submit-button" data-tip>
                  <Button
                    style={
                      buttonDisabled(
                        esoName,
                        armorPieces,
                        jewelryPieces,
                        weaponPieces,
                        armorAttributes,
                        jewelryAttributes,
                        weaponAttributes,
                      ) ? { backgroundColor: 'grey' } : {}
                    }
                    disabled={
                      buttonDisabled(
                        esoName,
                        armorPieces,
                        jewelryPieces,
                        weaponPieces,
                        armorAttributes,
                        jewelryAttributes,
                        weaponAttributes,
                      )
                    }
                    variant="contained"
                    color="primary"
                    onClick={() => review()}
                  >
                    {intl.formatMessage({ id: 'footer.submit' })}
                  </Button>
                </a>
                <ReactTooltip id="submit-button" type="info">
                  {intl.formatMessage({ id: 'footer.tooltip' })}
                </ReactTooltip>
              </span>
              <Button variant="outlined" color="secondary" onClick={() => restart()}>
                {intl.formatMessage({ id: 'footer.restart' })}
              </Button>
            </span>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

AppFooter.propTypes = propTypes;

const mapStateToProps = (state) => ({
  currentState: state,
  guildName: state.guildData.name,
  guildMnemonic: state.guildMnemonic,
  guildWebsite: state.guildData.website,
  guildFooterColor: state.guildData.colors.footer,
});

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch({ type: RESTART }),
  review: () => dispatch({ type: TOGGLE_REVIEW, show: true }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);
