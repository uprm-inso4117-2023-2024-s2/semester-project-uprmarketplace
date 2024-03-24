import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BrowseScreen from '@/app/(tabs)/browse';

describe('BrowseScreen', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<BrowseScreen />);
    
    expect(getByText('Title')).toBeTruthy();

    expect(getByPlaceholderText('Search for products near you...')).toBeTruthy();
  });
  test('opens cart modal on cart icon press', () => {
    const { getByTestId, getByText } = render(<BrowseScreen />);
    
    fireEvent.press(getByTestId('cart-icon'));

    expect(getByText('Cart')).toBeTruthy();
  });
});
