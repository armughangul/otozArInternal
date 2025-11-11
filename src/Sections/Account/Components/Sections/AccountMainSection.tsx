import { FlatList, View } from 'react-native'
import { AppStyle } from '../../../../utilis/AppStyle'
import { accountSectionList } from '../../../../utilis/AppStrings'
import SectionListView from './SectionListView'
import { FlashList } from '@shopify/flash-list'
import { AccountManagerType } from '../../Manager/AccountManager'
interface Props {
  manager : AccountManagerType
}
const AccountMainSection = (props : Props) => {
  return (
    <View
    style = {{
        ...AppStyle.mainView,
    }}
    >
        <FlashList
        contentContainerStyle = {{
          paddingBottom : 120
        }}
        showsVerticalScrollIndicator = {false}
        data={accountSectionList}
        keyExtractor={(item,index)=>`${index}`}
        renderItem={({item,index})=>{
            return(
                <SectionListView
                index={index}
                section={item}
                manager={props.manager}
                />
            )
        }}
        />
    </View>
  )
}

export default AccountMainSection
