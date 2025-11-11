import React from 'react'
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import { AppImages, ScreenProps } from '../../utilis/AppConstant'
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea'
import LedgerTopHeader from './Components/LedgerTopHeader'
import LedgerTopView from './Components/LedgerTopView'
import SingleLedgerItem from './Components/SingleLedgerItem'
import { FlashList } from '@shopify/flash-list'
import LedgerManager from './Manager/LedgerManager'
import EmptyLedger from './Components/EmptyLedger'

const LedgerScreen = (props : ScreenProps) => {
  const manager = LedgerManager()
  return (
       <ImageBackground
          source={AppImages.Detail.background}
          style={{
            ...style.mainView,
          }}>
          <TopAppSafeArea />
          <LedgerTopHeader
          onDownload={()=>manager.downloadPdf()}
          title='Ledger'
          onBack={()=>{
            props.navigation.goBack()
          }}
          />
          <LedgerTopView
          total={manager.ledgerAmount.current.balance}
          perCar={manager.ledgerAmount.current.balancePerCar}
          />
          <FlashList
          showsVerticalScrollIndicator = {false}
          data={manager.leaderList}
          keyExtractor={(item,index)=>`${index}`}
          renderItem={({item,index})=>{
            return <SingleLedgerItem
            manager={manager}
            ledger={item}
            isSelected = {manager.selectedIndex == index}
            onPress={()=>manager.setSelectedIndex(manager.selectedIndex == index ? -1 : index)}
            />
          }}
          ListEmptyComponent={()=><EmptyLedger
          onBrowse={()=>{
            
          }}
          title='No transactions yet'
          desc='Your ledger will display all your purchase transactions once you buy a car.'
          />}
          />
          
          </ImageBackground>
  )
}
const style = StyleSheet.create({
    mainView : {
        flex : 1
    }
})

export default LedgerScreen
