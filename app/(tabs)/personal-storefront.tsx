import React , { useState } from 'react';
import { View, Text, Image, FlatList, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import  { IconButton } from 'react-native-paper';

const renderStars = (rating) => {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return filledStars + emptyStars;
};


const userItems = [
  { id: '1', itemName: 'Lab Coat', itemPrice: '$50', itemImage: require('../../assets/images/image4.jpg') },
  { id: '2', itemName: 'Lab Goggles', itemPrice: '$15', itemImage: require('../../assets/images/image5.jpg') },
];

const PersonalStorefrontPage = () => {
  const [userData, setUserData] = useState({
    profilePicture: require('../../assets/images/profile-picture-default.png'),
    profileBanner: require('../../assets/images/banner.jpg'),
    name: 'Anne Smith',
    status: 'Active',
    averageRatings: 4,
  });

  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isBannerModalVisible, setBannerModalVisible] = useState(false);
  const [isProfilePicModalVisible, setProfilePicModalVisible] = useState(false);
  const [newName, setNewName] = useState(userData.name);
  const [newBanner, setNewBanner] = useState(userData.profileBanner);
  const [newProfilePic, setNewProfilePic] = useState(userData.profilePicture);

  const updateName = (newName) => {
    setUserData(prevData => ({...prevData, name: newName}));
  };

  const updateBanner = (newBanner) => { 
    setUserData(prevData => ({...prevData, profileBanner: newBanner}));
  }

  const updateProfilePic = (newProfilePic) => { 
    setUserData(prevData => ({...prevData, profilePicture: newProfilePic}));
  }

  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.itemImage} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemPrice}>{item.itemPrice}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={userData.profileBanner} style={styles.profileBanner} />
      <View style={styles.profileBannerIconContainer}>
        <IconButton
        icon="brush"
        color="#fff"
        size={25}
        onPress={() => setBannerModalVisible(true)}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image source={userData.profilePicture} style={styles.profilePicture} />
        <View style={styles.profilePictureIconContainer}>
          <IconButton
          icon="image-edit"
          color="#fff"
          size={25}
          onPress={() => setProfilePicModalVisible(true)}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileStatus}>{userData.status}</Text>
          <Text style={styles.profileRatings}>{renderStars(userData.averageRatings)}</Text>
        </View>
        <View style={styles.profileNameIconContainer}>
          <IconButton
          icon="pencil"
          color="#fff"
          size={20}
          onPress={() => setNameModalVisible(true)}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNameModalVisible}
        onRequestClose={() => setNameModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new name"
              value={newName}
              onChangeText={setNewName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setNameModalVisible(false)}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {updateName(newName); setNameModalVisible(false);}}>
                <Text style={styles.modalButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.listingsHeading}>Listings</Text>
      <FlatList
        data={userItems}
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
  profileBannerIconContainer: {
    position: 'absolute',
    right: -10,
    top: 0,
    marginTop: -0
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
  profilePictureIconContainer: {
    position: 'absolute',
    right: 100,
    top: 70,
  },
  profileInfo: {
    justifyContent: 'center',
    marginTop: 70,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileNameIconContainer: {
    position: 'absolute',
    right: -40,
    top: 57,
    marginTop: -0
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    fontSize: 16,
    color: '#41a425',
  },
});

export default PersonalStorefrontPage;