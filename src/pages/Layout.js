import React, { createContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {
  Calendar,
  ReminderDetail,
  EditReminder
} from '../pages';
import { CalendarHeader } from '../components/CalendarHeader';
import { CalendarSidebar } from '../components/CalendarSidebar';

export const PageContext = createContext({
  pageContext: {},
  notificationContext: {},
  modalDialogContext: {}
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Layout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [isSnackbarOpen, toggleSnackbar] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const [modalContent, setModalContent] = useState(<div />);
  const pageContextValue = {
    pageContext: {
      isSidebarOpen,
      toggleSidebar
    },
    notificationContext: {
      isSnackbarOpen,
      toggleSnackbar
    },
    modalDialogContext: {
      isModalOpen,
      toggleModal,
      modalContent,
      setModalContent
    }
  };
  const handleSnackbarClose = () => toggleSnackbar(false);
  const handleModalClose = () => toggleModal(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <PageContext.Provider value={pageContextValue}>
        <CalendarHeader />
        <CalendarSidebar />
        <Container className={classes.content} maxWidth="xl">
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route exact path="/reminders/:reminderId" component={ReminderDetail} />
            <Route exact path="/reminders/:reminderId/edit" component={EditReminder} />
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
          <Dialog
            fullScreen
            onClose={handleModalClose}
            aria-labelledby="simple-dialog-title"
            open={isModalOpen}
            TransitionComponent={Transition}
          >
            {modalContent}
          </Dialog>
        </Container>
      </PageContext.Provider>
    </div>
  );
};