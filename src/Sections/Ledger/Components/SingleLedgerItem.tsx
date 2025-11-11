import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppColors} from '../../../utilis/AppColors';
import {
  AppHorizontalMargin,
  AppImages,
  dateFormater,
} from '../../../utilis/AppConstant';
import {AppStyle, font, FontWeight} from '../../../utilis/AppStyle';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {LedgerModel} from '../../../Model/LedgerModel';
import {LedgerManagerType} from '../Manager/LedgerManager';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {PriceType} from '../../../redux/Reducers/AppReducer';
import CommonManager from '../../../utilis/CommonManager';
interface Props {
  isSelected: boolean;
  onPress: () => void;
  ledger: LedgerModel;
  manager: LedgerManagerType;
}
const SingleLedgerItem = (props: Props) => {
  const selector = useSelector((state: any) => state.appReducer);
  const obj = props.manager.generateLedgerData(props.ledger);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.innerView,
        }}>
        <View
          style={{
            ...style.topDescView,
          }}>
          <View
            style={{
              ...AppStyle.mainView,
            }}>
            <Text
              style={{
                ...style.descTxt,
              }}>
              Vehicle ID :
              <Text
                style={{
                  ...font(14, FontWeight.SemiBold),
                }}>
                {` ${obj.car_id}`}
              </Text>
            </Text>
            <Text
              style={{
                ...style.descTxt,
              }}>
              Chassis :
              <Text
                style={{
                  ...font(14, FontWeight.SemiBold),
                }}>
                {` ${obj.car_name}`}
              </Text>
            </Text>
            <Text
              style={{
                ...style.descTxt,
              }}>
              Date :
              <Text
                style={{
                  ...font(14, FontWeight.SemiBold),
                }}>
                {moment(obj.date_created).format(dateFormater.short)}
              </Text>
            </Text>
          </View>
          <View
            style={{
              ...style.progressMainView,
            }}>
            <AnimatedCircularProgress
              lineCap={'round'}
              size={64}
              width={6}
              fill={obj.percentage}
              tintColor={obj.colors.dark}
              rotation={0}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor={obj.colors.light}>
              {(fill: number) => (
                <Text
                  style={{
                    ...font(12, FontWeight.Light),
                  }}>
                  {fill.toFixed(0)}%
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text
              style={{
                ...style.statusTxt,
              }}>
              Payment Status
            </Text>
          </View>
        </View>
        <View
          style={{
            ...style.borderStyle,
          }}
        />
        <View
          style={{
            ...style.bottomView,
          }}>
          <View
            style={{
              ...style.singleLeftBox,
            }}>
            <Text
              style={{
                ...style.titleStyle,
              }}>
              Car Price
            </Text>
            <Text
              style={{
                ...style.descStyle,
              }}>
                {selector.priceType == PriceType.dollar
                  ? `$${CommonManager.shared.formattedNumber(obj.car_price)}`
                  : `${
                      PriceType.yen +
                      CommonManager.shared.formattedNumber(
                        CommonManager.shared.convertDollarToYen(
                          obj.car_price ?? 0,
                        ),
                      )
                    }`}
            </Text>
          </View>
          <View
            style={{
              ...style.centerStyle,
            }}>
            <Text
              style={{
                ...style.titleStyle,
              }}>
              Balance
            </Text>
            <Text
              style={{
                ...style.balanceStyle,
              }}>
                {selector.priceType == PriceType.dollar
                  ? `$${CommonManager.shared.formattedNumber(obj.overall_balance)}`
                  : `${
                      PriceType.yen +
                      CommonManager.shared.formattedNumber(
                        CommonManager.shared.convertDollarToYen(
                          obj.overall_balance ?? 0,
                        ),
                      )
                    }`}
            </Text>
          </View>
          <View
            style={{
              ...style.singleRightBox,
            }}>
            <Text
              style={{
                ...style.titleStyle,
              }}>
              Balance Per Car
            </Text>
            <Text
              style={{
                ...style.descStyle,
              }}>
                {selector.priceType == PriceType.dollar
                  ? `$${CommonManager.shared.formattedNumber(obj.car_balance)}`
                  : `${
                      PriceType.yen +
                      CommonManager.shared.formattedNumber(
                        CommonManager.shared.convertDollarToYen(
                          obj.car_balance ?? 0,
                        ),
                      )
                    }`}

            </Text>
          </View>
        </View>
        {props.isSelected && (
          <View
            style={{
              ...style.borderStyle,
            }}
          />
        )}
        {props.isSelected && (
          <View
            style={{
              ...style.bottomPriceMainView,
            }}>
            <View
              style={{
                ...style.bottomPriceView,
              }}>
              <Text
                style={{
                  ...font(12, FontWeight.Light),
                }}>
                Car Price
              </Text>
              <Text
                style={{
                  ...font(12),
                }}>
                {selector.priceType == PriceType.dollar
                  ? `$${CommonManager.shared.formattedNumber(obj.car_price)}`
                  : `${
                      PriceType.yen +
                      CommonManager.shared.formattedNumber(
                        CommonManager.shared.convertDollarToYen(
                          obj.car_price ?? 0,
                        ),
                      )
                    }`}
              </Text>
            </View>
            <View
              style={{
                ...style.bottomPriceView,
              }}>
              <Text
                style={{
                  ...font(12, FontWeight.Light),
                }}>
            Amount Paid
              </Text>
              <Text
                style={{
                  ...font(12),
                }}>
                 {selector.priceType == PriceType.dollar
                  ? `$${CommonManager.shared.formattedNumber(obj.amount_paid)}`
                  : `${
                      PriceType.yen +
                      CommonManager.shared.formattedNumber(
                        CommonManager.shared.convertDollarToYen(
                          obj.amount_paid ?? 0,
                        ),
                      )
                    }`}
              </Text>
            </View>
            <View
              style={{
                ...style.bottomPriceView,
              }}>
              <Text
                style={{
                  ...font(12, FontWeight.Light),
                }}>
                Cumulative Amount Paid
              </Text>
              <Text
                style={{
                  ...font(12),
                }}>
                  {selector.priceType == PriceType.dollar
                  ? `$${CommonManager.shared.formattedNumber(obj.cumulative_paid)}`
                  : `${
                      PriceType.yen +
                      CommonManager.shared.formattedNumber(
                        CommonManager.shared.convertDollarToYen(
                          obj.cumulative_paid ?? 0,
                        ),
                      )
                    }`}
              </Text>
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={{
          ...style.btnView,
        }}>
        <Image
          source={
            props.isSelected ? AppImages.Account.minus : AppImages.Account.plus
          }
          style={{...style.iconImage}}
        />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: AppHorizontalMargin - 9,
    marginTop: 20,
  },
  innerView: {
    marginHorizontal: 9,
    flex: 1,
    backgroundColor: AppColors.white(0.2),
    borderWidth: 1,
    borderColor: AppColors.white(1),
    borderRadius: 6,
    paddingVertical: 10,
    paddingRight: 5,
  },
  btnView: {
    height: 21,
    width: 21,
    borderRadius: 2,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 18,
    left: 2,
  },
  iconImage: {
    resizeMode: 'contain',
  },
  topDescView: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  descTxt: {
    marginTop: 5,
    ...font(14, FontWeight.Light),
  },
  progressMainView: {
    width: 94,
    alignItems: 'center',
  },
  statusTxt: {
    ...font(12, FontWeight.Light),
    marginTop: 4,
  },
  borderStyle: {
    ...AppStyle.commonBorder,
    backgroundColor: AppColors.seperatorColor,
    marginHorizontal: 10,
    marginTop: 15,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 20,
  },
  singleLeftBox: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  singleRightBox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleStyle: {
    ...font(12),
  },
  descStyle: {
    marginTop: 5,
    ...font(14, FontWeight.SemiBold),
  },
  balanceStyle: {
    marginTop: 5,
    ...font(14, FontWeight.SemiBold),
    color: AppColors.redColor,
  },
  bottomPriceMainView: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  bottomPriceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
export default React.memo(SingleLedgerItem);
