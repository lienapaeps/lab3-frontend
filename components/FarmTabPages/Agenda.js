import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';

import AgendaCard from '../../components/AgendaCard';
import COLORS from '../../constants/color';

import { fetchActivityDataFarm } from '../../utils/fetchHelpers';

const Agenda = ({ route }) => {
    const { data: farmId } = route.params;
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const data = await fetchActivityDataFarm(farmId);
                const filteredActivities = data.data.activities.filter(activity => activity.category === 'Workshop');
                setActivityData(filteredActivities);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [farmId]);

    console.log(activityData);

    return(
        <View style={styles.container}>
            <FlatList
                style={styles.flow}
                showsVerticalScrollIndicator={false}
                data={activityData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <AgendaCard activity={item} />}
                ListEmptyComponent={
                    <Text style={styles.emptyState}>
                        Er zijn geen activiteiten gepland 🍃
                    </Text>
                }
                ListHeaderComponent={<Text style={globalStyles.headerText}>Aankomende activiteiten</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        paddingBottom: 30,
    },
    flow: {
        overflow: 'visible',
    },
    emptyState: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: COLORS.offBlack,
        fontFamily: 'Baloo2_500Medium',
    },
});

export default Agenda;