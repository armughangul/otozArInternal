import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Colors} from '../utilis/Colors';

interface Props {
  title: string;
  min: number;
  max: number;
  suggestions: any[];
  minText: string;
  maxText: string;
  selected?: any;
  onRangeChange: (min: any, max: any) => void;
}
const RangeComponent = ({
  title,
  min,
  max,
  suggestions,
  minText,
  maxText,
  selected,
  onRangeChange,
}: Props) => {
  const [minValue, setMinValue] = useState(selected?.min ? selected?.min : min);
  const [maxValue, setMaxValue] = useState(selected?.max ? selected?.max : max);

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.price}>{item?.details}</Text>
    </View>
  );
  const handleRangeChange = (value: any) => {
    const [min, max] = value;
    setMinValue(min);
    setMaxValue(max);
    onRangeChange(min, max);
  };
  useEffect(()=>{
    if(selected){
    setMinValue(selected?.min);
    setMaxValue(selected?.max);
  }
  },[selected])

  const CustomSliderMarkerLeft = ({currentValue}: any) => {
    return (
      <View style={styles.node}>
        {/* <Text style={styles.text}>{currentValue}</Text> */}
      </View>
    );
  };

  const CustomSliderMarkerRight = ({currentValue}: any) => {
    return (
      <View style={styles.node}>
        {/* <Text style={styles.text}>{currentValue}</Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginVertical: 10,
          color: Colors.ai_cyan_200,
          fontSize: 14,
          fontWeight: '600',
        }}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.label}>{minText}</Text>
          <View style={styles.value}>
            <Text
              style={{
                marginVertical: 10,
                color: Colors.ai_cyan_200,
                fontSize: 14,
                fontWeight: '600',
              }}>
              {minValue}
            </Text>
          </View>
        </View>
        <MultiSlider
          isMarkersSeparated={true}
          values={[minValue, maxValue]}
          sliderLength={140}
          onValuesChange={handleRangeChange}
          min={min}
          max={max}
          step={1}
          // allowOverlap
          // snapped
          containerStyle={{
            marginTop: 20,
          }}
          selectedStyle={{
            backgroundColor: Colors.ai_yellow_500,
          }}
          customMarkerLeft={e => {
            return <CustomSliderMarkerLeft currentValue={e.currentValue} />;
          }}
          customMarkerRight={e => {
            return <CustomSliderMarkerRight currentValue={e.currentValue} />;
          }}
        />

        <View>
          <Text style={styles.label}>{maxText}</Text>
          <View style={styles.value}>
            <Text
              style={{
                marginVertical: 10,
                color: Colors.ai_cyan_200,
                fontSize: 14,
                fontWeight: '600',
              }}>
              {maxValue}
            </Text>
          </View>
        </View>
      </View>
      {suggestions.length > 0 && (
        <View style={styles.container}>
          <Text
            style={{
              marginVertical: 8,
              fontSize: 12,
              color: Colors.ai_gray_150,
            }}>
            Suggestions
          </Text>
          <FlatList
            data={suggestions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  value: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.ai_gray_150,
    marginVertical: 10,
    marginHorizontal: 2,
    color: Colors.ai_cyan_200,
    paddingVertical: 2,
    minWidth: 80,
    width: 0,
    alignItems: 'center',
  },
  slider: {
    width: 300,
    height: 40,
  },
  label: {
    fontSize: 12,
    // paddingLeft: 10,
    color: Colors.ai_gray_150,
  },
  containerNode: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A8A8A8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  node: {
    borderRadius: 10,
    height: 20,
    width: 20,
    borderWidth: 6,
    borderColor: Colors.ai_yellow_500,
    backgroundColor: 'white',
  },
  listContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    maxHeight: 100,
  },
  itemContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.ai_gray_150,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  title: {
    color: Colors.ai_gray_150,
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.ai_cyan_200,
  },
});
export default RangeComponent;
