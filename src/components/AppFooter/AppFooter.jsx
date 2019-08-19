import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionFooter from 'terra-action-footer';
import Image from 'terra-image';
import Button from 'terra-button';
import Spacer from 'terra-spacer';
import Text from 'terra-text';
import ReactTooltip from 'react-tooltip';
import Icon from '../../images/pixelation-nation-circle.png'
import { RESTART, TOGGLE_REVIEW } from '../../store/constants';

const propTypes = {
  currentState: PropTypes.shape({}).isRequired,
  restart: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired
}

const AppFooter = ({ currentState, restart, review }) => {
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
      style={{ borderStyle: 'hidden', backgroundColor: '#bf1a6e' }}
      start={(
        <React.Fragment>
          <a
            href="https://www.guilded.gg/Pixelation-Nation/games/ElderScrollsOnline"
            rel="noopener noreferrer"
            target="_blank"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            <React.Fragment>
              <Image src={Icon} />
              <Text>Pixelation Nation</Text>
            </React.Fragment>
          </a>
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
              <Text>Found an issue or want to request a feature?</Text>
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
  currentState: state
});

const mapDispatchToProps = dispatch => ({
  restart: () => dispatch({ type: RESTART }),
  review: () => dispatch({ type: TOGGLE_REVIEW, show: true })
})

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);
