import React, { useState, useCallback, useEffect  } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const renderStars = (rating) => {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return filledStars + emptyStars;
};


// Interfaces
interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: any;
}

interface Review {
  productId: string;
  commentRatings: number[];
  commentText: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Chemistry Book',
    price: '$40',
    imageUrl: require('../../assets/images/image1.jpg'),
  },
  {
    id: '2',
    name: 'Bicicleta 26',
    price: '$75',
    imageUrl: require('../../assets/images/image2.jpg'),
  },
  {
    id: '3',
    name: 'Bicicleta Usada',
    price: '$100',
    imageUrl: require('../../assets/images/image3.jpg'),
  },
];

const reviews: Review[] = [
  {
    productId: '1',
    commentRatings: [4, 5],
    commentText: [
      "Really helpful for my class, slightly worn but great value.",
      "Excellent condition, hardly used. A must-have for chemistry students!",
    ],
  },
  {
    productId: '2',
    commentRatings: [5, 4],
    commentText: [
      "Great bike for the price, rides smoothly and no issues with paint.",
      "Bought this for my kid, and it's been fantastic. Good as new!",
    ],
  },
  {
    productId: '3',
    commentRatings: [5, 5, 4],
    commentText: [
      "This product is amazing! Highly recommended.",
      "Love it, it's worth every penny.",
      "Not bad for a used bike. I'm satisfied with my purchase.",
    ],
  },
];


const ReviewPage = ({productId}) => {

  const [effectiveProductId, setEffectiveProductId] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      const fetchAndSetProductId = async () => {
        const storedProductId = await AsyncStorage.getItem('selectedProductId');
        const newEffectiveProductId = storedProductId || products[0].id;
        setEffectiveProductId(newEffectiveProductId);
      };

      fetchAndSetProductId();
    }, [])
  );

  useEffect(() => {
    const fetchAndSetProductId = async () => {
      const storedProductId = await AsyncStorage.getItem('selectedProductId');
      const newEffectiveProductId = storedProductId || products[0].id;
      setEffectiveProductId(newEffectiveProductId);
    };

    fetchAndSetProductId();
  } , [productId]);


  const product = products.find(p => p.id === effectiveProductId);
  const review = reviews.find(r => r.productId === effectiveProductId);


  if (!product || !review) {
    return <Text>No product or review found.</Text>;
  }

  const renderStars = (rating: number) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return filledStars + emptyStars;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.imageUrl} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.heading}>Reviews:</Text>
      {review.commentText.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.comment}><FontAwesome name="commenting-o" size={24} color="black" />{" " + comment} {"|| Rating: "} {renderStars(review.commentRatings[index])}</Text>
        </View>
      ))}
      <View style={styles.commentBar}>
        <TextInput
          style={styles.input}
          placeholder="Write your own review..."
          placeholderTextColor="#888"
        />
        <MaterialIcons 
          name="add-comment" 
          size={24} 
          color="black"
        />
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '40%', 
    alignItems: 'center', 
  },
  comment: {
    fontSize: 16,
    textAlign: 'center',
  },
  commentBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
  },
  input: {
    flex: 1,
  },
});

const ReviewPageWithNavigation = () => {
  // Initial product ID set to the first product's ID
  const [productId, setProductId] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      const fetchStoredProductId = async () => {
        const storedProductId = await AsyncStorage.getItem('selectedProductId');
        // If there's a stored product ID, use it, otherwise default to the first product's ID
        setProductId(storedProductId || products[0].id);
      };
  
      fetchStoredProductId();
    }, [])
  );

  // Function to navigate to the next product
  const nextProduct = () => {
    const currentIndex = products.findIndex(product => product.id === productId);
    const nextIndex = (currentIndex + 1) % products.length; // Cycle back to the first product at the end
    setProductId(products[nextIndex].id);
    AsyncStorage.setItem('selectedProductId', products[nextIndex].id);
  };

  // Function to navigate to the previous product
  const prevProduct = () => {
    const currentIndex = products.findIndex(product => product.id === productId);
    const prevIndex = (currentIndex - 1 + products.length) % products.length; // Cycle back to the last product
    setProductId(products[prevIndex].id);
    AsyncStorage.setItem('selectedProductId', products[prevIndex].id);
  };

  if (!productId) {
    return <Text>Loading...</Text>; // loading
  }

  return (
    <View>
      <Button title="Previous Product" onPress={prevProduct} />
      <ReviewPage productId={productId}/>
      <Button title="Next Product" onPress={nextProduct} />
    </View>
  );
};

export default ReviewPageWithNavigation;
