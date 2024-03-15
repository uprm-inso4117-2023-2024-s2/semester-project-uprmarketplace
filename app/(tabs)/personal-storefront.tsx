import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

interface PersonalItems {
  id: string;
  itemName: string;
  itemPrice: string;
  category: string;
  itemImage: any;
}

const renderStars = (rating) => {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return filledStars + emptyStars;
};

const userData = {
  profilePicture: require('../../assets/images/profile-picture-default.png'),
  profileBanner: require('../../assets/images/banner.jpg'),
  name: 'Anne Smith',
  status: 'Active',
  averageRatings: 4,
};

const data: PersonalItems[] = [
  { id: '1', itemName: 'Lab Coat', itemPrice: '$50', category: 'Clothing', itemImage: require('../../assets/images/image4.jpg') },
  { id: '2', itemName: 'Lab Goggles', itemPrice: '$15', category: 'Clothing', itemImage: require('../../assets/images/image5.jpg') },
];
const allowedCategories = ["Book", "Clothing", "Tools", "Furniture"];
const filteredData = data.filter(item => allowedCategories.includes(item.category));

const PersonalStorefrontPage = () => {
  const renderItem = ({ item }: { item: PersonalItems }) => (
    <View style={styles.itemContainer}>
      <Image source={item.itemImage} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemPrice}>{item.itemPrice}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={userData.profileBanner} style={styles.profileBanner} />
      <View style={styles.profileContainer}>
        <Image source={userData.profilePicture} style={styles.profilePicture} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileStatus}>{userData.status}</Text>
          <Text style={styles.profileRatings}>{renderStars(userData.averageRatings)}</Text>
        </View>
      </View>

      <Text style={styles.listingsHeading}>Listings</Text>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.itemList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
  profileBanner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -70,
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    justifyContent: 'center',
    marginTop: 70,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileStatus: {
    fontSize: 16,
    color: '#888',
  },
  profileRatings: {
    fontSize: 20,
  },
  listingsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemList: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
});

export default PersonalStorefrontPage;