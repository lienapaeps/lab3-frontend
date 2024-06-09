import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native'
import COLORS from '../../constants/color';
import { useState, useEffect } from 'react';

import { globalStyles } from '../../styles/global';

import { fetchMembersData } from '../../utils/fetchHelpers';

import Lid from '../../components/Lid';
 
const Members = ({ route }) => {
  const { data:farmId } = route.params;
  const [ledenData, setLedenData] = useState([]);
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
  
  return (
      <View style={styles.container}>
        <Text style={[globalStyles.headerText, styles.title]}>Leden</Text>
        <FlatList
                data={ledenData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Lid item={item} />
                )}
                ListEmptyComponent={<Text style={styles.emptyState}>Deze boerderij heeft geen leden 🤷</Text>}
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
  }
})

export default Members;
