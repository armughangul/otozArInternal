import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ContactUsEmail = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F6F9FF",
      }}
    >
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: "15%",
            width: "90%",
            alignSelf: "center",
            alignContent: "center",
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
              style={{ width: 20, height: 20, tintColor: "#113551" }}
              source={require("../../assets/icons/arrowback.png")}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#113551",
              textAlign: "center",
              width: "90%",
            }}
          >
            Contact Us Email
          </Text>
        </View>
        <View style={{ alignSelf: "center", marginTop: 60, marginBottom: 30,}}>
          <Text
            style={{
              color: "#123652",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Write us
          </Text>
          <Text
            style={{
              color: "#666666",
              fontWeight: "600",
              fontSize: 14,
              textAlign: "center",
              width: 300,
            }}
          >
            Please fill the below contact form and we will get back to you soon.
          </Text>
        </View>

        <View
          style={{
            //   backgroundColor: "#F8B50E",
            width: "85%",
            height: 60,
            alignSelf: "center",
            borderRadius: 5,
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#C3C3C3",
            borderWidth: 1,
            paddingStart: 20,
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../assets/icons/user2.png")}
            style={{
              width: 23,
              height: 23,
              marginRight: 20,
              tintColor: "#113551",
            }}
          ></Image>
          <View
            style={{
              flexDirection: "column",
              borderLeftWidth: 1,
              borderColor: "#707070",
              paddingLeft: 18,
              height: 35,
              justifyContent: "center",
              width: "80%",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#C3C3C3",
                textAlign: "left",
              }}
            >
              User Name
            </Text>
            <TextInput
              style={{
                color: "#113551",
                fontSize: 12,
                textAlign: "left",
                fontWeight: "bold",
                width: "100%",
              }}
              placeholder="Zeeshan Hassan"
              placeholderTextColor={"#113551"}
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            //   backgroundColor: "#F8B50E",
            width: "85%",
            height: 60,
            alignSelf: "center",
            borderRadius: 5,
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#C3C3C3",
            borderWidth: 1,
            paddingStart: 20,
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../assets/icons/mail-ic.png")}
            style={{
              width: 23,
              height: 23,
              marginRight: 20,
              tintColor: "#113551",
            }}
          ></Image>
          <View
            style={{
              flexDirection: "column",
              borderLeftWidth: 1,
              borderColor: "#707070",
              paddingLeft: 18,
              height: 35,
              justifyContent: "center",
              width: "80%",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#C3C3C3",
                textAlign: "left",
              }}
            >
              Email Address
            </Text>
            <TextInput
              style={{
                color: "#113551",
                fontSize: 12,
                textAlign: "left",
                fontWeight: "bold",
                width: "100%",
              }}
              placeholder="Zeeshan@saffranlabs.com"
              placeholderTextColor={"#113551"}
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            //   backgroundColor: "#F8B50E",
            width: "85%",
            height: 60,
            alignSelf: "center",
            borderRadius: 5,
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#C3C3C3",
            borderWidth: 1,
            paddingStart: 20,
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../assets/icons/cellphone.png")}
            style={{
              width: 23,
              height: 23,
              marginRight: 20,
              tintColor: "#113551",
            }}
          ></Image>
          <View
            style={{
              flexDirection: "column",
              borderLeftWidth: 1,
              borderColor: "#707070",
              paddingLeft: 18,
              height: 35,
              justifyContent: "center",
              width: "80%",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#C3C3C3",
                textAlign: "left",
              }}
            >
              Mobile Number
            </Text>
            <TextInput
              style={{
                color: "#113551",
                fontSize: 12,
                textAlign: "left",
                fontWeight: "bold",
                width: "100%",
              }}
              placeholder="+81 **-****-****"
              placeholderTextColor={"#113551"}
              keyboardType="numeric"
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            width: "85%",
            alignSelf: "center",
            borderRadius: 5,
            marginBottom: 15,
            flexDirection: "row",
            borderColor: "#C3C3C3",
            borderWidth: 1,
            padding:10,
            height: 160,
          }}
        >
          <TextInput
            style={{
              color: "#113551",
              fontSize: 12,
              textAlign: "left",
              fontWeight: "bold",
              width: "100%",
              height:40
              
            }}
            placeholder="Enter the details......."
            placeholderTextColor={"#113551"}
            
            
          ></TextInput>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#F8B50E",
            width: "85%",
            height: 45,
            alignSelf: "center",
            
            borderRadius: 5,
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUsEmail;

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 20,
  },
});
