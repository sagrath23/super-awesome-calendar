import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EventIcon from '@material-ui/icons/Event';
import { PageContext } from '../../pages';
import { Header } from '../common/Header';
import { remindersSelector } from '../../selectors';
import { actions } from '../../store/domains';

export const CalendarHeader = () => {
  const dispatch = useDispatch();
  const { pageContext: { isSidebarOpen, toggleSidebar } } = useContext(PageContext);
  const reminders = useSelector(remindersSelector);
  const clearAllReminders = () => {
    dispatch(actions.deleteAllReminders())
  };
  const handleMenuButtonClick = () => toggleSidebar(!isSidebarOpen);

  return (
    <Header isSidebarOpen={isSidebarOpen} menuClickHandler={handleMenuButtonClick}>
      <IconButton aria-label="add-product">
        <NavLink to="/add-product">
          <AddBoxIcon />
        </NavLink>
      </IconButton>
      <IconButton aria-label="check-out-cart">
        {reminders.length}
        <EventIcon />
      </IconButton>
      <IconButton aria-label="clear-cart" onClick={clearAllReminders}>
        <DeleteForeverIcon />
      </IconButton>
    </Header>
  );
};
