import axios from 'axios';

const userApi = {
	fetchUserInfo: () => {
		return axios.get('/user');
	},
};

export default userApi;
