import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { traversalRootReducersMapObject } from '../src/Reducers';
import { combineReducers } from 'redux';
import { renderWithRedux } from './utils';
import HealthAge from '../src/Containers/HealthAssessment/HealthAge/HealthAge';
import 'jest-styled-components';

describe('HealthAge component', () => {
  const state = {
    healthAssessment: {
      healthAge: {
        age: 40,
        healthAge: 35,
        minimumHealthAge: 30,
        checkableConclusions: [1000, 1003],
      },
      checkedConclusions: [],
    },
    conclusion: {
      conclusions: [
        {
          assetId: 1000,
          displayText: 'Lower BP to less than 140/90',
          explanation: '',
        },
        { assetId: 1001, displayText: 'Eat more healthily', explanation: '' },
        {
          assetId: 1002,
          displayText: 'Your Mediterranean Diet Rating is 50 out of 100',
          explanation: '',
        },
        { assetId: 1003, displayText: 'Stop smoking', explanation: '' },
      ],
    },
  };

  const rootTraversalReducer = combineReducers(traversalRootReducersMapObject);
  const renderComponent = () =>
    renderWithRedux(
      <Router>
        <HealthAge traversalId="abc" />
      </Router>,
      rootTraversalReducer,
      state
    );

  test('Renders health age dial with correct ages', () => {
    const result = renderComponent();

    expect(result.getByText(/Your health age is/).textContent).toBe(
      'Your health age is'
    );
    expect(result.getByText(/But you could be/).textContent).toBe(
      'But you could be up to 5 years younger'
    );
  });

  test('Renders risk conclusions', () => {
    const result = renderComponent();

    expect(result.queryByText('Lower BP to less than 140/90')).not.toBeNull();
    expect(result.queryByText('Eat more healthily')).toBeNull();
    expect(
      result.queryByText('Your Mediterranean Diet Rating is 50 out of 100')
    ).toBeNull();
    expect(result.queryByText('Stop smoking')).not.toBeNull();
  });

  test('should display 5 ages ', () => {
    const result = renderComponent();
    const ageDivs = result.getAllByRole('article');
    expect(ageDivs.length).toBe(5);
  });

  test('should display 2 ages before and after health age', () => {
    const age = 35;
    const result = renderComponent();
    const ageDivs = result.getAllByRole('article');
    for (let i = age - 2, j = 0; i < age + 3; i++, j++) {
      expect(ageDivs[j].textContent).toBe(i.toString());
    }
  });

  test('should hightlight current health age', () => {
    const result = renderComponent();
    const ageDivs = result.getAllByRole('article');
    expect(ageDivs[2]).not.toHaveStyleRule('opacity: 0.2;');
  });

  test('should fade other ages next to current health age', () => {
    const result = renderComponent();
    const ageDivs = result.getAllByRole('article');
    const opacity = 'opacity: 0.2;';
    expect(ageDivs[0]).toHaveStyleRule(opacity);
    expect(ageDivs[1]).toHaveStyleRule(opacity);
    expect(ageDivs[3]).toHaveStyleRule(opacity);
    expect(ageDivs[4]).toHaveStyleRule(opacity);
  });
});
