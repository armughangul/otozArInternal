import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  Modal,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import TopAppSafeArea from "../AppSafeArea/TopAppSafeArea";
import { AppColors } from "../../utilis/AppColors";
import { AppHorizontalMargin, AppImages } from "../../utilis/AppConstant";
import ImageViewer from "react-native-image-zoom-viewer";

const ImageViewModal = ({ onClose, imagesList, initialIndex } : any) => {
    console.log("view render",initialIndex)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
      <View
        style={{
            ...ImageViewModalStyle.absoluteView
        }}
      >
        <TopAppSafeArea/>
        <View style={ImageViewModalStyle.container}>
            <ImageViewer
            renderHeader={()=>{
              return (
                <View
                style = {{
                  height : 30,
                  marginHorizontal : AppHorizontalMargin
                }}
                >
                <TouchableWithoutFeedback
                onPress={()=>onClose()}
                >
                <Image
                  source={AppImages.Common.backBtn}
                  style = {{
                    tintColor : "white",
                    height : 40,
                    width : 40,
                    resizeMode : "contain"
                  }}
                  />
                </TouchableWithoutFeedback>
                  </View>
              )
            }}
              imageUrls={imagesList.map((item : string)=> ({url : item}))}
              index={initialIndex}
              loadingRender={() => {
                return (
                  <View style={ImageViewModalStyle.indicatorCont}>
                    <ActivityIndicator
                      size={"large"}
                      color={AppColors.white(1)}
                    />
                  </View>
                );
              }}
            />
        </View>
      </View>
    // </Modal>
  );
};

export const ImageViewModalStyle = StyleSheet.create({
    absoluteView : {
        position : "absolute",
        top : 0,bottom : 0,left : 0,right : 0,
        zIndex : 9,
        elevation : 6,
        backgroundColor : AppColors.black(1)
    },
  mainView: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: AppColors.black(1),
  },
  backButton: {
    marginLeft: 20,
    height: 20,
    width: 20,
    marginBottom: 10,
    resizeMode: "contain",
    tintColor: "white",
    alignItems: "center",
  },
  indicatorCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
export default ImageViewModal;
