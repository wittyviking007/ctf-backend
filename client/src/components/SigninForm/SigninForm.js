import React, { useState } from 'react';
import styles from './SigninForm.module.css';
import Axios from "axios";

const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const handleSignin = (e) => {
        e.preventDefault();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const isValid = emailRegex.test(email);
        setIsValidEmail(isValid);
        if (isValid) {
            Axios.get(`http://localhost:3001/logins/${email}`,(response) => {
                if (response === 1) {
                    // login email already exists
                    // so check if password is correct
                    Axios.get(`http://localhost:3001/pw/${email}`,(response2) => {
                        if (password === response2) {
                            console.log("password is correct. Login successful");
                        }else {
                            console.log("password is incorrect");
                        }
                    })
                }
            })
        }
    };

    return (
        <form className={styles.signinForm} onSubmit={handleSignin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    return setEmail(e.target.value);
                }}
            />
            {
                !isValidEmail && <p>Please enter a valid email address</p>
            }
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SigninForm;
