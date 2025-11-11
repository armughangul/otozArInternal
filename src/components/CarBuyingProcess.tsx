import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";

const steps = [
  {
    key: '1',
    title: "Browse inventory",
    description: "Explore our wide selection of cars online and find the perfect one for you.",
    image: require("../assets/buying1.png"),
  },
  {
    key: '2',
    title: "Payments",
    description: "We offer a variety of secure and flexible payment options to make buying your car easy and convenient.",
    image: require("../assets/payment.png"),
  },
  {
    key: '3',
    title: "Inspection & shipment",
    description: "Rest easy knowing that your car will be thoroughly inspected and carefully shipped to your location.",
    image: require("../assets/inspection.png"),
  },
  {
    key: '4',
    title: "Safe drive!",
    description: "Take ownership of your new car, drive confidently & with safety.",
    image: require("../assets/safedrive.png"),
  },
];

const CarBuyingProcess = () => {
  const renderItem = ({ item }:any) => (
    <View style={styles.stepContainer}>
      <Image
        resizeMode="contain"
        source={item.image}
        style={styles.image}
      />
      <Text style={styles.stepTitle}>{item.title}</Text>
      <Text style={styles.stepDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={{paddingBottom:105}}>
    <FlatList
      style={styles.container}
      data={steps}
      renderItem={renderItem}
      ListHeaderComponent={
        <Text style={styles.header}>Car Buying Procedure</Text>
      }
    />
    </View>
  );
};

export default CarBuyingProcess;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  },
  header: {
    fontSize: 18,
    color: "#113551",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 40,
  },
  stepContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 203,
    height: 148,
    marginVertical: 15,
  },
  stepTitle: {
    fontSize: 16,
    color: "#113551",
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "400",
    width: '80%',
    textAlign: 'center',
    marginBottom: 50,
  },
});
