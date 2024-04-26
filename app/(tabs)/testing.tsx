import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Listing {
    id: string;
    name: string;
    price: string;
    description: string;
    condition: string;
}

const CreateListingPage: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateListing = () => {
        if (!name || !price || !description || !condition) {
            alert('Please fill out all fields.');
            return;
        }
        if (isNaN(Number(price))) {
            alert('Price must be a valid number.');
            return;
        }
        if (!['Good', 'Fair', 'Excellent'].includes(condition)) {
            alert('Please provide a valid condition (Good, Fair, Excellent).');
            return;
        }
        const newListing: Listing = {
            id: (Math.random() * 1000).toString(),
            name: name,
            price: price,
            description: description,
            condition: condition,
        };
        setListings(prevListings => [...prevListings, newListing]);
        setName('');
        setPrice('');
        setDescription('');
        setCondition('');
        setErrorMessage('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text>Listing Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter listing name"
                    value={name}
                    onChangeText={setName}
                />
                <Text>Price:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter price"
                    value={price}
                    onChangeText={setPrice}
                />
                <Text>Description:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    value={description}
                    onChangeText={setDescription}
                />
                <Text>Condition:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter condition (Good, Fair, Excellent)"
                    value={condition}
                    onChangeText={setCondition}
                    testID='condition-dropdown'
                />
                <Button title="Create Listing" onPress={handleCreateListing} />
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listing}>
                            <Text style={styles.listingText}>Name: {item.name}</Text>
                            <Text style={styles.listingText}>Price: {item.price}</Text>
                            <Text style={styles.listingText}>Description: {item.description}</Text>
                            <Text style={styles.listingText}>Condition: {item.condition}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    listing: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    listingText: {
        fontSize: 16,
        marginBottom: 5,
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});

export default CreateListingPage;
