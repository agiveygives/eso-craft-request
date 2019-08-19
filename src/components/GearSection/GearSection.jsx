import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spacer from 'terra-spacer';
import ToggleSectionHeader from 'terra-toggle-section-header';
import CheckboxRow from '../CheckboxRow/CheckboxRow';
import PieceCard from '../PieceCard/PieceCard';

const propTypes = {
  group: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,

  // from redux
  selectedPieces: PropTypes.arrayOf(PropTypes.string).isRequired
}

const GearSection = ({ group, selectedPieces }) => (
    <Spacer paddingTop='large'>
      <ToggleSectionHeader
        sectionHeaderAttrs={{
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
        title={`${group.charAt(0).toUpperCase() + group.slice(1)} Pieces`}
        level={2}
        isInitiallyOpen
        isAnimated
      >
        <CheckboxRow id={group} />
        <Spacer padding="large+2">
          <div className="centered-div">
            {selectedPieces.map(piece => <PieceCard group={group} piece={piece} key={`${group}-${piece}`} />)}
          </div>
        </Spacer>
      </ToggleSectionHeader>
    </Spacer>
);


GearSection.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  switch(ownProps.group) {
    case 'armor':
      return { selectedPieces: state.armorPieces };

    case 'jewelry':
      return { selectedPieces: state.jewelryPieces };

    case 'weapon':
      return { selectedPieces: state.weaponPieces };

    default:
      return { selectedPieces: [] }
  }
}

export default connect(mapStateToProps)(GearSection);
