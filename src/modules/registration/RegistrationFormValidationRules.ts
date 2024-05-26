export default function validate(email: string, login: string, password: string, password_confirm: string) {

    let errors = {
        password: '',
        email: '',
        login: '',
        password_confirm: ''
    };

    if (!email) {
        errors.email = "Введите адрес почты";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Адрес почты неправильный";
    }
    if (!login) {
        errors.login = "Введите имя пользователя";
    }
    if (!password) {
        errors.password = "Введите пароль";
    } else if (password.length < 8) {
        errors.password = "Пароль должен быть больше 7 символов";
    } else if (!/\d/.test(password)) {
        errors.password = "В пароле должна быть как минимум 1 цифра";
    } else if (!/[!@#$%&?]/g.test(password)) {
        errors.password = "В пароле должен быть как минимум 1 специальный символ";
    } else if (!/[A-Z]/g.test(password)) {
        errors.password = "В пароле должна быть как минимум 1 большая буква";
    }
    if (!password_confirm) {
        errors.password_confirm = "Введите пароль еще раз";
    } else if (password_confirm != password) {
        errors.password_confirm = "Пароли должны совпадать"
    }
    return errors;
}