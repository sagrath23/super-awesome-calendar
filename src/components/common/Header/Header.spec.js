import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { renderRoutingComponent } from '../../../utils/tests';
import { Header } from './Header';

describe('Header component', () => {
  const menuClickHandlerMock = jest.fn();
  const baseProps = {
    children: [],
    isSidebarOpen: false,
    menuClickHandler: menuClickHandlerMock
  };

  test('should render with default props', () => {
    renderRoutingComponent(Header, {});

    expect(screen.getByText('React')).toBeDefined();
  });

  test('should call passed function when clicks over menu icon', () => {
    renderRoutingComponent(Header, baseProps);

    userEvent.click(screen.getByLabelText('open drawer'));

    expect(menuClickHandlerMock).toBeCalledTimes(1);
  });

  test('should render with children elements', () => {
    const children = <div>Children</div>;
    renderRoutingComponent(Header, {
      ...baseProps,
      children: [children]
    });

    expect(screen.getByText('Children')).toBeDefined();
  });
});