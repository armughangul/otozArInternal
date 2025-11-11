import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Finanncing = () => {
  // const [loan, setLoan] = useState(true);
  const [vehiclePrice, setVehiclePrice] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [downPayment, setDownPayment] = useState('');

  const handleReset = () => {
    setVehiclePrice('');
    setInterestRate('');
    setDownPayment('');

  }
  return (
    <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
      <Text
        style={{
          fontSize: 18,
          color: '#113551',
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 20,
        }}>
        Finance Calculator
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: '#666666',
          fontWeight: '400',
          textAlign: 'center',
          width: '90%',
          alignSelf: 'center',
        }}>
        Instantly estimate your budget with our car price premium calculator
      </Text>
      {/* <View
        style={{
          backgroundColor: "#ECECEC",
          width: 153,
          height: 47,
          borderRadius: 24,
          alignSelf: "center",
          marginVertical: 20,
          flexDirection:'row',
          justifyContent:'space-between'
        }}
      >
        <TouchableOpacity
        onPress={()=>setLoan(true)}
          style={{
            width: 65,
            height: 47,
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: loan? "#F8B50E" : "#ECECEC",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#113551",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Laon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>setLoan(false)}
          style={{
            width: 90,
            height: 47,
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: loan? "#ECECEC" : "#F8B50E",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#113551",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Insurance
          </Text>
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#113551'}}>
          Vehicle Price
        </Text>
        <TouchableOpacity
        onPress={()=>handleReset()}
          style={{
            width: 70,
            height: 30,
            borderWidth: 1,
            borderColor: '#C3C3C3',
            borderRadius: 5,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 8,
          }}>
          <Image
            resizeMode="contain"
            style={{width: 11, height: 11}}
            source={require('../assets/icons/recycle.png')}
          />
          <Text style={{color: '#005A9F', fontSize: 12, fontWeight: '500'}}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', alignSelf: 'center',marginTop:10,}}>
        <Text style={{fontSize: 12, fontWeight: '700', color: '#113551'}}>
          Vehicle price (JP¥)
        </Text>
        <TextInput
        placeholder='35000'
        placeholderTextColor={'#C3C3C3'}
        keyboardType='numeric'
        value={vehiclePrice}
          onChangeText={setVehiclePrice}
        
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: '#C3C3C3',
            borderRadius: 5,
            marginTop: 10,
            paddingLeft:20,
            color:'#113551',
          }}
        />
      </View>
      <View style={{width: '100%', alignSelf: 'center',marginTop:18,}}>
        <Text style={{fontSize: 12, fontWeight: '700', color: '#113551'}}>
        Interest rate (%)
        </Text>
        <TextInput
        placeholder='3'
        placeholderTextColor={'#C3C3C3'}
        keyboardType='numeric'
        value={interestRate}
          onChangeText={setInterestRate}
        
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: '#C3C3C3',
            borderRadius: 5,
            marginTop: 10,
            paddingLeft:20,
            color:'#113551',
          }}
        />
      </View>
      <View style={{width: '100%', alignSelf: 'center', marginTop:18,}}>
        <Text style={{fontSize: 12, fontWeight: '700', color: '#113551'}}>
        Down Payment (JP¥)
        </Text>
        <TextInput
        placeholder='24'
        placeholderTextColor={'#C3C3C3'}
        keyboardType='numeric'
        value={downPayment}
          onChangeText={setDownPayment}
        
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: '#C3C3C3',
            borderRadius: 5,
            marginTop: 10,
            paddingLeft:20,
            color:'#113551',
          }}
        />
      </View>
    </View>
  );
};

export default Finanncing;

const styles = StyleSheet.create({});
