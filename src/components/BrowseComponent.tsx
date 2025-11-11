import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo} from 'react';
import {Colors} from '../utilis/Colors';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface Props {
  horizontalList?: boolean;
  numCols?: number;
  onSelectItem?(item: any): void | undefined;
  selected?: any;
  data: any[];
  isColor?: boolean;
  isText?: boolean;
  isTextOnly?: boolean;
  title?: string;
}
const BrowseComponent = ({
  horizontalList = true,
  numCols = 1,
  onSelectItem,
  selected,
  data,
  isColor = false,
  isText = false,
  isTextOnly = false,
  title,
}: Props) => {

  const {ip} = useSelector((state: any) => state.user);

  // const handleClick = (item: any) => {
  //   const maker = `q[status_eq]=1&q[maker_id_eq]=${item?.id ? item?.id : ''}`;
  //   console.log('>>>>>>>>>ippppppppp', ip);
  //   navigation.navigate('Explore', {
  //     filters: `?${maker}`,
  //   });
  // };

  
  const handleClick = (item: any) => {
    const maker = `q[maker_id_eq]=${item?.id || ''}&ip=${ip}&q[status_eq]=1`;
    console.log('User IP from Redux:', ip);
  
    navigation.navigate('Explore', {
      filters: `?${maker}&ip=${ip}&q[status_eq]=1`,
    });
  };

  const handleBodyType = (item: any) => {
    let bodyType = `q[status_eq]=1&q[type_id_eq]=${item?.id ? item?.id : ''}&ip=${ip}&q[status_eq]=1`;

    navigation.navigate('Explore', {
      filters: `?${bodyType}&ip=${ip}&q[status_eq]=1`,
    });
  };
  const handlePress = (item: any) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  // useEffect(() => {
  //   console.log('item response for make and type' ,);
  // }, []);

  const RenderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (title === '  ') {
              handleBodyType(item);
            } else if (horizontalList) {
              handlePress(item);
            } else {
              handleClick(item);
            }
          }}
          style={{
            height: isTextOnly ? 46 : 76,
            width: isTextOnly ? 150 : 76,
            margin: 2,
            alignItems: 'center',
            alignSelf: 'center',
            borderWidth: 1,
            borderRadius: 10,
            borderColor:
              selected?.id === item.id ? Colors.ai_yellow_500 : '#C3C3C3',
            marginRight: 2,
            backgroundColor:
              selected?.id === item.id ? Colors.ai_yellow_10 : 'white',
            justifyContent: 'center',
          }}>
          {isColor ? (
            <View
              style={{
                height: 14,
                width: 14,
                borderRadius: 7,
                borderColor: Colors.ai_gray_01,
                borderWidth: 1,
                backgroundColor: item?.name
                  ? item?.name.toLowerCase()
                  : 'Black',
              }}></View>
          ) : isText ? (
            <Text
              style={{
                color: Colors.ai_cyan_200,
                fontSize: 14,
                fontWeight: '600',
                
              }}>
              {item.text}
            </Text>
          ) : isTextOnly ? (
            <Text
              style={{
                color: Colors.ai_cyan_200,
                fontSize: 14,
                fontWeight: '600',
              }}>
              {item.name}
            </Text>
          ) : (
            <Image
              resizeMode={'contain'}
              source={
                item?.logo
                  ? {
                      uri: `https://otoz.ai/otozai-v2/uploads/${item?.logo}`,
                    }
                  : item.Image
              }
              style={{width: 30, height: 30}}
            />
          )}
          {isTextOnly ? null : (
            <Text
              style={{
                color: '#123652',
                fontSize: 8,
                fontWeight: '600',
                marginTop: 8,
                textAlign:'center',
                textTransform:'uppercase',
              }}>
              {item.title ? item.title : item.name}
            </Text>
          )}
        </TouchableOpacity>
      )
    // }
  };

  const MemoizedItemView = useMemo(() => React.memo(RenderItem), [selected]);
  const navigation = useNavigation<any>();
  return (
    <View style={{width: '100%'}}>
      <Text
        style={{
          marginVertical: 10,
          color: Colors.ai_cyan_200,
          fontSize: 14,
          fontWeight: '600',
        }}>
        {title}
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        horizontal={horizontalList}
        numColumns={horizontalList ? undefined : numCols}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <MemoizedItemView item={item} />}
      />
    </View>
  );
};

export default BrowseComponent;

const styles = StyleSheet.create({});
