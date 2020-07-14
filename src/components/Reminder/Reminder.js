import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  differenceInDays,
  isAfter,
  isSameDay,
  parseISO,
  isToday
} from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { remindersSelector, weatherForecastSelector } from '../../selectors';
import { actions } from '../../store/domains';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const Reminder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reminderId } = useParams();
  const {
    city,
    fullDate,
    name,
    time
  } = useSelector(remindersSelector).find((reminder) => reminder.id === reminderId);
  const today = new Date();
  const shouldGetWeatherForecastData = (isToday(fullDate) || isAfter(fullDate, today)) && differenceInDays(fullDate, today) <= 3;
  const { weather: forecastDays } = useSelector(weatherForecastSelector) ;
  const forecastDay = forecastDays.find((forecastDay) => isSameDay(parseISO(forecastDay.date), fullDate));
  const classes = useStyles();
  const handleGoBackClick = () => history.push('/');
  const handleEditReminderClick = () => history.push(`/reminders/${reminderId}/edit`);
  const handleRemoveReminderClick = () => {
    dispatch(actions.deleteReminder(reminderId));

    history.push('/');
  };

  useEffect(() => {
    if(shouldGetWeatherForecastData) {
      dispatch(actions.weatherForecastRequest({ reminderId }));
    }
  }, [dispatch, shouldGetWeatherForecastData, reminderId]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            At {time} in {city}
          </Typography>
          {forecastDay && (
            <Grid alignContent="center" alignItems="center" container direction="column">
              <Grid item>
                <img src={`http:${forecastDay.day.condition.icon}`} alt="forecast" />
              </Grid>
              <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                {forecastDay.day.condition.text}
              </Typography>  
              </Grid>
            </Grid>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="primary" onClick={handleEditReminderClick}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={handleRemoveReminderClick}>
          Remove
        </Button>
        <Button size="small" color="primary" onClick={handleGoBackClick}>
          Go Back
        </Button>
      </CardActions>
    </Card>
  );
};
