import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { fetchFarmDataById } from '../utils/fetchHelpers';

import { globalStyles } from '../styles/global';
import COLORS from './../constants/color';
import { formatDate } from '../utils/utils';

const AgendaCard = ({ activity }) => {
    const [farmName, setFarmName] = useState('');

    console.log(activity.farm);

    useEffect(() => {
        // Functie om boerderijgegevens op te halen en de naam in te stellen
        const fetchFarmName = async () => {
            try {
                const farmDataResponse = await fetchFarmDataById(activity.farm);
                if (farmDataResponse && farmDataResponse.data && farmDataResponse.data.farm) {
                    const farmName = farmDataResponse.data.farm.name;
                    setFarmName(farmName);
                }
            } catch (error) {
                console.log('Error fetching farm data:', error);
            }
        };

        fetchFarmName();
    }, [activity.farm]);

    return (
        <TouchableOpacity style={styles.activityContainer}>
            <View style={styles.line}></View>
            <Text style={{...globalStyles.headerTextSmaller, marginLeft: 10}}>{activity.title}</Text>
            <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.lightOffBlack, marginLeft: 10}}>{formatDate(activity.start.date)} - {activity.start.time} - {activity.end.time}</Text>
            <Text style={{...globalStyles.bodyTextSemiBold, marginLeft: 10, marginTop: 10}}>{farmName}</Text>
        </TouchableOpacity>
    );
};

const styles = {
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
        height: 80,
        backgroundColor: COLORS.green,
        position: 'absolute',
        left: 15,
        top: 15,
        borderRadius: 5,
    }
};

export default AgendaCard;
