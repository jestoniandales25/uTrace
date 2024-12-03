    import React, { useEffect, useState } from 'react';
    import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
    import { db } from "../.firebase/firebaseConfig";
    import { collection, getDocs } from "firebase/firestore";



    export default function SearchSample() {
        const [data, setData] = useState([]);
        const [filteredData, setFilteredData] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedItem, setSelectedItem] = useState(null);

        // Fetch data from Firestore on component mount
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'building_information')); // Replace with your collection
                    const fetchedData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setData(fetchedData);
                    setFilteredData(fetchedData); // Initialize the filtered data
                } catch (error) {
                    console.error('Error fetching Firestore data: ', error);
                }
            };
            fetchData();
        }, []);
        // Handle search input changes
        const handleSearch = (text: string) => {
            setSearchQuery(text);
            const filtered = data.filter(item =>
                item.building_name?.toLowerCase().includes(text.toLowerCase()) // Adjust field name ('name') as per your Firestore data
            );
            setFilteredData(filtered);
        };
        // Handle item click to show the selected item's details
        const handleItemPress = (item: any) => {
            setSelectedItem(item);
        };

        
        return (
            <View style={styles.container}>
                <TextInput  style={styles.input} 
                            placeholder='Search'
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                <FlatList
                    data={filteredData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemPress(item)}>
                            <Text style={styles.item}>{item.building_name}</Text>
                        </TouchableOpacity>
                    )} // Adjust field name as needed
                />
            </View>
        )
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            width: '100%',
            padding: 10,
            borderColor: 'gray',
            borderRadius: 5,
        },
        item: {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        detailsContainer: {
            padding: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginTop: 20,
        },
        detailsTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        detailsText: {
            fontSize: 16,
            marginTop: 10,
        },
    }); 

