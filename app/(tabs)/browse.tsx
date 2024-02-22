import React, {useState} from 'react';
import { StyleSheet, TextInput, View, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import RoundedSquareImage from '@/components/RoundedSquareImage';

import PriceRangeSlider from '@/components/panResponder';
import DropdownMenu from '@/components/dropdown';

const data = [
    { id: '1', source: require('../../assets/images/image1.jpg'), name: 'Organic Chemistry Book', price: '$40', description: 'En buenas condiciones, levemente usado, for info call 787-040-2495.' },
    { id: '2', source: require('../../assets/images/image2.jpg'), name: 'Bicicleta 26', price: '$75', description: 'Comunicarse al 787-440-9132. Gomas nueva, corre bien y no tiene daños en la pintura. Area de Mayaguez' },
    { id: '3', source: require('../../assets/images/image3.jpg'), name: 'Bicicleta Usada', price: '$100', description: 'Poco uso, info: 312-194-1948' },
    //añadir extra listings para que la pagina se vea mas viva -sm
  ];
  const categories = [
    'Category 1', 'Category 2', 'Category 3'];
  
  const handleCategorySelect = (category) => {
    // Handle the selected category
    console.log('Selected category:', category);
  };


  const Drawer = createDrawerNavigator();
  function CustomDrawerContent(props) {
    return (  <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* Additional custom drawer items can be added here */}
      <PriceRangeSlider />
      <DropdownMenu
        options={categories} // Pass the options
        onSelect={handleCategorySelect} // Pass the onSelect function
      />
    </DrawerContentScrollView>
      
      );
    }
    export default function BrowseScreen() {
      return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Browse" component={BrowseContent} />
          {/* Additional screens can be added here */}
        </Drawer.Navigator>
      );
    }


    function BrowseContent() {
    const renderItem = ({ item }) => (
        <RoundedSquareImage
          source={item.source}
          name={item.name}
          price={item.price}
          description={item.description}
        />
      );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Page</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
});
