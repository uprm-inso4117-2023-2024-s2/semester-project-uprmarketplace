import React, { useState } from 'react';
import { View, PanResponder, Text } from 'react-native';

export default function PriceRangeSlider() {
  const [buttonPosition, setButtonPosition] = useState(50); // Initial position of the button

  // PanResponder to handle drag gesture
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // Update button position based on gesture
      const newPosition = buttonPosition + gestureState.dx/3;
      if (newPosition >= 0 && newPosition <= 100) { // Ensure the button stays within the range
        setButtonPosition(newPosition);
      }
    },
  });

  return (
    <View>
      <View style={styles.priceRange}>
        <View style={[styles.priceLine, { left: 0, width: `${buttonPosition}%` }]} />
        <View style={[styles.buttonContainer, { top: 0, left: `${buttonPosition}%` }]}>
          <View style={[styles.button, styles.buttonBar]} {...panResponder.panHandlers} />
          <Text style={styles.buttonText}>|</Text>
        </View>
      </View>
      <Text style={styles.selectedPrice}>Selected Price: ${Math.round(buttonPosition)}</Text>
    </View>
  );
}

const styles = {
  priceRange: {
    width: '100%',
    height: 20,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  priceLine: {
    height: '100%',
    backgroundColor: 'blue',
    position: 'absolute',
    top: 0,
  },
  buttonContainer: {
    position: 'absolute',
    top: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  buttonBar: {
    marginLeft: -10,
    marginRight: -4,
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
    marginLeft: -4,
  },
  selectedPrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
};