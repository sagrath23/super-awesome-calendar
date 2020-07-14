import { getMonth, getDate, format } from 'date-fns';

export const validateMaxLength = (name) => name.length > 30;

export const extractDateAndTimeData = ({ date, time }) => [getMonth(date), getDate(date), format(time, 'HH:mm')];