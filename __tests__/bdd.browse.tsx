import { Bdd, Feature } from "easy-bdd-tool-jest";
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Browse from '../app/(tabs)/browse';

const feature = new Feature('Browse Page');

Bdd(feature)
  .scenario('Displaying details of selected items')
  .given('The user is on the browse page', async () => {
    render(<Browse />);
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

    expect(getByTestId('modal-title').props.children).toBe('Organic Chemistry Book');
    expect(getByTestId('modal-description').props.children).toBe('En buenas condiciones, levemente usado, for info call 787-040-2495.');
    expect(getByTestId('modal-price').props.children).toBe('$40');
    expect(getByTestId('modal-condition').props.children).toBe('Buenas');
  })
  .run(async ({ ctx }) => {
    const { getByTestId } = render(<Browse />);
    return { ctx: { getByTestId } };
  });

  Bdd(feature)
  .scenario('Adding an item to the cart')
  .given('The user is on the browse screen', async () => {
    render(<Browse />);
  })
  .when('The user adds an item to the cart', async ({ ctx }) => {
    const { getByTestId } = ctx;

    const addToCartButton = getByTestId("add-to-cart-button-Organic Chemistry Book").parent;
    
    fireEvent.press(addToCartButton);
  })
  .then('The cart modal should be displayed with the added item', async ({ ctx }) => {
    const { getByTestId, getByText } = ctx;

    const cartIcon = getByTestId('cart-icon');
    fireEvent.press(cartIcon);

    expect(getByTestId('cart-modal')).toBeTruthy();

    const cartModal = getByTestId('cart-modal');
    const itemInCart = within(cartModal).queryByText('Organic Chemistry Book');
    expect(itemInCart).toBeTruthy();
  })
  .run(async ({ ctx }) => {
    const { getByTestId, getByText } = render(<Browse />);
    return { ctx: { getByTestId, getByText } };
  });

  Bdd(feature)
  .scenario('Opening cart modal on cart icon press')
  .given('The user is on the browse screen', async () => {
    render(<Browse />);
  })
  .when('The user presses the cart icon', async ({ ctx }) => {
    fireEvent.press(ctx.getByTestId('cart-icon'));
  })
  .then('The cart modal should be displayed', async ({ ctx }) => {
    expect(ctx.getByText('Cart')).toBeTruthy();
  })
  .run(async ({ ctx }) => {
    const { getByTestId, getByText } = render(<Browse />);
    return { ctx: { getByTestId, getByText } };
  });
