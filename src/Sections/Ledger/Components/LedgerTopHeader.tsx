import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import BackButton from '../../../components/BackButton/BackButton'
import { AppHorizontalMargin, AppImages } from '../../../utilis/AppConstant'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'
interface Props {
    onBack : ()=>void,
    title : string,
    onDownload : ()=>void
}
const LedgerTopHeader = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.leftView
        }}
        >
        <BackButton
        onPress={()=>props.onBack()}
        />
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
            {props.title}
        </Text>
        </View>
        <TouchableWithoutFeedback
        onPress={()=>props.onDownload()}
        >
            <View
            style = {{
                ...style.pdfBtn
            }}
            >
                <Text
                style = {{
                    ...style.downloadTxt
                }}
                >
                    Download
                </Text>
                <Image
                source={AppImages.Order.pdfPlaceHolder}
                style = {{
                    ...style.pdf
                }}
                />
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 50,
        flexDirection : "row",
        alignItems : "center",
        paddingHorizontal : AppHorizontalMargin
    },
    titleStyle : {
        ...font(18,FontWeight.SemiBold),
        marginLeft : 3
    },
    leftView :{
        flex : 1,
        alignItems : "center",
        flexDirection : "row"
    },
    pdfBtn : {
        height : 32,
        backgroundColor : AppColors.purpleColor,
        borderRadius : 2,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 10
    },
    downloadTxt : {
        ...font(14),
        color : AppColors.white(1)
    },
    pdf : {
        width : 15,
        height : 16,
        resizeMode : "contain",
        marginLeft :5
    }
})

export default React.memo(LedgerTopHeader)
