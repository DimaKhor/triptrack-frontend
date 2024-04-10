import axios from "axios";

export default class RegistrationStore {
    static async registration(email: string, login: string, password: string, password_confirm: string) {
        return await axios.post('https://localhost:8080/auth/registration', {
            email: email,
            login: login,
            password: password,
            password_confirm: password_confirm
        })
    }
}