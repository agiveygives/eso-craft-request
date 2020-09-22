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

export const sendRequest = (currentState) => dispatch => {
  const {
    guildData,
    esoName,
    gearLevel,
    payment,
    notes,
    armorPieces,
    jewelryPieces,
    weaponPieces,
    armorAttributes,
    jewelryAttributes,
    weaponAttributes
  } = currentState;

  const requestLog = {
    guild: guildData.name,
    url: window.location.href,
    username: esoName,
    level: gearLevel,
    payment: payment,
    notes: notes,
  };

  function buildGearMessage(selected, attributes) {
    let returnVal = '';

    if (selected.length) {
      returnVal = `\n__${attributes.display}__`;
      requestLog[attributes.display.toLowerCase()] = {};

      selected.forEach(piece => {
        returnVal += `\n**${attributes[piece].display}**`
        requestLog[attributes.display.toLowerCase()][piece] = attributes[piece];

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

  const discordMessage = () => {
    let request = (
      `${guildData.crafterTag}\n` +
      `ESO UserName:\t\t${esoName}\n` +
      `Gear Level:\t\t\t\t${gearLevel}\n` +
      `Payment Method:\t${payment}\n` +
      buildGearMessage(armorPieces, armorAttributes) +
      buildGearMessage(jewelryPieces, jewelryAttributes) +
      buildGearMessage(weaponPieces, weaponAttributes)
    );

    let requestNotes = `${notes.length > 0 ? `**Request Notes**: ${notes}\n\n` : ''}**Sent From**: ${requestLog.url}`;

    const requestWithNotes = `${request}\n\n${requestNotes}`;

    if (requestWithNotes.length < 2000) {
      request = requestWithNotes;
      requestNotes = undefined;
    }

    return {
      request,
      requestNotes,
    }
  };

  axios.post(guildData.webhook, {
    content: discordMessage().request
  })
    .then(() => {
      if (discordMessage().requestNotes) {
        axios.post(guildData.webhook, {
          content: discordMessage().requestNotes
        })
          .then(() => {
            dispatch({ type: SUCCESSFUL_REQUEST });
          })
          .catch(() => {
            dispatch({ type: FAILED_REQUEST });
          })
      } else {
        dispatch({ type: SUCCESSFUL_REQUEST });
      }
    })
    .catch(() => {
      dispatch({ type: FAILED_REQUEST });
    })

  axios.post(
    'https://us-central1-eso-craft-request.cloudfunctions.net/api/craft-requests',
    requestLog
  )
    .catch(err => {
      console.error(err);
    })

  dispatch({ type: TOGGLE_REVIEW, show: false })
};
