import axios from 'axios';
import { TOGGLE_REVIEW, SUCCESSFUL_REQUEST, FAILED_REQUEST, SET_GUILD_DATA, SET_GUILD_REQUEST_CODE } from './constants.js';

export const getGuildData = (guildMemonic) => dispatch => {
  axios.get(`https://us-central1-eso-craft-request.cloudfunctions.net/api/guilds?mnemonic=${guildMemonic}`)
    .then(response => {
      if (response.data.length > 0) {
        dispatch({ type: SET_GUILD_DATA, guildData: response.data[0] });
      }
      else {
        dispatch({ type: SET_GUILD_REQUEST_CODE, statusCode: '404' });
      }
    })
    .catch(error => {
      dispatch({
        type: SET_GUILD_DATA,
        guildData: {
          "website": "",
          "active": true,
          "crafterTag": "",
          "name": "Craft Request App",
          "webhook": "",
          "imageUrl": "https://firebasestorage.googleapis.com/v0/b/eso-craft-request.appspot.com/o/default-guild.png?alt=media",
          "colors": {
              "header": "#FFFFFF",
              "footer": "#000000"
          }
        }
      });

      console.error(error);
    })
}

export const sendRequest = (currentState, retryMessage) => dispatch => {
  const {
    guildData,
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
      `\n${guildData.crafterTag}`;

  axios.post(guildData.webhook, {
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
