import { v4 as uuid } from 'uuid';
import { actions, initialState, reducer } from '../calendar';

jest.mock('uuid');

describe('Calendar Domain', () => {
  const month = '01';
  const day = '01';
  const id = '123';
  const city = 'Cali';
  const name = 'test reminder';
  const time = '15:00'

  describe('actions tests', () => {
    test(`${[actions.addReminder]} action should return the proper action object`, () => {
      const action = actions.addReminder({
        city,
        day,
        month,
        name,
        time});

      expect(action).toEqual({
        payload: {
          city,
          day,
          month,
          name,
          time
        },
        type: `${[actions.addReminder]}`
      });
    });

    test(`${[actions.editReminder]} action should return the proper action object`, () => {
      const action = actions.editReminder({
        city,
        day,
        fullDate: 'a date',
        id,
        month,
        name,
        time});

      expect(action).toEqual({
        payload: {
          city,
          day,
          fullDate: 'a date',
          id,
          month,
          name,
          time
        },
        type: `${[actions.editReminder]}`
      });
    });

    test(`${[actions.deleteReminder]} action should return the proper action object`, () => {
      const action = actions.deleteReminder({ id });

      expect(action).toEqual({
        payload: { id },
        type: `${[actions.deleteReminder]}`
      });
    });

    test(`${[actions.deleteAllReminders]} action should return the proper action object`, () => {
      const action = actions.deleteAllReminders();

      expect(action).toEqual({
        type: `${[actions.deleteAllReminders]}`
      });
    });
  });

  describe('reducer tests', () => {
    const reminder = {
      city,
      day,
      fullDate: 'a date',
      id: '123',
      month,
      name,
      time
    };

    beforeAll(() => {
      uuid.mockImplementation(() => id);
    });

    test('should return the same state if a valid action is not provided', () => {
      expect(reducer(initialState, { type: 'random action' })).toEqual(initialState);
    });

    test(`should return the proper state when ${[actions.addReminder]} action is provided`, () => {
      const expectedState = {
        ...initialState,
        reminders: [...initialState.reminders, reminder]
      };

      expect(reducer(initialState, actions.addReminder(reminder))).toEqual(expectedState);
    });

    test(`should return the proper state when ${[actions.editReminder]} action is provided`, () => {
      const modifiedReminder = { ...reminder, name: 'new reminder name' };
      const expectedState = {
        ...initialState,
        reminders: [...initialState.reminders, modifiedReminder]
      };

      expect(reducer({
        ...initialState,
        reminders: [reminder],
      }, actions.editReminder(modifiedReminder))).toEqual(expectedState);
    });

    test(`should return the proper state when ${[actions.deleteReminder]} action is provided`, () => {
      const expectedState = {
        ...initialState,
        reminders: []
      };

      expect(reducer({
        ...initialState,
        reminders: [reminder],
      }, actions.deleteReminder({ id }))).toEqual(expectedState);
    });

    test(`should return the proper state when ${[actions.deleteAllReminders]} action is provided`, () => {
      const expectedState = {
        ...initialState,
        reminders: []
      };

      expect(reducer({
        ...initialState,
        reminders: [reminder, reminder, reminder],
      }, actions.deleteAllReminders())).toEqual(expectedState);
    });
  });
});
