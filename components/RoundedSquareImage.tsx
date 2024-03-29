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
    <TouchableOpacity style={styles.container} onPress={onPress}> {}
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
        color="#000"
        size={24}
        onPress={handleAddToCart}
        testID={`add-to-cart-button-${name}`}
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
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    width: 120,
    height: 120,
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
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default RoundedSquareImage;
