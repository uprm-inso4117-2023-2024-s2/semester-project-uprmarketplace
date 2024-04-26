import { fireEvent, render } from '@testing-library/react-native';
import CreateListingPage from '@/app/(tabs)/testing';

global.alert = jest.fn();

test('Creating a listing with empty values should fail', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<CreateListingPage />);
    const titleInput = getByPlaceholderText('Enter listing name');
    const descriptionInput = getByPlaceholderText('Enter description');
    const priceInput = getByPlaceholderText('Enter price');
    const conditionInput = getByTestId('condition-dropdown');
    const submitButton = getByText('Create Listing');
    
    fireEvent.changeText(titleInput, '');
    fireEvent.changeText(descriptionInput, '');
    fireEvent.changeText(priceInput, '');
    fireEvent.changeText(conditionInput, '');
    
    fireEvent.press(submitButton);
    
    expect(global.alert).toHaveBeenCalledWith('Please fill out all fields.');
});

test('Entering a non-numeric value for price should fail to create the listing', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<CreateListingPage />);
    const titleInput = getByPlaceholderText('Enter listing name');
    const descriptionInput = getByPlaceholderText('Enter description');
    const priceInput = getByPlaceholderText('Enter price');
    const conditionInput = getByTestId('condition-dropdown');
    const submitButton = getByText('Create Listing');
    
    fireEvent.changeText(titleInput, 'Test Title');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.changeText(priceInput, 'Invalid Price');
    fireEvent.changeText(conditionInput, 'Test Condition');
    
    fireEvent.press(submitButton);
    
    expect(global.alert).toHaveBeenCalledWith('Price must be a valid number.');
});

test('Creating a listing with an invalid condition should fail', () => {
    const { getByPlaceholderText, getByText, getByTestId, debug } = render(<CreateListingPage />);
    
    const titleInput = getByPlaceholderText('Enter listing name');
    const descriptionInput = getByPlaceholderText('Enter description');
    const priceInput = getByPlaceholderText('Enter price');
    const conditionInput = getByTestId('condition-dropdown');
    const submitButton = getByText('Create Listing');
    
    fireEvent.changeText(titleInput, 'Test Listing');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.changeText(priceInput, '100');
    fireEvent.changeText(conditionInput, 'Invalid Condition');
    
    debug();
    
    fireEvent.press(submitButton);
    
    expect(global.alert).toHaveBeenCalledWith('Please provide a valid condition (Good, Fair, Excellent).');
});

