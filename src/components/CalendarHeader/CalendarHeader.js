import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import { PageContext } from '../../pages';
import { Header } from '../common/Header';
import { ReminderForm } from '../ReminderForm';
import { remindersSelector } from '../../selectors';
import { actions } from '../../store/domains';

export const CalendarHeader = () => {
  const dispatch = useDispatch();
  const {
    pageContext: {
      isSidebarOpen,
      toggleSidebar
    },
    modalDialogContext: {
      isModalOpen,
      toggleModal,
      setModalContent
    }} = useContext(PageContext);
  const reminders = useSelector(remindersSelector);
  const clearAllReminders = () => {
    dispatch(actions.deleteAllReminders())
  };
  const handleMenuButtonClick = () => toggleSidebar(!isSidebarOpen);
  const openReminderForm = () => {
    //set modal content
    setModalContent(<ReminderForm closeModal={toggleModal} />);
    // open the modal dialog
    toggleModal(!isModalOpen);
  };

  return (
    <Header isSidebarOpen={isSidebarOpen} menuClickHandler={handleMenuButtonClick}>
      <Tooltip title="Add reminder" aria-label="add-reminder">
        <IconButton aria-label="add-product" onClick={openReminderForm}>  
          <AddBoxIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Stored reminders" aria-label="stored-reminders">
        <IconButton aria-label="check-out-cart">
          {reminders.length}
          <EventIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove all reminders" aria-label="delete-all-reminders">
        <IconButton aria-label="clear-cart" onClick={clearAllReminders}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </Header>
  );
};
