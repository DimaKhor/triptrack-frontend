export default function validate(email: string, password: string) {

    let errors = {
        password: '',
        email: ''
    };

    if (!email) {
        errors.email = "Введите почту";
    }
    if (!password) {
        errors.password = "Введите пароль.";
    }
    return errors;
}