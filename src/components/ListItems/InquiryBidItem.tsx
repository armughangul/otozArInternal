import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Colors, white } from '../../utilis/Colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
  item: any;
}

export default function InquiryBidItem({ item }: Props) {
  const navigation = useNavigation<any>();

  const formattedNumber = (number: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(number);
    return formatted;
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#E9E9E9',
        marginBottom: 20,
        backgroundColor: white,
        borderRadius: 12,
        
      }}>
      <View
        style={{
          width: '100%',
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}>
        <View
          style={{
            width: '100%',
            marginBottom: 20,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            
          }}>
          <View
            style={{
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12, 
              overflow: 'hidden',
              
            }}>
            <ImageBackground
              resizeMode="cover"
              source={{
                uri: item?.car?.images[0]?.thumbnail,
              }}
              style={{
                width: '100%',
                height: 252,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  width: 158,
                  height: 30,
                  backgroundColor: '#F6BB3B',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderTopLeftRadius: 5,
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/otoz-dark-logo.png')}
                  style={{ width: 60, height: 14 }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#123652',
                    marginLeft: 5,
                  }}>
                  Certified
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 14,
            color: '#2E2E2E',
            fontWeight: '500',
            marginVertical: 10,
          }}>
          {item?.car?.year}{item?.car?.month_id ? '/' : ' '}{item?.car?.month_id}{item?.car?.make_name}{' '}{item?.car?.model_name}
        </Text>
        {/* <ImageBackground
          resizeMode="contain"
          source={require('../../assets/icons/msg-count-icn.png')}
          style={{ width: 22, height: 20, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              fontSize: 12,
              color: white,
              fontWeight: '600',
              marginBottom: 3
            }}>
            {item?.unread_chat_count}
          </Text>
        </ImageBackground> */}
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          marginBottom: 15,
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>

        {/* Year & Month */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/calendar.png')}
            style={{ width: 12, height: 12, marginRight: 5 }}
          />
          <Text style={{ fontSize: 12, color: '#666666', fontWeight: '400' }}>
            {item?.car?.year}{item?.car?.month_id ? '/' : ' '}{item?.car?.month_id}
          </Text>
        </View>

        {/* Mileage */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/Mileage.png')}
            style={{ width: 12, height: 12, marginRight: 5 }}
          />
          <Text style={{ fontSize: 12, color: '#666666', fontWeight: '400' }}>
            {formattedNumber(item?.car?.mileage)} km
          </Text>
        </View>

        {/* Fuel Type */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/fuelicon.png')}
            style={{ width: 12, height: 12, marginRight: 5 }}
          />
          <Text style={{ fontSize: 12, color: '#666666', fontWeight: '400' }}>
            {item?.car?.fuel_type?.name}
          </Text>
        </View>

        {/* Engine Size */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/engine-drawer-ic.png')}
            style={{ width: 12, height: 12, marginRight: 5 }}
          />
          <Text style={{ fontSize: 12, color: '#666666', fontWeight: '400' }}>
            {formattedNumber(item?.car?.engine_size)} cc
          </Text>
        </View>

        {/* Transmission */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/transmissionicon.png')}
            style={{ width: 12, height: 12, marginRight: 5 }}
          />
          <Text style={{ fontSize: 12, color: '#666666', fontWeight: '400' }}>
            {item?.car?.transmission}
          </Text>
        </View>

      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
          paddingStart: 15
        }}>
        <TouchableOpacity
          style={{
            height: 30,
            backgroundColor: '#F6BB3B40',
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <Text style={{ color: '#2E2E2E', fontSize: 12, fontWeight: '600' }}>
            {item?.car?.type?.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 30,
            backgroundColor: '#12365226',
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            marginLeft: 10
          }}>
          <Text style={{ color: '#2E2E2E', fontSize: 12, fontWeight: '600' }}>
            Stock No. {item?.car?.id}
          </Text>
        </TouchableOpacity>
      </View>


      {/* <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: 'row',
          marginBottom: 15,
          overflow: 'scroll',
        }}>
        {item?.car?.key_less_entry > 0 && (
          <FeatureTip enabled text={'Key less entry'} />
        )}
        {item?.car?.power_steering > 0 && (
          <FeatureTip enabled text={'Power steering'} />
        )}
        {item?.car?.air_bags > 0 && <FeatureTip enabled text={'Air bags'} />}
        {item?.car?.gps > 0 && <FeatureTip enabled text={'GPs'} />}
        {item?.car?.push_start > 0 && <FeatureTip enabled text={'Push Start'} />}
        {item?.car?.parking_sensor > 0 && (
          <FeatureTip enabled text={'Parking sensor'} />
        )}
        {item?.car?.alloy_wheels > 0 && <FeatureTip enabled text={'Alloy wheels'} />}
      </ScrollView> */}
      <View
        style={{
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 15
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#CB2127',
            fontWeight: '600',
          }}>
          ${formattedNumber(item?.car?.sale_price)}
        </Text>
        {item?.regular_price - item?.sale_price > 2 && (
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.ai_gray_900,
                    fontWeight: '500',
                    textDecorationLine: 'line-through',
                  }}>
                  $ {formattedNumber(item?.car?.regular_price)}
                </Text>
              )}

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: Colors.ai_gray_900,
    marginHorizontal: 5,
    width: '80%',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: Colors.ai_gray_900,
  },
});
