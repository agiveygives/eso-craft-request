import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionFooter from 'terra-action-footer';
import Image from 'terra-image';
import Button from 'terra-button';
import Spacer from 'terra-spacer';
import { Typography } from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import Guilds from '../../constants/guilds';
import { RESTART, TOGGLE_REVIEW } from '../../store/constants';

const propTypes = {
  currentState: PropTypes.shape({}).isRequired,
  restart: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired,
  guildName: PropTypes.string.isRequired
}

const AppFooter = ({ currentState, restart, review, guildName, guildWebsite, guildFooterColor }) => {
  const {
    esoName,
    armorPieces,
    jewelryPieces,
    weaponPieces,
    armorAttributes,
    jewelryAttributes,
    weaponAttributes
  } = currentState;

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

  return (
    <ActionFooter
      style={{ borderStyle: 'hidden', backgroundColor: guildFooterColor }}
      start={(
        <React.Fragment>
          <a
            href={guildWebsite}
            rel="noopener noreferrer"
            target="_blank"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            <React.Fragment>
              <Image src={Guilds.pixelPirates.icon} />
              <Typography style={{ display: 'inline', paddingLeft: '1rem' }}>{guildName}</Typography>
            </React.Fragment>
          </a>
          <div>
            <a
              href={guildWebsite}
              rel="noopener noreferrer"
              target="_blank"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              <Typography>Found an issue or want to request a feature?</Typography>
            </a>
          </div>
        </React.Fragment>
      )}
      end={(
        <React.Fragment>
          <Spacer isInlineBlock marginRight="medium">
            <a data-for="submit-button" data-tip>
              <Button
                isDisabled={buttonDisabled()}
                text="Submit"
                variant="emphasis"
                onClick={() => review()}
              />
            </a>
            <ReactTooltip id="submit-button" type="info">
              Complete all selected fields to enable submission
            </ReactTooltip>
          </Spacer>
          <Button text="Restart" onClick={() => restart()} />
        </React.Fragment>
      )}
    />
  );
};

AppFooter.propTypes = propTypes;

const mapStateToProps = state => ({
  currentState: state,
  guildName: state.guildData.name,
  guildWebsite: state.guildData.website,
  guildFooterColor: state.guildData.colors.footer,
});

const mapDispatchToProps = dispatch => ({
  restart: () => dispatch({ type: RESTART }),
  review: () => dispatch({ type: TOGGLE_REVIEW, show: true })
})

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);
