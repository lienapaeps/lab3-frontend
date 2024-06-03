import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';

import { fetchFarmDataById } from '../../utils/fetchHelpers';

const Contact = () => {
    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const data = await fetchFarmDataById();
                setContactData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.bodyText}>Error: {error.message}</Text>
            </SafeAreaView>
        );
    }

    if (!contactData || !contactData.contact) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.bodyText}>No contact data available.</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={globalStyles.headerText}>Contact</Text>
                <Text style={globalStyles.bodyText}>Openingstijden:</Text>
                <Text style={globalStyles.bodyText}>Telefoonnummer: {phoneNumber}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
});

export default Contact;