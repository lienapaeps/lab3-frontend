import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';

import { fetchFarmDataById } from '../../utils/fetchHelpers';
import { text } from '@cloudinary/url-gen/qualifiers/source';



const Contact = ({ route }) => {
    const { data:id } = route.params;
    const [contactData, setContactData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const data = await fetchFarmDataById(id);
                setContactData(data);
                console.log(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactData();
    }, [id]);

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

    const renderOpeningHours = (day) => {
        const { openinghour, closinghour } = day;
        return openinghour === "00:00" ? "Gesloten" : `${openinghour} - ${closinghour}`;
    };

    const daysOfWeek = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

    return (
        <ScrollView>
            <TouchableOpacity activeOpacity={1} style={styles.flex}>
                <View style={styles.container}>
                    <View>
                        <Text style={globalStyles.headerText}>Contact</Text>
                        <View style={styles.layout}>
                            <Text style={[globalStyles.bodyTextSemiBold, styles.text]}>Telefoon </Text>
                            <Text style={[globalStyles.bodyText, styles.text]}>{contactData.data?.farm?.contact?.number}</Text>
                        </View>
                        <View style={styles.layout}>
                            <Text style={[globalStyles.bodyTextSemiBold, styles.text]}>Email </Text>
                            <Text style={[globalStyles.bodyText, styles.text]}>{contactData.data?.farm?.contact?.email}</Text>
                        </View>
                        <View style={styles.layout}>
                            <Text style={[globalStyles.bodyTextSemiBold, styles.text]}>Website </Text>
                            <Text style={[globalStyles.bodyText, styles.text]}>{contactData.data?.farm?.contact?.website}</Text>
                        </View>
                        <Text style={[globalStyles.headerText, styles.header]}>Openingsuren</Text>
                        {contactData.data?.farm?.openinghours && daysOfWeek.map((day, index) => (
                            <View key={day} style={styles.layout}>
                                <Text style={[globalStyles.bodyTextSemiBold, styles.text]}>{day} </Text>
                                <Text style={[globalStyles.bodyText, styles.text]}>
                                    {renderOpeningHours(contactData.data.farm.openinghours[index])}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginBottom: 40,
    },
    layout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        marginTop: 10,
        marginBottom: 5,
    },
    header: {
        marginTop: 30,
    }
});

export default Contact;