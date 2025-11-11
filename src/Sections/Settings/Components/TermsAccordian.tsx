import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {forwardRef} from 'react';
import { AppColors } from '../../../utilis/AppColors';
import { font, FontWeight } from '../../../utilis/AppStyle';
import { AppImages } from '../../../utilis/AppConstant';
const TermsAccordian = ({title, content, isOpen, onPress}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Image
            resizeMode="contain"
            style={[
              styles.img,
              {transform: [{rotate: isOpen ? '180deg' : '0deg'}]}, // Rotate icon when open
            ]}
            source={AppImages.Common.up}
          />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.detailTxt}>{content}</Text>
        </View>
      )}
    </View>
  );
};

export default TermsAccordian;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderColor: AppColors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical : 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex :1,
    ...font(16,FontWeight.SemiBold),
    marginRight : 5
  },
  content: {
    padding: 10,
  },
  detailTxt: {
    ...font(14,FontWeight.Light),
    textAlign: 'justify',
  },
  img: {
    width: 15,
    height: 15,
    resizeMode : "contain",
  },
});
