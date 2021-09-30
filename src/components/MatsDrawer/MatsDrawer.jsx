import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ToggleHeader from '../ToggleHeader/ToggleHeader';

const propTypes = {
  open: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  width: PropTypes.string,
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      requestPiece: PropTypes.string.isRequired,
      gearType: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  traits: PropTypes.arrayOf(
    PropTypes.shape({
      requestPiece: PropTypes.string.isRequired,
      stone: PropTypes.string.isRequired,
    }),
  ).isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      requestPiece: PropTypes.string.isRequired,
      stone: PropTypes.string.isRequired,
    }),
  ).isRequired,
  qualityMats: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      material: PropTypes.string.isRequired,
      piece: PropTypes.string.isRequired,
    }),
  ).isRequired,
  glyphMats: PropTypes.shape({
    essenceRunes: PropTypes.arrayOf(
      PropTypes.shape({ piece: PropTypes.string.isRequired, name: PropTypes.string.isRequired }),
    ).isRequired,
    potencyRunes: PropTypes.arrayOf(
      PropTypes.shape({
        piece: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        potency: PropTypes.string,
      }),
    ).isRequired,
    aspectRunes: PropTypes.arrayOf(
      PropTypes.shape({ piece: PropTypes.string.isRequired, name: PropTypes.string.isRequired }),
    ).isRequired,
  }).isRequired,
};

const useStyles = (drawerWidth) => makeStyles((theme) => ({
  drawer: {
    '@media screen and (min-width: 1500px)': {
      width: drawerWidth,
    },
    flexShrink: 0,
  },
  drawerPaper: {
    '@media screen and (min-width: 1500px)': {
      width: drawerWidth,
    },
    backgroundColor: '#2f3136',
    minWidth: '15rem',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  closeIcon: {
    color: '#fafafa',
  },
  primaryText: {
    color: '#dcddde',
    paddingRight: '1.5rem',
  },
  sendToDiscord: {
    display: 'none',
  },
  table: {
    minWidth: '100%',
  },
  section: {
    paddingTop: '1rem',
  },
}));

const MatsDrawer = ({
  open, setDrawerOpen, width, materials, traits, styles, qualityMats, glyphMats,
}) => {
  const classes = useStyles(width)();
  const intl = useIntl();
  const [totalEquipementMats, setTotalEquipmentMats] = React.useState([]);
  const [totalTraitMats, setTotalTraitMats] = React.useState([]);
  const [totalStyleMats, setTotalStyleMats] = React.useState([]);
  const [totalQualityMats, setTotalQualityMats] = React.useState([]);
  const [totalGlyphMats, setTotalGlyphMats] = React.useState([]);

  React.useEffect(() => {
    let newTotal = [];

    materials.forEach((material) => {
      const updateIndex = newTotal.findIndex((mat) => mat.type === material.type);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += material.count;
      } else {
        newTotal.push({ type: material.type, count: material.count });
      }
    });

    newTotal = newTotal.sort((a, b) => (a.type > b.type ? 1 : -1));

    setTotalEquipmentMats(newTotal);
  }, [materials]);

  React.useEffect(() => {
    let newTotal = [];

    traits.forEach((trait) => {
      const updateIndex = newTotal.findIndex((mat) => mat.stone === trait.stone);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += 1;
      } else {
        newTotal.push({ stone: trait.stone, count: 1 });
      }
    });

    newTotal = newTotal.sort((a, b) => (a.stone > b.stone ? 1 : -1));

    setTotalTraitMats(newTotal);
  }, [traits]);

  React.useEffect(() => {
    let newTotal = [];

    styles.forEach((style) => {
      const updateIndex = newTotal.findIndex((mat) => mat.stone === style.stone);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += 1;
      } else {
        newTotal.push({ stone: style.stone, count: 1 });
      }
    });

    newTotal = newTotal.sort((a, b) => (a.stone > b.stone ? 1 : -1));

    setTotalStyleMats(newTotal);
  }, [styles]);

  React.useEffect(() => {
    let newTotal = [];

    qualityMats.forEach((qualityMat) => {
      const updateIndex = newTotal.findIndex((newMat) => newMat.material === qualityMat.material);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += qualityMat.count;
      } else {
        newTotal.push({ material: qualityMat.material, count: qualityMat.count });
      }

      newTotal = newTotal.sort((a, b) => (a.count > b.count ? 1 : -1));
    });

    setTotalQualityMats(newTotal);
  }, [qualityMats]);

  React.useEffect(() => {
    const newTotal = [];

    glyphMats.essenceRunes.forEach((essenceRune) => {
      const potencyRune = glyphMats.potencyRunes.find((rune) => rune.piece === essenceRune.piece);
      const aspectRune = glyphMats.aspectRunes.find((rune) => rune.piece === essenceRune.piece);

      if (potencyRune && aspectRune) {
        const essenceIndex = newTotal.findIndex((rune) => rune.name === essenceRune.name);
        if (essenceIndex < 0) {
          newTotal.push({ name: essenceRune.name, count: 1 });
        } else {
          newTotal[essenceIndex].count += 1;
        }

        const potencyIndex = newTotal.findIndex((rune) => rune.name === potencyRune.name);
        if (potencyIndex < 0) {
          newTotal.push({ name: potencyRune.name, count: 1 });
        } else {
          newTotal[potencyIndex].count += 1;
        }

        const aspectIndex = newTotal.findIndex((rune) => rune.name === aspectRune.name);
        if (aspectIndex < 0) {
          newTotal.push({ name: aspectRune.name, count: 1 });
        } else {
          newTotal[aspectIndex].count += 1;
        }
      }
    });

    setTotalGlyphMats(newTotal);
  }, [glyphMats.essenceRunes, glyphMats.potencyRunes, glyphMats.aspectRunes]);

  const generateMaterialSection = (sectionTitle, totalMats, display, i18n = true) => (
    <ToggleHeader paddingTop="1rem" className={classes.section} align="left" variant="h5" title={sectionTitle}>
      <Table className={classes.table} size="small">
        <TableBody>
          {totalMats.map((Mats) => (
            <TableRow key={Mats[display]}>
              <TableCell align="left">
                <Typography variant="h6" className={classes.primaryText}>
                  {Mats.count}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" className={classes.primaryText}>
                  {i18n ? intl.formatMessage({ id: Mats[display] }) : Mats[display]}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ToggleHeader>
  );

  return (
    <SwipeableDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={() => setDrawerOpen(false)}
      onOpen={() => setDrawerOpen(true)}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <ChevronRightIcon className={classes.closeIcon} />
        </IconButton>
        <Button variant="contained" className={classes.sendToDiscord}>
          Send To Discord
        </Button>
      </div>
      <Divider />
      {generateMaterialSection(intl.formatMessage({ id: 'materialsList.equipment' }), totalEquipementMats, 'type')}
      {generateMaterialSection(intl.formatMessage({ id: 'common.quality' }), totalQualityMats, 'material')}
      {generateMaterialSection(intl.formatMessage({ id: 'materialsList.traits' }), totalTraitMats, 'stone')}
      {generateMaterialSection(intl.formatMessage({ id: 'materialsList.styles' }), totalStyleMats, 'stone')}
      {generateMaterialSection(intl.formatMessage({ id: 'materialsList.glyphRunes' }), totalGlyphMats, 'name', false)}
    </SwipeableDrawer>
  );
};

MatsDrawer.propTypes = propTypes;

MatsDrawer.defaultProps = {
  width: '20%',
};

const mapStateToProps = (state) => ({
  materials: state.materials,
  traits: state.traits,
  styles: state.styles,
  qualityMats: state.quality,
  glyphMats: {
    essenceRunes: state.glyphMaterials.essenceRunes,
    potencyRunes: state.glyphMaterials.potencyRunes,
    aspectRunes: state.glyphMaterials.aspectRunes,
  },
});

export default connect(mapStateToProps)(MatsDrawer);
