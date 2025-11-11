import axiosService from "./axios-services";

const setAuthorizationToken = (token: string | undefined) => {
	//  console.log('Set Authorization token', token);
   if (token) {
	    axiosService.defaults.headers.common.session_id = `${token}`;
	   axiosService.defaults.headers.common["Content-Type"]='application/json'
	   axiosService.defaults.headers.common.auth_token = ``
   } else {
	   delete axiosService.defaults.headers.common.Authorization;
   }
};
export default setAuthorizationToken;

