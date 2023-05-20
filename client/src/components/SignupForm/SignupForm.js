import React, { useState } from 'react';
import styles from './SignupForm.module.css';
import Axios from "axios";

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [isSameEmail,setIsSameEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidConfirmEmail,setIsValidConfirmEmail] = useState(true);

    const handleSignup = (e) => {
        e.preventDefault();
        // // Hash the password
        // const hashedPassword = hashPassword(password);
        // console.log('Hashed password:', hashedPassword);
        // Perform email validation
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const isValid = emailRegex.test(email);
        setIsValidEmail(isValid);

        const isValid2 = emailRegex.test(confirmEmail);
        setIsValidConfirmEmail(isValid2);

        // Do something if email is valid
        if (isValid && isValid2 && isSameEmail) {
            console.log('Email is valid');
            Axios.get(`http://localhost:3001/logins/${email}`).then((response) => {
                if (response === 0) {
                    Axios.post("http://localhost:3001/create", {
                        uname: username,
                        email: email,
                        password: password,
                    });
                }else {
                    console.log('Email already exists');
                }
            })
            
            // Perform further actions, such as submitting the form data
        }
        
    };

    return (
        <form className={styles.signupForm} onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    if (e.target.value !== confirmEmail.substring(0, e.target.value.length)) {
                        setIsSameEmail(false);
                    } else {
                        setIsSameEmail(true);
                    }
                    return setEmail(e.target.value);
                }}
            />
            {!isValidEmail && <p
                style={{
                    color: "red",
                }}
            >Please enter a valid email address.</p>}
            <input
                type="email"
                placeholder="Confirm Email"
                value={confirmEmail}
                onChange={(e) => {
                    if (e.target.value !== email.substring(0, e.target.value.length)) {
                        setIsSameEmail(false);
                    }else {
                        setIsSameEmail(true);
                    }
                    return setConfirmEmail(e.target.value);
                }}
            />
            {(!isValidConfirmEmail || !isSameEmail) && <p
                style={{
                    color: "red",
                }}
            >Please enter the same valid comfirmation email address.</p>}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={handleSignup}>Sign Up</button>
            
        </form>
    );
};

export default SignupForm;
