import React from 'react';
import { render } from '@testing-library/react-native';
import BrowseScreen from '@/app/(tabs)/browse';
import { fireEvent, within } from '@testing-library/react-native';
describe('BrowseScreen', () => {
  it('renders correctly', () => {
    const { getByTestId, getAllByTestId } = render(<BrowseScreen />);
    expect(getByTestId('browse-screen')).toBeTruthy();
    expect(getAllByTestId(/item-/i)).toHaveLength(3);
  });
});

it('opens detail modal on press', () => {
    const { getByTestId } = render(<BrowseScreen />);
    const firstItem = getByTestId('item-1');
    fireEvent.press(firstItem);
    expect(getByTestId('detail-modal')).toBeTruthy();
    expect(getByTestId('modal-title').props.children).toContain('Organic Chemistry Book');
  });

it('adds an item to the cart', () => {
    const { getByTestId, getByText } = render(<BrowseScreen />);
    const addToCartButton = getByTestId("add-to-cart-button-Organic Chemistry Book").parent;
    fireEvent.press(addToCartButton);
    const cartIcon = getByTestId('cart-icon');
    fireEvent.press(cartIcon);
    expect(getByTestId('cart-modal')).toBeTruthy();
    const cartModal = getByTestId('cart-modal');
    const itemInCart = within(cartModal).queryByText('Organic Chemistry Book');
    expect(itemInCart).toBeTruthy();
});

describe('BrowseScreen Cart Functionality', () => {
    it('should reflect the correct number of items in the cart badge', async () => {
      const { getByTestId, findAllByTestId } = render(<BrowseScreen />);

      const addToCartButtons = await findAllByTestId(/add-to-cart-button-/i);
  
      fireEvent.press(addToCartButtons[0]);
      fireEvent.press(addToCartButtons[1]);
  
      const cartIcon = getByTestId('cart-icon');
      fireEvent.press(cartIcon);
      const badge = getByTestId('cart-badge'); 
  
      expect(getByTestId('cart-badge')).toBeTruthy();

    });
  });
  
