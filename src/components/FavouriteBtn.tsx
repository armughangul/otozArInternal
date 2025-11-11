import React from 'react';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const FavouriteBtn = ({isFavorite, onToggle, disabled = false, style}: FavoriteButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={()=>onToggle()}
      style={[
        styles.favoriteButton,
        {backgroundColor: 'rgba(255, 255, 255, 0.9)'},
        style,
      ]}>
      <Image
        resizeMode="contain"
        source={
          isFavorite
            ? require('../assets/icons/liked2.png')
            : require('../assets/icons/like2.png')
        }
        style={styles.favoriteIcon}
      />
    </TouchableOpacity>
  );
};

export default FavouriteBtn;

const styles = StyleSheet.create({
  favoriteButton: {
    width: 24,
    height: 24,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    width: 18,
    height: 18,
  },
});
