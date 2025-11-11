import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const FilterSection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionLatest, setSelectedOptionLatest] = useState(null);
  const [modalLatest, setModalLatest] = useState(false);
  const navigation = useNavigation(); 
  const CatogoriesData = [
    {
      id: "1",
      title: "Latest",
      Image: require("../assets/icons/sort-ic.png"),
    },
    {
      id: "2",
      title: "Filters",
      Image: require("../assets/icons/filter-ic.png"),
    },
    {
      id: "3",
      title: "Price (JP¥)",
      Image: require("../assets/hyundaiimg.png"),
    },
    {
      id: "4",
      title: "Model Year",
      Image: require("../assets/audiimg.png"),
    },
  ];
  const LatestDataarray = [
    {
      id: "1",
      title: "Year (High)",
      Image: require("../assets/icons/tick.png"),
    },
    {
      id: "2",
      title: "Year (Low)",
      Image: require("../assets/icons/tick.png"),
    },
    {
      id: "3",
      title: "Price (High)",
      Image: require("../assets/icons/tick.png"),
    },
    {
      id: "4",
      title: "Price (Low)",
      Image: require("../assets/icons/tick.png"),
    },
    {
      id: "5",
      title: "Mileage (High)",
      Image: require("../assets/icons/tick.png"),
    },
    {
      id: "6",
      title: "Mileage (Low)",
      Image: require("../assets/icons/tick.png"),
    },
  ];

  const handleOpen = (item: any) => {
    if (item.id === "2") { 
      // navigation.navigate('FilterScreen'); 
    } else {
      setSelectedOption(item.id);
      setModalLatest(true);
    }
  };
  const handleOpenLatest = (item: any) => {
    setSelectedOptionLatest(item.id);
    setModalLatest(true);
    
  };
  const CatogoriesView = ({ item }:any) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: "center",
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 16,
        borderColor: "#C3C3C3",
        marginRight: 8,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: selectedOption === item.id ? "#F8B50E" : "#fff",
      }}
      onPress={() => handleOpen(item)}
    >
      <Image
        source={item.Image}
        resizeMode="contain"
        style={{
          width: 15,
          height: 10,
          tintColor: selectedOption === item.id ? "#fff" : "#000",
        }}
      />
      <Text
        style={{
          color: selectedOption === item.id ? "#fff" : "#123652",
          fontSize: 12,
          fontWeight: "600",
          marginLeft: 5,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  const LatestData = ({ item }:any) => (
    <TouchableOpacity
      style={{
        paddingVertical: 15,
        alignItems: "center",
        alignSelf: "center",
        borderBottomWidth: 1,
        width: "100%",
        borderColor: "#C3C3C3",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#fff",
      }}
      onPress={() => handleOpenLatest(item)}
    >
      <Text
        style={{
          color: "#123652",
          fontSize: 12,
          fontWeight: "600",
        }}
      >
        {item.title}
      </Text>
      {selectedOptionLatest === item.id && (
      <Image
        source={require("../assets/icons/tick.png")}
        resizeMode="contain"
        style={{
          width: 15,
          height: 10,
          marginRight: 8,
          tintColor: "#000",
        }}
      />
    )}
    </TouchableOpacity>
  );
  return (
    <View style={{ width: "100%", marginTop: 20 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={CatogoriesData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CatogoriesView item={item} />}
        keyExtractor={(item) => item.id}
      />
      {/*///////////////////////// Latest Modal Start Here /////////////////////////*/}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalLatest}
        onRequestClose={() => {
          setModalLatest(!modalLatest);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)" }}>
          <View style={styles.centeredViewlatest}>
            <View style={styles.modalViewlatest}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  // width:'100%',
                  paddingBottom: 15,
                  borderColor: "#C3C3C3",
                }}
              >
                <Text
                  style={{
                    color: "#113551",
                    fontWeight: "bold",
                    fontSize: 16,
                    // backgroundColor:"gray",
                    width: "80%",
                  }}
                >
                  Sort Result
                </Text>

                <TouchableOpacity
                  style={{ width: 20, height: 20 }}
                  onPress={() => setModalLatest(false)}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../assets/icons/close.png")}
                    style={{ width: 12, height: 12 }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  paddingVertical:15,
                  borderColor: "#C3C3C3",
                }}
              >
                <Text
                  style={{
                    color: "#113551",
                    fontWeight: "bold",
                    fontSize: 16,
                    // backgroundColor:"gray",
                    width: "80%",
                  }}
                >
                  Latest
                </Text>

                <TouchableOpacity
                  style={{ width: 20, height: 20 }}
                  onPress={() => setModalLatest(false)}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../assets/icons/tick.png")}
                    style={{ width: 12, height: 12 }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={LatestDataarray}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <LatestData item={item} />}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* /////////////////////////Latest Modal Ends Here /////////////////////////*/}
    </View>
  );
};

export default FilterSection;

const styles = StyleSheet.create({
  titleSec: {},
  titleTxt: {
    color: "#3F51B5",
    fontSize: 16,
    fontFamily: "Inter-Bold",
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
    // alignItems: 'center',
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#3F51B5",
  },
  titleSeclatest: {},
  titleTxtlatest: {
    color: "#3F51B5",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  centeredViewlatest: {
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
  modalViewlatest: {
    width: "100%",
    paddingBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    borderColor: "#E1E4E8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextlatest: {
    marginBottom: 15,
    textAlign: "center",
    color: "#3F51B5",
    marginTop: 10,
  },
});
