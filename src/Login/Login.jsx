
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import loginservice from "../services/LoginService";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [login, setLogin] = useState([]);

    useEffect(() => {
    }, []);


    const saveData =(e)=> {
        toast("ok");

        e.preventDefault();
        const login = {  email,password,role};

        loginservice.login(login)
            .then(res => {
                console.log('avec succee');
                console.log(login)
                navigate('/classes');

            }).catch(error => {
            console.log('erreur', error);

        });
    }
    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>login</h5>
                <div className='card-body'>
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
                            <input
                                type='text'
                                name='role'
                                id='role'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className='form-control'
                                placeholder='Entrez le nom de l&#x27;password'
                            />
                        </div>
                        <button className='btn btn-primary' onClick={(e)=> saveData(e)}>login</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;

