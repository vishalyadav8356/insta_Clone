// This file contains the validation regex for the username and email fields
export const usernameRegex =/^[a-zA-Z0-9_]{3,20}$/;

// Password validation pattern
export const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation pattern
export const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;


// Function to validate username
export function validateUsername(username){

    if(!username){
        return "Username is required"
    }

    if(!usernameRegex.test(username)){
        return "3-20 chars, letters/numbers/_ only"
    }

    return ""
}

// Function to validate password
export function validateEmail(email){

    if(!email){
        return "Email is required"
    }

    if(!emailRegex.test(email)){
        return "Invalid email"
    }

    return ""
}

// Function to validate password
export function validatePassword(password){

    if(!password){
        return "Password is required"
    }

    if(password.length < 8){
        return "Password must be at least 8 chars"
    }

    if(!passwordRegex.test(password)){
        return "Need uppercase, lowercase, number & symbol"
    }

    return ""
}

// Function to get password strength
export function getPasswordStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[@$!%*?&]/.test(password)) score++;

    if(score <= 2){
        return "Weak"
    }

    if(score <= 4){
        return "Medium"
    }

    return "Strong"
}





