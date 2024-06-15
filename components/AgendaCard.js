import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';

import { fetchFarmDataById } from '../utils/fetchHelpers';

import { globalStyles } from '../styles/global';
import COLORS from './../constants/color';

const AgendaCard = ({ activity, onPress, showFarmDetails }) => {
    const [farmName, setFarmName] = useState('');
    const [farmPicture, setFarmPicture] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const day = date.getDate();
        const monthNames = [
            "januari", "februari", "maart", "april", "mei", "juni",
            "juli", "augustus", "september", "oktober", "november", "december"
        ];
        const month = monthNames[date.getMonth()];
    
        return `${day} ${month}`;
    };

    useEffect(() => {
        if (showFarmDetails) {
            const fetchFarmData = async () => {
                try {
                    const farmDataResponse = await fetchFarmDataById(activity.farm);
                    if (farmDataResponse && farmDataResponse.data && farmDataResponse.data.farm) {
                        const farm = farmDataResponse.data.farm;
                        setFarmName(farm.name);
                        setFarmPicture(farm.farmImage);
                    }
                } catch (error) {
                    console.log('Error fetching farm data:', error);
                }
            };

            fetchFarmData();
        }
    }, [activity.farm, showFarmDetails]);

    const handlePress = () => {
        onPress(activity._id, farmName);
    }

    return (
        <TouchableOpacity onPress={handlePress} style={styles.activityContainer}>
            <View style={styles.container}>
                <View style={styles.line}></View>
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={{ ...globalStyles.headerTextMedium, marginLeft: 15 }}>{activity.title}</Text>
                        <Text style={[globalStyles.bodyTextBold, styles.number]}>{activity.enrolledUsers.length}/20</Text>
                    </View>

                    <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.lightOffBlack, marginLeft: 15 }}>
                        {formatDate(activity.start.date)} - {activity.start.time} - {activity.end.time}
                    </Text>

                    {showFarmDetails && (
                        <View style={styles.attendees}>
                            <View style={styles.profileContainer}>
                                {farmPicture ? (
                                <Image style={styles.profileImage} source={{ uri: farmPicture }} />
                            ) : null}
                                <Text style={{ ...globalStyles.bodyTextSemiBold, marginLeft: 10 }}>{farmName}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
    },
    activityContainer: {
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
        marginTop: 5,
    },
    line: {
        width: 5,
        height: '100%',
        backgroundColor: COLORS.orange,
        borderRadius: 5,
    },
    contentContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginLeft: 15,
    },
    attendees: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 5,
    },
    number: {
        color: COLORS.orange,
    },
});

export default AgendaCard;
