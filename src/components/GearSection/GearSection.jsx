import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import ToggleHeader from '../ToggleHeader/ToggleHeader';
import CheckboxRow from '../CheckboxRow/CheckboxRow';
import PieceCard from '../PieceCard/PieceCard';

const propTypes = {
  group: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,

  // from redux
  selectedPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const useStyles = makeStyles(() => ({
  wrapper: {
    margin: '0.85rem',
  },
  cardWrapper: {
    margin: '1.5rem',
  },
}));

const GearSection = ({ group, selectedPieces }) => {
  const classes = useStyles();
  const intl = useIntl();

  let groupTitle;
  switch (group) {
    case 'armor':
      groupTitle = intl.formatMessage({ id: 'gear.armor.title' });
      break;
    case 'jewelry':
      groupTitle = intl.formatMessage({ id: 'gear.jewelry.title' });
      break;
    case 'weapon':
      groupTitle = intl.formatMessage({ id: 'gear.weapon.title' });
      break;
    default:
      groupTitle = '';
      break;
  }

  return (
    <div className={classes.wrapper}>
      <ToggleHeader
        title={groupTitle}
      >
        <CheckboxRow id={group} />
        <span className={classes.cardWrapper}>
          <div className="centered-div">
            {selectedPieces.map((piece) => <PieceCard group={group} piece={piece} key={`${group}-${piece}`} />)}
          </div>
        </span>
      </ToggleHeader>
    </div>
  );
};

GearSection.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.group) {
    case 'armor':
      return { selectedPieces: state.armorPieces };

    case 'jewelry':
      return { selectedPieces: state.jewelryPieces };

    case 'weapon':
      return { selectedPieces: state.weaponPieces };

    default:
      return { selectedPieces: [] };
  }
};

export default connect(mapStateToProps)(GearSection);
