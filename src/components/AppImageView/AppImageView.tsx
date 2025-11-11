import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleProp,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import { Image, ImageContentFit } from 'expo-image';
import { AppColors } from '../../utilis/AppColors';

interface AppImageViewProps {
  source: any;
  style?: StyleProp<ImageStyle>;
  placeHolder?: any;
  onPress?: () => void;
  mode?: ImageContentFit; // expo-image contentFit
  tintColor?: string;
  isProfile? : boolean
}

const AppImageView = (props: AppImageViewProps) => {
  const [loading, setLoading] = useState(false);
  const setSourceFile = () => {
    return { uri: props.source };
  };
  const [src, setSource] = useState(setSourceFile());
  const [translateY,setTranslateY] = useState(0)
  useEffect(() => {
    setTranslateY(0)
    setSource(setSourceFile());
  }, [props.source]);

  return (
    <View
      style={[
        {
          overflow: 'hidden',
        },
        props?.style,
        {transform : [{
          translateY : translateY
        }]}
      ]}
    >
      <Image
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(err) => {
          setLoading(false)
          if (props.isProfile){
            setTranslateY(5)
          }
          if (props.placeHolder){
            setSource(props.placeHolder)
          }
        }}
        source={src}
        style={[style.imgStyle]}
        contentFit={props?.mode ?? 'contain'} // replaces resizeMode
        cachePolicy="memory-disk" // 👈 caching enabled
        tintColor={props?.tintColor}
        // placeholder={props?.placeHolder}
      />

      {loading && (
        <View style={style.indicatorViewStyle}>
          <ActivityIndicator size="small" color={AppColors.primary} />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  indicatorViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
});

export default AppImageView;