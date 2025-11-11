import React, { useEffect, useMemo, useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';
import { Colors, white } from '../utilis/Colors';

interface Props {
  horizontalList?: boolean;
  numCols?: number;
  onSelectBrand?(item: any): void | undefined;
  selected?: any;
}

// ✅ Move & memoize item component outside
const CategoryItem = React.memo(({ item, onPress, selectedId }: { item: any, onPress: (item: any) => void, selectedId: any }) => (
  <TouchableOpacity
    onPress={() => onPress(item)}
    style={{
      height: 82,
      width: 82,
      margin: 2,
      alignItems: 'center',
      alignSelf: 'center',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: selectedId === item.id ? Colors.ai_yellow_500 : '#C3C3C3',
      marginRight: 8,
      backgroundColor: selectedId === item.id ? Colors.ai_yellow_10 : white,
      justifyContent: 'center',
    }}>
    <Image
      resizeMode='contain'
      source={{ uri: `https://otoz.ai/otozai-v2/uploads/${item?.logo}` }}
      style={{ width: 58, height: 30 }}
    />
    <Text
      style={{
        color: Colors.ai_gray_900,
        textAlign: 'center',
        fontSize: 9,
        fontWeight: '600',
        marginTop: 8,
        textTransform: 'uppercase'
      }}>
      {item.name_en}
    </Text>
  </TouchableOpacity>
));

const BrowesByCategory = ({
  horizontalList = true,
  numCols = 1,
  onSelectBrand,
  selected,
}: Props) => {
  const { makers, isLoading } = useSelector((state: any) => state.bodiesMakers);
  const { ip } = useSelector((state: any) => state.user);
  const navigation = useNavigation<any>();
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);

  // ✅ Filtered makers memoized
  const filteredMakers = useMemo(() =>
    makers?.filter((maker: any) => maker.cars_count > 0),
    [makers]
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      setIndeterminate(false);
      interval = setInterval(() => {
        setProgress(prev => Math.min(1, prev + Math.random() / 5));
      }, 500);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handlePress = useCallback((item: any) => {
    if (onSelectBrand) onSelectBrand(item);
    navigation.navigate('Explore', {
      filters: `?q[maker_id_eq]=${item?.id || ''}&ip=${ip}&q[status_eq]=1`,
    });
  }, [navigation, ip, onSelectBrand]);

  return (
    <View style={{ width: '100%', marginTop: horizontalList ? 20 : 0 }}>
      {isLoading && (
        <Progress.Bar
          style={styles.progress}
          progress={progress}
          indeterminate={indeterminate}
        />
      )}
      <FlatList
        data={filteredMakers}
        horizontal={horizontalList}
        numColumns={horizontalList ? undefined : numCols}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={handlePress}
            selectedId={selected?.id}
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
};

export default BrowesByCategory;

const styles = StyleSheet.create({
  progress: {
    margin: 10,
    width: '100%',
    alignSelf: 'center',
  },
});
