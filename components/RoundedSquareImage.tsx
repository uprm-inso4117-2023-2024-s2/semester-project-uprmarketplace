import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  source: string;
  name: string;
  price: number;
  description: string;
  updateCartList: (item: Listing) => void;
  onPress: () => void;
}

const RoundedSquareImage: React.FC<Props> = ({ source, name, price, description, updateCartList, onPress }) => {
  const handleAddToCart = () => {
    const item: Listing = { id: Math.random().toString(), source, name, price, description };
    updateCartList(item);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Price: {price}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <IconButton
        icon="plus"
        color="#007AFF"
        size={24}
        testID={`add-to-cart-button-${name}`}
        onPress={handleAddToCart}
        style={styles.iconButton}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  iconButton: {
    color: 'white',
    backgroundColor: 'lightgreen',
    borderRadius: 12,
  },
});

export default RoundedSquareImage;
