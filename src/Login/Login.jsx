import React, { useEffect, useState } from

        "react";
import { useNavigate } from

        "react-router-dom";
import loginservice from

        "../services/LoginService";
import logModuleCss from './log.module.css';

import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import palestineFlag from './palastine.png';


export { logout };

const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");


};

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [login, setLogin] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect hook to check if the user is logged in
    useEffect(() => {
        // Get the token from local storage.
        const token = localStorage.getItem("token");

        // If the token exists, the user is logged in.
        if (token) {
            // Set the `isLoggedIn` state variable to `true`.
            setIsLoggedIn(true);

            // Navigate to the home page.
            navigate("/etudiants");
        } else {
            // The user is not logged in.
            // Set the `isLoggedIn` state variable to `false`.
            setIsLoggedIn(false);
        }
    }, []);

    const saveData = (e) => {
        toast("ok");

        e.preventDefault();

        // Get the selected option.
        const selectedOption = document.querySelector("#role").selectedOptions[0];

        // Set the role value in the login object.
        const login = { email, password, role: selectedOption.value };

        loginservice.login(login)
            .then((res) => {
                console.log("avec succee");
                console.log(login);
                console.log(res.data);
                localStorage.setItem("isLoggedIn", true);
                console.log(localStorage)
                localStorage.setItem("token", res.data.token);
                const decodedToken = jwt_decode(res.data.token);
                console.log("Decoded Token:", decodedToken);
                const userEmail = decodedToken.UserEmail;
                const userId = decodedToken.userId;
                console.log(userId);
                localStorage.getItem("userId",userId);
                console.log(userEmail);
                setUserId(decodedToken.userId);
                console.log(userId);
                // Set the user ID in local storage.
                localStorage.setItem("userId", userId);
                setUserId(decodedToken.userId);
                console.log(userId);
                console.log(localStorage.getItem("isLoggedIn"));
                navigate("/Dashboard");
            })
            .catch((error) => {
                console.log("erreur", error);
            });
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>login</h5>
                <div className='card-body'>
                    <img src={palestineFlag} alt="Palestinian flag" />

                    <form>
                        <div className='form-group'>
                            <label htmlFor='nom'>email</label>
                            <input
                                type='text'
                                name='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='form-control'
                                placeholder='Entrez le nom de l&#x27;email'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nom'>password</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='form-control'
                                placeholder='Entrez le nom de l&#x27;password'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nom'>role</label>
                            <select
                                name='role'
                                id='role'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className='form-control'
                            >
                                <option value='admin'>Admin</option>
                                <option value='etudiant'>Etudiant</option>
                                <option value='enseignant'>Enseignant</option>
                            </select>
                        </div>
                        <button className='btn btn-primary' onClick={(e)=> saveData(e)}>login</button>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
