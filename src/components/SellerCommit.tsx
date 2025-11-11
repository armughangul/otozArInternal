import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';

interface Props {
  comments: string;
}

const SellerCommit = ({comments}: Props) => {
  const InspectionData = [
    {
      id: '1',
      title: 'Otoz.ai inspected car',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '2',
      title: 'Inspection report attached',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '3',
      title: 'Number plates available',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '4',
      title: '2nd Owner',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '5',
      title: 'Token Tax Paid',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '6',
      title: 'Manufacture 2015',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '7',
      title: 'Registered 2015',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '8',
      title: 'Documents available',
      Image: require('../assets/icons/arrownext.png'),
    },
    {
      id: '9',
      title: '2 keys available',
      Image: require('../assets/icons/arrownext.png'),
    },
  ];
  const InspectionView = ({item}: any) => (
    <View
      style={{
        height: 25,
        width: '90%',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        alignSelf: 'center',
      }}>
      <View style={{width: '100%'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={require('../assets/icons/arrownext.png')}
            style={{width: 6, height: 11}}
          />
          <Text
            style={{
              color: '#113551',
              fontSize: 12,
              fontWeight: '500',
              marginLeft: 10,
            }}>
            {item}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 10,
        borderColor: '#F6F6F6',
        paddingBottom: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          alignSelf: 'center',
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#113551'}}>
          Seller Comments
        </Text>
        <TouchableOpacity>
          <Text style={{fontSize: 12, fontWeight: '500', color: '#F8B50E'}}>
            Show less
          </Text>
        </TouchableOpacity>
      </View>

      <InspectionView item={comments} index={1} />
      {/* <FlatList
            // showsVerticalScrollIndicator={false}
            data={InspectionData}
            renderItem={({ item, index }) => (
              <InspectionView item={item} index={index} />
            )}
          /> */}
    </View>
  );
};

export default SellerCommit;

const styles = StyleSheet.create({});
