import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PersonalStorefrontPage from '@/app/(tabs)/personal-storefront';

describe('PersonalStorefrontPage', () => {
  test('should render without crashing', () => {
    render(<PersonalStorefrontPage />);
  });

  test('should pin an item', () => {
    const { getByText, getByTestId } = render(<PersonalStorefrontPage />);
    const pinButton = getByTestId('pinButton-1');
    fireEvent.press(pinButton);
    expect(getByText('Unpin')).toBeTruthy();
  });

  test('should unpin an item', () => {
    const { getByTestId } = render(<PersonalStorefrontPage />);
    const pinButton = getByTestId('pinButton-1');
    fireEvent.press(pinButton);
    const unpinButton = getByTestId('unpinButton');
    fireEvent.press(unpinButton);
    expect(getByTestId('pinButton-1')).toBeTruthy();
  });

  test('should change profile picture', () => {
    const { getByText, getByTestId } = render(<PersonalStorefrontPage />);
    const changePictureButton = getByTestId('profilePictureIcon');
    fireEvent.press(changePictureButton);
    const selectPictureButton = getByText('Save');
    fireEvent.press(selectPictureButton);
    expect(getByTestId('profilePictureIcon')).toBeTruthy();
  });

  test('should change profile banner', () => {
    const { getByTestId, getByText } = render(<PersonalStorefrontPage />);
    const changeBannerButton = getByTestId('profileBannerIcon');
    fireEvent.press(changeBannerButton);
    const selectBannerButton = getByText('Save');
    fireEvent.press(selectBannerButton);
    expect(getByTestId('profileBannerIcon')).toBeTruthy();
  });

  test('should edit name', () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<PersonalStorefrontPage />);
    const editNameButton = getByTestId('editButton');
    fireEvent.press(editNameButton);
    const newNameInput = getByPlaceholderText('Enter new name');
    fireEvent.changeText(newNameInput, 'John Doe');
    const saveButton = getByTestId('saveButton');
    fireEvent.press(saveButton);
    expect(getByText('John Doe')).toBeTruthy();
  });
});
