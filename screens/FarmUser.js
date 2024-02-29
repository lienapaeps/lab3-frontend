import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';

import FarmCard from '../components/FarmCard';
import Search from '../components/Search';
import Filter from '../components/Filter';

const FarmUser = ({ navigation }) => {
    const goToDetails = (farmData) => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails' , params: { farmData }});
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState(0);
    const [distanceFilter, setDistanceFilter] = useState('');

    // Dummy data
    const farmData = [
        {
            id: '1',
            image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
            title: "Vlinderveld",
            street: "Grote Molenweg",
            streetnumber: "",
            postalcode: "1980",
            city: "Zemst",
            rating: "4.9",
            kilometer: "3.2km",
            status: "Open",
        },
        {
            id: '2',
            image: "https://lh3.googleusercontent.com/p/AF1QipNaQpWk-_YB5UO-SybmP86UcMqIsj16nQBkMaXW=s1360-w1360-h1020",
            title: "Hof Ter dreef",
            street: "Prinsendreef",
            streetnumber: "18",
            postalcode: "1860",
            city: "Meise",
            rating: "4.5",
            kilometer: "8.5km",
            status: "Gesloten",
        },
        {
            id: '3',
            image: "https://lh3.googleusercontent.com/p/AF1QipPGN4ilnsWuqk6XdOkMeG_N3myrPYycEBHlqqZh=s1360-w1360-h1020",
            title: "de Plukheyde veld",
            street: "Kampenhoutsebaan",
            streetnumber: "",
            postalcode: "1910",
            city: "Kampenhout",
            rating: "2.3",
            kilometer: "3.2km",
            status: "Open",
        },
        {
            id: '4',
            image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
            title: "Vlinderveld",
            street: "Grote Molenweg",
            streetnumber: "",
            postalcode: "1980",
            city: "Zemst",
            rating: "2.6",
            kilometer: "3.2km",
            status: "Open",
        },
        {
            id: '5',
            image: "https://lh3.googleusercontent.com/p/AF1QipNaQpWk-_YB5UO-SybmP86UcMqIsj16nQBkMaXW=s1360-w1360-h1020",
            title: "Hof Ter dreef",
            street: "Prinsendreef",
            streetnumber: "18",
            postalcode: "1860",
            city: "Meise",
            rating: "1.5",
            kilometer: "8.5km",
            status: "Gesloten",
        },
        {
            id: '6',
            image: "https://lh3.googleusercontent.com/p/AF1QipPGN4ilnsWuqk6XdOkMeG_N3myrPYycEBHlqqZh=s1360-w1360-h1020",
            title: "de Plukheyde veld",
            street: "Kampenhoutsebaan",
            streetnumber: "",
            postalcode: "1910",
            city: "Kampenhout",
            rating: "1.9",
            kilometer: "3.2km",
            status: "Open",
        },
    ]

    // Filter de boerderijen op basis van de zoekterm, status en rating
    const filteredFarmData = farmData.filter(farm => {
        const titleMatches = farm.title.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatches = statusFilter === 'All' || farm.status === statusFilter;
        const ratingMatches = farm.rating >= ratingFilter; // Filter op rating gelijk aan of hoger dan de geselecteerde waarde
        const distanceMatches = !distanceFilter || parseFloat(farm.kilometer) <= parseFloat(distanceFilter); // Filter op afstand
        return titleMatches && statusMatches && ratingMatches && distanceMatches;
    });

    // Bijwerken van de zoekterm
    const handleSearch = (text) => {
        setSearchTerm(text);
    };

    // Bijwerken van het statusfilter
    const handleFilterChange = (status) => {
        setStatusFilter(status);
    };

    // Bijwerken van het ratingfilter
    const handleRatingFilterChange = (rating) => {
        setRatingFilter(rating);
    };

    // Bijwerken van het afstandsfilter
    const handleDistanceFilterChange = (distance) => {
        setDistanceFilter(distance);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.buttons}>
                <Search searchTerm={searchTerm} onSearchTermChange={handleSearch} />
                <Filter
                    onFilterChange={handleFilterChange}
                    onRatingFilterChange={handleRatingFilterChange}
                    onDistanceFilterChange={handleDistanceFilterChange}
                />
            </View>
            <View style={{flex: 1}}>
                <FlatList
                    data={filteredFarmData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <FarmCard farmData={item} onPress={goToDetails} />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        paddingBottom: -30,
        backgroundColor: COLORS.offWhite,
    },
    buttons: {
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
});

export default FarmUser;
