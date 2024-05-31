import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                const token = await AsyncStorage.getItem('token');
                let userId = await AsyncStorage.getItem('uid');

                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                if (userId && userId.startsWith('"') && userId.endsWith('"')) {
                    userId = userId.substring(1, userId.length - 1);
                }

                const userDataResponse = await fetchUserData(token, userId);
                if (userDataResponse && userDataResponse.data && userDataResponse.data.user) {
                    setUserData(userDataResponse.data.user);
                    // console.log("user data: " + userDataResponse.data.user)
                } else {
                    console.error('Invalid user data response');
                    return;
                }

                const farmDataResponse = await fetchFarmData(token, userId);
                setFarmData(farmDataResponse.data.farm);
                // console.log("farm data: ", farmDataResponse.data.farm);

                const packagesDataResponse = await fetchPackagesData(token, farmDataResponse.data.farm._id);
                setPackagesData(packagesDataResponse.data.packages);
                console.log("packages data: ", packagesDataResponse.data.packages);

                setLoading(false);

            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    const fetchUserData = async (token, userId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };

    const fetchFarmData = async (token, userId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/owner/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    const fetchPackagesData = async (token, farmId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}/packages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.loaderContainer}>
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
                    </View>
                    <View> 
                        <View style={{ flexDirection: 'row', gap: 5, marginBottom: 15 }}>
                            <Text style={globalStyles.bodyTextSemiBold}>50</Text>
                            <Text style={globalStyles.bodyText}>leden</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{ marginTop: 10 }}>
                    <Text style={{...globalStyles.headerTextSmall, marginBottom: 15}}>Pakketten</Text>
                    
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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