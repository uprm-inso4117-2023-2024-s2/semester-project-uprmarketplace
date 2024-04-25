import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Reviews from '../app/(tabs)/review'; // Adjust the import path as necessary

const randomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

describe('ReviewPage Fuzz Testing', () => {
  it('should handle random inputs without crashing', () => {
    const { getByPlaceholderText, getByTestId } = render(<Reviews />);
    
    for (let i = 0; i < 1; i++) {
      const randomComment = randomString(Math.random() * 100);

      const input = getByPlaceholderText('Write your own review...');
      const addButton = getByTestId('add-comment-button');

      fireEvent.changeText(input, randomComment);
      fireEvent.press(addButton);

    }
  });
});
