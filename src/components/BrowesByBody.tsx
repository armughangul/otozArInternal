import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Colors, white} from '../utilis/Colors';
import {useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

interface Props {
  horizontalList?: boolean;
  numCols?: number;
  onSelectBrand?(item: any): void | undefined;
  selected?: any;
}
const BrowesByBody = ({
  horizontalList = true,
  numCols = 1,
  onSelectBrand,
  selected,
}: Props) => {
  const navigation = useNavigation<any>();
  const [progress, setProgress] = React.useState(0);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [selectedBody, setSelectedBody] = useState<any>('');
  const {ip} = useSelector((state: any) => state.user);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      setIndeterminate(false);
      interval = setInterval(() => {
        setProgress(prevProgress =>
          Math.min(1, prevProgress + Math.random() / 5),
        );
      }, 500);
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  const {bodies, isLoading} = useSelector((state: any) => state.bodiesMakers);

  const handlePress = (item: any) => {
    // console.log('first', item)
    setSelectedBody(item);
    if (onSelectBrand) {
      onSelectBrand(item);
    }
    handleClick(item);
  };
  
  const handleClick = (item: any) => {
    const bodyType = `q[type_id_eq]=${item.id ? item.id : ''}&ip=${ip}&q[status_eq]=1`;

    // console.log(bodyType,'bodyType')
    navigation.navigate('Explore', {
      filters: `?${bodyType}`,
    });
  };

  const CatogoriesView = ({item}: any) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{
        height: 82,
        width: 82,
        margin: 2,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor:
          selected?.id === item.id ? Colors.ai_yellow_500 : '#C3C3C3',
        marginRight: 8,
        backgroundColor:
          selected?.id === item.id ? Colors.ai_yellow_10 : white,
        justifyContent: 'center',
      }}>
      <Image
        resizeMode={'contain'}
        source={{
          uri: `https://otoz.ai/otozai-v2/uploads/${item?.logo}`,
        }}
        style={{width: 58, height: 30}}
      />
      <Text
        style={{
          color: Colors.ai_gray_900,
          fontSize: 10,
          fontWeight: '600',
          marginTop: 8,
          textAlign:'center',
          textTransform:'uppercase'
        }}>
        {item.name_en}
      </Text>
    </TouchableOpacity>
  );

  const MemoizedCatogoriesView = useMemo(
    () => React.memo(CatogoriesView),
    [selected],
  );
  return (
    <View style={{width: '100%', marginTop: 20}}>
      {isLoading && (
        <Progress.Bar
          style={styles.progress}
          progress={progress}
          indeterminate={indeterminate}
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bodies?.filter((item: any) => item.cars_count > 0)} 
        horizontal={horizontalList}
        numColumns={horizontalList ? undefined : numCols}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <MemoizedCatogoriesView item={item} />}
      />
    </View>
  );
};

export default BrowesByBody;

const styles = StyleSheet.create({
  progress: {
    margin: 10,
    width: '100%',
    alignSelf: 'center',
  },
});
