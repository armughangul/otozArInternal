import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const SimpleHeader = ({title}:any) => {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };
  return (
    <View style={[styles.container, { backgroundColor: "transparent", marginBottom:20, }]}>
      <View
        style={{
          ...styles.leftItems,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: "#fff" }}
            source={require("../assets/back.png")}
          />
        </TouchableOpacity>
        <View style={styles.titleSec}>
          <Text style={[styles.titleTxt, { color: "#fff" , textAlign:'center',}]}>{title}</Text>
        </View>
        
      </View>
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "6%",
    alignItems: "center",
    backgroundColor: "rgba(255, 193, 7, 0.2)",
    paddingTop: 40,
  },
  leftItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 25,
    height: 20,
  },
  titleSec: {
    alignSelf:'center',
    alignContent:'center',
    width:'90%',
    
  },
  titleTxt: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    color: "#313131",
    textAlign:'center',
    
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    width: "100%",
    paddingBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    borderBottomWidth: 5,
    borderColor: "#E1E4E8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchSec: {
    width: "100%",
    paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  countryCode: {
    width: "90%",
    height: 45,
    backgroundColor: "#F0F2F3",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  countinueBtn: {
    width: "100%",
    height: 48,
    backgroundColor: "rgba(21, 152, 149, 1)",
    borderRadius: 24,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  inputTxtPassword: {
    width: "80%",
    paddingLeft: 10,
    color: "#000",
  },
});
