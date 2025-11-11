import React, {useState} from 'react';
import {View, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
  images: any[];
}

const ImageSlider = ({images}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideIndex = Math.ceil(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {images?.map((item, index) => (
          <View style={{marginTop: 10}}>
            <Image
              key={index}
              source={{uri: item?.image}}
              style={styles.image}
              resizeMode={'cover'}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height: 300, // Adjust height as needed
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
  },
});

export default ImageSlider;
