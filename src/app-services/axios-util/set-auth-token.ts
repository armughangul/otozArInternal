import axiosService from "./axios-services";


const setAuthToken = (token: string | undefined) => {
	//  console.log('Set auth token', token);
	if (token) {
		// console.log('token settoken')
		axiosService.defaults.headers.common["Content-Type"]='application/json'
		axiosService.defaults.headers.common.authorization=token
		axiosService.defaults.headers.common.auth_token = 'fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG'
	} else {
		delete axiosService.defaults.headers.common["authorization"]
		delete axiosService.defaults.headers.common.Authorization;
	}
};


export default setAuthToken;
