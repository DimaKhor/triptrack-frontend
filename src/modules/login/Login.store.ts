import axios from "axios";

export default class LoginStore {
    static async login(email: string, password: string) {
        return await axios.post('https://localhost:8080/auth/login', {
            email: email,
            password: password
        })
    }
}