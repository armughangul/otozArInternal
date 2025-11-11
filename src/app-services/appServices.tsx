import axiosService from './axios-util/axios-services';


const login = async (body: any) => {
  // // console.log('login----->', body);
  const response = await axiosService.post(`login`, body);
  // // console.log('user------------', response);
  return response;
};

const deleteAccount = async () => {
  try {
    const response = await axiosService.delete(`users/delete_account`);
    // console.log('response.data',response.data)
    return response.data;
    
  } catch (error: any) {
    throw error.response;
  }
};

const signUp = async (body: any) => {
  // console.log('body', body);

  try {
    const response = await axiosService.post(`register`, body);
    // console.log('signup response', response.data.user);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

const confirmEmail = async (token: any) => {
  // console.log('token', token);
  try {
    const response = await axiosService.get(`confirm_email?token=${token}`);
    // // console.log('token response', response);
    return response.data;
  } catch (error: any) {
    console.log('confirmEmail', error.response);
    // Re-throw the error to be caught by the thunk
    throw error.response;
  }
};
const forgotPassword = async (body: any) => {
  // console.log('forgot', body);
  try {
    const response = await axiosService.post(`forgot_password`, body);
    // // console.log('body response', response);
    return response;
  } catch (error: any) {
    console.log('forgotPassword', error.response);
    throw error.response;
  }
};
const resetPassword = async (body: any) => {
  // console.log('body', body);
  try {
    const response = await axiosService.post(`reset_password`, body);
    // console.log('body response', response);
    return response;
  } catch (error: any) {
    console.log('resetPassword', error.response);
    throw error.response;
  }
};
const changePassword = async (body: any) => {
  // console.log('body', body);
  try {
    const response = await axiosService.post('change_password', body);
    // console.log('body response', response);
    return response.data;
  } catch (error: any) {
    console.log('changePassword', error.response);
    throw error.response;
  }
};
const getBodies = async (page: any) => {
  const response = await axiosService.get(`external/types?per_page=100`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}});

  let bodies = response.data.types.map((item: any) => ({
    label: item.name_en,
    value: item.id,
    ...item,
  }));

  let data = {types: bodies};
  return data;
};

const getMakers = async (page: any) => {
  const response = await axiosService.get(`external/makes?per_page=100`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}});
  let makers = response.data.makes.map((item: any) => ({
    label: item.name_en,
    value: item.id,
    ...item,
  }));

  let data = {makers: makers};

  return data;
};


const getModelsByMakers = async (make_id: any) => {
  // console.log(`external/models?make_id=${make_id}&per_page=100`);
  const response = await axiosService.get(
    `external/models?make_id=${make_id}&per_page=100`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}}
  );
  let models = response.data.models.map((item: any) => ({
    label: item.name_en,
    value: item.id,

    ...item,
  }));
  // console.log('getModelsByMakers',response.data)
  let data = {models: models};
  return data;
};

const getTrendingCars = async (page: any, ip:string) => {
  try {
    const response = await axiosService.get(`external/cars/trending?q[engine_size_gteq]=660&q[engine_size_lteq]=1500&q[status_eq]=1&q${ip}`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}});
    // console.log('=======', response.data.cars);
    return response.data;
  } catch (error) {
    console.log('getTrendingCarsssss',error);
  }
};
// const getTrendingCars = async (page: any, ip: string) => {
//   try {
//     const response = await axiosService.get(
//       `external/cars/trending?q[engine_size_gteq]=660&q[engine_size_lteq]=1500&q[status_eq]=1`
//     );
//     return response.data;
//   } catch (error) {
//     console.log('getTrendingCars error:', error?.response?.data || error);
//   }
// };

const getFilteredCars = async (filters: any, ip:string) => {
  // console.log('filterssssssssss', filters);
  const response = await axiosService.get(
    `external/cars${filters}&per_page=30&q[status_eq]=1`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}}
  );
  // console.log('ipppppppppppppppppp',ip)
  return response.data;
};

const getUsedCars = async (page: any, ip:string) => {
  try {
    const response = await axiosService.get(`external/cars?per_page=30&q[status_eq]=1`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}});
    // console.log('getUsedCarsssssssss', response.data.country)
    return response.data;
  } catch (error) {
    console.log('getUsedCars',error);
  }
};

const getUsed = async (filters: any, ip:string) => {
  try {
    const response = await axiosService.get(
      `external/cars?per_page=30&q[status_eq]=1&${filters}&q${ip}`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}},
    );
    // console.log('response-----',response)
    return response.data;
  } catch (error) {
    console.log('getUsedddddd',error);
  }
};


const favoriteCars = async (id: number) => {
  try {
    const response = await axiosService.post(`cars/${id}/favorite`); 
    return response.data;
  } catch (error) {
    console.error('Error favoriting car:', error);
    throw error; 
  }
};

const unFavoriteCars = async (id: number) => {
  try {
    
    const response = await axiosService.post(`cars/${id}/unfavorite`);
    return response.data;
  } catch (error) {
    console.error('Error unfavoriting car:', error);
    throw error; 
  }
};

const getFavorite = async (p0: string) => {
  try {
    const response = await axiosService.get(
      `cars/favorite_cars?per_page=30`,
    );
    // console.log('getFavoriteeeeeeeeee',response)
    return response.data;
    
  } catch (error) {
    console.log('getFavorite',error);
  }
};

const getSimilarCars = async (car_id: any, ip:string) => {
  // console.log(`external/cars/${car_id}/similar_cars`);.
  const response = await axiosService.get(
    `external/cars/${car_id}/similar_cars?ip=${ip}`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}},
  );
  // console.log('SimilarCarssssssss', response.data);
  return response.data;
};

const buyerReviews = async (id: number, body: { rating: number; message?: string }) => {
  try {
    console.log('Payload:', body);
    console.log('Endpoint:', `inquiries/${id}`);

    const response = await axiosService.put(`inquiries/${id}`,body);
    console.log('Review submitted:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting review:', error.response?.data || error.message);
    console.error('Full error:', error);
    throw error;
  }
};


const getColors = async (page: any) => {
  const response = await axiosService.get(`external/colors?per_page=50`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}});
  // console.log('Colorsssssssssssssssssss',response.data);
  let colors = response.data.colors.map((item: any) => ({
    label: item.name,
    value: item.id,
    ...item,
  }));

  let data = {colors: colors};
  return data;
};

const getFuel = async () => {
  const response = await axiosService.get(
    `external/fuel_types`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}},
  );
  console.log('fuel_typessssssss', response.data);
  return response.data;
};

const getCountries = async (page: any) => {
  const response = await axiosService.get(`external/countries?per_page=200`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}});
  let countries = response.data.countries.map((item: any) => ({
    label: item.name,
    value: item.id,
    flag: item.flag,
    country_code: item.country_code,
    phone_regex:item.phone_regex

  }));
  // console.log('countries',countries)
  return countries;
};

const getInquiries = async (page: any) => {
  try {
    const response = await axiosService.get(`inquiries`);
    const inquiries = response.data;
    // console.log('inquiriesssss', inquiries);
    return inquiries;
  } catch (error) {
    console.log('inquiries_error',error);
  }
};

const getPurchaeHistory = async (page: any) => {
  try {
    const response = await axiosService.get(`purchase_histories`);
    const purchaseHistory = response.data;
    // console.log('purchase_historiessssss', purchaseHistory);
    return purchaseHistory;
  } catch (error) {
    console.log('purchase_histories',error);
  }
};

const getPortsByCountry = async (countryId: number) => {
  // // console.log(countryId);
  const response = await axiosService.get(
    `external/ports?q[country_id_eq]=${countryId}`,{headers:{auth_token:`fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG`}}
  );
  let ports = response.data.ports.map((item: any) => ({
    label: item.name,
    value: item?.id,
    fare: item?.fare,
    ship_inspection: item?.ship_inspection,
  }));
  // // console.log('ports', ports);
  return ports;
};

const addInquiry = async (inquiry: any) => {
  const body2 = {
    inquiry: {
      car_id: inquiry?.car_id,
      name: inquiry?.name,
      email: inquiry?.email,
      contact: inquiry?.phone,
      country_id: inquiry?.country_id,
      port_id: inquiry?.port_id,
      inspection: inquiry?.inspection,
      insurance: inquiry?.insurance,
      message: inquiry?.message,
    },
  };
  // // console.log(body);
  try {
    const response = await axiosService.post(`inquiries`, body2);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
};

const updateProfile = async (body: any,isMultipart:boolean) => {
  try {
    console.log('////',isMultipart,body)
    // console.log('updateProfile----->', body);
    
    const response = await axiosService.post(`users/update`, body,{
      headers: {
        'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      }
  });
    console.log('user_updateProfile_response ------------', response.data);
  
    return response; // Only return what's needed
  } catch (error:any) {
    console.error('updateProfile error:', error);
     console.error('❌ updateProfile error:', error);

  if (error.response) {
    console.log('📦 Response Data:', error.response.data);
    console.log('📄 Status:', error.response.status);
    console.log('🧾 Headers:', error.response.headers);
  } else if (error.request) {
    console.log('📡 No response received:', error.request);
  } else {
    console.log('🧠 Error Message:', error.message);
  }

    throw error; // Allow the caller to handle the error
  }
};

const addSmartInquiry = async (body: any) => {
  const response = await axiosService.post(`smart_matchings`, body);
  return response.data;
};

const getDocument = async (body: any) => {
  try {
    console.log('API called with body:', body); 
    const response = await axiosService.post(`shippings/document_received`, body);
    return response.data;
  } catch (error) {
    console.log('document_received API error:', error); 
    throw error;
  }
};

const getCar = async (body: any) => {
  try {
    console.log('API called with getCar:', body); 
    const response = await axiosService.post(`shippings/car_received`, body);
    return response.data;
    // console.log('car_received API error:', response.data); 
  } catch (error) {
    console.log('car_received API error:', error); 
    throw error;
  }
};

// Purchase Journey API Start

const addConsignee = async (body: any) => {
  // console.log('body', body);
  try {
    const response = await axiosService.post(`inquiries/add_consignee`, body);
    console.log('addConsignee-body-response', response);
    return response.data;
  } catch (error: any) {
    console.log('er', error.response);
    throw error.response;
  }
};

const addAdvance = async (body: FormData) => {
  try {
    const response = await axiosService.post(`inquiries/add_advance`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('add_advance-body-response', response);
    return response.data;
  } catch (error: any) {
    console.log('addAdvance error:', error.response);
    throw error.response;
  }
};

const addBalance = async (body: FormData) => {
  try {
    const response = await axiosService.post(`inquiries/add_balance`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log('add_balance-body-response', response);
    return response.data;
  } catch (error: any) {
    console.log('add_balance error:', error.response);
    throw error.response;
  }
};

const documentReceived = async (body: any) => {
  try {
    const response = await axiosService.get(`shippings/document_received`, body);
    // console.log('document_received-body-response', response);
    return response.data;
  } catch (error: any) {
    console.log('er', error.response);
    throw error.response;
  }
};

const appServices = {
  getBodies,
  getMakers,
  getModelsByMakers,
  getTrendingCars,
  getFilteredCars,
  getUsedCars,
  getUsed,
  getCountries,
  getPortsByCountry,
  getInquiries,
  getPurchaeHistory,
  addInquiry,
  addSmartInquiry,
  getColors,
  getSimilarCars,
  login,
  signUp,
  confirmEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteAccount,
  addConsignee,
  buyerReviews,
  favoriteCars,
  unFavoriteCars,
  getFavorite,
  documentReceived,
  addAdvance,
  addBalance,
  getDocument,
  getCar,
  updateProfile,
  getFuel
};

export default appServices;
