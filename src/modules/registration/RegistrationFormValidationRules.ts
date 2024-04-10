export default function validate(email: string, login: string, password: string, password_confirm: string) {

    let errors = {
        password: '',
        email: '',
        login: '',
        password_confirm: ''
    };

    if (!email) {
        errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email address is invalid";
    }
    if (!login) {
        errors.login = "Login is required";
    }
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be 8 or more characters";
    } else if (!/\d/.test(password)) {
        errors.password = "Password must contain at least 1 number";
    } else if (!/[!@#$%&?]/g.test(password)) {
        errors.password = "Password must contain at least 1 special character";
    } else if (!/[A-Z]/g.test(password)) {
        errors.password = "Password must contain at least 1 capitol letter";
    }
    if (!password_confirm) {
        errors.password_confirm = "Please confirm your password";
    } else if (password_confirm != password) {
        errors.password_confirm = "Passwords must match"
    }
    return errors;
}