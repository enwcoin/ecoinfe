import "./Main.css";
import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { UserSignupInfo } from "../../type";

export const SignupPage = () => {
    const [isSignedUp, setIsSignedUp] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const url = import.meta.env.VITE_BASE_URL + '/users/signup';
        const data: UserSignupInfo = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            passwordConfirm: event.target.password_confirm.value
        };

        const response = await axios({
            method: "POST",
            url: url,
            data: data
        });

        if (response.status === 201) {
            setIsSignedUp(true);
        }
    };

    return isSignedUp ? <Redirect to="/login" /> : (
        <div className="auth-page">
            <div className="form">
                <form id="signup-form" className="register-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" name="username" required/>
                    <input type="text" placeholder="email address" name="email" required/>
                    <input type="password" placeholder="password" name="password" required/>
                    <input type="password" placeholder="password confirm" name="password_confirm" required/>
                    <button id="signup">create</button>
                    <p className="message">
                        Already registered? 
                        <a href="/login">Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};