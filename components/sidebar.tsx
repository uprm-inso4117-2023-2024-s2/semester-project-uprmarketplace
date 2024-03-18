import React, {useState} from 'react';
import { StyleSheet, TextInput, View, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import RoundedSquareImage from '@/components/RoundedSquareImage';
import PriceRangeSlider from '@/components/panResponder';
import DropdownMenu from '@/components/dropdown';




// Sorting side bar
export default function SortDrawer({props}) {

  const [data,setData] =useState([
    { id: '1', source: require('../../assets/images/image1.jpg'), name: 'Organic Chemistry Book', price: '40', description: 'En buenas condiciones, levemente usado, for info call 787-040-2495.' },
    { id: '2', source: require('../../assets/images/image2.jpg'), name: 'Bicicleta 26', price: '75', description: 'Comunicarse al 787-440-9132. Gomas nueva, corre bien y no tiene daños en la pintura. Area de Mayaguez' },
    { id: '3', source: require('../../assets/images/image3.jpg'), name: 'Bicicleta Usada', price: '100', description: 'Poco uso, info: 312-194-1948' },
    //añadir extra listings para que la pagina se vea mas viva -sm
  ]);

  const categories = [
    'Category 1', 'Category 2', 'Category 3'];
  
const handleCategorySelect = (category: any) => {
    // Handle the selected category
    console.log('Selected category:', category);
  };

  const sort =[
    "Lowest to Highest", "Highest to Low",
    "Newest to Oldest", "Oldest to New"
  ];

  const handlePriceSort = (sort: any) => {
    // Handle the selected category
    console.log('Selected Sort:', sort);
    let sortedData = [...data];
    switch(sort){
      case "Lowest to Highest":
        sortedData.sort((a,b)=> Number(a.price) - Number(b.price));
        setData(sortedData);
      break
      case "Highest to Low":
        sortedData.sort((a,b)=> Number(b.price) - Number(a.price));
        setData(sortedData);
      break
      case "Newest to Oldest":
       
      break
      case "Oldest to New":
      break
    }}




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
