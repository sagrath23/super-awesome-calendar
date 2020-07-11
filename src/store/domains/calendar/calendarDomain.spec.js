import { v4 as uuid } from 'uuid';
import { actions, initialState, reducer } from '../calendar';

jest.mock('uuid');

describe('Calendar Domain', () => {
  const month = '01';
  const day = '01';
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
  });

  describe('reducer tests', () => {
    const reminder = {
      city,
      day,
      id: '123',
      month,
      name,
      time
    };

    beforeEach(() => {
      uuid.mockImplementation(() => '123');
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
  });
});
