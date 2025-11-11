import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import OtozBackground from '../../components/Backgrounds/OtozBackground';
import InquiryBidItem from '../../components/ListItems/InquiryBidItem';
import Select from '../../components/Select';
import Separator from '../../components/Separator';
import TopHeader from '../../components/TopHeader';
import UserInfo from '../../components/User/UserInfo';
import {Colors} from '../../utilis/Colors';
import Loader from '../../components/Loaders/Loader';

export default function MyBids() {
  const {trendingCars} = useSelector((state: any) => state.cars);
  const {loading} = useSelector((state: any) => state.user);

  return (
    <OtozBackground>
      <TopHeader title={'My Inquiries'} />
      <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
      <Loader visible={loading} />
        <UserInfo
          // user={{
          //   name: user ? user.name : 'Akimitsu',
          //   subs_type: 'INDIVIDUAL',
          //   img: user.image ? user?.image :'https://fastly.picsum.photos/id/530/200/300.jpg?hmac=pl2pzOmYOiMa6E_Ddf_SFQVGjDvmZ1xgj-JznVHuUsg',
          //   subscriptions: 'Free',
          // }}
        />
        <Separator />
        <Text
          style={{fontSize: 20, fontWeight: '600', color: Colors.ai_gray_900}}>
          My Inquiries
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 12,
            maxWidth: '100%',
          }}>
          <Select
            title="Body Types:"
            items={[]}
            onValueChange={value => console.log('')}
          />
          <Select
            title="Year:"
            items={[]}
            onValueChange={value => console.log('')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 2,
          }}>
          <Select
            title="Body Types:"
            items={[]}
            onValueChange={value => console.log('')}
          />
          <Select
            title="Year:"
            items={[]}
            onValueChange={value => console.log('')}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={trendingCars}
          renderItem={({item, index}) => <InquiryBidItem item={item} />}
        />
      </View>
    </OtozBackground>
  );
}
