import React, { useState } from 'react';
import { View, Text, Image, FlatList, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';

const renderStars = (rating) => {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return filledStars + emptyStars;
};

const backgroundImage = require('../../assets/images/storefront_background.png');

// Hardcoded banners to test
const banners = [
  require('../../assets/images/banner.jpg'),
  require('../../assets/images/profile-picture-default.png'),
  require('../../assets/images/banner.jpg'),
  require('../../assets/images/banner.jpg'),
  require('../../assets/images/profile-picture-default.png'),
  require('../../assets/images/banner.jpg'),
];

// Hardcoded profile pictures to test
const profilePictures = [
  require('../../assets/images/image2.jpg'),
  require('../../assets/images/profile-picture-default.png'),
  require('../../assets/images/profile-picture-default.png'),
  require('../../assets/images/image2.jpg'),
  require('../../assets/images/profile-picture-default.png'),
  require('../../assets/images/profile-picture-default.png'),
];

interface StudentData {
  profilePicture: NodeRequire;
  profileBanner: NodeRequire;
  name: string;
  status: string;
  averageRatings: number;
}

const PersonalStorefrontPage = () => {
  const [userItems, setUserItems] = useState([
    { id: '1', itemName: 'Lab Coat', itemPrice: '$50', category: 'Clothing', itemImage: require('../../assets/images/image4.jpg'), status: 'In Stock', pinned: false },
    { id: '2', itemName: 'Lab Goggles', itemPrice: '$15', category: 'Clothing', itemImage: require('../../assets/images/image5.jpg'), status: 'Out of Stock', pinned: false },
    { id: '3', itemName: 'Chemistry Book', itemPrice: '$30', category: 'Book', itemImage: require('../../assets/images/image1.jpg'), status: 'In Stock', pinned: false },
    { id: '4', itemName: 'Bike', itemPrice: '$60', category: 'Tools', itemImage: require('../../assets/images/image3.jpg'), status: 'Out of Stock', pinned: false },
  ]);
  const allowedCategories = ["Book", "Clothing", "Tools", "Furniture"];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredData = selectedCategory ? userItems.filter(item => item.category === selectedCategory) : userItems;

  const [userData, setUserData] = useState<StudentData>({
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
  const [error, setError] = useState('');
  const [newBanner, setNewBanner] = useState(userData.profileBanner);
  const [newProfilePic, setNewProfilePic] = useState(userData.profilePicture);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const renderCategories = () => {
    return allowedCategories.map((category, index) => (
      <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => categorySelectionHandler(category)}>
        <Text style={styles.categoryText}>{category}</Text>
      </TouchableOpacity>
    ));
  };
  const toggleCategoryModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
  };
  const categorySelectionHandler = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCategoryModalVisible(false);
  }
  const updateName = (newName) => {
    if (newName === '') {
      setError('Name cannot be empty');
      return;
    }
    setUserData(prevData => ({ ...prevData, name: newName }));
    setNameModalVisible(false);
    setError('');
  };

  const updateBanner = (newBanner) => {
    setUserData(prevData => ({ ...prevData, profileBanner: newBanner }));
  };

  const updateProfilePic = (newProfilePic) => {
    setUserData(prevData => ({ ...prevData, profilePicture: newProfilePic }));
  };

  const updateStatus = (newStatus) => {
    if (selectedItem) {
      const updatedItems = userItems.map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      setUserItems(updatedItems);
    }
    setSelectedItem(null); // Reset selectedItem after updating status
    setStatusModalVisible(false);
    // Update newStatus state when selecting a new status
    setNewStatus(newStatus);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} testID={`item-${item.id}`}>
      <Image source={item.itemImage} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemPrice}>{item.itemPrice}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View accessible={true} testID={`status-${item.id}`}>
          <Text>{item.status}</Text>
        </View>
        {!item.pinned && (
          <TouchableOpacity onPress={() => handlePinItem(item.id)} style={styles.pinButton} testID={`pinButton-${item.id}`}>
            <Text style={styles.pinButtonText}>Pin</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderPinnedItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.itemImage} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemPrice}>{item.itemPrice}</Text>
      </View>
      <TouchableOpacity onPress={() => handleUnpinItem(item.id)} style={styles.unpinButton} testID="unpinButton">
        <Text style={styles.unpinButtonText}>Unpin</Text>
      </TouchableOpacity>
    </View>
  );

  const [pinnedItems, setPinnedItems] = useState([]);

  const handlePinItem = (itemId) => {
    const updatedUserItems = userItems.map(item => {
      if (item.id === itemId) {
        return { ...item, pinned: true };
      }
      return item;
    });
    setUserItems(updatedUserItems);
    const itemToPin = userItems.find(item => item.id === itemId);
    if (itemToPin) {
      if (pinnedItems.length < 3) {
        setPinnedItems([...pinnedItems, itemToPin]);
      } else {
        alert("You've reached your pin limit");
      }
    }
  };

  const handleUnpinItem = (itemId) => {
    const updatedUserItems = userItems.map(item => {
      if (item.id === itemId) {
        return { ...item, pinned: false };
      }
      return item;
    });
    setUserItems(updatedUserItems);
    const updatedPinnedItems = pinnedItems.filter(item => updatedUserItems.find(userItem => userItem.id === item.id && userItem.pinned));
    setPinnedItems(updatedPinnedItems);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Image source={userData.profileBanner} style={styles.profileBanner} />
      <View style={styles.profileBannerIconContainer}>
        <IconButton
          icon="palette-outline"
          iconColor="white"
          size={30}
          onPress={() => setBannerModalVisible(true)}
          testID='profileBannerIcon'
        />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureAndIconContainer}>
          <Image source={userData.profilePicture} style={styles.profilePicture} />
          <IconButton
            icon="image-edit-outline"
            iconColor="white"
            size={25}
            onPress={() => setProfilePicModalVisible(true)}
            testID='profilePictureIcon'
            style={styles.profilePictureIconContainer}
          />
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.profileNameAndIconContainer}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <IconButton
              icon="pencil-outline"
              iconColor="white"
              size={20}
              onPress={() => setNameModalVisible(true)}
              testID='editButton'
            />
          </View>
          <Text style={styles.profileStatus}>{userData.status}</Text>
          <Text style={styles.profileRatings}>{renderStars(userData.averageRatings)}</Text>
        </View>
      </View>

      {/* Modal for editing name */}
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
            {error ? <Text style={styles.errorMsg}>{error}</Text> : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setNameModalVisible(false)}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { updateName(newName); }} testID='saveButton'>
                <Text style={styles.modalButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for editing banner */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBannerModalVisible}
        onRequestClose={() => setBannerModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Banner</Text>
            <ScrollView showsVerticalScrollIndicator={true} style={styles.bannerColumns}>
              {banners.map((banner, index) => (
                <TouchableOpacity key={index} onPress={() => setNewBanner(banner)}>
                  <Image source={banner} style={styles.bannerPreview} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setBannerModalVisible(false)}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { updateBanner(newBanner); setBannerModalVisible(false); }}>
                <Text style={styles.modalButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for editing profile picture */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isProfilePicModalVisible}
        onRequestClose={() => setProfilePicModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Profile Picture</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={styles.pictureRow}>
              {profilePictures.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => setNewProfilePic(image)}>
                  <Image source={image} style={styles.picturePreview} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setProfilePicModalVisible(false)}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { updateProfilePic(newProfilePic); setProfilePicModalVisible(false); }}>
                <Text style={styles.modalButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for editing status */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isStatusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalContainer} testID="status-modal">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Status</Text>
            {['In Stock', 'Out of Stock', 'Unavailable'].map((status, index) => (
              <TouchableOpacity key={index} onPress={() => updateStatus(status)}>
                <Text style={styles.modalOption}>{status}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setStatusModalVisible(false)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.listingsHeading}>Pinned Listings</Text>
      {pinnedItems.map(pinnedItem => (
        <View key={pinnedItem.id}>
          {renderPinnedItem({ item: pinnedItem })}
        </View>
      ))}

      <Text style={styles.listingsHeading}>Listings</Text>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.itemList}
        testID="filterButton"
      />

      {/* Category Button */}
      <View style={styles.categoryButtonContainer}>
        <IconButton
          icon="filter-outline"
          iconColor="white"
          size={25}
          onPress={() => toggleCategoryModal()}
          testID="categoryButton"
        />
      </View>

      {/* Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCategoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <ScrollView style={styles.categoryList} testID="categoryList">
              {renderCategories()}
            </ScrollView>
            <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
              <Text style={styles.modalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
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
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -70,
    marginBottom: 20,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profilePictureAndIconContainer: {
    position: 'relative',
    marginRight: 20,
    width: 100,
    height: 100,
  },
  profilePictureIconContainer: {
    position: 'absolute',
    left: 70,
    top: 60,
  },
  profileInfo: {
    justifyContent: 'center',
    marginTop: 60,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  profileNameAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  profileStatus: {
    fontSize: 16,
    color: 'lightgray',
  },
  profileRatings: {
    fontSize: 20,
    color: 'yellow',
  },
  listingsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
    borderWidth: 2,
    borderRadius: 8,
    marginRight: 15,
    borderColor: 'white',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemPrice: {
    fontSize: 14,
    color: 'white',
  },
  category: {
    fontSize: 14,
    color: 'white',
  },
  itemStatus: {
    fontSize: 14,
    color: 'white',
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
    width: '35%',
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
  modalOption: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  bannerColumns: {
    height: 200,
    marginBottom: 10,
    paddingRight: 10,
  },
  bannerPreview: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    marginBottom: 20,
  },
  pictureRow: {
    height: 120,
    marginBottom: 10,
  },
  picturePreview: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    marginRight: 20,
    marginBottom: 20,
  },
  errorMsg: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  pinButton: {
    flex: 1,
    top: 0,
    right: 0,
    backgroundColor: 'limegreen',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  pinButtonText: {
    color: '#fff',
  },
  unpinButton: {
    flex: 1,
    top: 0,
    right: 0,
    backgroundColor: 'green',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  unpinButtonText: {
    color: '#fff',
  },
  categoryButtonContainer: {
    position: 'absolute',
    left: 200,
    top: 256,
    zIndex: 1,
  },
  categoryItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
});

export default PersonalStorefrontPage;
