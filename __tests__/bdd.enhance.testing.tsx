import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import Browse from '../app/(tabs)/browse';

describe('Visualización Detallada de Productos', () => {
  it('debería mostrar un modal con los detalles completos del producto cuando se selecciona un producto', async () => {
    const { getByTestId, findByTestId } = render(<Browse />);

    // Simular la selección de un producto
    const item = getByTestId('item-1');
    fireEvent.press(item);

    // Ahora el modal debería ser visible
    const detailModal = await findByTestId('detail-modal');
    expect(detailModal.props.visible).toBe(true);

    // Verificar que el modal muestra la información correcta
    expect(getByTestId('modal-title').props.children).toBe('Organic Chemistry Book');
    expect(getByTestId('modal-description').props.children).toBe('En buenas condiciones, levemente usado, for info call 787-040-2495.');
    expect(getByTestId('modal-price').props.children).toBe('$40');
    expect(getByTestId('modal-condition').props.children).toBe('Buenas');
  });

  it('debería cerrar el modal y regresar a la lista de productos cuando se presiona el botón de cerrar', async () => {
    const { getByTestId, queryByTestId } = render(<Browse />);

    // Simular la selección de un producto y la apertura del modal
    const item = getByTestId('item-1');
    fireEvent.press(item);

    // Simular el cierre del modal
    const closeButton = getByTestId('close-button');
    fireEvent.press(closeButton);

    // Ahora el modal no debería ser visible
    await waitFor(() => {
        const detailModal = queryByTestId('detail-modal');
        expect(detailModal).toBeNull();
  });    
});
it('debería mostrar un modal con los detalles completos del producto cuando se selecciona un producto', async () => {
    const { getByTestId, findByTestId } = render(<Browse />);

    // Simular la selección de un producto
    const item = getByTestId('item-2');
    fireEvent.press(item);

    // Ahora el modal debería ser visible
    const detailModal = await findByTestId('detail-modal');
    expect(detailModal.props.visible).toBe(true);

    // Verificar que el modal muestra la información correcta
    expect(getByTestId('modal-title').props.children).toBe('Bicicleta 26');
    expect(getByTestId('modal-description').props.children).toBe('Comunicarse al 787-440-9132. Gomas nueva, corre bien y no tiene daños en la pintura. Area de Mayaguez');
    expect(getByTestId('modal-price').props.children).toBe('$75');
    expect(getByTestId('modal-condition').props.children).toBe('Nueva');
  });

  it('debería cerrar el modal y regresar a la lista de productos cuando se presiona el botón de cerrar', async () => {
    const { getByTestId, queryByTestId } = render(<Browse />);

    // Simular la selección de un producto y la apertura del modal
    const item = getByTestId('item-2');
    fireEvent.press(item);

    // Simular el cierre del modal
    const closeButton = getByTestId('close-button');
    fireEvent.press(closeButton);

    // Ahora el modal no debería ser visible
    await waitFor(() => {
        const detailModal = queryByTestId('detail-modal');
        expect(detailModal).toBeNull();
  });
});
it('debería mostrar un modal con los detalles completos del producto cuando se selecciona un producto', async () => {
    const { getByTestId, findByTestId } = render(<Browse />);

    // Simular la selección de un producto
    const item = getByTestId('item-3');
    fireEvent.press(item);

    // Ahora el modal debería ser visible
    const detailModal = await findByTestId('detail-modal');
    expect(detailModal.props.visible).toBe(true);

    // Verificar que el modal muestra la información correcta
    expect(getByTestId('modal-title').props.children).toBe('Bicicleta Usada');
    expect(getByTestId('modal-description').props.children).toBe('Poco uso, info: 312-194-1948');
    expect(getByTestId('modal-price').props.children).toBe('$100');
    expect(getByTestId('modal-condition').props.children).toBe('Usada');
  });

  it('debería cerrar el modal y regresar a la lista de productos cuando se presiona el botón de cerrar', async () => {
    const { getByTestId, queryByTestId } = render(<Browse />);

    // Simular la selección de un producto y la apertura del modal
    const item = getByTestId('item-3');
    fireEvent.press(item);

    // Simular el cierre del modal
    const closeButton = getByTestId('close-button');
    fireEvent.press(closeButton);

    // Ahora el modal no debería ser visible
    await waitFor(() => {
        const detailModal = queryByTestId('detail-modal');
        expect(detailModal).toBeNull();
  });
});
});