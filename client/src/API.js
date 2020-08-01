const API_URL = 'http://localhost:4000';

const listLogEntries = async () => {
	const response = await fetch(`${API_URL}/api/logs`);
	return response.json();
};

export default listLogEntries;
