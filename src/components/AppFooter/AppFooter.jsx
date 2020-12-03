import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, AppBar, Avatar, Button, Grid } from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import { RESTART, TOGGLE_REVIEW } from '../../store/constants';

const propTypes = {
  currentState: PropTypes.shape({}).isRequired,
  restart: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired,
  guildName: PropTypes.string.isRequired,
  guildMnemonic: PropTypes.string.isRequired,
}

const useStyles = (guildFooterColor) => makeStyles(theme => ({
  appBar: {
    paddingTop: '0.25rem',
    top: 'auto',
    bottom: 0,
    borderStyle: 'hidden',
    backgroundColor: guildFooterColor
  },
  disabled: {
    color: 'white'
  },
  footerActions: {
    textAlign: 'right',
    justifyContent: 'center'
  },
  guildBranding : {
    display: 'flex',
    alignItems: 'center'
  },
  rightMargin: {
    marginRight: '0.7rem',
    display: 'flex'
  },
  wrapper: {
    display: 'inline-flex',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }
}))

const AppFooter = ({ currentState, restart, review, guildName, guildMnemonic, guildWebsite, guildFooterColor }) => {
  const {
    esoName,
    armorPieces,
    jewelryPieces,
    weaponPieces,
    armorAttributes,
    jewelryAttributes,
    weaponAttributes
  } = currentState;
  const classes = useStyles(guildFooterColor)();
  const intl = useIntl();
  const guildImagePath = `/guildImages/${guildMnemonic}.png`;
  const [imageExists, setImageExists] = React.useState(false);

  React.useEffect(() => {
    axios.get(guildImagePath)
      .then(response => {
        if(response.config.url === guildImagePath) {
          setImageExists(true);
        }
        else {
          setImageExists(false);
        }
      })
      .catch(() => {
        setImageExists(false);
      })
  }, [])

  function buttonDisabled() {
    if (esoName[0] !== '@' || esoName.length < 2
      || (!armorPieces.length && !jewelryPieces.length && !weaponPieces.length)
    ) {
      return true;
    } else {
      let undefinedAttributes = false;

      armorPieces.forEach(piece => {
        for (let attribute in armorAttributes[piece]) {
          if (!armorAttributes[piece][attribute]) {
            if (attribute === 'Glyph Quality' && armorAttributes[piece].Glyph !== 'None') {
              undefinedAttributes = true;
            } else if (attribute !== 'Glyph Quality') {
              undefinedAttributes = true;
            }
          }
        }
      });

      jewelryPieces.forEach(piece => {
        for (let attribute in jewelryAttributes[piece]) {
          if (!jewelryAttributes[piece][attribute] && jewelryAttributes[piece].Glyph !== 'None') {
            if (attribute === 'Glyph Quality' && jewelryAttributes[piece].Glyph !== 'None') {
              undefinedAttributes = true;
            } else if (attribute !== 'Glyph Quality') {
              undefinedAttributes = true;
            }
          }
        }
      });

      weaponPieces.forEach(piece => {
        for (let attribute in weaponAttributes[piece]) {
          if (!weaponAttributes[piece][attribute] && weaponAttributes[piece].Glyph !== 'None') {
            if (attribute === 'Glyph Quality' && weaponAttributes[piece].Glyph !== 'None') {
              undefinedAttributes = true;
            } else if (attribute !== 'Glyph Quality') {
              undefinedAttributes = true;
            }
          }
        }
      });

      return undefinedAttributes;
    }
  }

  const guildBranding = (name, website, imagePath) => {
    let branding;

    if (imageExists) {
      branding = (
        <span className={classes.guildBranding}>
          <Avatar className={classes.avatar} src={imagePath} />
          <Typography display='inline' style={{ paddingLeft: '1rem' }}>{name}</Typography>
        </span>
      )
    }
    else {
      branding = (
        <span className={classes.guildBranding}>
          <Typography display='inline'>{name}</Typography>
        </span>
      )
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
      )
    }
    else {
      return branding
    }
  }

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            {guildBranding(guildName, guildWebsite, guildImagePath)}
            <div>
              <a
                href={'https://github.com/agiveygives/eso-craft-request/issues/new/choose'}
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
                <a data-for="submit-button" data-tip>
                  <Button
                    style={buttonDisabled() ? { backgroundColor: 'grey' } : {}}
                    disabled={buttonDisabled()}
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

const mapStateToProps = state => ({
  currentState: state,
  guildName: state.guildData.name,
  guildMnemonic: state.guildMnemonic,
  guildWebsite: state.guildData.website,
  guildFooterColor: state.guildData.colors.footer,
});

const mapDispatchToProps = dispatch => ({
  restart: () => dispatch({ type: RESTART }),
  review: () => dispatch({ type: TOGGLE_REVIEW, show: true })
})

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);
