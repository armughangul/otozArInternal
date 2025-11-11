import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStyle, font, FontWeight} from '../../../../../utilis/AppStyle';
import {AppColors} from '../../../../../utilis/AppColors';
import {AppImages} from '../../../../../utilis/AppConstant';
import SmallBtn from '../../Btn/SmallBtn';
interface Props {
  title: string;
  hideBorder?: boolean;
  txtStyle?: StyleProp<TextStyle>;
  isDisable: boolean;
  onDownload?: () => void;
  onView?: () => void;
}
const SingleDocumentView = (props: Props) => {
  return (
    <View>
      <View
        style={{
          ...style.mainView,
        }}>
        <Text
          style={{
            ...style.titleStyle,
          }}>
          {props.title}
        </Text>
        <View
          style={[
            {
              ...AppStyle.commonHoriStyle,
            },
            props.isDisable && style.disableView,
          ]}>
          <TouchableOpacity
            onPress={() => {
              if (!props.isDisable) {
              props.onView &&  props.onView();
              }
            }}>
            <Image
              style={{
                ...style.pdfStyle,
              }}
              source={AppImages.Order.pdfPlaceHolder}
            />
          </TouchableOpacity>
          <SmallBtn
            onPress={() => {
              if (!props.isDisable) {
              props.onDownload &&  props.onDownload();
              }
            }}
            title="Download"
          />
        </View>
      </View>
      {!props.hideBorder && (
        <View
          style={{
            ...style.borderView,
          }}
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  titleStyle: {
    ...font(12, FontWeight.Medium),
  },
  valueStyle: {
    ...font(12),
    color: AppColors.darkLight,
  },
  borderView: {
    height: 0.6,
    backgroundColor: AppColors.seperatorColor,
  },
  pdfStyle: {
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  disableView: {
    opacity: 0.5,
  },
});
export default SingleDocumentView;
