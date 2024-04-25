import { Bdd, Feature } from "easy-bdd-tool-jest";
import { render, fireEvent, within } from '@testing-library/react-native';
import React from 'react';
import Browse from '../app/(tabs)/browse';
import Reviews from '../app/(tabs)/review';  // Assuming this is where the review component lives

const feature = new Feature('UPR Marketplace Features');

// Existing scenario for browsing and adding items
Bdd(feature)
  .scenario('Displaying details of selected items')
  .given('The user is on the browse page', async () => {
    render(<Browse />);
  })
  // ... other steps and scenarios ...

// New scenario for submitting a review
Bdd(feature)
  .scenario('Submitting a review by a buyer')
  .given('The buyer has completed a transaction', async () => {
    render(<Reviews />);  // Assuming rendering the reviews page after a transaction
  })
  .when('The buyer writes a review for the product', async ({ ctx }) => {
    const { getByTestId } = ctx;
    const reviewInput = getByTestId('review-input');
    fireEvent.changeText(reviewInput, 'Great condition, almost new!');
  })
  .and('The buyer submits the review', async ({ ctx }) => {
    const { getByTestId } = ctx;
    const submitButton = getByTestId('submit-review-button');
    fireEvent.press(submitButton);
  })
  .then('The review should be visible on the products page', async ({ ctx }) => {
    const { getByText } = ctx;
    expect(getByText('Great condition, almost new!')).toBeTruthy();
  })
  .and('The buyer should see a new review', async ({ ctx }) => {
    const { getByTestId } = ctx;
    const reviewConfirmation = getByTestId('review-confirmation');
    expect(reviewConfirmation.props.visible).toBe(true);
  })
  .run(async ({ ctx }) => {
    const { getByTestId, getByText } = render(<Reviews />);
    return { ctx: { getByTestId, getByText } };
  });