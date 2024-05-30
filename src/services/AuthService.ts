export default class AuthService {
    static async login(email: string, password: string) {
        try {
            const requestBody = JSON.stringify({
                email: email,
                password: password
            });
            console.log('Login request body:', requestBody); // Выводим JSON тело запроса в терминал
            const response = await fetch('http://192.168.43.242:8080/api/travelers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }
    }

    static async register(login: string, name: string, password: string) {
        try {
            const requestBody = JSON.stringify({
                login: login,
                password: password,
                name: name
            });
            console.log('Register request body:', requestBody); // Выводим JSON тело запроса в терминал
            const response = await fetch('http://192.168.43.242:8080/api/travelers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }
    }
}
