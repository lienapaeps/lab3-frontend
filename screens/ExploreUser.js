import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';
import Search from '../components/Search';
import Filter from '../components/Filter';
import AcitvityCard from '../components/ActivityCard';

const ExploreUser = () => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Explore</Text>
            </View>
            <View style={styles.options}>
                <Search />
                <Filter />
            </View>
            <View>
                <Text style={globalStyles.headerTextSmall}>Nieuwste</Text>
                <View style={styles.cards}>
                    <AcitvityCard />
                    <AcitvityCard />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    cards: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
})

export default ExploreUser;