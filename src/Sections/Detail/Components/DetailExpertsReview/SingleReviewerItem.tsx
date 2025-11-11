import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppImages } from '../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import { dummyReview } from '../../../../utilis/AppStrings'

const SingleReviewerItem = () => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.reviewView
        }}
        >
            <Image
            style = {style.reviewerImg}
            source={AppImages.dummy.dummyReviewImg}
            />
            <View
            style = {{
                ...style.reviewerDetailView
            }}
            >
                <Text
                style = {{
                    ...style.reviewerName
                }}
                >
                    Masahiro Suzuki
                </Text>
                   <Text
                style = {{
                    ...font(12)
                }}
                >
                AIS Certification Level 3 for 4-wheel vehicles
                </Text>
            </View>
        </View>
        <Text
        style = {{
            ...style.descTxt
        }}
        >
            {dummyReview}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
    },
    reviewView : {
        flexDirection : "row",
        alignItems : "center",
    },
    reviewerImg : {
        height : 40,
        width : 40,
    },
    reviewerName : {
        ...font(14,FontWeight.SemiBold),
        marginBottom :3
    },
    reviewerDetailView : {
        marginLeft : 8
    },
    descTxt : {
        ...font(12,FontWeight.Light),
        marginTop : 8
    }
})
export default SingleReviewerItem
