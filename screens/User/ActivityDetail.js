import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import { fetchActivityDataById } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import Button from '../../components/Button';

const ActivityDetail = ({ navigation, route }) => {
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = route.params.id;
    const farmName = route.params.farmName;

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchActivityDataById(id);
                setActivityData(data.data.activity);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
  
    if (loading) {
      return <Text>Laden...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    return (
        <View>
            <View style={styles.btn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../../assets/Back-arrow.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.bgImg}>
                        <Image style={styles.headerImage} source={{ uri: activityData.image }} />
                    </View>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={globalStyles.headerTextSmall}>{activityData.title}</Text>
                            <View style={styles.info}>
                                {activityData.category === 'Workshop' && (
                                <View style={styles.headerInfo}>
                                    <Image style={styles.imgClock} source={require('../../assets/icons/clock-black.png')} />
                                    <Text style={globalStyles.bodyText}>{activityData.start.time} - {activityData.end.time}</Text>
                                </View>
                                )}
                                <View style={styles.headerInfo}>
                                    <Image style={styles.imgDate} source={require('../../assets/icons/date-black.png')} />
                                    <Text style={globalStyles.bodyText}>{formatDate(activityData.start.date)}</Text>
                                </View>
                                <View style={styles.headerInfo}>
                                    <Image style={styles.imgLocation} source={require('../../assets/icons/locatie-black.png')} />
                                    <Text style={globalStyles.bodyText}>{farmName}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.body}>
                            {activityData.description && (
                                <View>
                                    <View style={styles.details}>
                                        <Text style={{...globalStyles.headerTextSmall, marginBottom: 5}}>Details</Text>
                                        <Text style={globalStyles.bodyText}>{activityData.description}</Text>
                                    </View>
                                    <View style={styles.users}>
                                        <Text style={{...globalStyles.headerTextSmall, marginBottom: 5}}>Gaan ook</Text>
                                        <Text style={globalStyles.bodyText}>Leden</Text>
                                        <View style={styles.btnContainer}>
                                            <Button title="Inschrijven" filled />
                                        </View>
                                    </View>
                                </View>
                                
                            )}
                            {activityData.text && (
                                <View style={styles.content}>
                                    <Text style={globalStyles.bodyText}>{activityData.text}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: -30,
        paddingTop: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    btnContainer: {
        marginTop: 30,
        paddingBottom: 60,
    },
    users: {
        marginTop: 10,
    },
    btn: {
        position: 'absolute',
        top: 40,
        left: 0,
        zIndex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 10,
        margin: 20,
    },
    backButton: {
        width: 30,
        height: 30,
    },
    headerImage: {
        padding: 0,
        width: '100%',
        height: 240,
    },
    headerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: 20,
        marginTop: 15,
        borderBottomColor: COLORS.veryLightOffBlack,
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    body: {
        marginTop: 20,
    },
    imgClock: {
        width: 20,
        height: 20,
    },
    imgLocation: {
        width: 17,
        height: 21,
    },
    imgDate: {
        width: 18,
        height: 20,
    },
    content: {
        paddingBottom: 60,
    }
});

export default ActivityDetail;