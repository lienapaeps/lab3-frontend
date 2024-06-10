import React from 'react';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native'
import COLORS from '../../constants/color';
import { useState, useEffect } from 'react';

import { globalStyles } from '../../styles/global';

import { fetchMembersData } from '../../utils/fetchHelpers';
import { fetchFarmDataById } from '../../utils/fetchHelpers';
import { fetchUserDataById } from '../../utils/fetchHelpers';

import Lid from '../../components/Lid';
 
const Members = ({ route }) => {
  const { data:farmId } = route.params;
  const [ledenData, setLedenData] = useState([]);
  const [ownerData, setOwnerData] = useState("");
  const [ownerDataId, setOwnerDataId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchLedenData = async () => {
          try {
              const data = await fetchMembersData(farmId);
              setLedenData(data.data.members);
          } catch (error) {
              console.log("Error", error);
          } finally {
              setLoading(false);
          }
      };

      fetchLedenData();
  }, [farmId]);

  useEffect(() => {
    const fetchOwnerData = async () => {
        try {
            const data = await fetchFarmDataById(farmId);
            setOwnerData(data.data.farm.owner);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
    };

    fetchOwnerData();
}, [farmId]);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const data = await fetchUserDataById(ownerData);
                setOwnerDataId(data.data.user);
                console.log(data.data.user);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOwnerData();
    }, [ownerData]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!ownerDataId) {
        return <Text>Error loading user data</Text>;
    }

  return (
      <View style={styles.container}>
        <FlatList
                data={ledenData}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Lid item={item} />
                )}
                ListEmptyComponent={<Text style={styles.emptyState}>Deze boerderij heeft geen leden 🤷</Text>}
                ListHeaderComponent={<View><Text style={[globalStyles.headerTextSmall, styles.title]}>Eigenaar</Text>
                <View style={styles.owner}>
                    <Image style={styles.profileImage} source={{uri: ownerDataId.profilePicture}} />
                    <Text style={[globalStyles.headerTextMedium, globalStyles.capitalize]}>{ownerDataId.firstname} {ownerDataId.lastname}</Text>
                </View>
        
                <Text style={[globalStyles.headerTextSmall, styles.title]}>Leden</Text></View>}
            />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    emptyState: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: COLORS.offBlack,
      fontFamily: 'Baloo2_500Medium',
    },
    title: {
     marginBottom: 20
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 20,
    },
    owner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    }
})

export default Members;
