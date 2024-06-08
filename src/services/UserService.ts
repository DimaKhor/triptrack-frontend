import axios from 'axios';

const UserService = {
    getUserInfo: async (personalKey: string) => {
        try {
            const response = await axios.get(`http://192.168.43.242:8080/triptrack/myinfo?personal_key=${personalKey}`);
            const data = response.data;
            const loginMatch = data.match(/login:(\w+)/);
            if (loginMatch) {
                return loginMatch[1];
            }
            throw new Error("Login not found in response");
        } catch (error) {
            console.error("Error fetching user info:", error);
            throw error;
        }
    }
};

export default UserService;
