import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import ProfileImageView from '../ProfileImageView'
import { AppImages, ScreenProps } from '../../../../utilis/AppConstant'
import { AppColors } from '../../../../utilis/AppColors'
import { EditProfileMangerType } from '../../Manager/EditProfileManager'
interface Props {
    manager : EditProfileMangerType,
    props : ScreenProps
}
const EditProfileTopView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.profileImageMainView
        }}
        >
            <ProfileImageView
            url={props.manager.userImage}
            mainStyle = {
                style.imageView
            }
            />
            <TouchableWithoutFeedback
            onPress={()=>props.manager.showImagePickerOptions(props.props)}
            >
                <View
                style = {{
                    ...style.editBtn
                }}
                >
                    <Image
                    style = {{
                        ...style.editImg
                    }}
                    source={AppImages.Account.editBtn}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginTop : 20
    },
    profileImageMainView : {
        alignSelf : "center",
        height : 128,
        width : 128
    },
    imageView : {
        height : 128,
        width : 128,
        borderRadius : 64,
    },
    editBtn : {
        position : "absolute",
        bottom : 10,
        right : 10,
        height : 26,
        width : 26,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : AppColors.primary,
        borderRadius : 13
    },
    editImg : {
        height : 13,
        width : 13,
        resizeMode : "contain"
    }
})

export default EditProfileTopView
