import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../../utilis/AppColors';
import {AppStyle, font, FontWeight} from '../../../../utilis/AppStyle';
import {AirbnbRating, Rating} from 'react-native-ratings';
import { ReviewModel } from '../../../../Model/ReviewModel';
import moment from 'moment';
import { dateFormater } from '../../../../utilis/AppConstant';
import { shadow } from 'react-native-paper';

interface Props {
  reviewObj: ReviewModel;
}
const SingleReview = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.topView,
        }}>
        <Rating
        startingValue={props.reviewObj.rating}
          ratingColor={AppColors.yellow}
          readonly={true}
          ratingCount={5}
          imageSize={16}
        />
        <Text
          style={{
            ...style.dateTxt,
          }}>
          {moment.utc(props.reviewObj.created_at).format(dateFormater.short)}
        </Text>
      </View>
      <Text
        style={{
          ...style.reviewerName,
          marginTop: 8,
        }}>
        {props.reviewObj.user.name}
      </Text>
      <Text
        style={{
          ...style.titleTxt,
        }}>
        {props.reviewObj.title}
      </Text>
      <Text
        style={{
          ...style.descTxt,
        }}>
              {props.reviewObj.feedback}
      </Text>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    width: 350,
    height: 140,
    paddingRight: 20,
    paddingLeft : 10,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTxt: {
    ...font(10, FontWeight.Light),
    color: AppColors.txtGreyColor,
  },
  reviewerName: {
    ...font(14, FontWeight.SemiBold),
    color: AppColors.lightPrimary,
  },
  titleTxt: {
    ...font(12, FontWeight.SemiBold),
    marginTop: 5,
  },
  descTxt: {
    ...font(10, FontWeight.Light),
    marginTop: 5,
  },
});

export default SingleReview;
