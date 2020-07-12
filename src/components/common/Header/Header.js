import React, { Children, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #61dafb;
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
  & b.${props => props.classes.counter} {
    color: black;
  }
  & span {
    color: black;
  }`;

export const Header = ({ children, isSidebarOpen, menuClickHandler }) =>  {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={clsx(classes.appBar, {
          [classes.appBarShift]: isSidebarOpen,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={menuClickHandler}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isSidebarOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="primary" noWrap className={classes.toolbarTitle}>
            <StyledLink classes={classes} to="/">
              Super Awesome <b>Reminders Calendar</b>
            </StyledLink>
          </Typography>
          {Children.map(children, (node, index) => <Fragment key={`header-children-${index}`}>{node}</Fragment>)}
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.object),
  clearCart: PropTypes.func
};

Header.defaultProps = {
  selected: [],
  clearCart: () => {}
};