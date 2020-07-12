import React from 'react';
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