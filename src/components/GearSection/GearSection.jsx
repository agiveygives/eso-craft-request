import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import ToggleHeader from '../ToggleHeader/ToggleHeader';
import CheckboxRow from '../CheckboxRow/CheckboxRow';
import PieceCard from '../PieceCard/PieceCard';
import useStyles from './styles';
import propTypes from './propTypes';

const GearSection = ({ group, selectedPieces }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [groupTitle, setGroupTitle] = useState('');

  useEffect(() => {
    switch (group) {
      case 'armor':
        setGroupTitle(intl.formatMessage({ id: 'gear.armor.title' }));
        break;
      case 'jewelry':
        setGroupTitle(intl.formatMessage({ id: 'gear.jewelry.title' }));
        break;
      case 'weapon':
        setGroupTitle(intl.formatMessage({ id: 'gear.weapon.title' }));
        break;
      default:
        setGroupTitle('');
        break;
    }
  }, [intl, group]);

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
