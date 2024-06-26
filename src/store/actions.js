import axios from 'axios';
import {
  TOGGLE_REVIEW, SUCCESSFUL_REQUEST, FAILED_REQUEST, SET_GUILD_DATA, SET_GUILD_REQUEST_CODE,
} from './constants';
import { english } from '../i18n/translations';

export const getGuildData = (guildMemonic) => (dispatch) => {
  axios.get('https://us-central1-eso-craft-request.cloudfunctions.net/api/guilds', { params: { mnemonic: guildMemonic } })
    .then((response) => {
      if (response.data.length > 0) {
        dispatch({ type: SET_GUILD_DATA, guildData: response.data[0] });
      } else {
        dispatch({ type: SET_GUILD_REQUEST_CODE, statusCode: '404' });
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_GUILD_DATA,
        guildData: {
          website: '',
          active: true,
          crafterTag: '',
          name: 'Craft Request App',
          webhook: '',
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/eso-craft-request.appspot.com/o/default-guild.png?alt=media',
          colors: {
            header: '#FFFFFF',
            footer: '#000000',
          },
          locale: 'en-US',
        },
      });

      console.error(error);
    });
};

export const sendRequest = (currentState, intl) => (dispatch) => {
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
    weaponAttributes,
  } = currentState;

  const requestLog = {
    guild: guildData.name,
    url: window.location.href,
    username: esoName,
    level: gearLevel,
    payment,
    notes,
  };

  function buildGearMessage(selected, attributes) {
    let returnVal = '';

    if (selected.length) {
      returnVal = `\n__${intl.formatMessage({ id: attributes.display })}__`;

      const attributeGearKey = english[attributes.display].toLowerCase();
      requestLog[attributeGearKey] = {};

      selected.forEach((piece) => {
        returnVal += `\n**${intl.formatMessage({ id: attributes[piece].display })}**`;
        requestLog[attributeGearKey][piece] = attributes[piece];

        Object.keys(attributes[piece]).forEach((attribute) => {
          if (attribute !== 'display' && attribute !== 'Glyph Quality') {
            if (attribute === 'Glyph') {
              returnVal += ` | ${
                intl.formatMessage({ id: attributes[piece][attribute] })
                + (attributes[piece].Glyph === 'common.none'
                  ? ''
                  : ` - ${intl.formatMessage({ id: attributes[piece]['Glyph Quality'] })}`)
              }`;
            } else {
              returnVal += ` | ${intl.formatMessage({ id: attributes[piece][attribute] })}`;
            }
          }
        });
      });
    }

    return returnVal;
  }

  const discordMessage = () => {
    let request = (
      `${intl.formatMessage({ id: 'user.username' })}:\t\t${esoName}\n`
      + `${intl.formatMessage({ id: 'confirmation.gearLevel' })}:\t\t\t\t${gearLevel}\n`
      + `${intl.formatMessage({ id: 'confirmation.payment' })}:\t${intl.formatMessage({ id: payment })}\n`
    );

    let armorRequest = buildGearMessage(armorPieces, armorAttributes);
    const requestWithArmor = request + armorRequest;

    if (requestWithArmor.length < 2000) {
      request = requestWithArmor;
      armorRequest = null;
    }

    let jewelryRequest = buildGearMessage(jewelryPieces, jewelryAttributes);
    const requestWithJewelry = request + jewelryRequest;

    if (requestWithJewelry.length < 2000) {
      request = requestWithJewelry;
      jewelryRequest = null;
    }

    let weaponsRequest = buildGearMessage(weaponPieces, weaponAttributes);
    const requestWithWeapons = request + weaponsRequest;

    if (requestWithWeapons.length < 2000) {
      request = requestWithWeapons;
      weaponsRequest = null;
    }

    let requestNotes = `${notes.length > 0
      ? `**${intl.formatMessage({ id: 'message.requestNotes' })}**: ${notes}\n\n`
      : ''}**${intl.formatMessage({ id: 'message.sentFrom' })}**: ${requestLog.url}`;

    const requestWithNotes = `${request}\n\n${requestNotes}`;

    if (requestWithNotes.length < 2000) {
      request = requestWithNotes;
      requestNotes = null;
    }

    return {
      request,
      armorRequest,
      jewelryRequest,
      weaponsRequest,
      requestNotes,
    };
  };

  const discordMessages = discordMessage();

  axios.post(`https://us-central1-eso-craft-request.cloudfunctions.net/api/guilds/${guildData.mnemonic}/request`, {
    message: discordMessages.request,
    armor: discordMessages.armorRequest,
    jewelry: discordMessages.jewelryRequest,
    weapons: discordMessages.weaponsRequest,
    notes: discordMessages.requestNotes,
  })
    .then(() => {
      dispatch({ type: SUCCESSFUL_REQUEST });
    })
    .catch(() => {
      dispatch({ type: FAILED_REQUEST });
    });

  axios.post(
    'https://us-central1-eso-craft-request.cloudfunctions.net/api/craft-requests',
    requestLog,
  )
    .catch((err) => {
      console.error(err);
    });

  dispatch({ type: TOGGLE_REVIEW, show: false });
};
