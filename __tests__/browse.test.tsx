import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Browse from '../app/(tabs)/browse';

describe('Browse component', () => {
  it('should display the modal with the correct information when an item is selected', () => {
    const { getByTestId } = render(<Browse />);

    // Simulate a press on the item that opens the modal
    const item = getByTestId('item-1');
    fireEvent.press(item);

    // Now the modal should be visible
    const detailModal = getByTestId('detail-modal');
    expect(detailModal.props.visible).toBe(true);

    // Check if the modal displays the correct information for the first item
    expect(getByTestId('modal-title').props.children).toBe('Organic Chemistry Book');
    expect(getByTestId('modal-description').props.children).toBe('En buenas condiciones, levemente usado, for info call 787-040-2495.');
    expect(getByTestId('modal-price').props.children).toBe('$40');
    expect(getByTestId('modal-condition').props.children).toBe('Buenas');
  });
  
  it('should display the modal with the correct information when the second item is selected', () => {
    const { getByTestId } = render(<Browse />);
  
    // Simulate a press on the second item that opens the modal
    const item = getByTestId('item-2');
    fireEvent.press(item);
  
    // Now the modal should be visible
    const detailModal = getByTestId('detail-modal');
    expect(detailModal.props.visible).toBe(true);
  
    // Check if the modal displays the correct information for the second item
    expect(getByTestId('modal-title').props.children).toBe('Bicicleta 26');
    expect(getByTestId('modal-description').props.children).toBe('Comunicarse al 787-440-9132. Gomas nueva, corre bien y no tiene daños en la pintura. Area de Mayaguez');
    expect(getByTestId('modal-price').props.children).toBe('$75');
    expect(getByTestId('modal-condition').props.children).toBe('Nueva');
  });
  
  it('should display the modal with the correct information when the third item is selected', () => {
    const { getByTestId } = render(<Browse />);
  
    // Simulate a press on the third item that opens the modal
    const item = getByTestId('item-3');
    fireEvent.press(item);
  
    // Now the modal should be visible
    const detailModal = getByTestId('detail-modal');
    expect(detailModal.props.visible).toBe(true);
  
    // Check if the modal displays the correct information for the third item
    expect(getByTestId('modal-title').props.children).toBe('Bicicleta Usada');
    expect(getByTestId('modal-description').props.children).toBe('Poco uso, info: 312-194-1948');
    expect(getByTestId('modal-price').props.children).toBe('$100');
    expect(getByTestId('modal-condition').props.children).toBe('Usada');
  });
});