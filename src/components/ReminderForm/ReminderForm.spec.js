import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { renderConnectedAndRoutedComponent } from '../../utils/tests';
import { ReminderForm } from '../ReminderForm';
import { jssPreset } from '@material-ui/core';

describe('ReminderForm component', () => {
  const constantDate = new Date('2020-07-13T04:41:20')
  let closeFormMock = jest.fn();
  
  beforeAll(() => {
    /*eslint no-global-assign:off*/
    Date = class extends Date {
      constructor() {
        return constantDate
      }
    }
  });

  test('should render the component', () => {
    renderConnectedAndRoutedComponent({
      component: ReminderForm,
      props: {
        date: new Date(),
        closeForm: closeFormMock
      },
      state: {}
    });

    expect(screen.getByText('Add reminder')).toBeDefined();
  });
});