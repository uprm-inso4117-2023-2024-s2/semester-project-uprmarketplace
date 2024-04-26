import React, { useState } from 'react';
import { View, Text, Image, FlatList, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';

const renderStars = (rating) => {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return filledStars + emptyStars;
};

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
    <View style={styles.container}>
      <Image source={userData.profileBanner} style={styles.profileBanner} />
      <View style={styles.profileBannerIconContainer}>
        <IconButton
          icon="brush"
          color="#fff"
          size={25}
          onPress={() => setBannerModalVisible(true)}
          testID='profileBannerIcon'
        />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureAndIconContainer}>
          <Image source={userData.profilePicture} style={styles.profilePicture} />
          <IconButton
            icon="image-edit"
            color="#fff"
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
              icon="pencil"
              color="#fff"
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
          icon="filter"
          color="#fff"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileBanner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  profileBannerIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePictureAndIconContainer: {
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profilePictureIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    borderRadius: 15,
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileNameAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileRatings: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalButton: {
    marginLeft: 10,
    color: 'blue',
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
    marginBottom: 10,
  },
  bannerColumns: {
    flexDirection: 'row',
  },
  bannerPreview: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  pictureRow: {
    flexDirection: 'row',
  },
  picturePreview: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  listingsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    marginBottom: 5,
  },
  pinButton: {
    backgroundColor: '#0066ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  pinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  unpinButton: {
    backgroundColor: '#ff3300',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  unpinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0066ff',
    borderRadius: 50,
    padding: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 16,
  },
  categoryList: {
    maxHeight: 200,
  },
  modalOption: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0066ff',
  },
});

export default PersonalStorefrontPage;
