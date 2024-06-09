import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { stringifyData } from '../../utils/utils';
import { fetchUserData, fetchFarmDataByOwner, fetchPackagesData, getUserIdAndToken } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import PackageCard from '../../components/PackageCard';

const FarmFarmer = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [farmData, setFarmData] = useState(null);
    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { token, userId } = await getUserIdAndToken();

                console.log('UserId:', userId)

                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                const userDataResponse = await fetchUserData(token, userId);
                if (userDataResponse && userDataResponse.data && userDataResponse.data.user) {
                    setUserData(userDataResponse.data.user);
                } else {
                    console.error('Invalid user data response');
                    return;
                }

                const farmDataResponse = await fetchFarmDataByOwner(token, userId);
                setFarmData(farmDataResponse.data.farm);
                console.log('Farm:', stringifyData(farmData));

                 // Tel het aantal leden
                 const memberCount = farmDataResponse.data.farm.members ? farmDataResponse.data.farm.members.length : 0;
                 console.log('Number of Members:', memberCount);

                const packagesDataResponse = await fetchPackagesData(farmDataResponse.data.farm._id);
                setPackagesData(packagesDataResponse.data.packages);
                // console.log('Packages:', stringifyData(packagesData));

                setLoading(false);

            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
            </SafeAreaView>
        );
    }
    
    return (
        <View >
            <View>
                <Image style={styles.headerImage} source={{ uri: farmData.farmImage }} />
            </View>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View>
                        <View>
                            <Text style={globalStyles.headerTextSmall}>{farmData.name}</Text>
                            <Text style={{...globalStyles.bodyText, ...globalStyles.capitalize}}>{farmData.adress.street} {farmData.adress.number}, {farmData.adress.zipcode} {farmData.adress.city}</Text>
                            <Text style={globalStyles.bodyText}>{farmData.farmLocation}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5, marginBottom: 15 }}>
                            <Text style={globalStyles.bodyTextSemiBold}>{farmData?.members?.length ?? 0}</Text>
                            <Text style={globalStyles.bodyText}>leden</Text>
                        </View>
                    </View>
                    <View> 
                        
                    </View>
                </View>
                
                <View style={{ marginTop: 10 }}>
                    <Text style={{...globalStyles.headerTextSmall, marginBottom: 10}}>Pakketten</Text>
                    
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ gap: 15, marginBottom: 20 }}
                    >
                        {packagesData.map((item) => (
                            <PackageCard
                                key={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                packagesData={item}
                            />
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={{...globalStyles.bodyTextMedium, color: COLORS.orange}}>Pakket toevoegen +</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: -30,
        paddingTop: 20,
    },
    headerImage: {
        padding: 0,
        width: '100%',
        height: 240,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    iconMembers: {
        width: 16,
        height: 17.5,
        marginRight: 5,
    },
    btn: {
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.orange,
    }
});

export default FarmFarmer;