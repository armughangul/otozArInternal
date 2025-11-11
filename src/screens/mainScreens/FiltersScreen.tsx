import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import BrowseComponent from '../../components/BrowseComponent';
import RangeComponent from '../../components/RangeComponent';
import TopHeader from '../../components/TopHeader';
import {Colors, white} from '../../utilis/Colors';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../redux/store';
import {getColors} from '../../redux/Reducers/filtersReducers';
import OtozButton from '../../components/OtozButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';
import {RootStackParamList} from '../../../NavigationTypes';
import {getModelsByMakers} from '../../redux/Reducers/bodiesMakersReducers';
import Loader from '../../components/Loaders/Loader';
import appServices from '../../app-services/appServices';

interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}
const FiltersScreen = () => {
  const today = new Date();
  const year = today.getFullYear();
  const {colors} = useSelector((state: any) => state.filters);
  const {bodies, makers, models} = useSelector(
    (state: any) => state.bodiesMakers,
  );
  const [selectedTab, setSelectedTab] = useState('brand');
  const [selectedBrand, setSelectedBrand] = useState<any>('');
  const [modelsByBrand, setModels] = useState<any>([]);
  const [selectedModel, setSelectedModel] = useState<any>('');
  const [selectedBody, setSelectedBody] = useState<any>('');
  const [selectedYear, setSelectedYear] = useState<any>({
    min: '1985',
    max: year,
  });
  const [selectedMilage, setSelectedMilage] = useState<any>({
    min: '0',
    max: '1000000',
  });
  const [selectedBudget, setSelectedBudget] = useState<any>({
    min: '0',
    max: '1000000',
  });
  const [selectedTransmission, setSelectedTransmission] = useState<any>();
  const [selectedFuelType, setSelectedFuelType] = useState<any>();
  const [selectedEngine, setSelectedEngine] = useState<any>({
    min: '660',
    max: '6000',
  });
  const [selectedColor, setSelectedColor] = useState<any>();
  const [selectedInteriorColor, setSelectedInteriorColor] = useState<any>();
  const [selectedDoors, setSelectedDoors] = useState<any>();
  const [selectedSeats, setSelectedSeats] = useState<any>();
  const {loading} = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {ip} = useSelector((state: any) => state.user);
  const [fuelData, setFuelData] = useState<any[]>([]);

  useEffect(() => {
    if (selectedFuelType?.title?.toLowerCase() === 'electric') {
      setSelectedEngine({min: '', max: ''});
    }
  }, [selectedFuelType]);

  const handleClick = async () => {
    let params = [`q[status_eq]=1`]; // Base param

    if (selectedBrand?.id) params.push(`q[maker_id_eq]=${selectedBrand.id}`);
    if (selectedModel?.id) params.push(`q[model_id_eq]=${selectedModel.id}`);
    if (selectedBody?.id) params.push(`q[type_id_eq]=${selectedBody.id}`);

    // // Year range
    if (selectedYear?.min) params.push(`q[year_gteq]=${selectedYear.min}`);
    if (selectedYear?.max) params.push(`q[year_lteq]=${selectedYear.max}`);

    // // Budget range
    if (selectedBudget?.min)
      params.push(`q[sale_price_gteq]=${selectedBudget.min}`);
    if (selectedBudget?.max)
      params.push(`q[sale_price_lteq]=${selectedBudget.max}`);

    // // Mileage range
    if (selectedMilage?.min)
      params.push(`q[mileage_gteq]=${selectedMilage.min}`);
    if (selectedMilage?.max)
      params.push(`q[mileage_lteq]=${selectedMilage.max}`);

    // // Engine range (fixed the missing 'q' prefix)
    if (selectedEngine?.min)
      params.push(`q[engine_size_gteq]=${selectedEngine.min}`);
    if (selectedEngine?.max)
      params.push(`q[engine_size_lteq]=${selectedEngine.max}`);

    // // Other filters
    if (selectedTransmission?.id)
      params.push(`q[transmission_id_eq]=${selectedTransmission.id}`);
    if (selectedColor?.id)
      params.push(`q[exterior_color_id_eq]=${selectedColor.id}`);

    if (selectedFuelType?.id)
      params.push(`q[fuel_type_id_eq]=${parseInt(selectedFuelType.id)}`);

    const filterString = `?ip=${ip}&${params.join('&')}`;

    navigation.navigate('Explore', {
      filters: filterString,
    });
    console.log('filterString>>>>>>>>>>>>>', filterString);
  };

  const allowedFuelTypes = ['petrol', 'diesel', 'hybrid', 'electric'];

  const visibleFuelData = fuelData.filter((item: any) =>
    allowedFuelTypes.includes(item.title?.toLowerCase()?.trim()),
  );

  useEffect(() => {
    const fetchFuelTypes = async () => {
      try {
        const res = await appServices.getFuel();
        const formattedFuelTypes = res.fuel_types.map((item: any) => ({
          id: String(item.id),
          title: item.name_en || item.name, // depends on API keys
          Image: getFuelIcon(item.name_en || item.name),
        }));
        setFuelData(formattedFuelTypes);
      } catch (err) {
        console.error('Failed to fetch fuel types:', err);
      }
    };

    fetchFuelTypes();
  }, []);

  const handleClear = async () => {
    console.log('clear filters');
    setSelectedYear({min: '1985', max: year});
    setSelectedTab('');
    setSelectedBrand('');
    setModels('');
    setSelectedModel('');
    setSelectedBody('');
    setSelectedMilage({min: '0', max: '99999'});
    setSelectedBudget({min: '0', max: '99999'});
    setSelectedTransmission('');
    setSelectedFuelType('');
    setSelectedEngine({min: '660', max: '6000'});
    setSelectedColor('');
    setSelectedInteriorColor('');
    setSelectedDoors('');
    setSelectedSeats('');
  };

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const handleBrandChange = async () => {
    if (selectedBrand?.id) {
      // setPorts([]);
      // setSelectedPort('');
      // console.log(selectedBrand, '-------', selectedBrand?.id);
      let maker_id = selectedBrand?.id;
      await dispatch(getModelsByMakers({maker_id}));
    }
  };

  useEffect(() => {
    // console.log(models);
    setModels(models);
  }, [models]);

  useEffect(() => {
    handleBrandChange();
  }, [selectedBrand]);

  const transmissionData = [
    {
      id: '1',
      title: 'Automatic',
      Image: require('../../assets/filtertab_icons/automatic.png'),
    },
    {
      id: '2',
      title: 'Manual',
      Image: require('../../assets/filtertab_icons/manual.png'),
    },
  ];

  const getFuelIcon = (fuelType: string) => {
    switch (fuelType.toLowerCase()) {
      case 'petrol':
        return require('../../assets/filtertab_icons/fuel/petrol.png');
      case 'electric':
        return require('../../assets/filtertab_icons/fuel/electric.png');
      case 'hybrid':
        return require('../../assets/filtertab_icons/fuel/hybrid.png');
      case 'diesel':
        return require('../../assets/filtertab_icons/fuel/diesel.png');
      default:
        return require('../../assets/filtertab_icons/fuel/gas-station.png');
    }
  };

  useEffect(() => {
    const fuel = selectedFuelType?.title?.toLowerCase();
  
    if (fuel === 'electric') {
      setSelectedEngine({ min: '', max: '' });
    } else {
      // Only reset if empty (i.e., coming from Electric)
      if (selectedEngine.min === '' && selectedEngine.max === '') {
        setSelectedEngine({ min: '660', max: '6000' });
      }
    }
  }, [selectedFuelType]);
  

  const handleRangeChange = (min: number, max: number) => {
    let range = {min: min, max: max};
    setSelectedYear(range);
  };
  const handleMilageChange = (min: number, max: number) => {
    let range = {min: min, max: max};
    setSelectedMilage(range);
  };
  const handleBudgetChange = (min: number, max: number) => {
    let range = {min: min, max: max};
    setSelectedBudget(range);
  };
  const handleEngine = (min: number, max: number) => {
    let range = {min: min, max: max};
    // console.log('rangeeeeeeeeeeeeeeeeeeeee', range);
    setSelectedEngine(range);
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.ai_gray_900,
      }}>
      <TopHeader title={'Filters'} />
      <Loader visible={loading} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{backgroundColor: '#fff'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.rightIcons}>
            {/* {selectedTab === 'brand' && ( */}
            <BrowseComponent
              title="Make"
              horizontalList={true}
              numCols={1}
              selected={selectedBrand}
              data={makers?.filter((maker: any) => maker.cars_count > 0)}
              onSelectItem={(brand: any) => setSelectedBrand(brand)}
            />
            {selectedBrand?.id && modelsByBrand.length > 0 && (
              <BrowseComponent
                isTextOnly
                title="Models"
                horizontalList={true}
                numCols={3}
                selected={selectedModel}
                // data={modelsByBrand}
                data={modelsByBrand?.filter(
                  (models: any) => models?.cars_count !== 0,
                )}
                onSelectItem={(value: any) => setSelectedModel(value)}
              />
            )}
            {/* )} */}
            {/* {selectedTab === 'year' && ( */}
            <RangeComponent
              suggestions={[]}
              title="Year"
              min={1985}
              max={year}
              minText={'From'}
              maxText={'To'}
              selected={selectedYear}
              onRangeChange={handleRangeChange}
            />
            {/* )} */}

            {/* {selectedTab === 'budget' && ( */}
            <RangeComponent
              suggestions={[]}
              title="Price Range ($)"
              min={0}
              max={99999}
              selected={selectedBudget}
              minText={'From'}
              maxText={'To'}
              onRangeChange={handleBudgetChange}
            />
            {/* )} */}

            {/* {selectedTab === 'mileage' && ( */}
            <RangeComponent
              suggestions={[]}
              title="Mileage (km)"
              min={0}
              max={300000}
              selected={selectedMilage}
              minText={'From'}
              maxText={'To'}
              onRangeChange={handleMilageChange}
            />
            {/* )} */}
            {/* {selectedTab === 'bodyType' && ( */}
            <BrowseComponent
              title="Body Type"
              horizontalList={true}
              numCols={3}
              selected={selectedBody}
              // data={bodies}
              data={bodies?.filter((body: any) => body.cars_count > 0)}
              onSelectItem={(body: any) => setSelectedBody(body)}
            />
            {/* )} */}
            {/* {selectedTab === 'transmission' && ( */}
            <BrowseComponent
              title="Transmission"
              horizontalList={true}
              numCols={3}
              selected={selectedTransmission}
              data={transmissionData}
              onSelectItem={(transmission: any) => {
                // console.log(transmission);
                setSelectedTransmission(transmission);
              }}
            />
            {/* )} */}
            {/* {selectedTab === 'fuel' && ( */}

            <BrowseComponent
              title="Fuel Type"
              horizontalList={true}
              numCols={3}
              selected={selectedFuelType}
              data={visibleFuelData}
              onSelectItem={(value: any) => setSelectedFuelType(value)}
            />
            {/* <BrowseComponent
              title="Fuel Type"
              horizontalList={true}
              numCols={3}
              selected={selectedFuelType}
              data={fuelData}
              // data={fuelData?.filter((body: any) => body.cars_count > 0)}
              onSelectItem={(value: any) => setSelectedFuelType(value)}
            /> */}
            {/* )} */}
            {/* {selectedTab === 'engine' && ( */}
            {selectedFuelType?.title?.toLowerCase() === 'electric' && (
              <Text style={{color: 'gray', fontSize: 12, marginTop: 4}}>
                Engine size is not applicable for Electric cars.
              </Text>
            )}
            {selectedFuelType?.title?.toLowerCase() !== 'electric' && (
              <RangeComponent
                suggestions={[]}
                title="Engine Size (cc)"
                min={660}
                max={6000}
                selected={selectedEngine}
                minText={'From'}
                maxText={'To'}
                onRangeChange={handleEngine}
              />
            )}
            {/* )} */}
            {/* {selectedTab === 'color' && ( */}

            <BrowseComponent
              title="Exterior Color"
              horizontalList={true}
              numCols={4}
              selected={selectedColor}
              data={colors}
              // data={colors?.filter((body: any) => body.cars_count > 0)}
              isColor
              onSelectItem={(value: any) => setSelectedColor(value)}
            />

            <View style={{height: 250, backgroundColor: white}} />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: '100%',
          // height: 140,
          backgroundColor: 'orange',
          position: 'absolute',
          bottom: 0,
          borderTopColor: '#ECECEC',
          // borderTopWidth: 2,
        }}>
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -1},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            zIndex: 1,
          }}>
          <TouchableOpacity onPress={() => handleClear()}>
            <Text
              style={{
                color: '#006DB7',
                fontSize: 14,
                textDecorationLine: 'underline',
              }}>
              Clear
            </Text>
          </TouchableOpacity>
          <OtozButton
            onClick={() => handleClick()}
            title={'Apply Filters'}
            icon={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    marginTop: 20,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 2,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  leftTabs: {
    width: 100, // Adjust as needed
    justifyContent: 'center',
    zIndex: -1,
  },
  tabList: {
    alignItems: 'center',
  },
  tab: {
    width: 100,
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4, // Adjust spacing between tab items
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tabText: {
    fontSize: 10,
    marginTop: 1, // Adjust spacing between icon and text
    color: '#113551',
  },
  rightIcons: {
    // borderWidth: 2,
    flex: 1,
    marginLeft: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
});
export default FiltersScreen;
