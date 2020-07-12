import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/domains';

export const Reminder = ({
  city,
  day,
  id,
  month,
  name,
  time
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.deleteReminder({ id }));
  };

  return (
    <div>
      <div>{name}</div>
      <button onClick={handleClick}>X</button>
    </div>
  );
}
