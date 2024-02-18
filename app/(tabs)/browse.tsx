import React from 'react';
import { StyleSheet, TextInput, View, FlatList } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import RoundedSquareImage from '@/components/RoundedSquareImage';
const data = [
    { id: '1', source: require('../../assets/images/image1.jpg'), name: 'Organic Chemistry Book', price: '$40', description: 'En buenas condiciones, levemente usado, for info call 787-040-2495.' },
    { id: '2', source: require('../../assets/images/image2.jpg'), name: 'Bicicleta 26', price: '$75', description: 'Comunicarse al 787-440-9132. Gomas nueva, corre bien y no tiene daños en la pintura. Area de Mayaguez' },
    { id: '3', source: require('../../assets/images/image3.jpg'), name: 'Bicicleta Usada', price: '$100', description: 'Poco uso, info: 312-194-1948' },
    //añadir extra listings para que la pagina se vea mas viva -sm
  ];

export default function BrowseScreen() {
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
