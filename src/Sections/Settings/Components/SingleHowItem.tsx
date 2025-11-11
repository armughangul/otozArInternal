import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SvgBackground from '../../../components/Svg/SvgBackground';
const QuickBorder = React.lazy(
  () => import('../../../assets/newImages/Account/svgs/howItWorkBorder.svg'),
);
const HowCountBorder = React.lazy(
  () => import('../../../assets/newImages/Account/svgs/howCountBorder.svg'),
);
interface Props {
  obj: any;
  count : number
}
import {font, FontWeight} from '../../../utilis/AppStyle';
import { AppColors } from '../../../utilis/AppColors';
const SingleHowItem = (props: Props) => {
  return (
    <View
    style = {{
        ...style.topView
    }}
    >
      <SvgBackground>
        <QuickBorder
          preserveAspectRatio="none"
          height={224}
        />
      </SvgBackground>
      <View
        style={{
          ...style.mainView,
        }}>
          <View
          style = {{
            ...style.topCountView
          }}
          >
            <View
            style = {{

            }}
            >
            <View
            style = {{
              ...style.countView
            }}
            >
                 <SvgBackground>
        <HowCountBorder
          preserveAspectRatio="none"
        />
      </SvgBackground>
      <Text
      style = {{
        ...style.countTxt
      }}
      >
        {props.count}
      </Text>
            </View>
                    <Text
          style={{
            ...style.titleStyle,
          }}>
          {props.obj.title}
        </Text>
        <Text
          style={{
            ...style.descStyle,
          }}>
          {props.obj.desc}
        </Text>
      </View>
       <Image
            style = {{
                ...style.iconImg
            }}
            source={props.obj.image}
            />
          </View>
         <Text
          style={{
            ...style.detailStyle,
          }}>
          {props.obj.detail}
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
    topView : {
        marginTop : 20
    },
  mainView: {
    flex: 1,
    paddingHorizontal : 10,
    height : 224
  },
  iconImg: {
    height : 122,
    resizeMode : "contain"
  },
  titleStyle: {
    ...font(18, FontWeight.SemiBold),
    marginTop: 15,
  },
  descStyle: {
    ...font(14, FontWeight.SemiBold),
    marginTop: 8,
  },
    detailStyle: {
    ...font(14, FontWeight.Light),
    marginTop: 8,
  },
  topCountView : {
    flexDirection : "row",
    justifyContent : "space-between",
    marginTop : 20
  },
  countView : {
    justifyContent : "center",
    alignItems : "center",
    height : 45,
    width : 45
  },
  countTxt : {
    ...font(18,FontWeight.SemiBold),
    color : AppColors.primary
  }
});

export default SingleHowItem;
