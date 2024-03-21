import React, { useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Modal, Text, Image, TouchableOpacity } from 'react-native';
import { IconButton, Badge } from 'react-native-paper';
import RoundedSquareImage from '@/components/RoundedSquareImage';

interface Listing {
  id: string;
  source: any;
  name: string;
  price: string;
  description: string;
  condition: string;
}

const data: Listing[] = [
  { id: '1', source: require('../../assets/images/image1.jpg'), name: 'Organic Chemistry Book', price: '$40', description: 'En buenas condiciones, levemente usado, for info call 787-040-2495.', condition: 'Buenas', },
  { id: '2', source: require('../../assets/images/image2.jpg'), name: 'Bicicleta 26', price: '$75', description: 'Comunicarse al 787-440-9132. Gomas nueva, corre bien y no tiene daños en la pintura. Area de Mayaguez', condition: 'Nueva', },
  { id: '3', source: require('../../assets/images/image3.jpg'), name: 'Bicicleta Usada', price: '$100', description: 'Poco uso, info: 312-194-1948', condition: 'Usada', },
];

export default function BrowseScreen() {
  const [cartListings, setCartListings] = useState<Listing[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);


  const updateCartList = (listing: Listing) => {
    setCartListings(prevListings => [...prevListings, listing]);
  };

  const removeItemFromCart = (id: string) => {
    setCartListings(prevListings => prevListings.filter(listing => listing.id !== id));
  };

  const showDetailModal = (listing: Listing) => {
    setSelectedListing(listing);
    setDetailModalVisible(true);
    console.log('showDetailModal', listing);
  };

  const renderItem = ({ item }: { item: Listing }) => (
    <TouchableOpacity onPress={() => showDetailModal(item)}>
      <RoundedSquareImage
        source={item.source}
        name={item.name}
        price={item.price}
        description={item.description}
        updateCartList={updateCartList}
        onPress={() => showDetailModal(item)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Render the title here */}
        <TouchableOpacity onPress={() => showDetailModal(data[0])}>
          <Text style={styles.title}>Title</Text>
        </TouchableOpacity>
        <View style={styles.cartIconContainer}>
          <IconButton
            icon="cart"
            color="#fff"
            size={25}
            onPress={() => setModalVisible(true)}
          />
          {cartListings.length > 0 && (
            <Badge style={styles.badge}>{cartListings.length}</Badge>
          )}
        </View>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search for products near you..."
          placeholderTextColor="#888"
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedListing?.name}</Text>
              <IconButton
                icon="close"
                color="#000"
                size={24}
                onPress={() => setDetailModalVisible(false)}
                style={styles.closeButton}
              />
            </View>
            <View style={{flexDirection:"row"}}>
              {selectedListing && <Image source={selectedListing.source} style={styles.imagepopup} />}
              <View style={{marginLeft:5, paddingLeft:5}}>
                <Text style={styles.topicTitle}>Description</Text>
                <Text style={{fontSize: 20}}>{selectedListing?.description}</Text>
                <Text style={styles.topicTitle}>Price</Text>
                <Text style={{fontSize: 20}}>{selectedListing?.price}</Text>
                <Text style={styles.topicTitle}>Conditions</Text>
                <Text style={{fontSize: 20}}>{selectedListing?.condition}</Text>
            </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cart</Text>
              <IconButton
                icon="close"
                color="#000"
                size={24}
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              />
            </View>
            {cartListings.map(listing => (
              <View style={styles.cartItem} key={listing.id}>
                <View style={styles.imageContainer}>
                  <Image source={listing.source} style={styles.image} />
                </View>
                <View style={styles.details}>
                  <Text style={styles.name}>{listing.name}</Text>
                  <Text style={styles.price}>{listing.price}</Text>
                </View>
                <IconButton
                  icon="delete"
                  color="#000"
                  size={24}
                  onPress={() => removeItemFromCart(listing.id)}
                  style={styles.removeButton}
                />
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 0,
    marginTop: -20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartIconContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -0 
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  
  searchBar: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  flatListContent: {
    paddingTop: 20,
    paddingBottom: 20,
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    marginLeft: 'auto',
  },
  closeButton: {
    marginLeft: 'auto',
  },
  imagepopup: {
    width: 500,
    height: 500,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
