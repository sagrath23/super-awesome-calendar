import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderBasicComponent = (component, props) => {
  const Component = component;

  render(<Component {...props} />);
};

export const renderRoutingComponent = (component, props, entries = [{ pathname: '' }]) => {
  const Component = component;

  render(
    <MemoryRouter initialEntries={entries}>
      <Component {...props} />
    </MemoryRouter>
  );
};

export const renderConnectedAndRoutedComponent = ({ component, props, state, entries = [{ pathname: '' }] }) => {
  const Component = component;

  render(
    <Provider store={mockStore(state)}>
      <MemoryRouter initialEntries={entries}>
        <Component {...props} />
      </MemoryRouter>
    </Provider>
  );
};

export const mockStore = (state) => {
  const defaultState = {
    calendar: {
      reminders: [],
      ui: {
        isLoading: false
      }
    },
    weatherForecast: {
      weather: [],
      ui: {
        isLoading: false
      }
    },
    ...state
  };

  return {
    dispatch: jest.fn(),
    getState: jest.fn().mockReturnValue(defaultState),
    subscribe: jest.fn()
  };
};