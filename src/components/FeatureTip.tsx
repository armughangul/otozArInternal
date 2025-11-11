import {View, Image, Text} from 'react-native';

interface Props {
  enabled: boolean;
  text: string;
}

export default function FeatureTip({enabled, text}: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 6,
        paddingVertical: 5,
        backgroundColor: '#EBEDFE',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
      }}>
      {enabled ? (
        <Image
          source={require('../assets/icons/feature.png')}
          resizeMode="contain"
          style={{width: 15, height: 16}}></Image>
      ) : (
        <></>
      )}
      <Text
        style={{
          fontSize: 12,
          color: '#006DB7',
          fontWeight: '400',
          marginLeft: 5,
        }}>
        {text}
      </Text>
    </View>
  );
}
