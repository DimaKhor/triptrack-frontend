export default function validate(email: string, password: string) {

    let errors = {
        password: '',
        email: ''
    };

    if (!email) {
        errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email address is invalid";
    }
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be 8 or more characters";
    } else if (!/\d/.test(password)) {
        errors.password = "Password must contain atleast 1 number";
    } else if (!/[!@#$%&?]/g.test(password)) {
        errors.password = "Password must contain atleast 1 special character";
    } else if (!/[A-Z]/g.test(password)) {
        errors.password = "Password must contain atleast 1 capitol letter";
    }
    return errors;
}