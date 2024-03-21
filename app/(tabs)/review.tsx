import React, { useState } from 'react';
import { View, Text, TextInput, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// const renderStars = (rating) => {
//   const filledStars = '★'.repeat(rating);
//   const emptyStars = '☆'.repeat(5 - rating);
//   return filledStars + emptyStars;
// };
const backgroundImage = require('../../assets/images/background-review-page.avif');
//const backgroundImage = require('../../assets/images/background-review-page-alt.avif');

const ReviewPage = () => {
  const [curr_rating, setRating] = useState(0);

  const product = {
    name: 'Bicicleta Usada',
    price: '$100.00',
    imageUrl: require('../../assets/images/image3.jpg'),
    comments: [
      "This product is amazing! Highly recommended.",
      "I love it. It's worth every penny.",
      "Not bad for the price. I'm satisfied.",
    ],
  };

const renderCommentStars = (rating) => {
  const filledStars = Array(rating).fill().map((_, i) => <Text key={i} style={{ color: 'yellow', fontSize: 20, textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>★</Text>);
  const emptyStars = Array(5 - rating).fill().map((_, i) => <Text key={rating + i} style={{ color: 'yellow', fontSize: 20, textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>☆</Text>);
  return [...filledStars, ...emptyStars];
};

const handleStarClick = (value) => {
  setRating(value);
};

const renderSelectionStars = (rating) => {
  const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarClick(i)}>
          <Text style={{ color: i <= rating ? 'yellow' : '#888', fontSize: 20, textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>★</Text>
        </TouchableOpacity>
      );
    }
    return stars;
};



  const review = {
    commentRatings: [5,5,4],
    commentText: [
      "This product is amazing! Highly recommended.",
      "I love it. It's worth every penny.",
      "Not bad for the price. I'm satisfied.",
    ],
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
      {/* <Image source={product.imageUrl} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text> */}
        <View style={styles.card}>
          <Image source={product.imageUrl} style={styles.image} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
        </View>
      <Text style={styles.heading}>Customer's Reviews:</Text>
      {product.comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.comment}><FontAwesome name="commenting-o" size={24} color="green" />{" " + comment} {"|| Rating: "} {renderCommentStars(review.commentRatings[index])}</Text>
        </View>
      ))}
      <View style={styles.commentBar}>
        <TextInput
          style={styles.input}
          placeholder="Write your own review..."
          placeholderTextColor="#888"
        />
        <View>
          <Text>{renderSelectionStars(curr_rating)}</Text>
        </View>
        <MaterialIcons 
          name="add-comment" 
          size={24} 
          color="green"
        />
        
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  //   padding: 20,
  // },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
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

export default ReviewPage;
