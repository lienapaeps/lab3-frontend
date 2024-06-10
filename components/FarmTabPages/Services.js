import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import { fetchPackagesData } from '../../utils/fetchHelpers';
import Pakket from '../../components/Pakket';
import COLORS from '../../constants/color';

const Services = ({ route }) => {
    const { data: farmId } = route.params;
    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
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
        <View style={styles.container}>
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
                ListHeaderComponent={<Text style={globalStyles.headerTextSmall}>Alle pakketten</Text>}
            />
        </View>
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
        marginTop: 20,
        fontSize: 16,
        color: COLORS.offBlack,
        fontFamily: 'Baloo2_500Medium',
    },
});

export default Services;
