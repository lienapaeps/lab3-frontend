import React, { useState, useEffect } from  'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { fetchMembersData, getUserIdAndToken, fetchFarmDataById, fetchSubscriptionData } from '../utils/fetchHelpers';

import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';
import Button from '../components/Button';

export default function FarmHeader ({ navigation, route }) {
  const [farmData, setFarmData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const { id } = route.params;
    // console.log("farmid: " + id);

    useEffect(() => {
      const fetchData = async () => {

        try {
          const { token, userId } = await getUserIdAndToken();

          if (!token) {
            navigation.navigate('Login');
            return;
          }

          const farmDataResponse = await fetchFarmDataById(id);
          setFarmData(farmDataResponse.data.farm);
          // console.log("Farm data: ", farmDataResponse);

          const membersDataResponse = await fetchMembersData(id);
          setMembersData(membersDataResponse.data.members);
          // console.log("Members data: ", membersDataResponse);

          try {
            const subscriptionDataResponse = await fetchSubscriptionData(token, userId);
            console.log("er is subscription data: ", subscriptionDataResponse.data)
            if (subscriptionDataResponse.data) {
              setIsMember(true);
            } else {
              setIsMember(false);
            }
          } catch (subError) {
            setIsMember(false);
          }

          setLoading(false); 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
      }

      fetchData();

    }, [id]);

    const handlePress = () => {
      navigation.navigate('SubscribePackage', { farmId: id, farmName: farmData.name });
    }
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    return (
        <View>
          <View style={styles.bgImg}>
            <Image style={styles.cardImage} source={{ uri: farmData.farmImage }} />
          </View>
          <View style={styles.container}>
            <Text style={globalStyles.headerText}>{farmData.name}</Text>
            <Text style={globalStyles.bodyText}>{farmData.adress.street} {farmData.adress.number}, {farmData.adress.zipcode} {farmData.adress.city}</Text>
            <Text style={[globalStyles.bodyText, styles.text]}>{farmData.description}</Text>
          </View>
          <View style={styles.container}>
            <View style={[styles.div,styles.memberButton]}>
              <Button title="Lid worden" filled disabled={isMember} onPress={handlePress}/>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 10,
        // margin: 20,
    },
    backButton: {
        width: 30,
        height: 30,
    },
    cardImage: {
        padding: 0,
        width: '100%',
        height: 240,
    },
    container:{
        padding: 20,
        paddingBottom: -20,
        backgroundColor: '#F5F5F5',
    },
    text:{
        marginTop: 20,
    },
  
    followButton: {
        backgroundColor: COLORS.green,
        color: COLORS.offBlack,  
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        textAlign: 'center', 
        width: '100%',
    },
    memberButton: {
      paddingBottom: 15,
    }
  })