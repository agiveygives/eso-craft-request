import axios from 'axios';
import Discord from '../discord.js'
import { TOGGLE_REVIEW, SUCCESSFUL_REQUEST, FAILED_REQUEST } from './constants.js';


export const sendRequest = (currentState, retryMessage) => dispatch => {
  const {
    esoName,
    gearLevel,
    payment,
    armorPieces,
    jewelryPieces,
    weaponPieces,
    armorAttributes,
    jewelryAttributes,
    weaponAttributes
  } = currentState;

  function buildGearMessage(selected, attributes) {
    let returnVal = '';

    if (selected.length) {
      returnVal = `\n__${attributes.display}__`;
      selected.forEach(piece => {
        returnVal += `\n**${attributes[piece].display}**`

        for (let attribute in attributes[piece]) {
          if (attribute !== 'display' && attribute !== 'Glyph Quality') {
            if (attribute === 'Glyph') {
              returnVal += ` | ${attributes[piece][attribute] + (attributes[piece].Glyph === 'None' ? '' : ` - ${attributes[piece]['Glyph Quality']}`)}`;
            } else {
              returnVal += ` | ${attributes[piece][attribute]}`;
            }
          }
        }
      })
    }

    return returnVal;
  }

  const discordMessage = retryMessage
    ? retryMessage
    : `ESO UserName:\t\t${esoName}\n` +
      `Gear Level:\t\t\t\t${gearLevel}\n` +
      `Payment Method:\t${payment}\n` +
      buildGearMessage(armorPieces, armorAttributes) +
      buildGearMessage(jewelryPieces, jewelryAttributes) +
      buildGearMessage(weaponPieces, weaponAttributes) +
      `\n${Discord.PixelationNation.role}`;

  axios.post(Discord.PixelationNation.webhook, {
    content: discordMessage
  })
    .then(() => {
      dispatch({ type: SUCCESSFUL_REQUEST });
    })
    .catch(() => {
      dispatch({ type: FAILED_REQUEST });
    })

  dispatch({ type: TOGGLE_REVIEW, show: false })
};
