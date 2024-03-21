import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BrowseScreen from '@/app/(tabs)/browse';

describe('BrowseScreen', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<BrowseScreen />);
    
    // Title is rendered
    expect(getByText('Title')).toBeTruthy();

    // Search bar is rendered
    expect(getByPlaceholderText('Search for products near you...')).toBeTruthy();
  });
  test('opens cart modal on cart icon press', () => {
    const { getByTestId, getByText } = render(<BrowseScreen />);
    
    // Find the cart icon and press it
    fireEvent.press(getByTestId('cart-icon'));

    // Check if the cart modal is opened
    expect(getByText('Cart')).toBeTruthy();
  });
});
