import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ReviewPage = () => {
  const [product, setProduct] = useState({
    name: 'Bicicleta Usada',
    price: '$100.00',
    imageUrl: require('../../assets/images/image3.jpg'),
    comments: [
      "This product is amazing! Highly recommended.",
      "I love it. It's worth every penny.",
      "Not bad for the price. I'm satisfied.",
    ],
  });

  const [review, setReview] = useState({
    commentRatings: [5, 5, 4],
    commentText: [
      "This product is amazing! Highly recommended.",
      "I love it. It's worth every penny.",
      "Not bad for the price. I'm satisfied.",
    ],
  });

  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const addComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...product.comments, newComment];
      const updatedRatings = [...review.commentRatings, userRating];
      const updatedProduct = { ...product, comments: updatedComments };
      const updatedReview = { ...review, commentRatings: updatedRatings };

      setProduct(updatedProduct);
      setReview(updatedReview);
      setNewComment('');
      setUserRating(0);
    }
  };

  const renderStars = (rating, index) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(index, star)}>
            <FontAwesome name={rating >= star ? 'star' : 'star-o'} size={16} color="black" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const handleStarPress = (index, star) => {
    const updatedRatings = [...review.commentRatings];
    updatedRatings[index] = star;
    setReview({ ...review, commentRatings: updatedRatings });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.imageUrl} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.heading}>Reviews:</Text>
      {product.comments.map((comment, index) => (
  <View key={index} style={styles.commentContainer}>
    <Text style={styles.comment}>
      <FontAwesome name="commenting-o" size={24} color="black" />{" " + comment} {"|| Rating:"} {renderStars(review.commentRatings[index], index)}
    </Text>
  </View>
))}

      <View style={styles.commentBar}>
        <TextInput
          style={styles.input}
          placeholder="Write your own review..."
          placeholderTextColor="#888"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={addComment} testID="add-comment-button">
          <MaterialIcons
            name="add-comment"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          <Text>Your Rating: </Text>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
              <FontAwesome name={userRating >= star ? 'star' : 'star-o'} size={24} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
    fontSize: 16,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReviewPage;
