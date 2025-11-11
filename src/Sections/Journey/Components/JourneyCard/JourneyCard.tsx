import React, {Suspense} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import SvgBackground from '../../../../components/Svg/SvgBackground';
import {font} from '../../../../utilis/AppStyle';
const SelectedBorder = React.lazy(
  () =>
    import('../../../../assets/newImages/Journey/svgs/selectedJourneyCard.svg'),
);
const UnselectedBorder = React.lazy(
  () =>
    import(
      '../../../../assets/newImages/Journey/svgs/unSelectedJourneyCard.svg'
    ),
);
interface Props {
  model: any;
  isSelected: boolean;
  onPress: () => void;
}
const JourneyCard = (props: Props) => {
  return (
    <Suspense>
      <TouchableWithoutFeedback onPress={() => props.onPress()}>
        <View
          style={{
            ...style.mainView,
          }}>
          <SvgBackground>
            {props.isSelected ? <SelectedBorder /> : <UnselectedBorder />}
          </SvgBackground>
          <Image
            style={{
              ...style.iconStyle,
            }}
            source={props.model.icon}
          />
          <Text
            style={{
              ...style.txtStyle,
            }}>
            {props.model.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </Suspense>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  txtStyle: {
    ...font(14),
    marginTop: 8,
    textAlign: 'center',
  },
  iconStyle: {
    height: 64,
    resizeMode: 'contain',
  },
});

export default React.memo(JourneyCard);
