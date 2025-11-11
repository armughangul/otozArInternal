import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Select from './Select';

const PriceCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  // const [isSelected, setSelection] = useState(false);
  const countryData = [
    {label: 'USA', value: 'USA'},
    {label: 'Canada', value: 'Canada'},
    {label: 'UK', value: 'UK'},
    {label: 'Australia', value: 'Australia'},
    // Add more countries as needed
  ];
  const portDta = [
    {label: 'Karachi', value: 'karachi'},
    {label: 'Port Qasim', value: 'Port Qasim'},
    {label: 'Gawadar Port', value: 'Gawadar Port'},
    // Add more countries as needed
  ];
  const handleCountryChange = (value: any) => {
    setSelectedCountry(value);
  };
  const handlePortChange = (value: any) => {
    setSelectedPort(value);
  };
  return (
    <View style={{backgroundColor: '#f0f2f5', padding: 20, marginVertical: 20}}>
      <Text
        style={{
          fontSize: 18,
          color: '#113551',
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 15,
        }}>
        PRICE CALCULATOR
      </Text>
      <View style={{}}>
        <Select
          title="Your Country"
          items={countryData}
          selectedValue={selectedCountry}
          onValueChange={handleCountryChange}
        />
        <Select
          title="Select Port"
          items={portDta}
          selectedValue={selectedPort}
          onValueChange={handlePortChange}
        />
      </View>
      <View style={{backgroundColor: 'white', width: '100%', padding: 20}}>
        <Text
          style={{
            fontSize: 18,
            color: '#232628',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          VEHICLE PRICE
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 15,
          }}>
          <View style={{width: 20, height: 3, backgroundColor: '#ff7500'}} />
          <Text
            style={{
              fontSize: 18,
              color: '#ff7500',
              fontWeight: 'bold',
              textAlign: 'center',
              marginHorizontal: 10,
            }}>
            ¥ 2,507,501
          </Text>
          <View style={{width: 20, height: 3, backgroundColor: '#ff7500'}} />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: '#999999',
            textAlign: 'center',
            marginHorizontal: 10,
          }}>
          Estimated payment for 72 months at 7% APR*
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#999999',
            marginVertical: 25,
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#232628',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            FREIGHT:
          </Text>
          {/* <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        /> */}
          <Text
            style={{
              fontSize: 18,
              color: '#232628',
              textAlign: 'center',
              fontWeight: '500',
            }}>
            ASK
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#232628',
              textAlign: 'center',
              fontWeight: 'bold',

              //   marginHorizontal: 10,
            }}>
            INSPECTION:
          </Text>
          {/* <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        /> */}
          <Text
            style={{
              fontSize: 18,
              color: '#232628',
              textAlign: 'center',
              fontWeight: '500',
            }}>
            N/A
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#232628',
              textAlign: 'center',
              fontWeight: 'bold',

              //   marginHorizontal: 10,
            }}>
            INSURANCE:
          </Text>
          {/* <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        /> */}
          <Text
            style={{
              fontSize: 18,
              color: '#232628',
              textAlign: 'center',
              fontWeight: '500',
            }}>
            ---
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 15,
          }}>
          <View style={{width: 50, height: 3, backgroundColor: '#ff7500'}} />
          <Text
            style={{
              fontSize: 22,
              color: '#ff7500',
              fontWeight: '400',
              textAlign: 'center',
              marginHorizontal: 20,
              width: 120,
              lineHeight: 30,
            }}>
            Optional services
          </Text>
          <View style={{width: 50, height: 3, backgroundColor: '#ff7500'}} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              color: '#232628',
              textAlign: 'center',
              fontWeight: 'bold',
              width: 90,
              lineHeight: 25,
            }}>
            10 LITERS OF FUEL
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#232628',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: 25,
              width: 90,
            }}>
            EXTENDED WARRANTY
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 15,
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            style={{
              width: 62,
              height: 23,
              backgroundColor: '#FF9800',
              borderRadius: 15,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              FREE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 62,
              height: 23,
              backgroundColor: '#FF9800',
              borderRadius: 15,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              FREE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PriceCalculator;

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
});
