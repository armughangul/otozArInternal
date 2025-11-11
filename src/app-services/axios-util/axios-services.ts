import { OTOZ_AI_API_URL } from "@env";
import axios from "axios";

const axiosService = axios.create({
	baseURL: `${OTOZ_AI_API_URL}/`
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 i.e. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

axiosService.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
	
		return Promise.reject(err);
	}
);
// singleton instance
export default axiosService;