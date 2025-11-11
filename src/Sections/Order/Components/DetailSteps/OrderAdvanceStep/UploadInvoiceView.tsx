import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../../../utilis/AppColors'
import {font, FontWeight } from '../../../../../utilis/AppStyle'
import SmallBtn from '../../Btn/SmallBtn'
interface Props {
  onUpload : ()=>void
}
const UploadInvoiceView = (props : Props) => {
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
                Balance Invoice
            </Text>
               <View
                >
                    <SmallBtn
                    onPress={()=>props.onUpload && props.onUpload()}
                    style = {{

                        ...style.btnStyle
                    }}
                    title='Upload Bank Receipt'
                    />
                    <Text
                    style = {{
                        ...style.descTxt
                    }}
                    >
                        (pdf,jpg & png)
                    </Text>
                </View>
        </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginTop : 15,
       paddingHorizontal : 5,
       marginBottom : 15,
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
              btnStyle : {
                width : 127,
                height : 20,
                borderRadius : 4,
                backgroundColor : AppColors.primary
              },
              descTxt : {
                ...font(10),
                marginTop : 5,
                textAlign : "center"
              }
})

export default React.memo(UploadInvoiceView)
