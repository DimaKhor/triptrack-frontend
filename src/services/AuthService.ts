export default class AuthService {
    static async login(email: string, password: string) {
        try {
            const response = await fetch(`http://192.168.43.242:8080/triptrack/login?login=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: email, password: password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Ошибка при выполнении запроса');
            }

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { userKey: text };
            }
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
                travelerName: name,
                password: password,
            });
            console.log('Register request body:', requestBody);

            const response = await fetch('http://192.168.43.242:8080/triptrack/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Ошибка регистрации');
            }

            const data = await response.text();
            return data;
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }
    }



    static async logout(userKey: string) {
        try {
            const response = await fetch(`http://192.168.43.242:8080/triptrack/logout?personal_key=${encodeURIComponent(userKey)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при выходе из аккаунта');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }
    }

    static async deleteAccount(userKey: string) {
        try {
            const response = await fetch(`http://192.168.43.242:8080/triptrack/deleteaccount?personal_key=${encodeURIComponent(userKey)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении аккаунта');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }
    }
}
