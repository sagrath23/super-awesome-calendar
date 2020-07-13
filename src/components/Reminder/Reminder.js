import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { remindersSelector } from '../../selectors';
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
  const [{
    city,
    day,
    id,
    month,
    name,
    time
  } = {}] = useSelector(remindersSelector).filter((reminder) => reminder.id === reminderId);
  const classes = useStyles();
  const handleGoBackClick = () => history.push('/');
  const handleRemoveReminderClick = () => {
    dispatch(actions.deleteReminder(reminderId));

    history.push('/');
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            At {time} in {city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
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
