import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import { fetchPackagesData } from '../../utils/fetchHelpers';
import Pakket from '../../components/Pakket';
import { ScrollView } from 'react-native-gesture-handler';

const Services = ({ route }) => {
    const { data: farmId } = route.params;
    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await fetchPackagesData(farmId);
                setPackagesData(data.data.packages);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [farmId]);

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={globalStyles.headerText}>Alle pakketten</Text>
            <FlatList
                style={styles.flow}
                showsVerticalScrollIndicator={false}
                data={packagesData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Pakket item={item} />}
                ListEmptyComponent={
                    <Text style={styles.emptyState}>
                        Er zijn geen pakketten beschikbaar 🍃
                    </Text>
                }
            />
        </View>
        </ScrollView>
    );
};

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
        marginVertical: 20,
        fontSize: 16,
        color: 'gray',
    },
});

export default Services;
