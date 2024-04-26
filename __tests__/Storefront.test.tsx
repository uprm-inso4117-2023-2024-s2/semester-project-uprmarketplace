import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PersonalStorefrontPage from '@/app/(tabs)/personal-storefront';

describe('PersonalStorefrontPage', () => {
  test('should render without crashing', () => {
    render(<PersonalStorefrontPage />);
  });

  test('should pin an item', () => {
    const { getByTestId, queryAllByText } = render(<PersonalStorefrontPage />);
    const pinButton = getByTestId('pinButton-1');
    fireEvent.press(pinButton);
    expect(queryAllByText('Lab Coat')).toHaveLength(2);
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
    const { getByText, getByTestId, getByPlaceholderText, queryByText } = render(<PersonalStorefrontPage />);
    const editNameButton = getByTestId('editButton');
    fireEvent.press(editNameButton);
    const newNameInput = getByPlaceholderText('Enter new name');
    fireEvent.changeText(newNameInput, 'John Doe');
    const saveButton = getByTestId('saveButton');
    fireEvent.press(saveButton);
    expect(getByText('John Doe')).toBeTruthy();
    expect(queryByText('Edit Name')).toBeNull();
  });

  test('should open and close category modal', () => {
    const { getByTestId, getByText, queryByText } = render(<PersonalStorefrontPage />);
    const categoryButton = getByTestId('categoryButton');
    fireEvent.press(categoryButton);
    expect(queryByText('Select Category')).toBeTruthy();
    const closeButton = getByText('Close');
    fireEvent.press(closeButton);
    expect(queryByText('Select Category')).toBeNull();
  });

  test('should display correct average ratings', () => {
    const { getByText } = render(<PersonalStorefrontPage />);
    expect(getByText('★★★★☆')).toBeTruthy();
  });

  test('should display error message for empty name', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<PersonalStorefrontPage />);
    const editNameButton = getByTestId('editButton');
    fireEvent.press(editNameButton);
    const newNameInput = getByPlaceholderText('Enter new name');
    fireEvent.changeText(newNameInput, '');
    const saveButton = getByTestId('saveButton');
    fireEvent.press(saveButton);
    expect(getByText('Name cannot be empty')).toBeTruthy();
    expect(getByText('Anne Smith')).toBeTruthy();
  });
});
