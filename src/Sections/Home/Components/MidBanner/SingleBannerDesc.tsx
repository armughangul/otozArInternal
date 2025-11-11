import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, FontWeight} from '../../../../utilis/AppStyle';
interface Props {
  type: number;
}
const SingleBannerDesc = (props: Props) => {
  const txt1 = () => {
    return (
      <Text
        style={{
          ...style.mainTxtStyle,
        }}>
        Effortlessly discover perfect vehicle tailored to your needs with our
        advanced
        <Text
          style={{
            ...style.boldStyle,
          }}>
          {` `}AI-Powered matching{` `}
        </Text>
        system.
      </Text>
    );
  };
  const txt2 = () => {
    return (
      <Text
        style={{
          ...style.mainTxtStyle,
        }}>
        Experience intelligent bidding with our
        <Text
          style={{
            ...style.boldStyle,
          }}>
          {` `}AI-Powered auction{` `}
        </Text>
        system. Access premium used cars from Japan, tailored to your needs.
      </Text>
    );
  };
  const txt3 = () => {
       return (
      <Text
        style={{
          ...style.mainTxtStyle,
        }}>
            Trusted Japanese auctions at your fingertips. Discover quality cars, track bids, and secure your next vehicle from Japan
      </Text>
    );
  };
  return <View>{props.type == 0 ? txt1() : props.type == 2 ? txt2() : txt3()}</View>;
};
const style = StyleSheet.create({
  mainTxtStyle: {
    ...font(12, FontWeight.Light),
  },
  boldStyle: {
    ...font(12, FontWeight.SemiBold),
  },
});

export default SingleBannerDesc;
