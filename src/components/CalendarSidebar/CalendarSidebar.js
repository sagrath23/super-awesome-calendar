import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EventIcon from '@material-ui/icons/Event';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItemText from '@material-ui/core/ListItemText';
import { PageContext } from '../../pages';

// TODO: move this to a config file or something common for all the app
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }
}));

export const CalendarSidebar = () => {
  const {
    pageContext: {
      isSidebarOpen,
      toggleSidebar
    },
    modalDialogContext: {
      isModalOpen,
      toggleModal,
      setModalContent
    }
  } = useContext(PageContext);
  const theme = useTheme();
  const classes = useStyles(theme);
  const handleDrawerClose = () => toggleSidebar(!isSidebarOpen);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpen,
        [classes.drawerClose]: !isSidebarOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isSidebarOpen,
          [classes.drawerClose]: !isSidebarOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key="add-button">
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Add reminder" />
        </ListItem>
        <ListItem button key="list-button">
          <ListItemIcon><EventIcon /></ListItemIcon>
          <ListItemText primary="List reminders" />
        </ListItem>
        <ListItem button key="clear-button">
          <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
          <ListItemText primary="Remove all reminders" />
        </ListItem>
      </List>
    </Drawer>
  );
};

CalendarSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func
};

CalendarSidebar.defaultProps = {
  isSidebarOpen: false,
  toggleSidebar: () => {}
};
