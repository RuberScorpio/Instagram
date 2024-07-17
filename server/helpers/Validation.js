const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const usernameRegex = /^[A-za-z\d]{4,10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-za-z\d/@$!%*?&]{8,30}$/;

const Validation = {

    isValidEmail(input) {
        return input.match(emailRegex)
    },
    isValidUsername(input) {
        return input.match(usernameRegex)
    },
    isValidPassword(input) {
        return input.match(passwordRegex)
    }
}

module.exports = Validation