import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LogIn from '../../app/LogIn';
import { Alert } from 'react-native';


jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'), // This line is needed to keep the other exports of 'expo-router' intact
  Link: ({ children }) => <div>{children}</div>, // Mock implementation of Link
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
// Helper functions to wrap Jest's describe and test functions
function given(description: string, fn: () => void) {
  describe(`Given ${description}`, fn);
}

function when(description: string, fn: () => void) {
  describe(`When ${description}`, fn);
}

function then(description: string, fn: () => void) {
  test(`Then ${description}`, fn);
}

// Mock setup for navigation and alert
jest.mock('expo-router', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Tests using BDD syntax
describe('LogIn Component', () => {
  given('the user navigates to the login page', () => {
    const { getByPlaceholderText } = render(<LogIn />);
    
    then('they should see input fields for email and password', () => {
      expect(getByPlaceholderText('UPR Email')).toBeTruthy();
      expect(getByPlaceholderText('Password')).toBeTruthy();
    });
  });

  when('the user enters a non-UPR email address', () => {
    const { getByPlaceholderText, getByText } = render(<LogIn />);
    fireEvent.changeText(getByPlaceholderText('UPR Email'), 'test@gmail.com');
    
    then('they should see an alert to enter a valid UPRM email address', () => {
      fireEvent.press(getByText('Log In'));
      expect(Alert.alert).toHaveBeenCalledWith('Please enter a valid UPRM email address.');
    });
  });

  when('the user enters valid credentials', () => {
    const { getByPlaceholderText, getByText } = render(<LogIn />);
    fireEvent.changeText(getByPlaceholderText('UPR Email'), 'user1@upr.edu');
    fireEvent.changeText(getByPlaceholderText('Password'), 'test1');

    then('they should be navigated to the home screen', async () => {
      fireEvent.press(getByText('Log In'));
      await waitFor(() => {
        expect(jest.requireMock('expo-router').useNavigation().navigate)
          .toHaveBeenCalledWith('/');
      });
    });
  });

  when('the user enters incorrect credentials', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<LogIn />);
    fireEvent.changeText(getByPlaceholderText('UPR Email'), 'user1@upr.edu');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    
    then('they should see an error message', () => {
      fireEvent.press(getByText('Log In'));
      expect(queryByText('Invalid email or password. Please try again.')).toBeTruthy();
    });
  });
});
