import { Bdd, Feature } from "easy-bdd-tool-jest";
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import PersonalStorefrontPage from "../app/(tabs)/personal-storefront";

const feature = new Feature('Storefront Page');

Bdd(feature)
  .scenario('Displaying details of selected items')
  .given('The user is on the personal storefront page', async () => {
    render(<PersonalStorefrontPage />);
  })
  .when('The user selects the first item', async ({ ctx }) => {
    const { getByTestId } = ctx;
    const item = getByTestId('item-1');
    fireEvent.press(item);
  })
  .then('The modal with the details of the first item should be displayed', async ({ ctx }) => {
    const { getByTestId } = ctx;
    const detailModal = getByTestId('detail-modal');
    expect(detailModal.props.visible).toBe(true);

    expect(getByTestId('modal-title').props.children).toBe('Lab Coat');
    expect(getByTestId('modal-price').props.children).toBe('$50');
    expect(getByTestId('modal-category').props.children).toBe('Clothing');
    expect(getByTestId('modal-status').props.children).toBe('In Stock');
  })
  .run(async ({ ctx }) => {
    const { getByTestId } = render(<PersonalStorefrontPage />);
    return { ctx: { getByTestId } };
  });

Bdd(feature)
  .scenario('Adding an item to the pinned items list')
  .given('The user is on the personal storefront page', async () => {
    render(<PersonalStorefrontPage />);
  })
  .when('The user pins an item', async ({ ctx }) => {
    const { getByTestId } = ctx;
    const pinButton = getByTestId('pinButton-1');
    fireEvent.press(pinButton);
  })
  .then('The item should be added to the pinned items list', async ({ ctx }) => {
    const { getByText } = ctx;
    expect(getByText('Pinned Listings')).toBeTruthy();
    expect(getByText('Lab Coat')).toBeTruthy();
  })
  .run(async ({ ctx }) => {
    const { getByTestId, getByText } = render(<PersonalStorefrontPage />);
    return { ctx: { getByTestId, getByText } };
  });

Bdd(feature)
  .scenario('Opening the profile banner modal')
  .given('The user is on the personal storefront page', async () => {
    render(<PersonalStorefrontPage />);
  })
  .when('The user presses the profile banner icon', async ({ ctx }) => {
    fireEvent.press(ctx.getByTestId('profileBannerIcon'));
  })
  .then('The banner modal should be displayed', async ({ ctx }) => {
    expect(ctx.getByText('Select Banner')).toBeTruthy();
  })
  .run(async ({ ctx }) => {
    const { getByTestId, getByText } = render(<PersonalStorefrontPage />);
    return { ctx: { getByTestId, getByText } };
  });
