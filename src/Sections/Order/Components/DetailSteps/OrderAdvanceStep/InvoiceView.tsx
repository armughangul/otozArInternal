import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../../../utilis/AppColors'
import { AppStyle, font, FontWeight } from '../../../../../utilis/AppStyle'
import SmallBtn from '../../Btn/SmallBtn'
import { AppImages } from '../../../../../utilis/AppConstant'
interface Props {
    onDownload : ()=>void,
    onPrint : ()=>void
}
const InvoiceView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.innerView
        }}
        >
      <Text
            style = {{
                ...style.titleStyle
            }}
            >
                Invoice
            </Text>
            <View
            style = {{
                ...style.docView
            }}
            >
                <View
                >
                    <SmallBtn
                    onPress={()=>props.onPrint()}
                    title='Print'
                    />
                     <SmallBtn
                     onPress={()=>props.onDownload()}
                     style = {{...style.btnMargin}}
                    title='Download'
                    />
                </View>
                <Image
                source={AppImages.Common.dummyPdf}
                style = {{
                    ...style.pdfDummyImg
                }}
                />
            </View>
        </View>
        <View
        style = {{
            ...style.borderView
        }}
        />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 74,
        marginTop : 15,
       paddingLeft : 5,

    },
    innerView : {
        flex : 1,
        justifyContent : "space-between",
        flexDirection : "row"
    },
       borderView : {
              height : 0.6,
              backgroundColor : AppColors.seperatorColor
          },
            titleStyle : {
                  ...font(12,FontWeight.Medium)
              },
              docView : {
                flexDirection : "row",
                alignItems : "center"
                
              },
              pdfDummyImg : {
                height : 64,
                resizeMode : "cover",
                marginLeft : 5,
              },
              btnMargin : {
                marginTop : 10
              }
})

export default InvoiceView
