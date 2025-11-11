import { Dimensions, StyleSheet } from "react-native";
import { AppColors } from "./AppColors";
import { AppHorizontalMargin } from "./AppConstant";

export const AppStyle = StyleSheet.create({
  mainView : {
    flex : 1,
  },
  commonHoriStyle : {
    flexDirection : "row",
    
  },
  bottomPaddingView : {
        paddingBottom : 120
  },
  commonShadow : {
    shadowColor : AppColors.primaryOP(0.5),
    shadowOffset : {
      width : 0,
      height : -1
    },
    shadowOpacity : 1,
    shadowRadius : 1
  },
  commonBorder : {
     height: 0.5,
    backgroundColor: AppColors.primaryOP(0.25),
  },
  commonImgStyle : {
    height : "100%",
    width : "100%",
  },
  commonFlatLeftPadding : {
    paddingLeft : AppHorizontalMargin
  },
  paddingView : {
    marginHorizontal : AppHorizontalMargin,
    flex : 1
  }
})
export const { width: fullWidth, height: fullHeight } =
  Dimensions.get("window");


export const getResponsiveFont = (fontSize: any) => {
  const scale = fullWidth / 414;
  if (fullWidth > 500) {
    if (fullHeight > 1200) {
      return fontSize * 1.3;
    }
    return fontSize * 1.5;
  }
  return fontSize * scale;
};
export enum FontWeight {
  Regular = "Regular",
  Medium = "Medium",
  SemiBold = "SemiBold",
  Bold = "Bold",
  Light = "Light"
}
export const font = (fontSize: number, fontWeight: FontWeight = FontWeight.Regular) => {
  return {
    fontSize: fontSize,
    fontFamily: `Poppins-${fontWeight}`,
    color : "#111111"
  };
};
export const appShadow = (shadowColor : string = AppColors.primaryOP(0.5),shadowOffset : any = {width : 0,height : -1})=>{
  return {
    ...AppStyle.commonShadow,
    shadowColor,
    shadowOffset
  }
}