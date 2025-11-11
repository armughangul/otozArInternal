import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors, white } from '../utilis/Colors';

const TopTabs = () => {
    const navigation = useNavigation<any>();
    return (
        <View
            style={{
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // marginBottom: 10,
                borderTopWidth: 1,
                borderColor: '#FFFFFF80',
                borderBottomWidth:0,
                backgroundColor: Colors.ai_primary,
                paddingHorizontal:10,
                marginTop:10
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('UsedCars')}>
                <Text style={styles.text}>
                    Used Cars
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Howitworks')}>
                <Text style={styles.text}>
                    How to Buy
                </Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text style={styles.text}>
                    Services
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                <Text style={styles.text}>
                    About Us
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TopTabs;

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: white,
        paddingVertical: 15,
    }
});
