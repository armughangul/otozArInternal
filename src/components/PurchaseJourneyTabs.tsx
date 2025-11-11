import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, orange, white} from '../utilis/Colors';

interface PurchaseJourneyTabsProps {
  setActiveTab: (tab: string) => void;
  disabledTabs?: {
    Consignee?: boolean;
    Balance?: boolean;
    Document?: boolean;
    Recived?: boolean;
  };
}

const PurchaseJourneyTabs = ({setActiveTab, disabledTabs = {}}: PurchaseJourneyTabsProps) => {
  const [inquiry, setInquiry] = useState(true);
  const [advance, setAdvance] = useState(true);
  const [consigneee, setConsignee] = useState(false);
  const [balance, setBalance] = useState(false);
  const [document, setDocument] = useState(false);
  const [recived, setRecived] = useState(false);
  const [conect1, setConect1] = useState(false);
  const [conect2, setConect2] = useState(false);
  const [conect3, setConect3] = useState(false);
  const [conect4, setConect4] = useState(false);
  const [conect5, setConect5] = useState(false);

  const handleTabPress = (tabName: string, handler: () => void) => {
    if (
      (tabName === 'Consignee' && disabledTabs.Consignee) ||
      (tabName === 'Balance' && disabledTabs.Balance) ||
      (tabName === 'Document' && disabledTabs.Document) ||
      (tabName === 'Recived' && disabledTabs.Recived)
    ) {
      return; // Don't allow navigation to disabled tabs
    }
    handler();
  };

  const handleInquiry = () => {
    setInquiry(true);
    setAdvance(false);
    setBalance(false);
    setDocument(false);
    setRecived(false);
    setConect1(false);
    setConect2(false);
    setConect3(false);
    setConect4(false);
    setConect5(false);
    setConsignee(false);
    setActiveTab('Inquiry');
  };

  const handleAdvance = () => {
    setInquiry(true);
    setAdvance(true);
    setConsignee(false);
    setBalance(false);
    setDocument(false);
    setRecived(false);
    setConect1(true);
    setConect2(false);
    setConect3(false);
    setConect4(false);
    setConect5(false);
    setActiveTab('Advance');
  };

  const handleConsignee = () => {
    setInquiry(true);
    setAdvance(true);
    setBalance(false);
    setDocument(false);
    setRecived(false);
    setConect1(true);
    setConect2(true);
    setConect3(false);
    setConect4(false);
    setConsignee(true);
    setConect5(false);
    setActiveTab('Consignee');
  };

  const handleBalance = () => {
    setInquiry(true);
    setAdvance(true);
    setBalance(true);
    setConect2(true);
    setConect1(true);
    setConsignee(true);
    setDocument(false);
    setRecived(false);
    setConect3(false);
    setConect4(false);
    setConect5(true);
    setActiveTab('Balance');
  };

  const handleDocument = () => {
    setInquiry(true);
    setAdvance(true);
    setBalance(true);
    setConsignee(true);
    setDocument(true);
    setConect2(true);
    setConect1(true);
    setConect3(true);
    setRecived(false);
    setConect4(false);
    setConect5(true);
    setActiveTab('Document');
  };

  const handleRecived = () => {
    setInquiry(true);
    setAdvance(true);
    setBalance(true);
    setDocument(true);
    setRecived(true);
    setConect1(true);
    setConect2(true);
    setConect3(true);
    setConect4(true);
    setConect5(true);
    setConsignee(true);
    setActiveTab('Recived');
  };

  return (
    <View style={styles.container}>
      {/* Inquiry Tab */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => handleTabPress('Inquiry', handleInquiry)}
            style={[
              styles.tab,
              inquiry && styles.activeTab,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/step-1.png')}
              style={{
                width: 18,
                height: 18,
                tintColor: inquiry ? orange : 'darkgray',
              }}
            />
          </TouchableOpacity>
          <Text style={[styles.tabLabel, inquiry && styles.activeTabLabel]}>
            Initial Inquiry
          </Text>
        </View>
      </View>

      <View style={[styles.connector, conect1 && styles.activeContector]} />

      {/* Advance Payment Tab */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => handleTabPress('Advance', handleAdvance)}
            style={[
              styles.tab,
              advance && styles.activeTab,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/step-2.png')}
              style={{
                width: 18,
                height: 18,
                tintColor: advance ? orange : 'darkgray',
              }}
            />
          </TouchableOpacity>
          <Text style={[styles.tabLabel, advance && styles.activeTabLabel]}>
            Advance Payment
          </Text>
        </View>
      </View>

      <View style={[styles.connector, conect2 && styles.activeContector]} />

      {/* Consignee Tab */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => handleTabPress('Consignee', handleConsignee)}
            // disabled={disabledTabs.Consignee}
            style={[
              styles.tab,
              consigneee && styles.activeTab,
              disabledTabs.Consignee && styles.disabledTab,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/step-3.png')}
              style={{
                width: 18,
                height: 18,
                tintColor: consigneee ? orange : disabledTabs.Consignee ? 'lightgray' : orange,
              }}
            />
          </TouchableOpacity>
          <Text style={[
            styles.tabLabel, 
            consigneee && styles.activeTabLabel,
            disabledTabs.Consignee && styles.disabledText
          ]}>
            Add Consignee
          </Text>
        </View>
      </View>
      <View style={[styles.connector, conect5 && styles.activeContector]} />

      {/* Balance Payment Tab */}
      <View style={styles.tabContainer}>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => handleTabPress('Balance', handleBalance)}
          disabled={disabledTabs.Balance}
          style={[
            styles.tab,
            balance && styles.activeTab,
            disabledTabs.Balance && styles.disabledTab,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/step-4.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: balance ? orange : disabledTabs.Balance ? 'lightgray' : orange,
            }}
          />
        </TouchableOpacity>
     
        <Text style={[
          styles.tabLabel, 
          balance && styles.activeTabLabel,
          disabledTabs.Balance && styles.disabledText
        ]}>
          Balance Payment
        </Text>
        </View>
      </View>

      <View style={[styles.connector, conect3 && styles.activeContector]} />

      {/* Documents Tab */}
      <View style={styles.tabContainer}>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => handleTabPress('Document', handleDocument)}
          disabled={disabledTabs.Document}
          style={[
            styles.tab,
            document && styles.activeTab,
            disabledTabs.Document && styles.disabledTab,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/step-5.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: document ? orange : disabledTabs.Document ? 'lightgray' : orange,
            }}
          />
        </TouchableOpacity>

        <Text style={[
          styles.tabLabel, 
          document && styles.activeTabLabel,
          disabledTabs.Document && styles.disabledText
        ]}>
          Documents
        </Text>
        </View>
      </View>

      <View style={[styles.connector, conect4 && styles.activeContector]} />

      {/* Car Received Tab */}
      <View style={styles.tabContainer}>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => handleTabPress('Recived', handleRecived)}
          disabled={disabledTabs.Recived}
          style={[
            styles.tab,
            recived && styles.activeTab,
            disabledTabs.Recived && styles.disabledTab,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/step-6.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: recived ? orange : disabledTabs.Recived ? 'lightgray' : 'darkgray',
            }}
          />
        </TouchableOpacity>

        <Text style={[
          styles.tabLabel, 
          recived && styles.activeTabLabel,
          disabledTabs.Recived && styles.disabledText
        ]}>
          Car{'  '}Received 
        </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tab: {
    width: 28,
    height: 28,
    borderRadius: 17,
    backgroundColor: white,
    borderColor: orange,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
    marginBottom: 10,
  },
  activeTab: {
    backgroundColor: white,
    borderColor: orange,
    fontWeight: '800',
    fontSize: 8,
    textAlign: 'center',
  },
  disabledTab: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
  },
  tabLabel: {
    color: Colors.ai_gray_900,
    fontWeight: '800',
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 5,
    width: 58,
  },
  activeTabLabel: {
    color: Colors.ai_cyan_200,
    fontWeight: '800',
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 5,
    width: 58,
  },
  disabledText: {
    color: '#cccccc',
  },
  connector: {
    flex: 1,
    height: 5,
    marginBottom: 30,
    backgroundColor: '#00000029',
    // width:'100%'
  },
  activeContector: {
    width: 25,
    height: 5,
    marginBottom: 30,
    backgroundColor: orange,
  },
  tabs: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    // backgroundColor:'red',
  },
});

export default PurchaseJourneyTabs;
