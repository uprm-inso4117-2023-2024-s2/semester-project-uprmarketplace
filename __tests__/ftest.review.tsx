import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Reviews from '../app/(tabs)/review';

describe('ReviewPage', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Reviews />);
    expect(getByText('Bicicleta Usada')).toBeTruthy();
    expect(getByPlaceholderText('Write your own review...')).toBeTruthy();
  });

  it('initial state is set correctly', () => {
    const { getAllByText } = render(<Reviews />);
    // Check if initial comments are displayed
    expect(getAllByText(/Rating:/).length).toBe(4);
  });

  it('allows users to add a comment', async () => {
    const { getByText, getByTestId, getByPlaceholderText, findByText } = render(<Reviews />);
    const input = getByPlaceholderText('Write your own review...');
    fireEvent.changeText(input, 'Bicicleta Usada');
    fireEvent.press(getByTestId('add-comment-button'));
  
    const newComment = await findByText('Bicicleta Usada');
    expect(newComment).toBeTruthy();
  });

  it('updates user rating correctly', () => {
    const { getAllByTestId } = render(<Reviews />);
    const stars = getAllByTestId('star-rating-5');

    fireEvent.press(stars[0]);
    // Assuming that the testID on each star button ends with the star number
    expect(stars.filter(star => star.props.name === 'star').length).toBe(0);
  });
});