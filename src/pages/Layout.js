import React, { createContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import {
  Calendar
} from '../pages';
import { useCurrentLocation } from '../hooks';
import { CalendarHeader } from '../components/CalendarHeader';
import { CalendarSidebar } from '../components/CalendarSidebar';

export const PageContext = createContext({
  pageContext: {},
  notificationContext: {}
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  }
}));

export const Layout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [isSnackbarOpen, toggleSnackbar] = useState(false);
  const { position, error } = useCurrentLocation({
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  });
  const pageContextValue = {
    pageContext: {
      isSidebarOpen,
      toggleSidebar,
      position: {
        position,
        error
      }
    },
    notificationContext: {
      isSnackbarOpen,
      toggleSnackbar
    }
  };
  const handleSnackbarClose = () => toggleSnackbar(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <PageContext.Provider value={pageContextValue}>
        <CalendarHeader />
        <CalendarSidebar />
        <Container className={classes.content} maxWidth="xl">
          <Switch>
            <Route exact path="/" component={Calendar} />
          </Switch>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Reminder added!"
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </Container>
      </PageContext.Provider>
    </div>
  );
};