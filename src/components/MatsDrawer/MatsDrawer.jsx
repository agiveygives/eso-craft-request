import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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
    PropTypes.shape()
  ).isRequired,
  traits: PropTypes.arrayOf(
    PropTypes.shape()
  ).isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.shape()
  ).isRequired,
  qualityMats: PropTypes.arrayOf(
    PropTypes.shape()
  ).isRequired
};

const useStyles = (drawerWidth) => makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#2f3136',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  closeIcon: {
    color: '#fafafa'
  },
  primaryText: {
    color: '#dcddde',
    paddingRight: '1.5rem'
  },
  sendToDiscord: {
    display: 'none'
  },
  table: {
    minWidth: '100%'
  },
  section: {
    paddingTop: '1rem'
  }
}))

const MatsDrawer = ({ open, setDrawerOpen, width, materials, traits, styles, qualityMats }) => {
  const classes = useStyles(width)();
  const [totalEquipementMats, setTotalEquipmentMats] = React.useState([]);
  const [totalTraitMats, setTotalTraitMats] = React.useState([]);
  const [totalStyleMats, setTotalStyleMats] = React.useState([]);
  const [totalQualityMats, setTotalQualityMats] = React.useState([]);

  React.useEffect(() => {
    let newTotal = [];

    materials.forEach(material => {
      const updateIndex = newTotal.findIndex(mat => mat.type === material.type);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += material.count;
      } else {
        newTotal.push({ type: material.type, count: material.count });
      }
    })

    newTotal = newTotal.sort((a, b) => a.type > b.type ? 1 : -1);

    setTotalEquipmentMats(newTotal);
  }, [materials])

  React.useEffect(() => {
    let newTotal = [];

    traits.forEach(trait => {
      const updateIndex = newTotal.findIndex(mat => mat.stone === trait.stone);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += 1;
      } else {
        newTotal.push({ stone: trait.stone, count: 1 });
      }
    })

    newTotal = newTotal.sort((a, b) => a.stone > b.stone ? 1 : -1);

    setTotalTraitMats(newTotal);
  }, [traits])

  React.useEffect(() => {
    let newTotal = [];

    styles.forEach(style => {
      const updateIndex = newTotal.findIndex(mat => mat.stone === style.stone);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += 1;
      } else {
        newTotal.push({ stone: style.stone, count: 1 });
      }
    })

    newTotal = newTotal.sort((a, b) => a.stone > b.stone ? 1 : -1);

    setTotalStyleMats(newTotal);
  }, [styles])

  React.useEffect(() => {
    let newTotal = [];

    qualityMats.forEach(qualityMat => {
      const updateIndex = newTotal.findIndex(newMat => newMat.material === qualityMat.material);

      if (updateIndex >= 0) {
        newTotal[updateIndex].count += qualityMat.count;
      } else {
        newTotal.push({ material: qualityMat.material, count: qualityMat.count });
      }

      newTotal = newTotal.sort((a, b) => a.count > b.count ? 1 : -1);
    })

    setTotalQualityMats(newTotal);
  }, [qualityMats])

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
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
      <ToggleHeader paddingTop='1rem' className={classes.section} align='left' variant='h5' title='Equipment'>
        <Table className={classes.table} size="small">
          <TableBody>
            {totalEquipementMats.map(equipMats => (
              <TableRow key={equipMats.type}>
                <TableCell align='left'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.count}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.type}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ToggleHeader>
      <ToggleHeader paddingTop='1rem' className={classes.section} align='left' variant='h5' title='Quality'>
        <Table className={classes.table} size="small">
          <TableBody>
            {totalQualityMats.map(equipMats => (
              <TableRow key={equipMats.material}>
                <TableCell align='left'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.count}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.material}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ToggleHeader>
      <ToggleHeader paddingTop='1rem' className={classes.section} align='left' variant='h5' title='Traits'>
        <Table className={classes.table} size="small">
          <TableBody>
            {totalTraitMats.map(equipMats => (
              <TableRow key={equipMats.stone}>
                <TableCell align='left'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.count}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.stone}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ToggleHeader>
      <ToggleHeader paddingTop='1rem' className={classes.section} align='left' variant='h5' title='Styles'>
        <Table className={classes.table} size="small">
          <TableBody>
            {totalStyleMats.map(equipMats => (
              <TableRow key={equipMats.stone}>
                <TableCell align='left'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.count}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h6' className={classes.primaryText}>
                    {equipMats.stone}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ToggleHeader>
    </Drawer>
  )
};

MatsDrawer.propTypes = propTypes;

MatsDrawer.defaultProps = {
  open: false,
  width: '20%'
}

const mapStateToProps = state => ({
  materials: state.materials,
  traits: state.traits,
  styles: state.styles,
  qualityMats: state.quality,
  glyphMats: state.glyphMaterials
})

export default connect(mapStateToProps)(MatsDrawer);
