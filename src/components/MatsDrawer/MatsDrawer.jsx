import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
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
import useStyles from './styles';
import propTypes from './propTypes';

const MatsDrawer = ({
  open, setDrawerOpen, width, materials, traits, styles, qualityMats, glyphMats,
}) => {
  const classes = useStyles(width)();
  const intl = useIntl();
  const [totalEquipementMats, setTotalEquipmentMats] = useState([]);
  const [totalTraitMats, setTotalTraitMats] = useState([]);
  const [totalStyleMats, setTotalStyleMats] = useState([]);
  const [totalQualityMats, setTotalQualityMats] = useState([]);
  const [totalGlyphMats, setTotalGlyphMats] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
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
