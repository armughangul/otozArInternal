import React, { useRef } from "react";
import { View, TouchableWithoutFeedback, Text, Platform, StyleSheet, SafeAreaView } from "react-native";
import { CropView } from "react-native-image-crop-tools";
import { useDispatch } from "react-redux";
import { AppHorizontalMargin, ScreenProps } from "../../utilis/AppConstant";
import TopAppSafeArea from "../../components/AppSafeArea/TopAppSafeArea";
import BorderBtn from "../../components/BorderBtn/BorderBtn";
import BottomAppSafeArea from "../../components/AppSafeArea/BottomAppSafeArea";
import TopBar from "../../components/TopBar/TopBar";

const ImageCropScreen = (props : ScreenProps) => {
  const dispatch = useDispatch();
  const uri = `file://${
    props.route.params?.uri
  }`;

  var cropViewRef = useRef<any>(null);
  const handleSave = () => {
    let url = cropViewRef.current.saveImage(true, 90);
  };

  const onImageCrop = (res : any) => {
    if (res?.uri) {
      let newUri = res?.uri.includes("file://") ? res?.uri : "file://" + res?.uri
      console.log(newUri)
     props?.route?.params?.onCropImage(newUri);
     props?.navigation.goBack();
    }
  };

  return (
    <View style={ImageCropScreenStyle.container}>
        <TopAppSafeArea/>
      <TopBar
        onBack={() => {
          props.navigation.goBack();
        }}
        title={'Crop'}
      />  
      <CropView
        sourceUrl={uri}
        style={ImageCropScreenStyle.cropView}
        ref={cropViewRef}
        onImageCrop={onImageCrop}
        keepAspectRatio
        aspectRatio={ImageCropScreenStyle.cropRatio}
      />
      <BorderBtn
      btnStyle = {ImageCropScreenStyle.saveButton}
      onPress={()=>{
     handleSave()
      }}
      isSelected = {true}
      title="Save"
      />
      <BottomAppSafeArea/>
    </View>
  );
};

export default ImageCropScreen;
 const ImageCropScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    saveButton: {
        marginTop : 20,
        marginHorizontal : AppHorizontalMargin
    },
    cropView: {
      flex: 1,
    },
    cropRatio: {
      width: 1,
      height: 1,
    },
  });
  