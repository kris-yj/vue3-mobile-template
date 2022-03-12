const apiFilesMap = require.context('.', false, /\.js$/);

const api = {};

apiFilesMap.keys().forEach((key) => {
	if (key === './index.js') return;
	Object.assign(api, apiFilesMap(key).default);
});

export default api;
