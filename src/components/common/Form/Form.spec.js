import React from 'react';
import { screen } from '@testing-library/react';
import { renderBasicComponent } from '../../../utils/tests';
import { Form } from '../Form';

describe('Form component', () => {
  test('should render passed children in a grid', () => {
    renderBasicComponent(Form, { children: [<div><button>click me</button></div>] });

    expect(screen.getByText('click me')).toBeDefined();
  });
});
